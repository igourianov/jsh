#!/usr/bin/env node
// Job application state machine.
//
// Status is derived from the Progress log and never hand-set. This script is the
// only writer of that state, which is what keeps the two from drifting apart.
//
//   node scripts/job.mjs log <file> <stage> [--date D] [--note "..."]
//   node scripts/job.mjs check [path]
//   node scripts/job.mjs ghost [--apply]
//   node scripts/job.mjs sync [--apply]
//   node scripts/job.mjs list [--open] [--stale] [--stage X] [--status X]
//   node scripts/job.mjs migrate [--apply] [--report FILE]

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const JOBS = path.join(ROOT, 'jobs');
const ACTIVE = path.join(ROOT, 'jobs-active');
const GHOST_DAYS = 21;

// ---------------------------------------------------------------- vocabulary

// Rank drives status: a record sits at the furthest rank its log reached.
const RANK = {
  Screened: 0,
  Applied: 1,
  Contacted: 2,
  Scheduled: 2,
  'Recruiter screen': 2,
  'Hiring manager': 2,
  'Technical interview': 2,
  Panel: 2,
  Offer: 2,
  'Follow-up': null, // neutral: records a chase without advancing the record
};

const TERMINAL = {
  Passed: 'Passed',
  Rejected: 'Rejected',
  Failed: 'Failed',
  Ghosted: 'Ghosted',
  Withdrew: 'Withdrew',
  Accepted: 'Accepted',
};

const STAGES = new Set([...Object.keys(RANK), ...Object.keys(TERMINAL)]);
const OPEN_STATUS = new Set(['Screened', 'Applied', 'Active']);

// ---------------------------------------------------------------- primitives

const today = () => new Date().toISOString().slice(0, 10);
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const RESERVED = new Set(['notes.md', 'resume.md', 'company.md', 'match.md', 'black-list.md']);

// A screening file is any .md under jobs/ carrying a Status field in its header
// region, meaning above the first h2. Requiring the header region rather than
// matching anywhere keeps prose like "- **Status:** Monday meeting confirmed"
// inside a notes file from being mistaken for state.
function screeningFiles(base = JOBS) {
  return walk(base).filter((p) => {
    if (RESERVED.has(path.basename(p).toLowerCase())) return false;
    const head = fs.readFileSync(p, 'utf8').split(/^## /m)[0];
    return /^[ \t]*-[ \t]+\*\*Status:\*\*/m.test(head);
  });
}

// -------------------------------------------------------------------- parse

const FIELD_RE = /^[ \t]*-[ \t]+\*\*([^*:]+):\*\*[ \t]*(.*)$/;
const ENTRY_RE = /^[ \t]+-[ \t]+(\d{4}-\d{2}-\d{2})[ \t]+(.+?)[ \t]*$/;

// Splits an entry body into stage and optional note. Longest stage name wins so
// "Recruiter screen" is not mistaken for a bare token.
function splitStage(body) {
  const names = [...STAGES].sort((a, b) => b.length - a.length);
  for (const name of names) {
    if (body === name) return { stage: name, note: '' };
    if (body.startsWith(name + ' - ')) return { stage: name, note: body.slice(name.length + 3).trim() };
  }
  return { stage: body, note: '' }; // unknown; check() reports it
}

export function parse(file) {
  return parseText(fs.readFileSync(file, 'utf8'), file);
}

export function parseText(text, file) {
  const lines = text.split(/\r?\n/);

  // Header region ends at the first h2. Everything the state machine owns lives above it.
  let headerEnd = lines.findIndex((l) => /^## /.test(l));
  if (headerEnd < 0) headerEnd = lines.length;

  const fields = new Map();
  for (let i = 0; i < headerEnd; i++) {
    const m = lines[i].match(FIELD_RE);
    if (m) fields.set(m[1].trim(), { index: i, value: m[2].trim() });
  }

  const rec = { file, lines, headerEnd, fields, log: [], canonical: false };

  const prog = fields.get('Progress');
  if (prog) {
    // Canonical form: the Progress field is empty and followed by indented entries.
    let i = prog.index + 1;
    const entries = [];
    while (i < headerEnd) {
      const m = lines[i].match(ENTRY_RE);
      if (!m) break;
      entries.push({ date: m[1], ...splitStage(m[2]), index: i });
      i++;
    }
    if (entries.length) {
      rec.log = entries;
      rec.canonical = true;
      rec.progEnd = i - 1;
    } else {
      rec.progEnd = prog.index;
    }
  }

  // Narrative headings in the ## Log section, used by invariant 6.
  rec.sections = [];
  for (let i = headerEnd; i < lines.length; i++) {
    const m = lines[i].match(/^### (\d{4}-\d{2}-\d{2}) (.+?)\s*$/);
    if (m) rec.sections.push({ date: m[1], stage: m[2].trim(), index: i });
  }

  return rec;
}

// ------------------------------------------------------------------- derive

// Status is a pure function of the log: the terminal entry if the log closed,
// otherwise the furthest rank any entry reached.
export function derive(log) {
  if (!log.length) return null;
  const last = log[log.length - 1];
  if (TERMINAL[last.stage]) return TERMINAL[last.stage];

  let best = -1;
  for (const e of log) {
    const r = RANK[e.stage];
    if (typeof r === 'number' && r > best) best = r;
  }
  if (best >= 2) return 'Active';
  if (best >= 1) return 'Applied';
  return 'Screened';
}

// The ghost clock measures silence, so a Follow-up you sent cannot restart it.
export function clockAnchor(log) {
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].stage !== 'Follow-up') return log[i].date;
  }
  return log.length ? log[0].date : null;
}

