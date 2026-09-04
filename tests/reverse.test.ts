import { expect, test } from 'bun:test'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { reverseWords } from '../src/reverse'

const repoRoot = resolve(import.meta.dir, '..')
const srcDir = join(repoRoot, 'src')
const read = (relative: string): string => readFileSync(join(repoRoot, relative), 'utf8')

// Leg (a) [M1]: the words come back in reverse order, joined by single spaces.
test('leg (a) [M1]: reverseWords("one two three") is "three two one"', () => {
  expect(reverseWords('one two three')).toBe('three two one')
})

// Leg (a) [M1]: the reversal is of the word order, never of the characters —
// 'eerht owt eno' (characters reversed) and 'one two three' (order kept) both fail.
test('leg (a) [M1]: words are not reversed character-wise and the order does change', () => {
  expect(reverseWords('one two three')).not.toBe('eerht owt eno')
  expect(reverseWords('one two three')).not.toBe('one two three')
  expect(reverseWords('ab cd')).toBe('cd ab')
  expect(reverseWords('ab cd')).not.toBe('dc ba')
})

// Leg (b) [M2]: surrounding and repeated whitespace is normalised away.
test('leg (b) [M2]: reverseWords("  a   b ") is "b a"', () => {
  expect(reverseWords('  a   b ')).toBe('b a')
})

// Leg (b) [M2]: no original run of spaces and no leading/trailing space survives.
test('leg (b) [M2]: runs of whitespace collapse to one space, edges are trimmed', () => {
  const out = reverseWords('  a   b ')
  expect(out).toBe(out.trim())
  expect(out.includes('  ')).toBe(false)
  expect(reverseWords('\t one \n\n two \t')).toBe('two one')
  expect(reverseWords('  a   b   c  ')).toBe('c b a')
})

// Leg (c) [M3]: the empty string maps to the empty string.
test('leg (c) [M3]: reverseWords("") is ""', () => {
  expect(reverseWords('')).toBe('')
})

// Leg (c) [M3]: a whitespace-only input has no words, so it also joins to ''.
test('leg (c) [M3]: whitespace-only input has no words and joins to ""', () => {
  expect(reverseWords('   ')).toBe('')
})

// Leg (d) [M3]: a single word comes back unchanged.
test('leg (d) [M3]: reverseWords("solo") is "solo"', () => {
  expect(reverseWords('solo')).toBe('solo')
})

// README leg [M4]: a table row whose first cell names `reverseWords` and whose
// second cell names `src/reverse.ts`, in the same three-column shape as the
// rows already in the table.
test('README leg [M4]: README.md has a `reverseWords` | `src/reverse.ts` table row', () => {
  const readme = read('README.md')
  expect(/^\| .reverseWords. \| .src\/reverse\.ts. \|/m.test(readme)).toBe(true)

  const row = readme
    .split('\n')
    .find((line) => /^\| .reverseWords. \| .src\/reverse\.ts. \|/.test(line))
  expect(typeof row).toBe('string')
  const cells = (row ?? '').split('|').slice(1, -1)
  expect(cells.length).toBe(3)
  expect(cells[0]?.trim()).toBe('`reverseWords`')
  expect(cells[1]?.trim()).toBe('`src/reverse.ts`')
  expect((cells[2] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4]: the four rows already in the table are untouched.
test('README leg [M4]: the existing four rows keep their shape', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| `slugify` | `src/slug.ts` | title → URL slug |')).toBe(true)
  expect(readme.includes('| `camelCase` | `src/camel.ts` | kebab-case → camelCase |')).toBe(true)
  expect(
    readme.includes('| `titleCase` | `src/title.ts` | first letter of every word up, rest down |'),
  ).toBe(true)
  expect(readme.includes('| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |')).toBe(
    true,
  )
})

// Module leg [M5]: this test imports reverseWords from `../src/reverse`, and
// that file exports it at top level.
test('module leg [M5]: the test imports from ../src/reverse and that file exports reverseWords', () => {
  const self = read('tests/reverse.test.ts')
  expect(/from '\.\.\/src\/reverse'/.test(self)).toBe(true)

  const module = read('src/reverse.ts')
  expect(/^export (const|function) reverseWords\b/m.test(module)).toBe(true)
  expect(typeof reverseWords).toBe('function')
})

// Module leg [M5]: no other file under src/ defines a `reverseWords` — a helper
// defined in an existing module or a barrel and re-labelled in the README fails.
test('module leg [M5]: no other file under src/ defines reverseWords, and there is no barrel', () => {
  const others = readdirSync(srcDir).filter((name) => name.endsWith('.ts') && name !== 'reverse.ts')
  const definers = others.filter((name) =>
    /(const|function) reverseWords\b/.test(readFileSync(join(srcDir, name), 'utf8')),
  )
  expect(definers).toEqual([])
  expect(others.includes('index.ts')).toBe(false)
})
