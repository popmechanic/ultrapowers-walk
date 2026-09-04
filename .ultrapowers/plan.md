# Three peer-examined string helpers

**Grammar:** claims-v1

**Claim:** I can import wordCount, reverseWords and isPalindrome from their own modules and see
`'a  b c'` become `3`, `'one two three'` become `'three two one'` and
`'A man, a plan, a canal: Panama'` become `true`; the README table lists all seven functions,
and every task's exam was written by a peer before the implementer started. (elicited)

**Goal:** The second run on this repository and the first peer-reviewed one off `ultrapowers`
itself: three independent helpers, each `Review: peer`, so the examiner writes each exam in
wave 0 against the Machine clauses, the implementer runs it, and the pair reviews. Same shape
as run-1 (three tasks, one wave, all three adding a row to the same README table) so the
judging share is comparable.

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** none — this plan descends from the operator's sentence above (2026-09-04).

**Parallelization rationale:** One wave, width 3. The three helpers share no symbol — none
consumes another — so no edge is derived. All three `Modify: README.md`, one table row each;
that is a text overlap and folds at merge (run-1 measured two resolver workers for it), so it
orders nothing.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e src/camel.ts && test -e src/title.ts && test -e src/truncate.ts
- Check: grep -rn 'TODO' src tests (minor)
- No dependency is added to `package.json`; no helper imports from another helper's module,
  and there is no barrel file (`src/index.ts` is not created).
- The four modules at BASE (`src/slug.ts`, `src/camel.ts`, `src/title.ts`, `src/truncate.ts`)
  and their four test files are not edited.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the rows already there.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `wordCount`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/count.ts`
- Modify: `README.md`
- Test: `tests/count.test.ts`

**Claim:** I can import wordCount from its own module and see `'a  b c'` become `3`, and the README table lists it. (derived)
Machine: M1. `wordCount('a  b c')` is `3` and `wordCount('one\ttwo\nthree')` is `3` — a word is a maximal run of non-whitespace characters, and any whitespace (spaces, tabs, newlines, runs of them) separates. M2. `wordCount('')` is `0` and `wordCount('   ')` is `0`. M3. `wordCount('solo')` is `1`. M4. `README.md` has a table row whose first cell names `wordCount` and whose second
cell names `src/count.ts`. M5. `src/count.ts` exports `wordCount`, and `tests/count.test.ts` imports
it from `../src/count` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `wordCount(text: string) -> number`

**Context:** The README at BASE ends with a three-column table of four rows (`slugify`,
`camelCase`, `titleCase`, `truncate`); add one row of the same shape for `wordCount` under the
last one (two sibling tasks add their own rows to the same table in the same run — that is
expected, and the merge folds the rows; do not touch the existing rows). Split on `/\s+/` after trimming, or match `/\S+/g` and count the matches — the second avoids the empty-string artefact of splitting `''`. Return a `number`, never a string. This task is
`Review: peer`: a peer wrote `tests/count.test.ts` against the clauses above before you
started, and it is red at BASE for want of `src/count.ts`; run it as your test command and make
it green without editing it — an edit to the exam is recorded and named to the referee.
`tsconfig.json` names the Bun types already. The `Check:` lines under Global Constraints are the
driver's: the first two run in this clone before any review, the third is `(minor)` and only
recorded.

**Proof:**
- Test: `tests/count.test.ts`
- Legs: (a) `wordCount('a  b c')` equals `3` and `wordCount('one\ttwo\nthree')` equals `3` — a result that counts the double space as an empty word (`4`), or only splits on spaces (`1` for the tab/newline case), fails [M1]; (b) `wordCount('')` equals `0` — a result of `1` from splitting the empty string fails [M2]; (c) `wordCount('   ')` equals `0` [M2]; (d) `wordCount('solo')` equals `1` [M3].
- Run: grep -qE '^\| .wordCount. \| .src/count\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the existing rows
  [M4].
- Run: grep -qE "from '\.\./src/count'" tests/count.test.ts && grep -qE '^export (const|function) wordCount\b' src/count.ts && ! grep -rlE '(const|function) wordCount\b' src --exclude=count.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `wordCount` from `../src/count`,
  that file exports it at top level, and no other file under `src/` defines a `wordCount` — a
  helper defined in an existing module or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/count.ts`

### Task 2: `reverseWords`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/reverse.ts`
- Modify: `README.md`
- Test: `tests/reverse.test.ts`

**Claim:** I can import reverseWords from its own module and see `'one two three'` become `'three two one'`, and the README table lists it. (derived)
Machine: M1. `reverseWords('one two three')` is `'three two one'` — the words in reverse order, joined by single spaces. M2. Surrounding and repeated whitespace is normalised: `reverseWords('  a   b ')` is `'b a'`. M3. `reverseWords('')` is `''` and `reverseWords('solo')` is `'solo'`. M4. `README.md` has a table row whose first cell names `reverseWords` and whose second
cell names `src/reverse.ts`. M5. `src/reverse.ts` exports `reverseWords`, and `tests/reverse.test.ts` imports
it from `../src/reverse` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `reverseWords(text: string) -> string`

