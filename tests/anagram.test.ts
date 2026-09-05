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

// Leg (a) [M1]: `isAnagram('listen', 'silent')` equals `true` and
// `isAnagram('listen', 'silence')` equals `false` — the two strings use exactly
// the same letters the same number of times.
test('leg (a) [M1]: listen/silent is exactly true, listen/silence is exactly false', () => {
  expect(isAnagram('listen', 'silent')).toBe(true)
  expect(isAnagram('listen', 'silence')).toBe(false)
})

// Leg (a) [M1], the two failure modes the leg names by hand: "a result that only
// compares lengths, or only compares the set of letters, fails". `'abc'`/`'abd'`
// are the same length and not anagrams; `'aab'`/`'aabb'` use the same *set* of
// letters and are not anagrams.
test('leg (a) [M1]: comparing only lengths, or only the set of letters, is not enough', () => {
  expect(isAnagram('abc', 'abd')).toBe(false)
  expect(isAnagram('aab', 'aabb')).toBe(false)
})

// Leg (b) [M2]: `isAnagram('Dormitory', 'dirty room!')` equals `true` and
// `isAnagram('aab', 'abb')` equals `false` — case and non-letters are ignored,
// and letter counts matter, not the set of letters.
test('leg (b) [M2]: case and non-letters are ignored, and letter counts matter', () => {
  expect(isAnagram('Dormitory', 'dirty room!')).toBe(true)
  expect(isAnagram('aab', 'abb')).toBe(false)
})

// Leg (b) [M2], the failure modes the leg names by hand: "a result that keeps
// case or punctuation ... fails". Case alone must not change the answer, and a
// non-letter on one side alone must not change it either. Per the task's
// normalisation — lower-case and keep only `a`–`z` — a digit is a non-letter and
// is dropped like any other.
test('leg (b) [M2]: keeping case, punctuation, spaces or digits would change the answer', () => {
  expect(isAnagram('LISTEN', 'silent')).toBe(true)
  expect(isAnagram('listen!', 'silent')).toBe(true)
  expect(isAnagram('li sten', 'sil ent')).toBe(true)
  expect(isAnagram('listen1', 'silent')).toBe(true)
  // Ignoring non-letters does not make everything an anagram.
  expect(isAnagram('Dormitory', 'dirty rooms!')).toBe(false)
})

// Leg (c) [M3]: `isAnagram('', '')` equals `true` and `isAnagram('a', '')`
// equals `false`.
test('leg (c) [M3]: empty/empty is exactly true and a/empty is exactly false', () => {
  expect(isAnagram('', '')).toBe(true)
  expect(isAnagram('a', '')).toBe(false)
  // Symmetric: the empty string is not an anagram of a letter either way round.
  expect(isAnagram('', 'a')).toBe(false)
  // A string of only non-letters normalises to the empty string [M2 + M3].
  expect(isAnagram('!!!', '')).toBe(true)
})

// [Produces] `isAnagram(a: string, b: string) -> boolean`: the result is a real
// boolean, never a truthy or falsy stand-in.
test('[Produces] the result is a real boolean, not a truthy value', () => {
  const samples: Array<[string, string]> = [
    ['listen', 'silent'],
    ['listen', 'silence'],
    ['Dormitory', 'dirty room!'],
    ['aab', 'abb'],
    ['', ''],
    ['a', ''],
  ]
  for (const [a, b] of samples) {
    expect(typeof isAnagram(a, b)).toBe('boolean')
  }
})

// README leg [M4]: a table row whose first cell names `isAnagram` and whose
// second cell names `src/anagram.ts`, in the same three-column shape as the rows
// already there. This mirrors the driver's
// `grep -qE '^\| .isAnagram. \| .src/anagram\.ts. \|' README.md`.
test('README leg [M4]: the README table has a row for isAnagram | src/anagram.ts', () => {
  const readme = readText('README.md')
  expect(/^\| `isAnagram` \| `src\/anagram\.ts` \| .*\|\s*$/m.test(readme)).toBe(true)
  // The three-column header and the seven rows at BASE are untouched.
  expect(readme).toContain('| Function | Module | Does |')
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
})

// Module leg [M5], first half: `src/anagram.ts` exports `isAnagram` at top
// level, and this exam imports it from `../src/anagram`. This mirrors the
// driver's `grep -qE "from '\.\./src/anagram'" tests/anagram.test.ts` and
// `grep -qE '^export (const|function) isAnagram\b' src/anagram.ts`.
test('module leg [M5]: src/anagram.ts exports isAnagram at top level', () => {
  expect(/^export (const|function) isAnagram\b/m.test(readText(join('src', 'anagram.ts')))).toBe(true)
  expect(readText(join('tests', 'anagram.test.ts'))).toContain("from '../src/anagram'")
})

// Module leg [M5], second half: no other file under `src/` defines an
// `isAnagram` — a helper defined in an existing module or a barrel and
// re-labelled in the README fails here.
test('module leg [M5]: no other file under src/ defines isAnagram', () => {
  const offenders = tsFilesUnderSrc()
    .filter((relative) => relative !== join('src', 'anagram.ts'))
    .filter((relative) => /(const|function) isAnagram\b/.test(readText(relative)))
  expect(offenders).toEqual([])
  // The global constraint: no barrel file.
  expect(tsFilesUnderSrc()).not.toContain(join('src', 'index.ts'))
})
