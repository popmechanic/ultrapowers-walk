# Three helpers for the effort A/B

**Grammar:** claims-v1

**Claim:** I can import kebabCase, capitalize and countVowels from their own modules and see
`'helloWorld'` become `'hello-world'`, `'ada'` become `'Ada'` and `'banana'` become `3`; the
README table lists all thirteen functions. (elicited)

**Goal:** The A/B plan for #522 (*first thought, best thought*): launched twice on this
repository on the same engine, once with the launcher's defaults and once with
`--implementer-effort low`, so `census.py` can read the two runs' implementer minutes, fix
rounds and chain spans against each other. Same shape as runs 3–5 (three peer-examined
helpers, one wave, all three adding a row to one README table) so the chains compare like for
like.

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** none — this plan descends from the operator's sentence above (2026-09-05).

**Parallelization rationale:** One wave, width 3. The three helpers share no symbol — none
consumes another — so no edge is derived. All three `Modify: README.md`, one table row each;
that is a text overlap and folds at merge, so it orders nothing.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e src/camel.ts && test -e src/title.ts && test -e src/truncate.ts && test -e src/count.ts && test -e src/reverse.ts && test -e src/palindrome.ts && test -e src/snake.ts && test -e src/initials.ts && test -e src/anagram.ts
- Check: grep -rn 'TODO' src tests (minor)
- No dependency is added to `package.json`; no helper imports from another helper's module,
  and there is no barrel file (`src/index.ts` is not created).
- The ten modules at BASE under `src/` and their ten test files under `tests/` are not
  edited.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the rows already there.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `kebabCase`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/kebab.ts`
- Modify: `README.md`
- Test: `tests/kebab.test.ts`

**Claim:** I can import kebabCase from its own module and see `'helloWorld'` become
`'hello-world'`, and the README table lists it. (derived)
Machine: M1. `kebabCase('helloWorld')` is `'hello-world'` and `kebabCase('HelloWorldAgain')` is
`'hello-world-again'` — an upper-case letter starts a new word, and the result is all
lower-case. M2. `kebabCase('snake_case_in')` is `'snake-case-in'` and `kebabCase('two words')` is
`'two-words'` — an underscore or a run of whitespace is a word boundary too — and
`kebabCase('already-kebab')` is `'already-kebab'`. M3. `kebabCase('')` is `''` and
`kebabCase('solo')` is `'solo'`. M4. `README.md` has a table row whose first cell names
`kebabCase` and whose second cell names `src/kebab.ts`. M5. `src/kebab.ts` exports `kebabCase`,
and `tests/kebab.test.ts` imports it from `../src/kebab` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05 (the #522 A/B).

**Interfaces:**
- Consumes: none
- Produces: `kebabCase(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of ten rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`, `snakeCase`,
`initials`, `isAnagram`); add one row
of the same shape for `kebabCase` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). One shape that satisfies every clause: insert `-` before each upper-case
letter that follows a lower-case letter or digit, replace every run of underscores or
whitespace with `-`, lower-case the whole, and trim leading or trailing `-`; `src/snake.ts` at
BASE is the mirror image and a fine model, but do not import it. Return a `string`. This task
is `Review: peer`: a peer writes `tests/kebab.test.ts` against the clauses above; the driver
runs it on your tree before any referee reads the patch, and an edit to the exam is recorded
and named to the referee — so do not write at that path. `tsconfig.json` names the Bun types
already. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at 208c1e8)
- `README.md` blob f2cb853
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `initials` at `src/initials.ts:9` blob 77e4db0
- `isAnagram` at `src/anagram.ts:14` blob f121288
- `src/snake.ts` blob 3cec72d
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/kebab.test.ts`
- Legs: (a) `kebabCase('helloWorld')` equals `'hello-world'` and `kebabCase('HelloWorldAgain')`
  equals `'hello-world-again'` — a result that keeps an upper-case letter, or drops the boundary
  (`'helloworld'`), fails [M1]; (b) `kebabCase('snake_case_in')` equals `'snake-case-in'`,
  `kebabCase('two words')` equals `'two-words'`, and `kebabCase('already-kebab')` equals
  `'already-kebab'` — a doubled `--` or a kept underscore fails [M2]; (c) `kebabCase('')` equals
  `''` and `kebabCase('solo')` equals `'solo'` [M3].
- Run: grep -qE '^\| .kebabCase. \| .src/kebab\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/kebab'" tests/kebab.test.ts && grep -qE '^export (const|function) kebabCase\b' src/kebab.ts && ! grep -rlE '(const|function) kebabCase\b' src --exclude=kebab.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `kebabCase` from
  `../src/kebab`, that file exports it at top level, and no other file under `src/` defines a
  `kebabCase` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/kebab.ts`

### Task 2: `capitalize`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/capitalize.ts`
- Modify: `README.md`
- Test: `tests/capitalize.test.ts`

**Claim:** I can import capitalize from its own module and see `'ada'` become `'Ada'`, and
the README table lists it. (derived)
Machine: M1. `capitalize('ada')` is `'Ada'` — the first character upper-cased, the rest
unchanged. M2. The rest is left alone, not lower-cased, and leading whitespace is kept:
`capitalize('aDA')` is `'ADA'` and `capitalize('  ada')` is `'  ada'`. M3. `capitalize('')` is
`''` and `capitalize('A')` is `'A'`. M4. `README.md` has a table
row whose first cell names `capitalize` and whose second cell names `src/capitalize.ts`. M5.
`src/capitalize.ts` exports `capitalize`, and `tests/capitalize.test.ts` imports it from
`../src/capitalize` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05 (the #522 A/B).

**Interfaces:**
- Consumes: none
- Produces: `capitalize(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of ten rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`, `snakeCase`,
`initials`, `isAnagram`); add one row
of the same shape for `capitalize` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). `text.charAt(0).toUpperCase() + text.slice(1)` satisfies every clause — a
leading space is the first character and stays a space, so `'  ada'` is unchanged. Return a
`string`. This task is
`Review: peer`: a peer writes `tests/capitalize.test.ts` against the clauses above; the driver
runs it on your tree before any referee reads the patch, and an edit to the exam is recorded
and named to the referee — so do not write at that path. `tsconfig.json` names the Bun types
already. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at 208c1e8)
- `README.md` blob f2cb853
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `snakeCase` at `src/snake.ts:11` blob 3cec72d
- `initials` at `src/initials.ts:9` blob 77e4db0
- `isAnagram` at `src/anagram.ts:14` blob f121288
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/capitalize.test.ts`
- Legs: (a) `capitalize('ada')` equals `'Ada'` — a result that upper-cases the whole word, or
  returns the input, fails [M1]; (b) `capitalize('aDA')` equals `'ADA'` and
  `capitalize('  ada')` equals `'  ada'` — a result that lower-cases the rest, or trims, fails
  [M2]; (c) `capitalize('')` equals `''` and `capitalize('A')` equals `'A'` [M3].
- Run: grep -qE '^\| .capitalize. \| .src/capitalize\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/capitalize'" tests/capitalize.test.ts && grep -qE '^export (const|function) capitalize\b' src/capitalize.ts && ! grep -rlE '(const|function) capitalize\b' src --exclude=capitalize.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `capitalize` from
  `../src/capitalize`, that file exports it at top level, and no other file under `src/` defines
  a `capitalize` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/capitalize.ts`

