import { expect, test } from 'bun:test'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { initials } from '../src/initials'

const repoRoot = resolve(import.meta.dir, '..')
const srcDir = join(repoRoot, 'src')
const read = (relative: string): string => readFileSync(join(repoRoot, relative), 'utf8')

// Leg (a) [M1]: the first character of each whitespace-separated word,
// upper-cased, joined with nothing.
test('leg (a) [M1]: initials("Ada Lovelace") is "AL"', () => {
  expect(initials('Ada Lovelace')).toBe('AL')
})

// Leg (a) [M1], stated negatively: keeping whole words, lower-casing, or
// joining with spaces all fail this leg.
test('leg (a) [M1]: whole words, lower case, and a space join all fail', () => {
  const out = initials('Ada Lovelace')
  expect(out).not.toBe('Ada Lovelace')
  expect(out).not.toBe('al')
  expect(out).not.toBe('A L')
  expect(out.includes(' ')).toBe(false)
  expect(initials('one two three')).toBe('OTT')
})

// Leg (b) [M2]: surrounding and repeated whitespace is ignored and case is
// normalised up.
test('leg (b) [M2]: initials("  grace   brewster  hopper ") is "GBH"', () => {
  expect(initials('  grace   brewster  hopper ')).toBe('GBH')
})

// Leg (b) [M2], stated negatively: an empty word counted from the leading or
// doubled spaces would lengthen or blank a character, and lower case fails.
test('leg (b) [M2]: no empty word from leading/doubled spaces, and no lower case survives', () => {
  const out = initials('  grace   brewster  hopper ')
  expect(out.length).toBe(3)
  expect(out).not.toBe('gbh')
  expect(out).toBe(out.toUpperCase())
  expect(initials('\t ada \n\n lovelace \t')).toBe('AL')
})

// Leg (c) [M3]: the empty string has no words, so it maps to the empty string —
// the empty-string artefact of splitting '' would give a stray character.
test('leg (c) [M3]: initials("") is ""', () => {
  expect(initials('')).toBe('')
})

// Leg (c) [M3]: whitespace-only input likewise has no words.
test('leg (c) [M3]: a whitespace-only string has no words and joins to ""', () => {
  expect(initials('   ')).toBe('')
})

// Leg (c) [M3]: a single word yields its one upper-cased first character.
test('leg (c) [M3]: initials("solo") is "S"', () => {
  expect(initials('solo')).toBe('S')
})

// Produces: `initials(text: string) -> string` — a string, never an array.
test('[Produces] initials returns a string', () => {
  expect(typeof initials('Ada Lovelace')).toBe('string')
  expect(typeof initials('')).toBe('string')
})

// README leg [M4]: a table row whose first cell names `initials` and whose
// second cell names `src/initials.ts`, in the same three-column shape as the
// rows already in the table.
test('README leg [M4]: README.md has an `initials` | `src/initials.ts` table row', () => {
  const readme = read('README.md')
  expect(/^\| .initials. \| .src\/initials\.ts. \|/m.test(readme)).toBe(true)

  const rows = readme
    .split('\n')
    .filter((line) => /^\| .initials. \| .src\/initials\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const cells = (rows[0] ?? '').split('|').slice(1, -1)
  expect(cells.length).toBe(3)
  expect(cells[0]?.trim()).toBe('`initials`')
  expect(cells[1]?.trim()).toBe('`src/initials.ts`')
  expect((cells[2] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the header keeps its three-column shape
// and the seven rows already in the table are untouched.
test('README leg [M4]: the header and the seven existing rows are untouched', () => {
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

// Module leg [M5]: this exam imports `initials` from `../src/initials`, and
// that file exports it at top level.
test('module leg [M5]: the exam imports from ../src/initials and that file exports initials', () => {
  const self = read('tests/initials.test.ts')
  expect(/from '\.\.\/src\/initials'/.test(self)).toBe(true)

  const module = read('src/initials.ts')
  expect(/^export (const|function) initials\b/m.test(module)).toBe(true)
  expect(typeof initials).toBe('function')
})

// Module leg [M5]: no other module of `src/` defines an `initials` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5]: no other file under src/ defines initials, and there is no barrel', () => {
  const others = readdirSync(srcDir).filter(
    (name) => name.endsWith('.ts') && name !== 'initials.ts',
  )
  const definers = others.filter((name) =>
    /(const|function) initials\b/.test(readFileSync(join(srcDir, name), 'utf8')),
  )
  expect(definers).toEqual([])
  expect(others.includes('index.ts')).toBe(false)
})
