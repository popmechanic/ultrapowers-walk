import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { countVowels } from '../src/vowels'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: a vowel is one of `a`, `e`, `i`, `o`, `u`, and `y` is not one.
test('leg (a) [M1] counts aeiou and does not count y', () => {
  expect(countVowels('banana')).toBe(3)
  expect(countVowels('rhythm')).toBe(0)
})

// Leg (b) [M2]: case is ignored.
test('leg (b) [M2] upper-case vowels count too', () => {
  expect(countVowels('AEIOU')).toBe(5)
  expect(countVowels('Queue')).toBe(4)
})

// Leg (c) [M3]: empty and vowel-less single characters.
test('leg (c) [M3] the empty string and a lone consonant count 0', () => {
  expect(countVowels('')).toBe(0)
  expect(countVowels('b')).toBe(0)
})

// Produces: `countVowels(text: string) -> number` — a number, never a string.
test('[Produces] countVowels returns a number', () => {
  expect(typeof countVowels('banana')).toBe('number')
  expect(typeof countVowels('')).toBe('number')
})

// README leg [M4]: a table row whose first cell names `countVowels` and whose
// second cell names `src/vowels.ts`, in the same three-column shape.
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
  expect(cells[1]?.trim()).toBe('`countVowels`')
  expect(cells[2]?.trim()).toBe('`src/vowels.ts`')
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the ten rows already in the table are
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
  expect(readme.includes('| `isAnagram` | `src/anagram.ts` |')).toBe(true)
})

// Module leg [M5]: `src/vowels.ts` exports `countVowels` at top level.
test('module leg [M5] src/vowels.ts exports countVowels at top level', () => {
  expect(/^export (const|function) countVowels\b/m.test(read('src/vowels.ts'))).toBe(true)
})

// Module leg [M5]: no other module under `src/` defines a `countVowels`.
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
