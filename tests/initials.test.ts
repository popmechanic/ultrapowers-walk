import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { initials } from '../src/initials'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: `initials('Ada Lovelace')` equals `'AL'` — the first character
// of each whitespace-separated word, upper-cased, joined with nothing.
test("leg (a) [M1] initials('Ada Lovelace') is 'AL'", () => {
  expect(initials('Ada Lovelace')).toBe('AL')
})

// Leg (a) [M1], stated negatively: a result that keeps whole words, or
// lower-cases (`'al'`), or joins with spaces, fails.
test('leg (a) [M1] whole words, lower case, and space-joining all fail', () => {
  const result = initials('Ada Lovelace')
  expect(result).not.toBe('Ada Lovelace')
  expect(result).not.toBe('al')
  expect(result).not.toBe('A L')
})

// Leg (b) [M2]: surrounding and repeated whitespace is ignored and case is
// normalised — `initials('  grace   brewster  hopper ')` equals `'GBH'`.
test("leg (b) [M2] initials('  grace   brewster  hopper ') is 'GBH'", () => {
  expect(initials('  grace   brewster  hopper ')).toBe('GBH')
})

// Leg (b) [M2], stated negatively: a result that counts an empty word from the
// leading or doubled spaces, or keeps lower case, fails.
test('leg (b) [M2] no empty word from leading/doubled spaces, and no lower case', () => {
  const result = initials('  grace   brewster  hopper ')
  expect(result).not.toBe('gbh')
  expect(result.length).toBe(3)
  expect(result.includes(' ')).toBe(false)
})

// Leg (c) [M3]: `initials('')` equals `''` — the empty string has no words, so
// the empty-string artefact of splitting `''` must not yield a character.
test("leg (c) [M3] initials('') is ''", () => {
  expect(initials('')).toBe('')
})

// Leg (c) [M3]: `initials('solo')` equals `'S'`.
test("leg (c) [M3] initials('solo') is 'S'", () => {
  expect(initials('solo')).toBe('S')
})

// Produces: `initials(text: string) -> string` — a string, always, including
// for the empty input.
test('[Produces] initials returns a string', () => {
  expect(typeof initials('Ada Lovelace')).toBe('string')
  expect(typeof initials('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `initials` and whose
// second cell names `src/initials.ts`, in the same three-column shape as the
// rows already there.
test('README leg [M4] the README table has an initials row naming src/initials.ts', () => {
  const rows = read('README.md')
    .split('\n')
    .filter((line) => /^\| .initials. \| .src\/initials\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const row = rows[0] ?? ''
  const cells = row.split('|')
  // `| a | b | c |` splits into 5 parts: an empty edge, three cells, an empty edge.
  expect(cells.length).toBe(5)
  expect(cells[0]?.trim()).toBe('')
  expect(cells[4]?.trim()).toBe('')
  expect(cells[1]?.trim()).toBe('`initials`')
  expect(cells[2]?.trim()).toBe('`src/initials.ts`')
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the seven rows already in the table are
// untouched, and the header keeps its three-column `Function | Module | Does`
// shape.
test('README leg [M4] the existing table rows and header are untouched', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| --- | --- | --- |')).toBe(true)
  expect(readme.includes('| `slugify` | `src/slug.ts` | title → URL slug |')).toBe(true)
  expect(readme.includes('| `camelCase` | `src/camel.ts` | kebab-case → camelCase |')).toBe(true)
  expect(
    readme.includes('| `titleCase` | `src/title.ts` | first letter of every word up, rest down |'),
  ).toBe(true)
  expect(
    readme.includes('| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |'),
  ).toBe(true)
  expect(
    readme.includes(
      '| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |',
    ),
  ).toBe(true)
  expect(
    readme.includes('| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |'),
  ).toBe(true)
  expect(
    readme.includes('| `wordCount` | `src/count.ts` | count whitespace-separated words |'),
  ).toBe(true)
})

// Module leg [M5]: `src/initials.ts` exports `initials` at top level.
test('module leg [M5] src/initials.ts exports initials at top level', () => {
  expect(/^export (const|function) initials\b/m.test(read('src/initials.ts'))).toBe(true)
})

// Module leg [M5]: this exam's own import is from `../src/initials`.
test('module leg [M5] the exam imports initials from ../src/initials', () => {
  expect(/from '\.\.\/src\/initials'/.test(read('tests/initials.test.ts'))).toBe(true)
})

// Module leg [M5]: no other module of `src/` defines an `initials` — a helper
// defined in an existing module, or in a barrel, and re-exported or re-labelled
// in the README fails this leg.
test('module leg [M5] no other module under src/ defines initials', () => {
  const others = readdirSync(join(root, 'src'))
    .filter((name) => name.endsWith('.ts') && name !== 'initials.ts')
    .filter((name) => /(const|function) initials\b/.test(read(join('src', name))))
  expect(others).toEqual([])
})

// Global constraint: there is no barrel file at `src/index.ts`.
test('[global constraint] src/index.ts is not created', () => {
  expect(readdirSync(join(root, 'src')).includes('index.ts')).toBe(false)
})
