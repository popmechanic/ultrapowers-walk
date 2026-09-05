import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { countVowels } from '../src/vowels'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: a vowel is one of `a`, `e`, `i`, `o`, `u`. `'banana'` → `3`,
// `'rhythm'` → `0`.
test('leg (a) [M1] banana counts 3 and rhythm counts 0', () => {
  expect(countVowels('banana')).toBe(3)
  expect(countVowels('rhythm')).toBe(0)
})

// Leg (a) [M1], stated negatively: `y` is not a vowel, so `'rhythm'` must not
// count its two `y`s; and a count of consonants would make `'banana'` 3 as well
// but `'rhythm'` 6 and `'aeiou'` 0.
test('leg (a) [M1] y is not a vowel and consonants are not what is counted', () => {
  expect(countVowels('rhythm')).not.toBe(1)
  expect(countVowels('rhythm')).not.toBe(2)
  expect(countVowels('rhythm')).not.toBe(6)
  expect(countVowels('y')).toBe(0)
  expect(countVowels('aeiou')).toBe(5)
})

// Leg (b) [M2]: case is ignored — `'AEIOU'` → `5`.
test('leg (b) [M2] an all-upper-case AEIOU counts 5', () => {
  expect(countVowels('AEIOU')).toBe(5)
})

// Leg (b) [M2]: mixed case — `'Queue'` → `4` (`u`, `e`, `u`, `e`).
test('leg (b) [M2] mixed-case Queue counts 4', () => {
  expect(countVowels('Queue')).toBe(4)
})

// Leg (b) [M2], stated negatively: a result that counts lower-case only would
// make `'AEIOU'` 0 and `'Queue'` 4 by luck, so pin an upper-case vowel that a
// lower-case-only count would drop.
test('leg (b) [M2] counting lower-case only fails', () => {
  expect(countVowels('AEIOU')).not.toBe(0)
  expect(countVowels('BANANA')).toBe(3)
  expect(countVowels('QuEuE')).toBe(4)
})

// Leg (c) [M3]: the empty string counts 0.
test('leg (c) [M3] the empty string counts 0', () => {
  expect(countVowels('')).toBe(0)
})

// Leg (c) [M3]: a lone consonant counts 0.
test('leg (c) [M3] a lone consonant counts 0', () => {
  expect(countVowels('b')).toBe(0)
})

// Produces: `countVowels(text: string) -> number` — a number, never a string.
test('[Produces] countVowels returns a number', () => {
  expect(typeof countVowels('banana')).toBe('number')
  expect(typeof countVowels('')).toBe('number')
})

// README leg [M4]: a table row whose first cell names `countVowels` and whose
// second cell names `src/vowels.ts`, in the same three-column shape as the rows
// already there.
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
// untouched, and the header keeps its three-column `Function | Module | Does`
// shape.
test('README leg [M4] the existing ten table rows and header are untouched', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| --- | --- | --- |')).toBe(true)
  const existing = [
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
