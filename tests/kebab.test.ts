import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// [M5] The exam imports `kebabCase` from `../src/kebab` — this line is the leg.
import { kebabCase } from '../src/kebab'

const repoRoot = join(import.meta.dir, '..')
const readmeText = readFileSync(join(repoRoot, 'README.md'), 'utf8')

// Leg (a) [M1]: an upper-case letter starts a new word, and the result is all
// lower-case. A result that keeps an upper-case letter, or drops the boundary
// ('helloworld'), fails.
test('leg (a) [M1]: an upper-case letter starts a new word, lower-cased', () => {
  expect(kebabCase('helloWorld')).toBe('hello-world')
  expect(kebabCase('HelloWorldAgain')).toBe('hello-world-again')
})

// Leg (b) [M2]: an underscore or a run of whitespace is a word boundary too,
// and an already-kebab input is unchanged. A doubled `--` or a kept underscore
// fails.
test('leg (b) [M2]: underscores and whitespace runs are word boundaries', () => {
  expect(kebabCase('snake_case_in')).toBe('snake-case-in')
  expect(kebabCase('two  words')).toBe('two-words')
  expect(kebabCase('already-kebab')).toBe('already-kebab')
})

// Leg (c) [M3]: the degenerate inputs.
test('leg (c) [M3]: the empty string stays empty and a lone word is unchanged', () => {
  expect(kebabCase('')).toBe('')
  expect(kebabCase('solo')).toBe('solo')
})

// Produces: `kebabCase(text: string) -> string`.
test('legs (a)-(c) [M1-M3]: the return value is a string', () => {
  expect(typeof kebabCase('helloWorld')).toBe('string')
  expect(typeof kebabCase('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `kebabCase` and whose
// second cell names `src/kebab.ts`, in the same shape as the existing rows.
test('README leg [M4]: the table lists kebabCase against src/kebab.ts', () => {
  expect(readmeText).toMatch(/^\| .kebabCase. \| .src\/kebab\.ts. \|/m)
})

test('README leg [M4]: the new row keeps the three-column shape', () => {
  const row = readmeText
    .split('\n')
    .find((line) => /^\| .kebabCase. \| .src\/kebab\.ts. \|/.test(line))
  expect(row).toBeDefined()
  const cells = (row ?? '')
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
  expect(cells.length).toBe(3)
  expect(cells[0]).toBe('`kebabCase`')
  expect(cells[1]).toBe('`src/kebab.ts`')
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

test('README leg [M4]: the new row sits under the last existing row', () => {
  const lines = readmeText.split('\n')
  const lastExisting = lines.findIndex((line) =>
    /^\| .isAnagram. \| .src\/anagram\.ts. \|/.test(line),
  )
  const newRow = lines.findIndex((line) =>
    /^\| .kebabCase. \| .src\/kebab\.ts. \|/.test(line),
  )
  expect(lastExisting).toBeGreaterThan(-1)
  expect(newRow).toBeGreaterThan(lastExisting)
})

// Module leg [M5]: `src/kebab.ts` exports `kebabCase` at top level, the exam
// imports it from `../src/kebab`, and no other module of `src/` defines it.
test('module leg [M5]: src/kebab.ts exports kebabCase at top level', () => {
  const source = readFileSync(join(repoRoot, 'src', 'kebab.ts'), 'utf8')
  expect(source).toMatch(/^export (const|function) kebabCase\b/m)
})

test('module leg [M5]: the exam imports kebabCase from ../src/kebab', () => {
  const ownSource = readFileSync(join(repoRoot, 'tests', 'kebab.test.ts'), 'utf8')
  expect(ownSource).toMatch(/from '\.\.\/src\/kebab'/)
})

test('module leg [M5]: no other module of src/ defines kebabCase', () => {
  const srcDir = join(repoRoot, 'src')
  const offenders = readdirSync(srcDir)
    .filter((name) => name.endsWith('.ts') && name !== 'kebab.ts')
    .filter((name) =>
      /(const|function) kebabCase\b/.test(readFileSync(join(srcDir, name), 'utf8')),
    )
  expect(offenders).toEqual([])
})
