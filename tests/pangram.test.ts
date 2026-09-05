import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isPangram } from '../src/pangram'

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

// Leg (a) [M1]: the canonical pangram is exactly `true`, and its one-letter-short
// neighbour (`cat` for `dog`, so no `d` and no `g`) is exactly `false` — a result
// that only checks length, or that answers `true` when a letter is missing, fails
// here.
test('leg (a) [M1]: the quick brown fox is exactly true, and its "cat" variant exactly false', () => {
  expect(isPangram('The quick brown fox jumps over the lazy dog')).toBe(true)
  expect(isPangram('The quick brown fox jumps over the lazy cat')).toBe(false)
})

// Leg (b) [M2], first half: case is ignored — the all-upper alphabet is exactly
// `true`, so an implementation that keeps only lower-case `a`–`z` without folding
// fails here.
test('leg (b) [M2]: the upper-case alphabet is exactly true, so case is ignored', () => {
  expect(isPangram('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true)
})

// Leg (b) [M2], the other half of "case is ignored": `A` and `a` are the same
// letter and must not count twice. The first text has 26 distinct *characters* but
// only the 13 letters `a`–`m`; the second is a genuine pangram in mixed case. An
// implementation that tallies characters case-sensitively answers `true` for the
// first, and — if it demands exactly 26 distinct characters — `false` for the second.
test('leg (b) [M2]: an upper- and lower-case pair is one letter, not two', () => {
  expect(isPangram('AaBbCcDdEeFfGgHhIiJjKkLlMm')).toBe(false)
  expect(isPangram('The Quick Brown Fox Jumps Over The Lazy Dog')).toBe(true)
})

// Leg (b) [M2], second half: non-letters are ignored — hyphens, dots, slashes,
// commas, semicolons, spaces and `!` do not break the count, so all 26 letters
// still register.
test('leg (b) [M2]: punctuation and spacing are ignored, so the split alphabet is exactly true', () => {
  expect(isPangram('a-b-c d.e.f g/h/i jklmnop, qrstuv; wxyz!')).toBe(true)
})

// Leg (b) [M2], third half: a digit never stands in for a letter. This text has
// `a`–`y` (25 letters) plus `1`, `2`, `3` — counting distinct non-space or
// alphanumeric characters would reach 26 and wrongly answer `true`.
test('leg (b) [M2]: a digit never stands in for the missing letter, so this is exactly false', () => {
  expect(isPangram('abcdefghijklmnopqrstuvwxy 123!')).toBe(false)
})

// Leg (c) [M3]: the empty string is exactly `false` — it holds none of the 26
// letters.
test('leg (c) [M3]: the empty string is exactly false', () => {
  expect(isPangram('')).toBe(false)
})

// M1/M2/M3 and the Produces contract `isPangram(text: string) -> boolean`: the
// result is a real boolean, never a truthy or falsy stand-in (a count, a `Set`,
// `undefined`).
test('[Produces] the result is a real boolean, not a truthy or falsy stand-in', () => {
  for (const sample of [
    'The quick brown fox jumps over the lazy dog',
    'The quick brown fox jumps over the lazy cat',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'a-b-c d.e.f g/h/i jklmnop, qrstuv; wxyz!',
    'abcdefghijklmnopqrstuvwxy 123!',
    '',
  ]) {
    expect(typeof isPangram(sample)).toBe('boolean')
  }
})

// README leg [M4]: a table row whose first cell names `isPangram` and whose
// second cell names `src/pangram.ts`, in the same three-column shape as the rows
// already there (the driver's `Run:` grep is the same shape).
test('README leg [M4]: the README table has a three-column row for isPangram | src/pangram.ts', () => {
  const readme = readText('README.md')
  expect(/^\| `isPangram` \| `src\/pangram\.ts` \| [^|]*\|\s*$/m.test(readme)).toBe(true)
  expect(/^\| .isPangram. \| .src\/pangram\.ts. \|/m.test(readme)).toBe(true)
  // The header and the rows present at BASE are untouched.
  expect(readme).toContain('| Function | Module | Does |')
  for (const row of [
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
    '| `kebabCase` | `src/kebab.ts` | mixed-case, snake or spaced text → kebab-case |',
  ]) {
    expect(readme).toContain(row)
  }
})

// Module leg [M5], first half: `src/pangram.ts` exports `isPangram` at top level,
// and this exam imports it from `../src/pangram`.
test('module leg [M5]: src/pangram.ts exports isPangram at top level and the exam imports it from ../src/pangram', () => {
  expect(/^export (const|function) isPangram\b/m.test(readText(join('src', 'pangram.ts')))).toBe(true)
  expect(readText(join('tests', 'pangram.test.ts'))).toContain("from '../src/pangram'")
})

// Module leg [M5], second half: no other file under `src/` defines an
// `isPangram` — a helper defined in an existing module or a barrel and
// re-labelled in the README fails here.
test('module leg [M5]: no other file under src/ defines isPangram', () => {
  const offenders = tsFilesUnderSrc()
    .filter((relative) => relative !== join('src', 'pangram.ts'))
    .filter((relative) => /(const|function) isPangram\b/.test(readText(relative)))
  expect(offenders).toEqual([])
  // The global constraint: no barrel file.
  expect(tsFilesUnderSrc()).not.toContain(join('src', 'index.ts'))
})