**Context:** The README at BASE ends with a three-column table of four rows (`slugify`,
`camelCase`, `titleCase`, `truncate`); add one row of the same shape for `reverseWords` under the
last one (two sibling tasks add their own rows to the same table in the same run — that is
expected, and the merge folds the rows; do not touch the existing rows). Match `/\S+/g`, reverse the array, join with one space; an empty match list joins to `''`, which is M3's first half for free. Words themselves are not reversed character-wise: `reverseWords('ab cd')` is `'cd ab'`, never `'dc ba'`. This task is
`Review: peer`: a peer wrote `tests/reverse.test.ts` against the clauses above before you
started, and it is red at BASE for want of `src/reverse.ts`; run it as your test command and make
it green without editing it — an edit to the exam is recorded and named to the referee.
`tsconfig.json` names the Bun types already. The `Check:` lines under Global Constraints are the
driver's: the first two run in this clone before any review, the third is `(minor)` and only
recorded.

**Proof:**
- Test: `tests/reverse.test.ts`
- Legs: (a) `reverseWords('one two three')` equals `'three two one'` — a result that reverses characters (`'eerht owt eno'`) or keeps order fails [M1]; (b) `reverseWords('  a   b ')` equals `'b a'` — a result carrying the original runs of spaces or a leading/trailing space fails [M2]; (c) `reverseWords('')` equals `''` [M3]; (d) `reverseWords('solo')` equals `'solo'` [M3].
- Run: grep -qE '^\| .reverseWords. \| .src/reverse\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the existing rows
  [M4].
- Run: grep -qE "from '\.\./src/reverse'" tests/reverse.test.ts && grep -qE '^export (const|function) reverseWords\b' src/reverse.ts && ! grep -rlE '(const|function) reverseWords\b' src --exclude=reverse.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `reverseWords` from `../src/reverse`,
  that file exports it at top level, and no other file under `src/` defines a `reverseWords` — a
  helper defined in an existing module or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/reverse.ts`

### Task 3: `isPalindrome`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/palindrome.ts`
- Modify: `README.md`
- Test: `tests/palindrome.test.ts`

**Claim:** I can import isPalindrome from its own module and see `'A man, a plan, a canal: Panama'` become `true`, and the README table lists it. (derived)
Machine: M1. `isPalindrome('A man, a plan, a canal: Panama')` is `true` and `isPalindrome('No lemon, no melon')` is `true` — only ASCII letters and digits are compared, case-insensitively; every other character is ignored. M2. `isPalindrome('race a car')` is `false` and `isPalindrome('ab')` is `false`. M3. `isPalindrome('')` is `true` and `isPalindrome('12321')` is `true`. M4. `README.md` has a table row whose first cell names `isPalindrome` and whose second
cell names `src/palindrome.ts`. M5. `src/palindrome.ts` exports `isPalindrome`, and `tests/palindrome.test.ts` imports
it from `../src/palindrome` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `isPalindrome(text: string) -> boolean`

**Context:** The README at BASE ends with a three-column table of four rows (`slugify`,
`camelCase`, `titleCase`, `truncate`); add one row of the same shape for `isPalindrome` under the
last one (two sibling tasks add their own rows to the same table in the same run — that is
expected, and the merge folds the rows; do not touch the existing rows). Normalise with `text.toLowerCase().replace(/[^a-z0-9]/g, '')`, then compare the string with its reverse (`[...s].reverse().join('')`). The empty normalised string is a palindrome (M3), so do not special-case it to `false`. Return a real `boolean`, not a truthy value. This task is
`Review: peer`: a peer wrote `tests/palindrome.test.ts` against the clauses above before you
started, and it is red at BASE for want of `src/palindrome.ts`; run it as your test command and make
it green without editing it — an edit to the exam is recorded and named to the referee.
`tsconfig.json` names the Bun types already. The `Check:` lines under Global Constraints are the
driver's: the first two run in this clone before any review, the third is `(minor)` and only
recorded.

**Proof:**
- Test: `tests/palindrome.test.ts`
- Legs: (a) `isPalindrome('A man, a plan, a canal: Panama')` is exactly `true` and `isPalindrome('No lemon, no melon')` is exactly `true` — a result that compares punctuation or case (`false`) fails [M1]; (b) `isPalindrome('race a car')` is exactly `false` and `isPalindrome('ab')` is exactly `false` — a result that only checks the first and last characters passes `'ab'`'s neighbour `'aba'` but must fail `'ab'` [M2]; (c) `isPalindrome('')` is exactly `true` [M3]; (d) `isPalindrome('12321')` is exactly `true` [M3]; (e) `isPalindrome('a_')` is exactly `true` and `isPalindrome('+ab a')` is exactly `true` — the underscore and the plus sign are ignored like any other non-alphanumeric character, so a strip built on `\W` (which keeps `_`) or on a hand-listed set of punctuation that misses `+` fails [M1].
- Run: grep -qE '^\| .isPalindrome. \| .src/palindrome\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the existing rows
  [M4].
- Run: grep -qE "from '\.\./src/palindrome'" tests/palindrome.test.ts && grep -qE '^export (const|function) isPalindrome\b' src/palindrome.ts && ! grep -rlE '(const|function) isPalindrome\b' src --exclude=palindrome.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `isPalindrome` from `../src/palindrome`,
  that file exports it at top level, and no other file under `src/` defines a `isPalindrome` — a
  helper defined in an existing module or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/palindrome.ts`
