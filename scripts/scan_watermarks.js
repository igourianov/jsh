/**
 * Scans Markdown files for watermark characters: any non-ASCII character not on
 * an explicit whitelist of legitimate typographic symbols. This catches homoglyphs
 * (e.g. Cyrillic 'а' vs Latin 'a') and other non-ASCII substitutions without
 * needing to enumerate every lookalike by hand.
 *
 * File discovery is left to the shell. Usage:
 *   find . -name "*.md" -print0 | xargs -0 node scripts/scan_watermarks.js
 */

'use strict';

const fs = require('fs').promises;

// Non-ASCII characters that are legitimate in this repo's documents (typography,
// punctuation, currency, common symbols) and should never be flagged.
const WHITELIST = new Set([
    ' ', // non-breaking space
    //'–', // en dash –
    //'—', // em dash —
    //'‐', // hyphen ‐
    //'‑', // non-breaking hyphen
    //'‘', // left single quote '
    //'’', // right single quote '
    //'“', // left double quote "
    //'”', // right double quote "
    '…', // ellipsis …
    '•', // bullet •
    '●', // bullet ●
    '◦', // bullet ◦
    '→', // right arrow →
    '✓', // check mark ✓
    '©', // copyright ©
    '®', // registered ®
    '™', // trademark ™
    '°', // degree °
    '×', // multiplication ×
    '÷', // division ÷
    '£', // pound £
    '€', // euro €
    '¥', // yen ¥
]);

// Unicode scripts checked for descriptive labeling. Order matters: first match wins.
const SCRIPT_TESTS = [
    ['Cyrillic', /\p{Script=Cyrillic}/u],
    ['Greek', /\p{Script=Greek}/u],
    ['Armenian', /\p{Script=Armenian}/u],
    ['Hebrew', /\p{Script=Hebrew}/u],
    ['Arabic', /\p{Script=Arabic}/u],
];

// Named invisible / zero-width / format characters. These have no legitimate
// use in plain Markdown prose and are a common way to fingerprint text
// (a unique, invisible bit pattern embedded per copy of a document).
const NAMED_INVISIBLES = {
    0x00AD: 'SOFT HYPHEN',
    0x034F: 'COMBINING GRAPHEME JOINER',
    0x061C: 'ARABIC LETTER MARK',
    0x180E: 'MONGOLIAN VOWEL SEPARATOR',
    0x200B: 'ZERO WIDTH SPACE',
    0x200C: 'ZERO WIDTH NON-JOINER',
    0x200D: 'ZERO WIDTH JOINER',
    0x200E: 'LEFT-TO-RIGHT MARK',
    0x200F: 'RIGHT-TO-LEFT MARK',
    0x2060: 'WORD JOINER',
    0x2061: 'FUNCTION APPLICATION',
    0x2062: 'INVISIBLE TIMES',
    0x2063: 'INVISIBLE SEPARATOR',
    0x2064: 'INVISIBLE PLUS',
    0xFEFF: 'ZERO WIDTH NO-BREAK SPACE (BOM)',
    0xE0001: 'LANGUAGE TAG',
};

/**
 * Classifies invisible/format characters not meant to be seen: zero-width
 * spaces and joiners, bidi controls, variation selectors, and Unicode tag
 * characters (U+E0000 block, capable of hiding arbitrary ASCII payloads).
 * @param {number} cp - Unicode code point
 * @returns {string|null} descriptive name, or null if not an invisible/format char
 */
function invisibleCharName(cp) {
    if (NAMED_INVISIBLES[cp]) return NAMED_INVISIBLES[cp];
    if (cp >= 0xFE00 && cp <= 0xFE0F) return `VARIATION SELECTOR-${cp - 0xFE00 + 1}`;
    if (cp >= 0xE0100 && cp <= 0xE01EF) return `VARIATION SELECTOR-${cp - 0xE0100 + 17}`;
    if (cp >= 0xE0020 && cp <= 0xE007E) return `TAG '${String.fromCodePoint(cp - 0xE0000)}'`;
    if (cp === 0xE007F) return 'CANCEL TAG';
    if (cp >= 0x202A && cp <= 0x202E) return 'BIDI FORMATTING CONTROL';
    if (cp >= 0x2066 && cp <= 0x2069) return 'BIDI ISOLATE CONTROL';
    return null;
}

/**
 * @param {string} ch - a single (possibly surrogate-pair) character
 * @returns {string} human-readable classification
 */
function classifyChar(ch) {
    if (ch.codePointAt(0) <= 0x7F) return 'Latin letter';
    for (const [name, regex] of SCRIPT_TESTS) {
        if (regex.test(ch)) return `${name} character`;
    }
    if (/\p{Letter}/u.test(ch)) return 'Non-ASCII letter';
    if (/\p{Punctuation}/u.test(ch)) return 'Non-ASCII punctuation';
    if (/\p{Symbol}/u.test(ch)) return 'Non-ASCII symbol';
    return 'Non-ASCII character';
}

/**
 * Classifies a single letter's script for word-level comparison.
 * Digits and combining marks return null (script-neutral, ignored).
 * @param {string} ch
 * @returns {string|null} 'ascii', a script name, 'other', or null
 */
function letterScript(ch) {
    if (/[a-zA-Z]/.test(ch)) return 'ascii';
    for (const [name, regex] of SCRIPT_TESTS) {
        if (regex.test(ch)) return name;
    }
    if (/\p{Letter}/u.test(ch)) return 'other';
    return null; // digit or combining mark, not script-specific
}

