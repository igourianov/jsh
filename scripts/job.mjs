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
const GHOST_DAYS = 21; // "no response in over 3 weeks"

// ---------------------------------------------------------------- vocabulary

// Rank drives status: a record sits at the furthest rank its log reached.
const RANK = {
  Saved: 0,
  Applied: 1,
  Contacted: 2,
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
const OPEN_STATUS = new Set(['Saved', 'Applied', 'Active']);

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
function isScreeningFile(p) {
  if (!p.endsWith('.md')) return false;
  if (RESERVED.has(path.basename(p).toLowerCase())) return false;
  const head = fs.readFileSync(p, 'utf8').split(/^## /m)[0];
  return /^[ \t]*-[ \t]+\*\*Status:\*\*/m.test(head);
}

function screeningFiles(base = JOBS) {
  return walk(base).filter(isScreeningFile);
}

// -------------------------------------------------------------------- parse

const FIELD_RE = /^[ \t]*-[ \t]+\*\*([^*:]+):\*\*[ \t]*(.*)$/;
const ENTRY_RE = /^[ \t]+-[ \t]+(\d{4}-\d{2}-\d{2})[ \t]+(.+?)[ \t]*$/;

// Splits an entry body into stage and optional note. Longest stage name wins so
// "Recruiter screen" is not mistaken for a bare token. Reads the old " - "
// separator as well as the current ": " so pre-existing entries still parse.
function splitStage(body) {
  const names = [...STAGES].sort((a, b) => b.length - a.length);
  for (const name of names) {
    if (body === name) return { stage: name, note: '' };
    for (const sep of [': ', ' - ']) {
      if (body.startsWith(name + sep)) return { stage: name, note: body.slice(name.length + sep.length).trim() };
    }
  }
  return { stage: body, note: '' }; // unknown; check() reports it
}

const entryLine = (e) => `${e.date} ${e.stage}${e.note ? ': ' + e.note : ''}`;

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
// Stages that reopen a closed application. Reapplying is normal: Petal's role was
// reposted under a new URL, Slice was re-applied to a month after the first attempt.
const REOPEN = new Set(['Saved', 'Applied', 'Contacted']);

export function derive(log) {
  if (!log.length) return null;
  const last = log[log.length - 1];
  if (TERMINAL[last.stage]) return TERMINAL[last.stage];

  // Only the current cycle counts. A record that reached a technical interview,
  // got rejected, then reapplied is at Applied again, not Active.
  let start = 0;
  for (let i = log.length - 1; i >= 0; i--) {
    if (TERMINAL[log[i].stage]) {
      start = i + 1;
      break;
    }
  }

  let best = -1;
  for (const e of log.slice(start)) {
    const r = RANK[e.stage];
    if (typeof r === 'number' && r > best) best = r;
  }
  if (best >= 2) return 'Active';
  if (best >= 1) return 'Applied';
  return 'Saved';
}

// Ordering weight for entries that share a date. Follow-up sits above the pipeline
// stages but below a close, since chasing happens after whatever it chases.
function sortRank(stage) {
  if (TERMINAL[stage]) return 99;
  return RANK[stage] ?? 50;
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
  for (const e of log) out.push(`  - ${entryLine(e)}`);
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

  // The legacy "- **Saved:** date" field, not the Saved stage that replaced it.
  if (rec.fields.has('Saved')) push('has a legacy Saved field; that date is now the first Progress entry');
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
  if (first !== 'Saved' && first !== 'Contacted') push(`first entry is "${first}", expected Saved or Contacted`);

  // 5. a terminal entry ends the log, unless the next entry reopens the application
  for (let i = 0; i < rec.log.length - 1; i++) {
    if (TERMINAL[rec.log[i].stage] && !REOPEN.has(rec.log[i + 1].stage)) {
      push(`terminal stage "${rec.log[i].stage}" is followed by "${rec.log[i + 1].stage}", which does not reopen it`);
    }
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

  // "Recruiter screen scheduled" records the recruiter reaching out, not the
  // interview. The interview gets its own entry on the day it happens.
  if (/scheduled$/i.test(label)) {
    const what = label.replace(/\s*scheduled$/i, '').trim();
    const booked = [what && `${what.toLowerCase()} booked${date ? ` for ${date}` : ''}`, note].filter(Boolean).join('; ');
    return { stage: 'Contacted', date, note: booked };
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

  const log = [{ date: saved, stage: 'Saved', note: '' }];

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
    // "Screened" here is the pre-rename legacy Status value, not the current stage.
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
  let files;
  if (!target) files = screeningFiles();
  else if (fs.statSync(target, { throwIfNoEntry: false })?.isDirectory()) files = screeningFiles(target);
  // A single file still has to be a screening file: notes.md and resume.md carry
  // no state to validate.
  else files = isScreeningFile(target) ? [target] : [];

  if (!files.length) return 0;
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
  if (!isDate(date)) {
    console.error(`--date must be YYYY-MM-DD, got "${date}"`);
    return 1;
  }
  // The log records what has happened. An interview you have booked is not an
  // entry yet; the contact that booked it is.
  if (date > today()) {
    console.error(`${date} is in the future. The log is a record of facts, not a plan.\nLog the contact that scheduled it instead, then log the round on the day it happens.`);
    return 1;
  }

  const rec = parse(file);
  if (!rec.canonical) {
    console.error(`${file} is not migrated yet; run migrate first`);
    return 1;
  }
  // Insert in date order rather than append: backfilling a round you forgot to log
  // is normal, and it must not land after the entry that closed the application.
  const log = [...rec.log];
  const entry = { date, stage, note };
  let at = log.length;
  while (at > 0 && log[at - 1].date > date) at--;
  // Same-day entries order by rank, not by when they were typed: you are screened
  // before you apply even when both happen in one sitting, and a terminal ends the day.
  while (at > 0 && log[at - 1].date === date && sortRank(log[at - 1].stage) > sortRank(stage)) at--;
  log.splice(at, 0, entry);

  const { status } = write(rec, log);
  console.log(`${path.relative(ROOT, file)}\n  + ${entryLine(entry)}\n  Status: ${status}`);
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
    if (wantStale && !(OPEN_STATUS.has(st) && st !== 'Saved' && age > GHOST_DAYS)) continue;
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
      ...log.map((e) => `  - ${entryLine(e)}`),
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

// ------------------------------------------------------------------- notes

// Company-scoped material: true of the company regardless of which role you applied
// for, so it stays in notes.md. Everything else belongs to one application.
const COMPANY_SECTION = /impression|research|key contacts|interview process|speculation|glassdoor/i;

function splitSections(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let cur = null;
  for (const l of lines) {
    const m = l.match(/^## (.+?)\s*$/);
    if (m) {
      if (cur) out.push(cur);
      cur = { heading: m[1], body: [] };
    } else if (cur) cur.body.push(l);
    else out.push({ preamble: true, heading: null, body: [l] });
  }
  if (cur) out.push(cur);
  return out;
}

// Attributes a notes section to one application by matching its date against the
// Progress logs. A shared notes.md carries no role reference, so date agreement is
// the only evidence available.
function attribute(section, records) {
  const body = section.body.join('\n');
  // Dates and role names live in the body as often as the heading, e.g.
  // "Ghosted (2026-04-04). Applied for Engineering Manager, Monetization."
  const d = (section.heading?.match(/(\d{4}-\d{2}-\d{2})/) ?? body.match(/(\d{4}-\d{2}-\d{2})/))?.[1] ?? null;
  if (records.length === 1) return { rec: records[0], entry: pickEntry(records[0], section, d), reason: 'only screening file' };

  // A body naming the role is stronger evidence than a date two applications share.
  const named = records.filter((r) => body.includes(path.basename(r.file, '.md')));
  if (named.length === 1) {
    return { rec: named[0], entry: pickEntry(named[0], section, d), reason: `body names ${path.basename(named[0].file)}` };
  }

  if (!d) return { rec: null, reason: 'no date in heading or body, and company has multiple applications' };

  // Stage dominates date. Clio screened one application on 2026-04-22 and passed on
  // another 2026-04-20; both sit a day from the notes date, but only one had a
  // recruiter screen, and that is the record the notes describe.
  const want = headingStage(section.heading);
  const isOutcome = /^outcome/i.test(section.heading);

  const hits = [];
  for (const r of records) {
    for (const e of r.log) {
      if (want && e.stage !== want) continue;
      if (isOutcome && !TERMINAL[e.stage]) continue;
      const gap = Math.abs(days(e.date, d));
      if (gap <= 3) hits.push({ rec: r, entry: e, gap });
    }
  }
  if (!hits.length) {
    return { rec: null, reason: `no ${want ?? (isOutcome ? 'terminal' : 'Progress')} entry within 3 days of ${d}` };
  }

  const best = Math.min(...hits.map((h) => h.gap));
  const closest = hits.filter((h) => h.gap === best);
  const files = new Set(closest.map((h) => h.rec.file));
  if (files.size > 1) return { rec: null, reason: `${d} matches ${files.size} applications equally` };
  return { rec: closest[0].rec, entry: closest[0].entry, reason: `${d} matches ${path.basename(closest[0].rec.file)}` };
}

// What stage a notes heading is talking about. Needed because 64 application dates
// were approximated to the screen date, so date alone cannot tell "Application"
// from "Saved" when both entries share a day.
const HEADING_STAGE = [
  [/outreach|reached out/i, 'Contacted'],
  [/recruiter\s*screen|^screen\b/i, 'Recruiter screen'],
  [/technical\s*interview/i, 'Technical interview'],
  [/leadership|hiring manager|vp interview/i, 'Hiring manager'],
  [/panel|onsite/i, 'Panel'],
  [/offer/i, 'Offer'],
  [/follow-?up/i, 'Follow-up'],
  [/appl/i, 'Applied'],
  [/scheduled/i, 'Contacted'], // last: a heading naming a round beats the word "scheduled"
];

function headingStage(heading) {
  for (const [re, stage] of HEADING_STAGE) if (re.test(heading)) return stage;
  return null;
}

// Picks which log entry a section anchors to. Outcome sections attach to the
// terminal entry; everything else to the entry whose stage the heading names.
function pickEntry(rec, section, d) {
  const heading = section.heading ?? '';
  if (/^outcome/i.test(heading)) {
    // Prefer the close this section is actually about. A reopened record has more
    // than one terminal entry, and the newest is not the one the notes describe.
    const terminals = rec.log.filter((e) => TERMINAL[e.stage]);
    if (!terminals.length) return null;
    if (d) {
      const near = terminals.filter((e) => Math.abs(days(e.date, d)) <= 3);
      if (near.length) return near[0];
    }
    const last = rec.log[rec.log.length - 1];
    return TERMINAL[last.stage] ? last : null;
  }
  const want = headingStage(heading);
  // With one application and no date, the stage name alone is unambiguous.
  if (!d) return want ? (rec.log.find((e) => e.stage === want) ?? null) : null;

  const near = rec.log.filter((e) => Math.abs(days(e.date, d)) <= 3);
  if (!near.length) return null;

  if (want) {
    // A heading naming a stage the log does not have means the log is incomplete.
    // Better to surface that than to anchor the notes to the wrong event.
    return near.find((e) => e.stage === want) ?? null;
  }
  return near.reduce((best, e) => (!best || Math.abs(days(e.date, d)) < Math.abs(days(best.date, d)) ? e : best), null);
}

function cmdNotes(args) {
  const apply = args.includes('--apply');
  const companies = new Map();
  for (const f of screeningFiles()) {
    const c = path.relative(JOBS, f).split(path.sep)[0];
    if (!companies.has(c)) companies.set(c, []);
    companies.get(c).push(parse(f));
  }

  const pending = new Map(); // screening file -> [{heading, body}]
  const report = [];
  let moved = 0,
    kept = 0,
    manual = 0;

  for (const dir of fs.readdirSync(JOBS)) {
    const n = path.join(JOBS, dir, 'notes.md');
    if (!fs.existsSync(n)) continue;
    const records = companies.get(dir) ?? [];
    const sections = splitSections(fs.readFileSync(n, 'utf8'));
    const stay = [];
    const lines = [`### ${dir}`];

    for (const s of sections) {
      if (s.preamble || !s.heading) {
        stay.push(s);
        continue;
      }
      if (COMPANY_SECTION.test(s.heading)) {
        stay.push(s);
        kept++;
        lines.push(`  keep    ## ${s.heading}`);
        continue;
      }
      if (!records.length) {
        stay.push(s);
        manual++;
        lines.push(`  MANUAL  ## ${s.heading}  (company has no screening file)`);
        continue;
      }
      const { rec, entry, reason } = attribute(s, records);
      if (!rec || !entry) {
        stay.push(s);
        // At a single-application company notes.md is unambiguous, so material
        // that is not a round is fine where it is. Only report a real conflict.
        const roundish = headingStage(s.heading) || /^outcome/i.test(s.heading);
        if (records.length === 1 && !roundish) {
          kept++;
          lines.push(`  keep    ## ${s.heading}`);
        } else {
          manual++;
          const why = rec && !entry ? `log has no ${headingStage(s.heading) ?? 'terminal'} entry to anchor to` : reason;
          lines.push(`  MANUAL  ## ${s.heading}  (${why})`);
        }
        continue;
      }
      moved++;
      lines.push(`  move    ## ${s.heading}  ->  ${path.basename(rec.file)}  ### ${entry.date} ${entry.stage}`);
      if (!pending.has(rec.file)) pending.set(rec.file, []);
      pending.get(rec.file).push({ entry, body: s.body });
    }

    if (lines.length > 1) report.push(lines.join('\n'));
    if (apply) writeNotes(n, dir, stay);
  }

  if (apply) {
    for (const [file, blocks] of pending) appendLog(file, blocks);
  }

  console.log(report.join('\n\n'));
  console.log(`\n${moved} section(s) move to a ## Log, ${kept} stay company-scoped, ${manual} need manual attribution`);
  if (!apply) console.log('dry run, pass --apply to write');
  return 0;
}

function writeNotes(file, company, stay) {
  const real = stay.filter((s) => s.heading);
  if (!real.length) {
    fs.unlinkSync(file); // nothing company-scoped left
    return;
  }
  const out = [`# ${company} - Notes`, ''];
  for (const s of real) {
    out.push(`## ${s.heading}`);
    out.push(...trimBlank(s.body));
    out.push('');
  }
  fs.writeFileSync(file, out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
}

function appendLog(file, blocks) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  let idx = lines.findIndex((l) => /^## Log\s*$/.test(l));
  if (idx < 0) {
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    lines.push('', '## Log');
    idx = lines.length - 1;
  }
  blocks.sort((a, b) => (a.entry.date < b.entry.date ? -1 : 1));

  // Several notes sections can anchor to one entry, e.g. three same-day updates
  // after a recruiter screen. Merge them so headings stay unique.
  const merged = new Map();
  for (const b of blocks) {
    const key = `${b.entry.date} ${b.entry.stage}`;
    if (!merged.has(key)) merged.set(key, []);
    const body = merged.get(key);
    if (body.length) body.push('');
    body.push(...trimBlank(b.body));
  }

  const add = [];
  for (const [key, body] of merged) add.push('', `### ${key}`, '', ...body);
  lines.splice(idx + 1, 0, ...add);
  fs.writeFileSync(file, lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
}

function trimBlank(body) {
  const b = [...body];
  while (b.length && !b[0].trim()) b.shift();
  while (b.length && !b[b.length - 1].trim()) b.pop();
  return b;
}

// Entry point for the PostToolUse hook. Reads the hook payload on stdin so the
// hook needs no jq, which this machine does not have.
async function cmdHook() {
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;

  let file;
  try {
    const p = JSON.parse(raw || '{}');
    file = p.tool_input?.file_path ?? p.tool_response?.filePath;
  } catch {
    return 0; // malformed payload is not the data's problem
  }
  if (!file) return 0;

  const rel = path.relative(JOBS, path.resolve(file));
  if (rel.startsWith('..') || path.isAbsolute(rel)) return 0; // outside jobs/
  if (!fs.existsSync(file) || !isScreeningFile(file)) return 0; // notes.md, resume.md, company.md

  const v = check(file);
  if (!v.length) return 0;

  console.error(`${path.relative(ROOT, file)} violates the Progress log rules:`);
  for (const x of v) console.error(`  ${x.msg}`);
  console.error('Fix with: node scripts/job.mjs log <file> <stage> [--date D]');
  return 2; // blocking, so the violation is surfaced rather than left on disk
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
const table = { log: cmdLog, check: cmdCheck, ghost: cmdGhost, sync: cmdSync, list: cmdList, migrate: cmdMigrate, notes: cmdNotes, hook: cmdHook };
process.exit(await (table[cmd] ?? usage)(rest));
