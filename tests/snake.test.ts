import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { snakeCase } from '../src/snake'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const srcDir = join(repoRoot, 'src')

const read = (path: string): string => readFileSync(path, 'utf8')

/** Every `.ts` file under `src/`, matching the reach of the driver's `grep -r src`. */
const tsFilesUnder = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return tsFilesUnder(full)
    return entry.name.endsWith('.ts') ? [full] : []
  })

// Leg (a) [M1]: an upper-case letter starts a new word, and the result is all
// lower-case. A result that keeps an upper-case letter, or drops the boundary
// (`'helloworld'`), fails.

test("leg (a) [M1]: snakeCase('helloWorld') is 'hello_world'", () => {
  expect(snakeCase('helloWorld')).toBe('hello_world')
})

test("leg (a) [M1]: snakeCase('HelloWorldAgain') is 'hello_world_again'", () => {
  expect(snakeCase('HelloWorldAgain')).toBe('hello_world_again')
})

// Leg (b) [M2]: a hyphen or a run of whitespace is a word boundary too, and an
// already-snake name comes back unchanged. A doubled `__` or a kept hyphen fails.

test("leg (b) [M2]: snakeCase('kebab-case-in') is 'kebab_case_in'", () => {
  expect(snakeCase('kebab-case-in')).toBe('kebab_case_in')
})

test("leg (b) [M2]: snakeCase('two words') is 'two_words'", () => {
  expect(snakeCase('two words')).toBe('two_words')
})

test("leg (b) [M2]: a run of whitespace is one boundary, not several", () => {
  expect(snakeCase('two   words')).toBe('two_words')
})

test("leg (b) [M2]: snakeCase('already_snake') is 'already_snake'", () => {
  expect(snakeCase('already_snake')).toBe('already_snake')
})

// Leg (c) [M3]: the degenerate inputs.

test("leg (c) [M3]: snakeCase('') is ''", () => {
  expect(snakeCase('')).toBe('')
})

test("leg (c) [M3]: snakeCase('solo') is 'solo'", () => {
  expect(snakeCase('solo')).toBe('solo')
})

// Leg (d) [M4]: `README.md` has a table row whose first cell names `snakeCase`
// and whose second cell names `src/snake.ts`, in the same shape as the existing
// rows. The regex is the driver's own:
//   grep -qE '^\| .snakeCase. \| .src/snake\.ts. \|' README.md

test('leg (d) [M4]: README.md has a table row for snakeCase / src/snake.ts', () => {
  const readme = read(join(repoRoot, 'README.md'))
  expect(readme).toMatch(/^\| .snakeCase. \| .src\/snake\.ts. \|/m)
})

test('leg (d) [M4]: that row has the same three-column shape as the existing rows', () => {
  const lines = read(join(repoRoot, 'README.md')).split('\n')
  const snakeRow = lines.find((line) => /^\| .snakeCase. \| .src\/snake\.ts. \|/.test(line))
  const slugifyRow = lines.find((line) => /^\| .slugify. \| .src\/slug\.ts. \|/.test(line))

  expect(slugifyRow).toBeDefined()
  expect(snakeRow).toBeDefined()
  expect(snakeRow === undefined ? [] : snakeRow.split('|').length).toBe(
    slugifyRow === undefined ? -1 : slugifyRow.split('|').length,
  )
})

// Leg (e) [M5]: `src/snake.ts` exports `snakeCase`, this test imports it from
// `../src/snake`, and no other module of `src/` defines it. The regexes are the
// driver's own:
//   grep -qE "from '\.\./src/snake'" tests/snake.test.ts
//   grep -qE '^export (const|function) snakeCase\b' src/snake.ts
//   ! grep -rlE '(const|function) snakeCase\b' src --exclude=snake.ts | grep -q .

test('leg (e) [M5]: src/snake.ts exports snakeCase at top level', () => {
  expect(read(join(srcDir, 'snake.ts'))).toMatch(/^export (const|function) snakeCase\b/m)
})

test("leg (e) [M5]: this test imports snakeCase from '../src/snake'", () => {
  expect(read(fileURLToPath(import.meta.url))).toMatch(/from '\.\.\/src\/snake'/)
})

test('leg (e) [M5]: the import is the produced contract snakeCase(text: string) -> string', () => {
  expect(typeof snakeCase).toBe('function')
  expect(typeof snakeCase('helloWorld')).toBe('string')
})

test('leg (e) [M5]: no other module under src/ defines snakeCase', () => {
  const offenders = tsFilesUnder(srcDir)
    .filter((path) => basename(path) !== 'snake.ts')
    .filter((path) => /(const|function) snakeCase\b/.test(read(path)))

  expect(offenders).toEqual([])
})
