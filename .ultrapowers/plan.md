# Three more string helpers

**Grammar:** claims-v1

**Claim:** I can import snakeCase, initials and isAnagram from their own modules and see
`'helloWorld'` become `'hello_world'`, `'Ada Lovelace'` become `'AL'` and `('listen', 'silent')`
become `true`; the README table lists all ten functions. (elicited)

**Goal:** The A/B plan for #653: launched twice on this repository, once with the engine pinned
at 0.3.15 (`--engine af1e7c70dedc3de5cbb4e9ca79af3bdb2756a701`) and once on the engine that
starts each task's examiner and implementer together, so `census.py` can read the two runs'
chain spans against each other. Same shape as run-3 (three peer-examined helpers, one wave, all
three adding a row to one README table) so the chains compare like for like.

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** none — this plan descends from the operator's sentence above (2026-09-05).

**Parallelization rationale:** One wave, width 3. The three helpers share no symbol — none
consumes another — so no edge is derived. All three `Modify: README.md`, one table row each;
that is a text overlap and folds at merge, so it orders nothing.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e src/camel.ts && test -e src/title.ts && test -e src/truncate.ts && test -e src/count.ts && test -e src/reverse.ts && test -e src/palindrome.ts
- Check: grep -rn 'TODO' src tests (minor)
- No dependency is added to `package.json`; no helper imports from another helper's module,
  and there is no barrel file (`src/index.ts` is not created).
