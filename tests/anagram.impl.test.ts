import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isAnagram } from '../src/anagram'

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

// Leg (a) [M1]: the canonical pair is exactly `true`, and a same-length-ish
// mismatch is exactly `false` — a length-only or set-only check fails here.
test('leg (a) [M1]: listen/silent is exactly true, listen/silence is exactly false', () => {
  expect(isAnagram('listen', 'silent')).toBe(true)
  expect(isAnagram('listen', 'silence')).toBe(false)
  // A set-of-letters check would call these equal; counts must decide.
  expect(isAnagram('aabb', 'ab')).toBe(false)
})

// Leg (b) [M2]: case and non-letters are ignored, but letter counts are not.
test('leg (b) [M2]: case and punctuation are ignored, letter counts are not', () => {
  expect(isAnagram('Dormitory', 'dirty room!')).toBe(true)
  expect(isAnagram('aab', 'abb')).toBe(false)
})

// Leg (c) [M3]: the empty pair is exactly `true`; one empty side is exactly
// `false`.
test('leg (c) [M3]: empty vs empty is true, "a" vs empty is false', () => {
  expect(isAnagram('', '')).toBe(true)
  expect(isAnagram('a', '')).toBe(false)
  // Non-letters normalise away entirely, so punctuation-only is empty.
  expect(isAnagram('!!!', '')).toBe(true)
})

// The Produces contract `isAnagram(a: string, b: string) -> boolean`: a real
// boolean, never a truthy or falsy stand-in.
test('[Produces] the result is a real boolean, not a truthy value', () => {
  for (const [a, b] of [['listen', 'silent'], ['listen', 'silence'], ['', ''], ['a', '']]) {
    expect(typeof isAnagram(a ?? '', b ?? '')).toBe('boolean')
  }
})

// README leg [M4]: a table row whose first cell names `isAnagram` and whose
// second cell names `src/anagram.ts`, in the same three-column shape.
test('README leg [M4]: the README table has a row for isAnagram | src/anagram.ts', () => {
  const readme = readText('README.md')
  expect(/^\| `isAnagram` \| `src\/anagram\.ts` \| .*\|\s*$/m.test(readme)).toBe(true)
  // The seven rows at BASE are untouched.
  for (const row of [
    '| `slugify` | `src/slug.ts` | title → URL slug |',
    '| `camelCase` | `src/camel.ts` | kebab-case → camelCase |',
    '| `titleCase` | `src/title.ts` | first letter of every word up, rest down |',
    '| `truncate` | `src/truncate.ts` | cut text to a max length with `…` |',
    '| `isPalindrome` | `src/palindrome.ts` | reads the same both ways, ignoring case and punctuation |',
    '| `reverseWords` | `src/reverse.ts` | words in reverse order, single-spaced |',
    '| `wordCount` | `src/count.ts` | count whitespace-separated words |',
  ]) {
    expect(readme).toContain(row)
  }
  expect(readme).toContain('| Function | Module | Does |')
})

// Module leg [M5]: `src/anagram.ts` exports `isAnagram` at top level, and no
// other file under `src/` defines one; no barrel file either.
test('module leg [M5]: src/anagram.ts is the only definition of isAnagram', () => {
  expect(/^export (const|function) isAnagram\b/m.test(readText('src/anagram.ts'))).toBe(true)
  const offenders = tsFilesUnderSrc()
    .filter((relative) => relative !== join('src', 'anagram.ts'))
    .filter((relative) => /(const|function) isAnagram\b/.test(readText(relative)))
  expect(offenders).toEqual([])
  expect(tsFilesUnderSrc()).not.toContain(join('src', 'index.ts'))
})
