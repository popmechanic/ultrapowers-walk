import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isPalindrome } from '../src/palindrome'

const repoRoot = join(import.meta.dir, '..')

const readText = (relative: string): string =>
  readFileSync(join(repoRoot, relative), 'utf8')

const tsFilesUnderSrc = (): string[] => {
  const out: string[] = []
  const walk = (relativeDir: string): void => {
    for (const entry of readdirSync(join(repoRoot, relativeDir), { withFileTypes: true })) {
      const relative = join(relativeDir, entry.name)
      if (entry.isDirectory()) walk(relative)
      else if (entry.name.endsWith('.ts')) out.push(relative)
    }
  }
  walk('src')
  return out
}

// Leg (a) [M1]: the two canonical sentences normalise past punctuation, spaces
// and case, so both are exactly `true`.
test('leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true', () => {
  expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
  expect(isPalindrome('No lemon, no melon')).toBe(true)
})

// Leg (b) [M2]: a non-palindrome is exactly `false`, including the two-character
// `'ab'` that a first-and-last-character check would have to reject.
test('leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair "ab"', () => {
  expect(isPalindrome('race a car')).toBe(false)
  expect(isPalindrome('ab')).toBe(false)
  // `'ab'`'s neighbour `'aba'` is a palindrome — the pair pins that (b) is not
  // satisfied by rejecting everything short.
  expect(isPalindrome('aba')).toBe(true)
})

// Leg (c) [M3]: the empty string normalises to the empty string, which is a
// palindrome — it is not special-cased to `false`.
test('leg (c) [M3]: the empty string is exactly true', () => {
  expect(isPalindrome('')).toBe(true)
})

// Leg (d) [M3]: digits are compared like letters.
test('leg (d) [M3]: a digit palindrome is exactly true', () => {
  expect(isPalindrome('12321')).toBe(true)
})

// Leg (e) [M1]: `_` and `+` are ignored like any other non-alphanumeric
// character — a strip built on `\W` (which keeps `_`) or on a hand-listed set of
// punctuation that misses `+` fails here.
test('leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric', () => {
  expect(isPalindrome('a_')).toBe(true)
  expect(isPalindrome('+ab a')).toBe(true)
})

// M1/M2/M3 and the Produces contract `isPalindrome(text: string) -> boolean`:
// the result is a real boolean, never a truthy or falsy stand-in.
test('[Produces] the result is a real boolean, not a truthy value', () => {
  for (const sample of ['A man, a plan, a canal: Panama', 'race a car', '', '12321', 'a_', '+ab a', 'ab']) {
    expect(typeof isPalindrome(sample)).toBe('boolean')
  }
})

// README leg [M4]: a table row whose first cell names `isPalindrome` and whose
// second cell names `src/palindrome.ts`, in the same three-column shape as the
// rows already there.
test('README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts', () => {
  const readme = readText('README.md')
  expect(/^\| `isPalindrome` \| `src\/palindrome\.ts` \| .*\|\s*$/m.test(readme)).toBe(true)
  // The existing four rows are untouched.
  for (const row of [
    '| `slugify` | `src/slug.ts` | title → URL slug |',
    '| `camelCase` | `src/camel.ts` | kebab-case → camelCase |',
    '| `titleCase` | `src/title.ts` | first letter of every word up, rest down |',
    '| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |',
  ]) {
    expect(readme).toContain(row)
  }
  expect(readme).toContain('| Function | Module | Does |')
})

// Module leg [M5], first half: `src/palindrome.ts` exports `isPalindrome` at top
// level, and this exam imports it from `../src/palindrome`.
test('module leg [M5]: src/palindrome.ts exports isPalindrome at top level', () => {
  expect(/^export (const|function) isPalindrome\b/m.test(readText('src/palindrome.ts'))).toBe(true)
  expect(readText(join('tests', 'palindrome.test.ts'))).toContain("from '../src/palindrome'")
})

// Module leg [M5], second half: no other file under `src/` defines an
// `isPalindrome` — a helper defined in an existing module or a barrel and
// re-labelled in the README fails here.
test('module leg [M5]: no other file under src/ defines isPalindrome', () => {
  const offenders = tsFilesUnderSrc()
    .filter((relative) => relative !== join('src', 'palindrome.ts'))
    .filter((relative) => /(const|function) isPalindrome\b/.test(readText(relative)))
  expect(offenders).toEqual([])
  // The global constraint: no barrel file.
  expect(tsFilesUnderSrc()).not.toContain(join('src', 'index.ts'))
})
