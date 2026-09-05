import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// [M5] This file imports `capitalize` from `../src/capitalize` — this line is the leg.
import { capitalize } from '../src/capitalize'

const repoRoot = join(import.meta.dir, '..')
const readmeText = readFileSync(join(repoRoot, 'README.md'), 'utf8')

// Leg (a) [M1]: the first character is upper-cased, the rest is unchanged. A
// result that upper-cases the whole word, or returns the input, fails.
test('leg (a) [M1]: the first character is upper-cased', () => {
  expect(capitalize('ada')).toBe('Ada')
})

// Leg (b) [M2]: the rest is left alone, not lower-cased, and leading whitespace
// is kept. A result that lower-cases the rest, or trims, fails.
test('leg (b) [M2]: the rest is left alone and leading whitespace is kept', () => {
  expect(capitalize('aDA')).toBe('ADA')
  expect(capitalize('  ada')).toBe('  ada')
})

// Leg (c) [M3]: the degenerate inputs.
test('leg (c) [M3]: the empty string stays empty and a lone capital is unchanged', () => {
  expect(capitalize('')).toBe('')
  expect(capitalize('A')).toBe('A')
})

// Produces: `capitalize(text: string) -> string`.
test('legs (a)-(c) [M1-M3]: the return value is a string', () => {
  expect(typeof capitalize('ada')).toBe('string')
  expect(typeof capitalize('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `capitalize` and whose
// second cell names `src/capitalize.ts`, in the same shape as the existing rows.
test('README leg [M4]: the table lists capitalize against src/capitalize.ts', () => {
  expect(readmeText).toMatch(/^\| .capitalize. \| .src\/capitalize\.ts. \|/m)
})

test('README leg [M4]: the new row keeps the three-column shape', () => {
  const row = readmeText
    .split('\n')
    .find((line) => /^\| .capitalize. \| .src\/capitalize\.ts. \|/.test(line))
  expect(row).toBeDefined()
  const cells = (row ?? '')
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
  expect(cells.length).toBe(3)
  expect(cells[0]).toBe('`capitalize`')
  expect(cells[1]).toBe('`src/capitalize.ts`')
  expect(cells[2]).not.toBe('')
})

test('README leg [M4]: the ten rows already there are untouched', () => {
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
  const lines = readmeText.split('\n')
  for (const row of existingRows) {
    expect(lines).toContain(row)
  }
  expect(readmeText).toContain('| Function | Module | Does |')
})

// Module leg [M5]: `src/capitalize.ts` exports `capitalize` at top level, the
// exam imports it from `../src/capitalize`, and no other module of `src/`
// defines it.
test('module leg [M5]: src/capitalize.ts exports capitalize at top level', () => {
  const source = readFileSync(join(repoRoot, 'src', 'capitalize.ts'), 'utf8')
  expect(source).toMatch(/^export (const|function) capitalize\b/m)
})

test('module leg [M5]: no other module of src/ defines capitalize', () => {
  const srcDir = join(repoRoot, 'src')
  const offenders = readdirSync(srcDir)
    .filter((name) => name.endsWith('.ts') && name !== 'capitalize.ts')
    .filter((name) =>
      /(const|function) capitalize\b/.test(readFileSync(join(srcDir, name), 'utf8')),
    )
  expect(offenders).toEqual([])
})