### Task 3: `countVowels`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/vowels.ts`
- Modify: `README.md`
- Test: `tests/vowels.test.ts`

**Claim:** I can import countVowels from its own module and see `'banana'` become `3`, and
the README table lists it. (derived)
Machine: M1. `countVowels('banana')` is `3` and `countVowels('rhythm')` is `0` — a vowel is one
of `a`, `e`, `i`, `o`, `u`, and `y` is not one. M2. Case is ignored: `countVowels('AEIOU')` is
`5` and `countVowels('Queue')` is `4`. M3. `countVowels('')` is `0` and `countVowels('b')` is
`0`. M4. `README.md` has a table
row whose first cell names `countVowels` and whose second cell names `src/vowels.ts`. M5.
`src/vowels.ts` exports `countVowels`, and `tests/vowels.test.ts` imports it from
`../src/vowels` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05 (the #522 A/B).

**Interfaces:**
- Consumes: none
- Produces: `countVowels(text: string) -> number`

**Context:** The README at BASE ends with a three-column table of ten rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`, `snakeCase`,
`initials`, `isAnagram`); add one row
of the same shape for `countVowels` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). `(text.match(/[aeiou]/gi) ?? []).length` satisfies every clause. Return a
`number`, never a string. This task is `Review: peer`: a
peer writes `tests/vowels.test.ts` against the clauses above; the driver runs it on your tree
before any referee reads the patch, and an edit to the exam is recorded and named to the
referee — so do not write at that path. `tsconfig.json` names the Bun types already. The
`Check:` lines under Global Constraints are the driver's: the first two run in this clone
before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at 208c1e8)
- `README.md` blob f2cb853
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `snakeCase` at `src/snake.ts:11` blob 3cec72d
- `initials` at `src/initials.ts:9` blob 77e4db0
- `isAnagram` at `src/anagram.ts:14` blob f121288
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/vowels.test.ts`
- Legs: (a) `countVowels('banana')` equals `3` and `countVowels('rhythm')` equals `0` — a
  result that counts `y`, or counts consonants, fails [M1]; (b) `countVowels('AEIOU')` equals
  `5` and `countVowels('Queue')` equals `4` — a result that counts lower-case only fails [M2];
  (c) `countVowels('')` equals `0` and `countVowels('b')` equals `0` [M3].
- Run: grep -qE '^\| .countVowels. \| .src/vowels\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/vowels'" tests/vowels.test.ts && grep -qE '^export (const|function) countVowels\b' src/vowels.ts && ! grep -rlE '(const|function) countVowels\b' src --exclude=vowels.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `countVowels` from
  `../src/vowels`, that file exports it at top level, and no other file under `src/` defines
  a `countVowels` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/vowels.ts`
