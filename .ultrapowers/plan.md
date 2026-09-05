# Smoke 0.3.17: a run merges itself

**Grammar:** claims-v1

**Claim:** I can import kebabCase from its own module and see `'helloWorld'` become
`'hello-world'`, and the README table lists it. (elicited)

**Goal:** The confidence run the 0.3.17 release could not have: the first launch on the engine
that merges its own PR after checks (#660, PR #677). It exists so the operator can see a fleet
run on `popmechanic/ultrapowers-walk` end with its PR merged by the sandbox and, with
delete-on-merge on, no `ultra/integration-run-N` branch left behind. Same shape as runs 3–7
(one peer-examined helper adding a row to the README table). It touches nothing that exists.

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** none — this plan descends from the operator's sentence above (2026-09-05).

**Parallelization rationale:** One wave, width 1. One module, one contract; a one-task plan is
linear by construction.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e src/snake.ts && test -e src/anagram.ts
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
lower-case. M2. `kebabCase('snake_case_in')` is `'snake-case-in'` and `kebabCase('two  words')`
is `'two-words'` — an underscore or a run of whitespace is a word boundary too — and
`kebabCase('already-kebab')` is `'already-kebab'`. M3. `kebabCase('')` is `''` and
`kebabCase('solo')` is `'solo'`. M4. `README.md` has a table row whose first cell names
`kebabCase` and whose second cell names `src/kebab.ts`. M5. `src/kebab.ts` exports `kebabCase`,
and `tests/kebab.test.ts` imports it from `../src/kebab` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05.

**Interfaces:**
- Consumes: none
- Produces: `kebabCase(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of ten rows (`slugify`,
`camelCase`, `titleCase`, `truncate`, `isPalindrome`, `reverseWords`, `wordCount`, `snakeCase`,
`initials`, `isAnagram`); add one row of the same shape for `kebabCase` under the last one and
do not touch the existing rows. One shape that satisfies every clause: insert `-` before each
upper-case letter that follows a lower-case letter or digit, replace every run of underscores,
hyphens or whitespace with `-`, lower-case the whole, and trim leading or trailing `-`. Return
a `string`. `src/snake.ts` at BASE is the same shape with `_` in place of `-`; do not import
from it. This task is `Review: peer`: a peer writes `tests/kebab.test.ts` against the clauses
above; the driver runs it on your tree before any referee reads the patch, and an edit to the
exam is recorded and named to the referee — so do not write at that path. `tsconfig.json`
names the Bun types already. The `Check:` lines under Global Constraints are the driver's: the
first two run in this clone before any review, the third is `(minor)` and only recorded.
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
- `src/snake.ts` blob 3cec72d
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/kebab.test.ts`
- Legs: (a) `kebabCase('helloWorld')` equals `'hello-world'` and `kebabCase('HelloWorldAgain')`
  equals `'hello-world-again'` — a result that keeps an upper-case letter, or drops the
  boundary (`'helloworld'`), fails [M1]; (b) `kebabCase('snake_case_in')` equals
  `'snake-case-in'`, `kebabCase('two  words')` equals `'two-words'`, and
  `kebabCase('already-kebab')` equals `'already-kebab'` — a doubled `--` or a kept underscore
  fails [M2]; (c) `kebabCase('')` equals `''` and `kebabCase('solo')` equals `'solo'` [M3].
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