// A "word" is a run of letters, combining marks, and digits. Matched with the
// 'd' flag so we get match.indices for accurate column numbers.
const WORD_RE = /[\p{Letter}\p{Mark}\p{Number}]+/gud;

/**
 * A word's script category: 'ascii', a specific non-Latin script name, 'mixed'
 * (contains letters from more than one category), or 'neutral' (no letters,
 * e.g. a pure number).
 * @param {string} word
 * @returns {string}
 */
function wordScript(word) {
    const scripts = new Set();
    for (const ch of word) {
        const s = letterScript(ch);
        if (s) scripts.add(s);
    }
    if (scripts.size === 0) return 'neutral';
    if (scripts.size === 1) return [...scripts][0];
    return 'mixed';
}

/**
 * @param {string} content
 * @returns {Array<{char: string, description: string, line: number, column: number}>}
 */
function findWatermarks(content) {
    const findings = [];
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
        // 1. Invisible / zero-width / format characters (zero-width spaces and
        //    joiners, bidi controls, variation selectors, Unicode tag characters)
        //    are always suspicious. They render as nothing, so any occurrence in
        //    plain Markdown prose is a fingerprinting/watermarking red flag, never
        //    legitimate content. Checked ahead of the whitelist and letter carve-out
        //    since these bypass both.
        const chars = [...line];
        let column = 0;
        for (const ch of chars) {
            column++;
            const cp = ch.codePointAt(0);
            const invisibleName = invisibleCharName(cp);
            if (invisibleName) {
                findings.push({
                    char: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
                    description: `Invisible character: ${invisibleName}`,
                    line: lineIndex + 1,
                    column,
                });
                continue;
            }

            // 2. Non-letter non-ASCII characters (punctuation/symbols) not on the
            //    whitelist are always suspicious, regardless of surrounding script.
            if (cp <= 0x7F) continue; // plain ASCII
            if (WHITELIST.has(ch)) continue;
            if (/\p{Letter}/u.test(ch)) continue; // letters are handled per-word below

            findings.push({
                char: ch,
                description: classifyChar(ch),
                line: lineIndex + 1,
                column,
            });
        }

        // 3. Tokenize into words to evaluate letters in context.
        const words = [...line.matchAll(WORD_RE)].map((m) => ({
            text: m[0],
            start: m.indices[0][0], // UTF-16 offset
            script: wordScript(m[0]),
        }));

        words.forEach((word, i) => {
            if (word.script === 'mixed') {
                // A word mixing scripts (e.g. "с" + "haracter") is always suspicious:
                // flag every non-ASCII letter in it.
                let offset = word.start;
                for (const ch of word.text) {
                    if (ch.codePointAt(0) > 0x7F) {
                        findings.push({
                            char: ch,
                            description: classifyChar(ch),
                            line: lineIndex + 1,
                            column: offset + 1,
                        });
                    }
                    offset += ch.length;
                }
                return;
            }

            if (word.script === 'neutral') return;

            // A single-letter word is judged by its neighbors: "what а mess" is
            // suspicious because а's neighbors are ASCII, but a lone letter inside
            // an all-Cyrillic sentence is not, because its neighbors match it.
            if ([...word.text].length === 1) {
                const prevScript = i > 0 ? words[i - 1].script : null;
                const nextScript = i < words.length - 1 ? words[i + 1].script : null;
                const context = [prevScript, nextScript].filter(
                    (s) => s && s !== 'mixed' && s !== 'neutral'
                );

                if (context.length === 0) return; // no context to judge against
                if (context.includes(word.script)) return; // matches surrounding language

                findings.push({
                    char: word.text,
                    description: `${classifyChar(word.text)} isolated among different-script text`,
                    line: lineIndex + 1,
                    column: word.start + 1,
                });
            }
        });
    });

    // Sort by column within each line so output reads left-to-right.
    findings.sort((a, b) => a.line - b.line || a.column - b.column);
    return findings;
}

async function scanFiles(filePaths) {
    console.log(`Scanning ${filePaths.length} file(s) for watermark characters...\n`);

    let totalFindings = 0;
    let filesWithFindings = 0;

    for (const filePath of filePaths) {
        let content;
        try {
            content = await fs.readFile(filePath, 'utf8');
        } catch (e) {
            console.error(`[ERROR] Could not read ${filePath}: ${e.message}`);
            continue;
        }

        const findings = findWatermarks(content);
        if (findings.length === 0) continue;

        filesWithFindings++;
        totalFindings += findings.length;

        console.warn(`${filePath}`);
        for (const f of findings) {
            console.warn(`  line ${f.line}, col ${f.column}: '${f.char}' - ${f.description}`);
        }
        console.warn('');
    }

    if (totalFindings === 0) {
        console.log('No watermark characters found.');
    } else {
        console.log(`Found ${totalFindings} watermark character(s) across ${filesWithFindings} file(s).`);
    }

    return totalFindings;
}

async function main() {
    const filePaths = [...new Set(process.argv.slice(2))];

    if (filePaths.length === 0) {
        console.log('Usage: node scripts/scan_watermarks.js <file1.md> <file2.md> ...');
        console.log('Example: find . -name "*.md" -print0 | xargs -0 node scripts/scan_watermarks.js');
        process.exitCode = 1;
        return;
    }

    const totalFindings = await scanFiles(filePaths);
    process.exitCode = totalFindings > 0 ? 2 : 0;
}

main().catch((err) => {
    console.error('Script execution failed:', err);
    process.exitCode = 1;
});