// ---------------------------------------------------------------- serialize

// The only place metadata state is rendered. Both log and migrate go through here.
function renderState(log) {
  const out = ['- **Progress:**'];
  for (const e of log) out.push(`  - ${e.date} ${e.stage}${e.note ? ' - ' + e.note : ''}`);
  return out;
}

// Writes state back in place. Lines outside the Status/Progress/Saved fields are
// left byte-identical, so migration cannot reformat prose it does not own.
function write(rec, log, { dryRun = false } = {}) {
  const lines = [...rec.lines];
  const status = derive(log);

  const prog = rec.fields.get('Progress');
  const st = rec.fields.get('Status');
  const saved = rec.fields.get('Saved');

  const edits = [];
  if (prog) edits.push({ from: prog.index, to: rec.progEnd ?? prog.index, text: renderState(log) });
  if (st) edits.push({ from: st.index, to: st.index, text: [`- **Status:** ${status}`] });
  if (saved) edits.push({ from: saved.index, to: saved.index, text: [] }); // date now lives in the log

  // Apply bottom-up so earlier indices stay valid.
  edits.sort((a, b) => b.from - a.from);
  for (const e of edits) lines.splice(e.from, e.to - e.from + 1, ...e.text);

  const text = lines.join('\n');
  if (!dryRun) fs.writeFileSync(rec.file, text);
  return { text, status };
}

// -------------------------------------------------------------------- check

// Written against the file's text rather than the writer's internals, so a bug in
// serialize cannot hide behind a matching bug here.
export function check(file, text = null) {
  const rec = text === null ? parse(file) : parseText(text, file);
  const v = [];
  const rel = path.relative(ROOT, file);
  const push = (msg) => v.push({ file: rel, msg });

  if (rec.fields.has('Saved')) push('has a Saved field; the date belongs in the log');
  if (!rec.fields.has('Progress')) return [{ file: rel, msg: 'no Progress field' }];
  if (!rec.log.length) return [{ file: rel, msg: 'Progress log is empty' }];

  // 3. vocabulary
  for (const e of rec.log) if (!STAGES.has(e.stage)) push(`unknown stage "${e.stage}" (${e.date})`);

  // 2. dates ascending, none in the future
  const now = today();
  for (let i = 0; i < rec.log.length; i++) {
    if (rec.log[i].date > now) push(`future date ${rec.log[i].date}`);
    if (i && rec.log[i].date < rec.log[i - 1].date) push(`date ${rec.log[i].date} precedes ${rec.log[i - 1].date}`);
  }

  // 4. entry point
  const first = rec.log[0].stage;
  if (first !== 'Screened' && first !== 'Contacted') push(`first entry is "${first}", expected Screened or Contacted`);

  // 5. terminal only at the end
  for (let i = 0; i < rec.log.length - 1; i++) {
    if (TERMINAL[rec.log[i].stage]) push(`terminal stage "${rec.log[i].stage}" is not the final entry`);
  }

  // 1. status matches the log
  const want = derive(rec.log);
  const got = rec.fields.get('Status')?.value;
  if (got !== want) push(`Status is "${got}", log derives "${want}"`);

  // 6. narrative headings anchor to a log entry
  for (const s of rec.sections) {
    if (!rec.log.some((e) => e.date === s.date && e.stage === s.stage)) {
      push(`## Log heading "${s.date} ${s.stage}" matches no Progress entry`);
    }
  }

  return v;
}

