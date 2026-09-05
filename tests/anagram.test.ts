import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isAnagram } from '../src/anagram'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

const tsFilesUnderSrc = (): string[] => {
  const out: string[] = []
  const walk = (relativeDir: string): void => {
    for (const entry of readdirSync(join(root, relativeDir), { withFileTypes: true })) {
      const relative = join(relativeDir, entry.name)
      if (entry.isDirectory()) walk(relative)
      else if (entry.name.endsWith('.ts')) out.push(relative)
    }
  }
  walk('src')
  return out
}

// Leg (a) [M1]: the two strings use exactly the same letters the same number of
// times — `('listen', 'silent')` is exactly `true`, `('listen', 'silence')` is
// exactly `false`.
test("leg (a) [M1] ('listen','silent') is exactly true and ('listen','silence') is exactly false", () => {
  expect(isAnagram('listen', 'silent')).toBe(true)
  expect(isAnagram('listen', 'silence')).toBe(false)
})

// Leg (a) [M1], stated negatively: a result that only compares lengths, or only
// compares the set of letters, fails. `('aab','abb')` is same-length and
// same-set yet not an anagram; `('listen','listen')` is the trivial true that
// keeps the false above from being satisfied by a constant `false`.
test('leg (a) [M1] length-only and set-only comparisons are rejected', () => {
  // Same length (3 and 3), same set ({a,b}) — a length-only or set-only
  // comparison would answer `true` here.
  expect(isAnagram('aab', 'abb')).toBe(false)
  // A constant `false` cannot satisfy the leg.
  expect(isAnagram('listen', 'listen')).toBe(true)
})

// Leg (b) [M2]: case and non-letters are ignored — `('Dormitory','dirty room!')`
// is exactly `true`. A result that keeps case (`D` vs `d`) or keeps the space
// and the `!` fails here.
test("leg (b) [M2] ('Dormitory','dirty room!') is exactly true — case and non-letters ignored", () => {
  expect(isAnagram('Dormitory', 'dirty room!')).toBe(true)
})

// Leg (b) [M2]: letter counts matter, not the set of letters —
// `('aab','abb')` is exactly `false`.
test("leg (b) [M2] ('aab','abb') is exactly false — letter counts matter, not the set", () => {
  expect(isAnagram('aab', 'abb')).toBe(false)
})

// Leg (b) [M2], the same clause read on each side on its own: case alone is
// ignored, and non-letters alone are ignored.
test('leg (b) [M2] case alone is ignored, and non-letters alone are ignored', () => {
  expect(isAnagram('LISTEN', 'silent')).toBe(true)
  expect(isAnagram('Listen', 'SILENT')).toBe(true)
  expect(isAnagram('li-st,en', 'si lent')).toBe(true)
  // Non-letters are dropped rather than compared: only `a`–`z` survives
  // normalisation, so the digits on either side do not decide the answer.
  expect(isAnagram('a1', 'a2')).toBe(true)
  expect(isAnagram('!!!', '')).toBe(true)
})

// Leg (c) [M3]: `('','')` is exactly `true` — the empty string is not
// special-cased to `false`.
test("leg (c) [M3] ('','') is exactly true", () => {
  expect(isAnagram('', '')).toBe(true)
})

// Leg (c) [M3]: `('a','')` is exactly `false`, in both argument orders — one
// side having a letter the other lacks is not an anagram.
test("leg (c) [M3] ('a','') is exactly false", () => {
  expect(isAnagram('a', '')).toBe(false)
  expect(isAnagram('', 'a')).toBe(false)
})

// Produces: `isAnagram(a: string, b: string) -> boolean` — a real boolean,
// never a truthy or falsy stand-in.
test('[Produces] isAnagram returns a real boolean', () => {
  const samples: Array<[string, string]> = [
    ['listen', 'silent'],
    ['listen', 'silence'],
    ['Dormitory', 'dirty room!'],
    ['aab', 'abb'],
    ['', ''],
    ['a', ''],
  ]
  for (const pair of samples) {
    expect(typeof isAnagram(pair[0], pair[1])).toBe('boolean')
  }
})

// README leg [M4]: a table row whose first cell names `isAnagram` and whose
// second cell names `src/anagram.ts`, in the same three-column shape as the rows
// already there.
test('README leg [M4] the README table has an isAnagram row naming src/anagram.ts', () => {
  const rows = read('README.md')
    .split('\n')
    .filter((line) => /^\| .isAnagram. \| .src\/anagram\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const row = rows[0] ?? ''
  const cells = row.split('|')
  // `| a | b | c |` splits into 5 parts: an empty edge, three cells, an empty edge.
  expect(cells.length).toBe(5)
  expect(cells[0]?.trim()).toBe('')
  expect(cells[4]?.trim()).toBe('')
  expect(cells[1]?.trim()).toBe('`isAnagram`')
  expect(cells[2]?.trim()).toBe('`src/anagram.ts`')
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the header keeps its three-column
// `Function | Module | Does` shape and the seven rows already in the table are
// untouched.
test('README leg [M4] the header and the seven existing rows are untouched', () => {
  const readme = read('README.md')
  expect(readme).toContain('| Function | Module | Does |')
  for (const existing of [
    '| `slugify` | `src/slug.ts` | title → URL slug |',
    '| `camelCase` | `src/camel.ts` | kebab-case → camelCase |',
    '| `titleCase` | `src/title.ts` | first letter of every word up, rest down |',
    '| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |',
    '| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |',
    '| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |',
    '| `wordCount` | `src/count.ts` | count whitespace-separated words |',
  ]) {
    expect(readme).toContain(existing)
  }
})

// Module leg [M5]: `src/anagram.ts` exports `isAnagram` at top level.
test('module leg [M5] src/anagram.ts exports isAnagram at top level', () => {
  expect(/^export (const|function) isAnagram\b/m.test(read(join('src', 'anagram.ts')))).toBe(true)
})

// Module leg [M5]: this exam's own import is from `../src/anagram`.
test('module leg [M5] the exam imports isAnagram from ../src/anagram', () => {
  expect(/from '\.\.\/src\/anagram'/.test(read(join('tests', 'anagram.test.ts')))).toBe(true)
})

// Module leg [M5]: no other module of `src/` defines an `isAnagram` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5] no other module under src/ defines isAnagram', () => {
  const others = tsFilesUnderSrc()
    .filter((relative) => relative !== join('src', 'anagram.ts'))
    .filter((relative) => /(const|function) isAnagram\b/.test(read(relative)))
  expect(others).toEqual([])
})

// Global constraint: there is no barrel file at `src/index.ts`.
test('[global constraint] src/index.ts is not created', () => {
  expect(tsFilesUnderSrc()).not.toContain(join('src', 'index.ts'))
})
