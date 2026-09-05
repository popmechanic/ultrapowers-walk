import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// [M5] The exam imports `snakeCase` from `../src/snake` — this line is the leg.
import { snakeCase } from '../src/snake'

const repoRoot = join(import.meta.dir, '..')
const readmeText = readFileSync(join(repoRoot, 'README.md'), 'utf8')

// Leg (a) [M1]: an upper-case letter starts a new word, and the result is all
// lower-case. Keeping an upper-case letter, or dropping the boundary
// ('helloworld'), fails.
test('leg (a) [M1]: an upper-case letter starts a new word, lower-cased', () => {
  expect(snakeCase('helloWorld')).toBe('hello_world')
  expect(snakeCase('HelloWorldAgain')).toBe('hello_world_again')
})

// Leg (b) [M2]: a hyphen or a run of whitespace is a word boundary too, and an
// already-snake input is unchanged. A doubled `__` or a kept hyphen fails.
test('leg (b) [M2]: hyphens and whitespace runs are word boundaries', () => {
  expect(snakeCase('kebab-case-in')).toBe('kebab_case_in')
  expect(snakeCase('two words')).toBe('two_words')
  expect(snakeCase('already_snake')).toBe('already_snake')
})

// Leg (c) [M3]: the degenerate inputs.
test('leg (c) [M3]: the empty string stays empty and a lone word is unchanged', () => {
  expect(snakeCase('')).toBe('')
  expect(snakeCase('solo')).toBe('solo')
})

// Produces: `snakeCase(text: string) -> string`.
test('legs (a)-(c) [M1-M3]: the return value is a string', () => {
  expect(typeof snakeCase('helloWorld')).toBe('string')
  expect(typeof snakeCase('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `snakeCase` and whose
// second cell names `src/snake.ts`, in the same shape as the existing rows.
test('README leg [M4]: the table lists snakeCase against src/snake.ts', () => {
  expect(readmeText).toMatch(/^\| .snakeCase. \| .src\/snake\.ts. \|/m)
})

test('README leg [M4]: the new row keeps the three-column shape', () => {
  const row = readmeText
    .split('\n')
    .find((line) => /^\| .snakeCase. \| .src\/snake\.ts. \|/.test(line))
  expect(row).toBeDefined()
  const cells = (row ?? '')
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
  expect(cells.length).toBe(3)
  expect(cells[0]).toBe('`snakeCase`')
  expect(cells[1]).toBe('`src/snake.ts`')
  expect(cells[2]).not.toBe('')
})

test('README leg [M4]: the seven rows already there are untouched', () => {
  const existingRows = [
    '| `slugify` | `src/slug.ts` | title → URL slug |',
    '| `camelCase` | `src/camel.ts` | kebab-case → camelCase |',
    '| `titleCase` | `src/title.ts` | first letter of every word up, rest down |',
    '| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |',
    '| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |',
    '| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |',
    '| `wordCount` | `src/count.ts` | count whitespace-separated words |',
  ]
  const lines = readmeText.split('\n')
  for (const row of existingRows) {
    expect(lines).toContain(row)
  }
  expect(readmeText).toContain('| Function | Module | Does |')
})

// Module leg [M5]: `src/snake.ts` exports `snakeCase` at top level, the exam
// imports it from `../src/snake`, and no other module of `src/` defines it.
test('module leg [M5]: src/snake.ts exports snakeCase at top level', () => {
  const source = readFileSync(join(repoRoot, 'src', 'snake.ts'), 'utf8')
  expect(source).toMatch(/^export (const|function) snakeCase\b/m)
})

test('module leg [M5]: the exam imports snakeCase from ../src/snake', () => {
  const ownSource = readFileSync(join(repoRoot, 'tests', 'snake.test.ts'), 'utf8')
  expect(ownSource).toMatch(/from '\.\.\/src\/snake'/)
})

test('module leg [M5]: no other module of src/ defines snakeCase', () => {
  const srcDir = join(repoRoot, 'src')
  const offenders = readdirSync(srcDir)
    .filter((name) => name.endsWith('.ts') && name !== 'snake.ts')
    .filter((name) =>
      /(const|function) snakeCase\b/.test(readFileSync(join(srcDir, name), 'utf8')),
    )
  expect(offenders).toEqual([])
})