// ------------------------------------------------------------------ git dates

// The pre-2026-03-26 records carry no close date in the file, but the old system
// moved closed jobs into jobs-archive/, so git knows when each one was last touched.
const BULK_COMMIT_DATE = '2026-03-29'; // "reworked jobs folders and status tracking"

// --follow costs a subprocess per file, so only the records that actually need a
// recovered date pay for it.
const gitCache = new Map();
function gitDates(file) {
  if (gitCache.has(file)) return gitCache.get(file);
  const v = gitDatesUncached(file);
  gitCache.set(file, v);
  return v;
}

function gitDatesUncached(file) {
  try {
    const out = execFileSync('git', ['log', '--follow', '--format=%ad', '--date=short', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean);
    const preBulk = out.filter((d) => d !== BULK_COMMIT_DATE);
    return { last: preBulk[0] ?? out[0] ?? null, first: out[out.length - 1] ?? null };
  } catch {
    return { last: null, first: null };
  }
}

// ----------------------------------------------------------------- migrate

const LEGACY_PROGRESS = /^(.*?)(?:\s*\((\d{4}-\d{2}-\d{2})\))?(?:,\s*(.*))?$/;

function parseLegacyProgress(value) {
  if (!value) return null;
  const m = value.match(LEGACY_PROGRESS);
  let label = (m[1] || '').trim();
  const date = m[2] || null;
  const note = (m[3] || '').trim();

  // "Recruiter screen scheduled" is a transition to Active, not the interview itself.
  if (/scheduled$/i.test(label)) {
    const what = label.replace(/\s*scheduled$/i, '').trim();
    return { stage: 'Scheduled', date, note: [what && `${what.toLowerCase()} ${date || ''}`.trim(), note].filter(Boolean).join('; ') };
  }
  const found = [...STAGES].sort((a, b) => b.length - a.length).find((s) => s.toLowerCase() === label.toLowerCase());
  return { stage: found || label, date, note };
}

function migrateRecord(file) {
  const rec = parse(file);
  const notes = [];
  if (rec.canonical) return { rec, log: rec.log, notes, skipped: true };

  const rel = path.relative(ROOT, file);
  const git = () => gitDates(file);

  let saved = rec.fields.get('Saved')?.value ?? null;

  // Seven records carry a 2025 saved date that predates their own file. Year typo.
  if (saved && /^2025-/.test(saved)) {
    const first = git().first;
    if (first && saved < first) {
      const fixed = '2026' + saved.slice(4);
      if (isDate(fixed) && fixed >= first) {
        notes.push(`saved date ${saved} predates first commit ${first}; corrected to ${fixed}`);
        saved = fixed;
      }
    }
  }
  if (!saved || !isDate(saved)) {
    saved = git().first ?? today();
    notes.push(`no usable Saved field; used ${saved}`);
  }

  const log = [{ date: saved, stage: 'Screened', note: '' }];

  const prog = parseLegacyProgress(rec.fields.get('Progress')?.value ?? '');
  if (prog && prog.stage && RANK[prog.stage] !== undefined) {
    let d = prog.date;
    if (!d) {
      d = notesDate(file, prog.stage) ?? saved;
      notes.push(`${prog.stage} had no date; approximated as ${d}`);
    }
    log.push({ date: d, stage: prog.stage, note: prog.note });
  }

  // Terminal
  const rawStatus = rec.fields.get('Status')?.value ?? '';
  const sm = rawStatus.match(/^([A-Za-z]+)(?:\s*\((\d{4}-\d{2}-\d{2})\))?/);
  const base = sm?.[1] ?? '';
  const statusDate = sm?.[2] ?? null;

  if (['Passed', 'Rejected', 'Ghosted', 'Withdrew', 'Accepted'].includes(base)) {
    const hadContact = log.some((e) => RANK[e.stage] === 2);
    const stage = base === 'Rejected' ? (hadContact ? 'Failed' : 'Rejected') : base;
    let d = statusDate;
    if (!d) {
      const recovered = git().last;
      d = recovered ?? saved;
      notes.push(
        recovered ? `${base} had no date; recovered ${d} from git history` : `${base} had no date and no git history; used ${d}`,
      );
    }
    log.push({ date: d, stage, note: '' });
  } else if (!['Screened', 'Active'].includes(base)) {
    notes.push(`unrecognised Status "${rawStatus}"; needs manual review`);
  }

  // Clamp to ascending order rather than emitting an invalid log. Clario's ghost
  // date predates its own screen, which is how that record surfaced.
  for (let i = 1; i < log.length; i++) {
    if (log[i].date < log[i - 1].date) {
      notes.push(`${log[i].stage} date ${log[i].date} precedes ${log[i - 1].date}; clamped`);
      log[i].date = log[i - 1].date;
    }
  }

  return { rec, log, notes, skipped: false, rel };
}

// Some application dates survive only as a heading in the company notes file.
// Only trustworthy when the company has a single screening file: a shared notes.md
// carries no role reference, so its dates cannot be attributed to one application.
function notesDate(file, stage) {
  const dir = path.dirname(file);
  const n = path.join(dir, 'notes.md');
  if (!fs.existsSync(n)) return null;
  if (screeningFiles(dir).length !== 1) return null;
  const want = stage === 'Applied' ? /appl/i : new RegExp(stage.split(' ')[0], 'i');
  for (const line of fs.readFileSync(n, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^##\s+(.*?)(\d{4}-\d{2}-\d{2})/);
    if (m && want.test(m[1])) return m[2];
  }
  return null;
}

// ----------------------------------------------------------------- commands

function cmdCheck(args) {
  const target = args.find((a) => !a.startsWith('--'));
  const files = target ? (fs.statSync(target).isDirectory() ? screeningFiles(target) : [target]) : screeningFiles();
  let bad = 0;
  for (const f of files) {
    const v = check(f);
    if (v.length) {
      bad++;
      console.log(v[0].file);
      for (const x of v) console.log(`   ${x.msg}`);
    }
  }
  console.log(`\n${files.length - bad}/${files.length} valid, ${bad} with violations`);
  return bad ? 1 : 0;
}

function cmdLog(args) {
  const file = args[0];
  const stage = args[1];
  if (!file || !stage) return usage();
  if (!STAGES.has(stage)) {
    console.error(`unknown stage "${stage}"\nvalid: ${[...STAGES].join(', ')}`);
    return 1;
  }
  const date = flag(args, '--date') ?? today();
  const note = flag(args, '--note') ?? '';

  const rec = parse(file);
  if (!rec.canonical) {
    console.error(`${file} is not migrated yet; run migrate first`);
    return 1;
  }
  const log = [...rec.log, { date, stage, note }];
  const { status } = write(rec, log);
  console.log(`${path.relative(ROOT, file)}\n  + ${date} ${stage}${note ? ' - ' + note : ''}\n  Status: ${status}`);
  return 0;
}

function cmdList(args) {
  const wantOpen = args.includes('--open');
  const wantStale = args.includes('--stale');
  const stage = flag(args, '--stage');
  const status = flag(args, '--status');
  const rows = [];

  for (const f of screeningFiles()) {
    const rec = parse(f);
    if (!rec.canonical) continue;
    const st = derive(rec.log);
    const anchor = clockAnchor(rec.log);
    const age = days(anchor, today());
    if (wantOpen && !OPEN_STATUS.has(st)) continue;
    if (wantStale && !(OPEN_STATUS.has(st) && st !== 'Screened' && age > GHOST_DAYS)) continue;
    if (status && st !== status) continue;
    if (stage && !rec.log.some((e) => e.stage === stage)) continue;
    rows.push({ st, age, last: rec.log[rec.log.length - 1], file: path.relative(JOBS, f) });
  }

  rows.sort((a, b) => b.age - a.age);
  for (const r of rows) {
    console.log(`${r.st.padEnd(9)} ${String(r.age).padStart(4)}d  ${r.last.date} ${r.last.stage.padEnd(18)} ${r.file}`);
  }
  console.log(`\n${rows.length} records`);
  return 0;
}

function cmdGhost(args) {
  const apply = args.includes('--apply');
  let n = 0;
  for (const f of screeningFiles()) {
    const rec = parse(f);
    if (!rec.canonical) continue;
    const st = derive(rec.log);
    if (st !== 'Applied' && st !== 'Active') continue;
    const age = days(clockAnchor(rec.log), today());
    if (age <= GHOST_DAYS) continue;
    n++;
    console.log(`${age}d silent  ${path.relative(JOBS, f)}`);
    if (apply) write(rec, [...rec.log, { date: today(), stage: 'Ghosted', note: '' }]);
  }
  console.log(`\n${n} record(s) silent over ${GHOST_DAYS} days${apply ? ', marked Ghosted' : ' (dry run, pass --apply)'}`);
  return 0;
}

function cmdSync(args) {
  const apply = args.includes('--apply');
  const openCompanies = new Set();
  for (const f of screeningFiles()) {
    const rec = parse(f);
    const st = rec.canonical ? derive(rec.log) : rec.fields.get('Status')?.value?.split(' (')[0];
    if (OPEN_STATUS.has(st)) openCompanies.add(path.relative(JOBS, f).split(path.sep)[0]);
  }
  const existing = fs.existsSync(ACTIVE) ? fs.readdirSync(ACTIVE) : [];
  const stale = existing.filter((c) => !openCompanies.has(c));
  const missing = [...openCompanies].filter((c) => !existing.includes(c));

  for (const c of stale) console.log(`stale    ${c}`);
  for (const c of missing) console.log(`missing  ${c}`);

  if (apply) {
    // Never a recursive delete. These are junctions pointing at live job folders,
    // and a recursive rm on the link risks taking the target's contents with it.
    for (const c of stale) {
      const p = path.join(ACTIVE, c);
      const st = fs.lstatSync(p, { throwIfNoEntry: false });
      if (!st) continue;
      if (!st.isSymbolicLink() && !st.isDirectory()) continue;
      if (st.isSymbolicLink()) {
        try {
          fs.unlinkSync(p);
        } catch {
          fs.rmdirSync(p);
        }
      } else {
        fs.rmdirSync(p); // plain empty dir; fails loudly if it holds real files
      }
    }
    for (const c of missing) {
      fs.mkdirSync(ACTIVE, { recursive: true });
      fs.symlinkSync(path.join(JOBS, c), path.join(ACTIVE, c), 'junction');
    }
  }
  console.log(`\n${stale.length} stale, ${missing.length} missing${apply ? ', reconciled' : ' (dry run, pass --apply)'}`);
  return 0;
}

function cmdMigrate(args) {
  const apply = args.includes('--apply');
  const reportPath = flag(args, '--report');
  const files = screeningFiles();
  const report = [];
  const flagged = [];
  const invalid = [];
  let changed = 0,
    already = 0;

  for (const f of files) {
    const { rec, log, notes, skipped, rel } = migrateRecord(f);
    if (skipped) {
      already++;
      continue;
    }
    changed++;
    const { status, text } = write(rec, log, { dryRun: !apply });

    // Validate the produced record before it counts as migrated. A dry run that
    // does not verify its own output is just a diff preview.
    const violations = check(f, text);
    if (violations.length) invalid.push({ rel, violations });

    const block = [
      `### ${rel}`,
      `Status: ${rec.fields.get('Status')?.value ?? '?'}  ->  ${status}`,
      ...log.map((e) => `  - ${e.date} ${e.stage}${e.note ? ' - ' + e.note : ''}`),
      ...notes.map((n) => `  ! ${n}`),
      '',
    ].join('\n');
    report.push(block);
    if (notes.length) flagged.push({ rel, notes });
  }

  const summary = [
    `# Migration report (${apply ? 'APPLIED' : 'DRY RUN'})`,
    '',
    `- files scanned: ${files.length}`,
    `- already canonical: ${already}`,
    `- migrated: ${changed}`,
    `- output fails validation: ${invalid.length}`,
    `- with approximations or warnings: ${flagged.length}`,
    '',
    ...(invalid.length
      ? ['## Invalid output', '', ...invalid.map((x) => `- **${x.rel}**\n` + x.violations.map((y) => `  - ${y.msg}`).join('\n')), '']
      : []),
    '## Flagged',
    '',
    ...flagged.map((x) => `- **${x.rel}**\n` + x.notes.map((n) => `  - ${n}`).join('\n')),
    '',
    '## All records',
    '',
    ...report,
  ].join('\n');

  if (reportPath) fs.writeFileSync(reportPath, summary);
  console.log(summary.split('## All records')[0]);
  if (reportPath) console.log(`full report: ${reportPath}`);
  if (!apply) console.log('dry run, pass --apply to write');
  return 0;
}

function flag(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
}

function usage() {
  console.log(`usage:
  job.mjs log <file> <stage> [--date YYYY-MM-DD] [--note "..."]
  job.mjs check [path]
  job.mjs ghost [--apply]
  job.mjs sync [--apply]
  job.mjs list [--open] [--stale] [--stage X] [--status X]
  job.mjs migrate [--apply] [--report FILE]

stages: ${[...STAGES].join(', ')}`);
  return 1;
}

const [cmd, ...rest] = process.argv.slice(2);
const table = { log: cmdLog, check: cmdCheck, ghost: cmdGhost, sync: cmdSync, list: cmdList, migrate: cmdMigrate };
process.exit((table[cmd] ?? usage)(rest));
