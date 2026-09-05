import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { countVowels } from '../src/vowels'

const root = join(import.meta.dir, '..')
const read = (rel: string): string => readFileSync(join(root, rel), 'utf8')

// Leg (a) [M1]: `'rhythm'` has none of `a`, `e`, `i`, `o`, `u`, so it counts 0.
test('leg (a) [M1] rhythm counts 0', () => {
  expect(countVowels('rhythm')).toBe(0)
  expect(countVowels('rhythm')).not.toBe(6) // not a consonant count
})

// Leg (a) [M1] — NOTE FOR THE REFEREE. The leg also pins
// `countVowels('Ada Lovelace')` to `4`, but that literal contradicts the rest of
// the contract and no implementation can satisfy both. Under M1's own rule (the
// vowels are `a e i o u` and nothing else, counted with multiplicity) plus M2
// (case is ignored), `'Ada Lovelace'` matches A, a, o, e, a, e — six. Counting
// each distinct vowel once gives 3; counting consonants gives 5. None is 4; only
// a case-SENSITIVE distinct-character count ({A, a, o, e}) gives 4, and M1 and
// M2 each forbid that. The Context's own named shape, `match(/[aeiou]/gi)` and
// return the match count, also yields 6. So this exam does not adjudicate the
// literal. It asserts instead what every reading of leg (a) agrees on: the
// negatives the leg itself states, and the invariances M1/M2/M3 impose on this
// very input. See the `unsatisfiable` report for the pinned value.
test('leg (a) [M1] Ada Lovelace counts neither the distinct vowels nor the consonants', () => {
  expect(countVowels('Ada Lovelace')).not.toBe(3) // distinct vowels {a, o, e}
  expect(countVowels('Ada Lovelace')).not.toBe(5) // consonants d, L, v, l, c
})

// Leg (a) [M1] with [M2] and [M3]: whatever `'Ada Lovelace'` counts, the rule is
// a rule — case is ignored, and the space is not a vowel. A hard-coded special
// case for this one string fails these equalities.
test('leg (a) [M1] the Ada Lovelace count obeys the rule, not a special case', () => {
  expect(countVowels('Ada Lovelace')).toBe(countVowels('ada lovelace'))
  expect(countVowels('Ada Lovelace')).toBe(countVowels('ADA LOVELACE'))
  expect(countVowels('Ada Lovelace')).toBe(countVowels('AdaLovelace'))
})

// Leg (a) [M1]: "counted with multiplicity" — the same vowel repeated counts
// once per occurrence.
test('leg (a) [M1] repeated vowels count with multiplicity', () => {
  expect(countVowels('aaa')).toBe(3)
})

// Leg (b) [M2]: case is ignored — the upper- and lower-case runs of the five
// vowels both count 5.
test('leg (b) [M2] AEIOU and aeiou both count 5', () => {
  expect(countVowels('AEIOU')).toBe(5)
  expect(countVowels('aeiou')).toBe(5)
})

// Leg (b) [M2]: `y` is never a vowel here — and since case is ignored, neither
// is `Y`. A count that admits `y` fails this leg.
test('leg (b) [M2] y is never a vowel', () => {
  expect(countVowels('y')).toBe(0)
  expect(countVowels('Y')).toBe(0)
})

// Leg (c) [M3]: the empty string, and a string with no letters at all, count 0.
test('leg (c) [M3] the empty string and a string of digits and punctuation count 0', () => {
  expect(countVowels('')).toBe(0)
  expect(countVowels('123 !?')).toBe(0)
})

// Produces: `countVowels(text: string) -> number` — a number, never a string,
// including on the no-match path.
test('[Produces] countVowels returns a number', () => {
  expect(typeof countVowels('Ada Lovelace')).toBe('number')
  expect(typeof countVowels('')).toBe('number')
})

// README leg [M4]: a table row whose first cell names `countVowels` and whose
// second cell names `src/vowels.ts`, in the same three-column shape as the rows
// already there. The row-matching pattern is the Proof's own `Run:` grep.
test('README leg [M4] the README table has a countVowels row naming src/vowels.ts', () => {
  const rows = read('README.md')
    .split('\n')
    .filter((line) => /^\| .countVowels. \| .src\/vowels\.ts. \|/.test(line))
  expect(rows.length).toBe(1)

  const row = rows[0] ?? ''
  const cells = row.split('|')
  // `| a | b | c |` splits into 5 parts: an empty edge, three cells, an empty edge.
  expect(cells.length).toBe(5)
  expect(cells[0]?.trim()).toBe('')
  expect(cells[4]?.trim()).toBe('')
  expect(cells[1]?.trim()).toBe('`countVowels`')
  expect(cells[2]?.trim()).toBe('`src/vowels.ts`')
  expect((cells[3] ?? '').trim().length > 0).toBe(true)
})

// README leg [M4] / global constraint: the table keeps its three-column shape
// and every row already at BASE is untouched.
test('README leg [M4] the existing table header and rows are untouched', () => {
  const readme = read('README.md')
  expect(readme.includes('| Function | Module | Does |')).toBe(true)
  expect(readme.includes('| --- | --- | --- |')).toBe(true)
  const existing = [
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
  ]
  for (const line of existing) {
    expect(readme.includes(line)).toBe(true)
  }
})

// README leg [M4] / Context: the new row goes "under the last one" — after the
// `kebabCase` row that ends the table at BASE.
test('README leg [M4] the countVowels row is added under the last existing row', () => {
  const lines = read('README.md').split('\n')
  const last = lines.findIndex((line) => /^\| .kebabCase. \| .src\/kebab\.ts. \|/.test(line))
  const added = lines.findIndex((line) => /^\| .countVowels. \| .src\/vowels\.ts. \|/.test(line))
  expect(last).toBeGreaterThan(-1)
  expect(added).toBeGreaterThan(last)
})

// Module leg [M5]: `src/vowels.ts` exports `countVowels` at top level.
test('module leg [M5] src/vowels.ts exports countVowels at top level', () => {
  expect(/^export (const|function) countVowels\b/m.test(read('src/vowels.ts'))).toBe(true)
})

// Module leg [M5]: this exam's own import is from `../src/vowels`.
test('module leg [M5] the exam imports countVowels from ../src/vowels', () => {
  expect(/from '\.\.\/src\/vowels'/.test(read('tests/vowels.test.ts'))).toBe(true)
})

// Module leg [M5]: no other module of `src/` defines a `countVowels` — a helper
// defined in an existing module, or in a barrel, and re-labelled in the README
// fails this leg.
test('module leg [M5] no other module under src/ defines countVowels', () => {
  const others = readdirSync(join(root, 'src'))
    .filter((name) => name.endsWith('.ts') && name !== 'vowels.ts')
    .filter((name) => /(const|function) countVowels\b/.test(read(join('src', name))))
  expect(others).toEqual([])
})

// Global constraint: there is no barrel file at `src/index.ts`.
test('[global constraint] src/index.ts is not created', () => {
  expect(readdirSync(join(root, 'src')).includes('index.ts')).toBe(false)
})
