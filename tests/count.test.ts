import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { wordCount } from '../src/count'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: a word is a maximal run of non-whitespace characters, and any
// whitespace — spaces, tabs, newlines, runs of them — separates.
test('leg (a) [M1] runs of whitespace separate words and do not count as words', () => {
  expect(wordCount('a  b c')).toBe(3)
  expect(wordCount('one\ttwo\nthree')).toBe(3)
})

// Leg (a) [M1], stated negatively: the double space must not become an empty
// word (4), and the tab/newline case must not collapse to a single word (1).
test('leg (a) [M1] the double space is not an empty word and tabs/newlines are not kept inside a word', () => {
  expect(wordCount('a  b c')).not.toBe(4)
  expect(wordCount('one\ttwo\nthree')).not.toBe(1)
})

// Leg (b) [M2]: the empty string has no words — a 1 from splitting '' fails.
test('leg (b) [M2] the empty string counts 0', () => {
  expect(wordCount('')).toBe(0)
})

// Leg (c) [M2]: whitespace only is still no words.
test('leg (c) [M2] a whitespace-only string counts 0', () => {
  expect(wordCount('   ')).toBe(0)
})

// Leg (d) [M3]: a single bare word counts 1.
test('leg (d) [M3] a lone word counts 1', () => {
  expect(wordCount('solo')).toBe(1)
})

// Produces: `wordCount(text: string) -> number` — a number, never a string.
test('[Produces] wordCount returns a number', () => {
  expect(typeof wordCount('solo')).toBe('number')
  expect(typeof wordCount('')).toBe('number')
})

// README leg [M4]: a table row whose first cell names `wordCount` and whose
// second cell names `src/count.ts`, in the same three-column shape as the rows
// already there.
test('README leg [M4] the README table has a wordCount row naming src/count.ts', () => {
  const rows = read('README.md')
    .split('\n')
    .filter((line) => /^\| .wordCount. \| .src\/count\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const row = rows[0] ?? ''
  const cells = row.split('|')
  // `| a | b | c |` splits into 5 parts: an empty edge, three cells, an empty edge.
  expect(cells.length).toBe(5)
  expect(cells[0]?.trim()).toBe('')
  expect(cells[4]?.trim()).toBe('')
  expect(cells[1]?.trim()).toBe('`wordCount`')
  expect(cells[2]?.trim()).toBe('`src/count.ts`')
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the four rows already in the table are
// untouched, and the header keeps its three-column shape.
test('README leg [M4] the existing table rows and header are untouched', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| `slugify` | `src/slug.ts` | title → URL slug |')).toBe(true)
  expect(readme.includes('| `camelCase` | `src/camel.ts` | kebab-case → camelCase |')).toBe(true)
  expect(
    readme.includes('| `titleCase` | `src/title.ts` | first letter of every word up, rest down |'),
  ).toBe(true)
  expect(
    readme.includes('| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |'),
  ).toBe(true)
})

// Module leg [M5]: this test imports `wordCount` from `../src/count`, and that
// file exports it at top level.
test('module leg [M5] src/count.ts exports wordCount at top level', () => {
  expect(/^export (const|function) wordCount\b/m.test(read('src/count.ts'))).toBe(true)
})

// Module leg [M5]: this exam's own import is from `../src/count`.
test('module leg [M5] the exam imports wordCount from ../src/count', () => {
  expect(/from '\.\.\/src\/count'/.test(read('tests/count.test.ts'))).toBe(true)
})

// Module leg [M5]: no other module of `src/` defines a `wordCount` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5] no other module under src/ defines wordCount', () => {
  const others = readdirSync(join(root, 'src'))
    .filter((name) => name.endsWith('.ts') && name !== 'count.ts')
    .filter((name) => /(const|function) wordCount\b/.test(read(join('src', name))))
  expect(others).toEqual([])
})

// Global constraint: there is no barrel file at `src/index.ts`.
test('[global constraint] src/index.ts is not created', () => {
  expect(readdirSync(join(root, 'src')).includes('index.ts')).toBe(false)
})