- The seven modules at BASE under `src/` and their seven test files under `tests/` are not
  edited.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the rows already there.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `snakeCase`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/snake.ts`
- Modify: `README.md`
- Test: `tests/snake.test.ts`

**Claim:** I can import snakeCase from its own module and see `'helloWorld'` become
`'hello_world'`, and the README table lists it. (derived)
Machine: M1. `snakeCase('helloWorld')` is `'hello_world'` and `snakeCase('HelloWorldAgain')` is
`'hello_world_again'` — an upper-case letter starts a new word, and the result is all
lower-case. M2. `snakeCase('kebab-case-in')` is `'kebab_case_in'` and `snakeCase('two words')` is
`'two_words'` — a hyphen or a run of whitespace is a word boundary too — and
`snakeCase('already_snake')` is `'already_snake'`. M3. `snakeCase('')` is `''` and
`snakeCase('solo')` is `'solo'`. M4. `README.md` has a table row whose first cell names
`snakeCase` and whose second cell names `src/snake.ts`. M5. `src/snake.ts` exports `snakeCase`,
and `tests/snake.test.ts` imports it from `../src/snake` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05.

**Interfaces:**
- Consumes: none
- Produces: `snakeCase(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of seven rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`); add one row
of the same shape for `snakeCase` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). One shape that satisfies every clause: insert `_` before each upper-case
letter that follows a lower-case letter or digit, replace every run of hyphens or whitespace
with `_`, lower-case the whole, and trim leading or trailing `_`. Return a `string`. This task
is `Review: peer`: a peer writes `tests/snake.test.ts` against the clauses above; the driver
runs it on your tree before any referee reads the patch, and an edit to the exam is recorded
and named to the referee — so do not write at that path. `tsconfig.json` names the Bun types
already. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at f516d81)
- `README.md` blob 7c6b7d0
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/snake.test.ts`
- Legs: (a) `snakeCase('helloWorld')` equals `'hello_world'` and `snakeCase('HelloWorldAgain')`
  equals `'hello_world_again'` — a result that keeps an upper-case letter, or drops the boundary
  (`'helloworld'`), fails [M1]; (b) `snakeCase('kebab-case-in')` equals `'kebab_case_in'`,
  `snakeCase('two words')` equals `'two_words'`, and `snakeCase('already_snake')` equals
  `'already_snake'` — a doubled `__` or a kept hyphen fails [M2]; (c) `snakeCase('')` equals
  `''` and `snakeCase('solo')` equals `'solo'` [M3].
- Run: grep -qE '^\| .snakeCase. \| .src/snake\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/snake'" tests/snake.test.ts && grep -qE '^export (const|function) snakeCase\b' src/snake.ts && ! grep -rlE '(const|function) snakeCase\b' src --exclude=snake.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `snakeCase` from
  `../src/snake`, that file exports it at top level, and no other file under `src/` defines a
  `snakeCase` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/snake.ts`

### Task 2: `initials`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/initials.ts`
- Modify: `README.md`
- Test: `tests/initials.test.ts`

**Claim:** I can import initials from its own module and see `'Ada Lovelace'` become `'AL'`,
and the README table lists it. (derived)
Machine: M1. `initials('Ada Lovelace')` is `'AL'` — the first character of each
whitespace-separated word, upper-cased, joined with nothing. M2. Surrounding and repeated
whitespace is ignored and case is normalised: `initials('  grace   brewster  hopper ')` is
`'GBH'`. M3. `initials('')` is `''` and `initials('solo')` is `'S'`. M4. `README.md` has a table
row whose first cell names `initials` and whose second cell names `src/initials.ts`. M5.
`src/initials.ts` exports `initials`, and `tests/initials.test.ts` imports it from
`../src/initials` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05.

**Interfaces:**
- Consumes: none
- Produces: `initials(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of seven rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`); add one row
of the same shape for `initials` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). Match `/\S+/g`, take each match's first character upper-cased, and join —
matching avoids the empty-string artefact of splitting `''`. Return a `string`. This task is
`Review: peer`: a peer writes `tests/initials.test.ts` against the clauses above; the driver
runs it on your tree before any referee reads the patch, and an edit to the exam is recorded
and named to the referee — so do not write at that path. `tsconfig.json` names the Bun types
already. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at f516d81)
- `README.md` blob 7c6b7d0
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/initials.test.ts`
- Legs: (a) `initials('Ada Lovelace')` equals `'AL'` — a result that keeps whole words, or
  lower-cases (`'al'`), or joins with spaces, fails [M1]; (b) `initials('  grace   brewster
  hopper ')` equals `'GBH'` — a result that counts an empty word from the leading or doubled
  spaces, or keeps lower case, fails [M2]; (c) `initials('')` equals `''` and `initials('solo')`
  equals `'S'` [M3].
- Run: grep -qE '^\| .initials. \| .src/initials\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/initials'" tests/initials.test.ts && grep -qE '^export (const|function) initials\b' src/initials.ts && ! grep -rlE '(const|function) initials\b' src --exclude=initials.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `initials` from
  `../src/initials`, that file exports it at top level, and no other file under `src/` defines
  an `initials` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/initials.ts`

### Task 3: `isAnagram`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/anagram.ts`
- Modify: `README.md`
- Test: `tests/anagram.test.ts`

**Claim:** I can import isAnagram from its own module and see `('listen', 'silent')` become
`true`, and the README table lists it. (derived)
Machine: M1. `isAnagram('listen', 'silent')` is `true` and `isAnagram('listen', 'silence')` is
`false` — the two strings use exactly the same letters the same number of times. M2. Case and
non-letters are ignored: `isAnagram('Dormitory', 'dirty room!')` is `true`, and
`isAnagram('aab', 'abb')` is `false` — letter counts matter, not the set of letters. M3.
`isAnagram('', '')` is `true` and `isAnagram('a', '')` is `false`. M4. `README.md` has a table
row whose first cell names `isAnagram` and whose second cell names `src/anagram.ts`. M5.
`src/anagram.ts` exports `isAnagram`, and `tests/anagram.test.ts` imports it from
`../src/anagram` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05.

**Interfaces:**
- Consumes: none
- Produces: `isAnagram(a: string, b: string) -> boolean`

**Context:** The README at BASE ends with a three-column table of seven rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`); add one row
of the same shape for `isAnagram` under the last one (two sibling tasks add their own rows to
the same table in the same run — that is expected, and the merge folds the rows; do not touch
the existing rows). Normalise each side by lower-casing and keeping only `a`–`z`, then compare
the sorted characters (or letter counts). Return a `boolean`. This task is `Review: peer`: a
peer writes `tests/anagram.test.ts` against the clauses above; the driver runs it on your tree
before any referee reads the patch, and an edit to the exam is recorded and named to the
referee — so do not write at that path. `tsconfig.json` names the Bun types already. The
`Check:` lines under Global Constraints are the driver's: the first two run in this clone
before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at f516d81)
- `README.md` blob 7c6b7d0
- `slugify` at `src/slug.ts:7` blob 9b9f54a
- `camelCase` at `src/camel.ts:8` blob f9383d7
- `titleCase` at `src/title.ts:8` blob a04808d
- `truncate` at `src/truncate.ts:9` blob 671992a
- `isPalindrome` at `src/palindrome.ts:10` blob cbdcd4f
- `reverseWords` at `src/reverse.ts:10` blob 189f9ad
- `wordCount` at `src/count.ts:8` blob 7303241
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/anagram.test.ts`
- Legs: (a) `isAnagram('listen', 'silent')` equals `true` and `isAnagram('listen', 'silence')`
  equals `false` — a result that only compares lengths, or only compares the set of letters,
  fails [M1]; (b) `isAnagram('Dormitory', 'dirty room!')` equals `true` and `isAnagram('aab',
  'abb')` equals `false` — a result that keeps case or punctuation, or ignores letter counts,
  fails [M2]; (c) `isAnagram('', '')` equals `true` and `isAnagram('a', '')` equals `false`
  [M3].
- Run: grep -qE '^\| .isAnagram. \| .src/anagram\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/anagram'" tests/anagram.test.ts && grep -qE '^export (const|function) isAnagram\b' src/anagram.ts && ! grep -rlE '(const|function) isAnagram\b' src --exclude=anagram.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `isAnagram` from
  `../src/anagram`, that file exports it at top level, and no other file under `src/` defines
  an `isAnagram` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/anagram.ts`
