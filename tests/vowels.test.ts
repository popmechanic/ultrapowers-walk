import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { countVowels } from '../src/vowels'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: the vowels are `a`, `e`, `i`, `o`, `u` and nothing else,
// counted with multiplicity — `'Ada Lovelace'` → 6, `'rhythm'` → 0.
test("leg (a) [M1] countVowels('Ada Lovelace') is 6 and countVowels('rhythm') is 0", () => {
  expect(countVowels('Ada Lovelace')).toBe(6)
  expect(countVowels('rhythm')).toBe(0)
})

// Leg (a) [M1], stated negatively: 'Ada Lovelace' has 5 consonants and 3
// distinct vowels (a, o, e) — a result that counts consonants, or counts each
// distinct vowel once, fails this leg.
test('leg (a) [M1] the count is neither the consonants nor the distinct vowels', () => {
  expect(countVowels('Ada Lovelace')).not.toBe(5)
  expect(countVowels('Ada Lovelace')).not.toBe(3)
})

// Leg (a) [M1]: multiplicity again, on a word that repeats one vowel — `'ooo'`
// is 3, not 1.
test('leg (a) [M1] repeated vowels are counted with multiplicity', () => {
  expect(countVowels('ooo')).toBe(3)
})

// Leg (b) [M2]: case is ignored — the upper-cased and lower-cased runs of all
// five vowels both count 5.
test("leg (b) [M2] countVowels('AEIOU') is 5 and countVowels('aeiou') is 5", () => {
  expect(countVowels('AEIOU')).toBe(5)
  expect(countVowels('aeiou')).toBe(5)
})

// Leg (b) [M2], stated negatively: a case-sensitive count would drop the
// upper-cased run to 0.
test('leg (b) [M2] the count is not case-sensitive', () => {
  expect(countVowels('AEIOU')).not.toBe(0)
})

// Leg (b) [M2]: `y` is never a vowel here — in either case.
test("leg (b) [M2] countVowels('y') is 0 and y is never admitted", () => {
  expect(countVowels('y')).toBe(0)
  expect(countVowels('Y')).toBe(0)
  expect(countVowels('rhythmy')).toBe(0)
})

// Leg (c) [M3]: the empty string has no vowels.
test("leg (c) [M3] countVowels('') is 0", () => {
  expect(countVowels('')).toBe(0)
})

// Leg (c) [M3]: digits, spaces and punctuation are not vowels.
test("leg (c) [M3] countVowels('123 !?') is 0", () => {
  expect(countVowels('123 !?')).toBe(0)
})

// Produces: `countVowels(text: string) -> number` — a number, never a string,
// and never null/undefined when there is no match.
test('[Produces] countVowels returns a number', () => {
  expect(typeof countVowels('Ada Lovelace')).toBe('number')
  expect(typeof countVowels('rhythm')).toBe('number')
  expect(typeof countVowels('')).toBe('number')
})

// README leg [M4]: a table row whose first cell names `countVowels` and whose
// second cell names `src/vowels.ts` — the regex is the Proof's own Run line.
test('README leg [M4] the README table has a countVowels row naming src/vowels.ts', () => {
  const rows = read('README.md')
    .split('\n')
    .filter((line) => /^\| .countVowels. \| .src\/vowels\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const row = rows[0] ?? ''
  const cells = row.split('|')
  // `| a | b | c |` splits into 5 parts: an empty edge, three cells, an empty edge.
  expect(cells.length).toBe(5)
  expect(cells[0]?.trim()).toBe('')
  expect(cells[4]?.trim()).toBe('')
  expect((cells[1] ?? '').includes('countVowels')).toBe(true)
  expect((cells[2] ?? '').includes('src/vowels.ts')).toBe(true)
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the eleven rows already in the table are
// untouched, and the header keeps its three-column shape.
test('README leg [M4] the existing table rows and header are untouched', () => {
  const readme = read('README.md')
  const existing = [
    '| Function | Module | Does |',
    '| --- | --- | --- |',
    '| `slugify` | `src/slug.ts` | title → URL slug |',
    '| `camelCase` | `src/camel.ts` | kebab-case → camelCase |',
    '| `titleCase` | `src/title.ts` | first letter of every word up, rest down |',
    '| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |',
    '| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |',
    '| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |',
    '| `wordCount` | `src/count.ts` | count whitespace-separated words |',
    '| `snakeCase` | `src/snake.ts` | mixed-case, kebab or spaced text → snake_case |',
    '| `initials` | `src/initials.ts` | first letter of every word, upper-cased and joined |',
    '| `isAnagram` | `src/anagram.ts` | same letters the same number of times, ignoring case and punctuation |',
    '| `kebabCase` | `src/kebab.ts` | mixed-case, snake or spaced text → kebab-case |',
  ]
  const missing = existing.filter((line) => !readme.includes(line))
  expect(missing).toEqual([])
})

// Module leg [M5]: `src/vowels.ts` exports `countVowels` at top level.
test('module leg [M5] src/vowels.ts exports countVowels at top level', () => {
  expect(/^export (const|function) countVowels\b/m.test(read('src/vowels.ts'))).toBe(true)
})

// Module leg [M5]: this exam's own import is from `../src/vowels`.
test('module leg [M5] the exam imports countVowels from ../src/vowels', () => {
  expect(/from '\.\.\/src\/vowels'/.test(read('tests/vowels.test.ts'))).toBe(true)
})

// Module leg [M5]: no other module of `src/` defines a `countVowels` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5] no other module under src/ defines countVowels', () => {
  const others = readdirSync(join(root, 'src'))
    .filter((name) => name.endsWith('.ts') && name !== 'vowels.ts')
    .filter((name) => /(const|function) countVowels\b/.test(read(join('src', name))))
  expect(others).toEqual([])
})

// Global constraint: there is no barrel file at `src/index.ts`.
test('[global constraint] src/index.ts is not created', () => {
  expect(readdirSync(join(root, 'src')).includes('index.ts')).toBe(false)
})
