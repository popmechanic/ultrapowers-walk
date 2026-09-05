import { expect, test } from 'bun:test'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { capitalize } from '../src/capitalize'

const repoRoot = resolve(import.meta.dir, '..')
const srcDir = join(repoRoot, 'src')
const read = (relative: string): string => readFileSync(join(repoRoot, relative), 'utf8')

// Leg (a) [M1]: `capitalize('ada')` is `'Ada'` — the first character
// upper-cased, the rest unchanged.
test('leg (a) [M1]: capitalize("ada") is "Ada"', () => {
  expect(capitalize('ada')).toBe('Ada')
})

// Leg (a) [M1], stated negatively: a result that upper-cases the whole word, or
// returns the input, fails this leg.
test('leg (a) [M1]: upper-casing the whole word, or returning the input, fails', () => {
  const out = capitalize('ada')
  expect(out).not.toBe('ADA')
  expect(out).not.toBe('ada')
  expect(capitalize('lovelace')).toBe('Lovelace')
})

// Leg (b) [M2]: the rest is left alone, not lower-cased — `capitalize('aDA')`
// is `'ADA'`.
test('leg (b) [M2]: capitalize("aDA") is "ADA"', () => {
  expect(capitalize('aDA')).toBe('ADA')
})

// Leg (b) [M2], stated negatively: a result that lower-cases the rest fails
// this leg.
test('leg (b) [M2]: lower-casing the rest fails', () => {
  const out = capitalize('aDA')
  expect(out).not.toBe('Ada')
  expect(out).not.toBe('ada')
  expect(capitalize('hTML tag')).toBe('HTML tag')
})

// Leg (b) [M2]: leading whitespace is kept — a leading space is the first
// character and stays a space, so `capitalize('  ada')` is `'  ada'`.
test('leg (b) [M2]: capitalize("  ada") is "  ada"', () => {
  expect(capitalize('  ada')).toBe('  ada')
})

// Leg (b) [M2], stated negatively: a result that trims fails this leg — a
// trimming implementation would return `'Ada'` here, and would drop the
// trailing space too.
test('leg (b) [M2]: trimming fails', () => {
  const out = capitalize('  ada')
  expect(out).not.toBe('Ada')
  expect(out).not.toBe('ada')
  expect(out.length).toBe(5)
  expect(capitalize('  ada  ')).toBe('  ada  ')
  expect(capitalize('\tada')).toBe('\tada')
})

// Leg (c) [M3]: `capitalize('')` is `''`.
test('leg (c) [M3]: capitalize("") is ""', () => {
  expect(capitalize('')).toBe('')
})

// Leg (c) [M3]: `capitalize('A')` is `'A'` — an already-upper single character
// is unchanged.
test('leg (c) [M3]: capitalize("A") is "A"', () => {
  expect(capitalize('A')).toBe('A')
  expect(capitalize('a')).toBe('A')
})

// Produces: `capitalize(text: string) -> string` — a string on every input
// above, never undefined.
test('[Produces] capitalize returns a string', () => {
  expect(typeof capitalize('ada')).toBe('string')
  expect(typeof capitalize('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `capitalize` and whose
// second cell names `src/capitalize.ts`, in the same three-column shape as the
// rows already in the table.
test('README leg [M4]: README.md has a `capitalize` | `src/capitalize.ts` table row', () => {
  const readme = read('README.md')
  expect(/^\| .capitalize. \| .src\/capitalize\.ts. \|/m.test(readme)).toBe(true)

  const rows = readme
    .split('\n')
    .filter((line) => /^\| .capitalize. \| .src\/capitalize\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const cells = (rows[0] ?? '').split('|').slice(1, -1)
  expect(cells.length).toBe(3)
  expect(cells[0]?.trim()).toBe('`capitalize`')
  expect(cells[1]?.trim()).toBe('`src/capitalize.ts`')
  expect((cells[2] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the header keeps its three-column shape
// and the ten rows already in the table at BASE are untouched.
test('README leg [M4]: the header and the ten existing rows are untouched', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| --- | --- | --- |')).toBe(true)

  const existingRows = [
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
  ]
  for (const row of existingRows) {
    expect(readme.includes(row)).toBe(true)
  }
})

// Module leg [M5]: this exam imports `capitalize` from `../src/capitalize`, and
// that file exports it at top level.
test('module leg [M5]: the exam imports from ../src/capitalize and that file exports capitalize', () => {
  const self = read('tests/capitalize.test.ts')
  expect(/from '\.\.\/src\/capitalize'/.test(self)).toBe(true)

  const module = read('src/capitalize.ts')
  expect(/^export (const|function) capitalize\b/m.test(module)).toBe(true)
  expect(typeof capitalize).toBe('function')
})

// Module leg [M5]: no other module of `src/` defines a `capitalize` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5]: no other file under src/ defines capitalize, and there is no barrel', () => {
  const others = readdirSync(srcDir).filter(
    (name) => name.endsWith('.ts') && name !== 'capitalize.ts',
  )
  const definers = others.filter((name) =>
    /(const|function) capitalize\b/.test(readFileSync(join(srcDir, name), 'utf8')),
  )
  expect(definers).toEqual([])
  expect(others.includes('index.ts')).toBe(false)
})
