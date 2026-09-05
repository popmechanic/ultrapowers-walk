# Smoke 0.3.17: a held run keeps its PR open

**Grammar:** claims-v1

**Claim:** I can import isPangram from its own module and see
`'The quick brown fox jumps over the lazy dog'` become `true`, and the README table lists it.
(elicited)

**Goal:** The second half of the 0.3.17 confidence check: the first launch with `--hold` (#660,
PR #677). It exists so the operator can see a fleet run on `popmechanic/ultrapowers-walk` end
with its PR open and green, merged by nobody — the measurement shape. Same shape as runs 3–7
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
- The modules at BASE under `src/` and their test files under `tests/` are not edited.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the rows already there.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `isPangram`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/pangram.ts`
- Modify: `README.md`
- Test: `tests/pangram.test.ts`

**Claim:** I can import isPangram from its own module and see
`'The quick brown fox jumps over the lazy dog'` become `true`, and the README table lists it.
(derived)
Machine: M1. `isPangram('The quick brown fox jumps over the lazy dog')` is `true` and
`isPangram('The quick brown fox jumps over the lazy cat')` is `false` — every one of the 26
letters `a`–`z` appears at least once, or the answer is `false`. M2. Case and non-letters are
ignored: `isPangram('ABCDEFGHIJKLMNOPQRSTUVWXYZ')` is `true`, `isPangram('a-b-c d.e.f g/h/i
jklmnop, qrstuv; wxyz!')` is `true`, and `isPangram('abcdefghijklmnopqrstuvwxy 123!')` is
`false` — a digit never stands in for a letter. M3. `isPangram('')` is `false`. M4.
`README.md` has a table row whose first cell names `isPangram` and whose second cell names
`src/pangram.ts`. M5. `src/pangram.ts` exports `isPangram`, and `tests/pangram.test.ts` imports
it from `../src/pangram` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-05.

**Interfaces:**
- Consumes: none
- Produces: `isPangram(text: string) -> boolean`

**Context:** The README at BASE ends with a three-column table (`Function | Module | Does`);
add one row of the same shape for `isPangram` under the last one and do not touch the existing
rows. One shape that satisfies every clause: lower-case the text, keep only `a`–`z`, and
answer whether the set of kept characters has size 26. Return a `boolean`. This task is
`Review: peer`: a peer writes `tests/pangram.test.ts` against the clauses above; the driver
runs it on your tree before any referee reads the patch, and an edit to the exam is recorded
and named to the referee — so do not write at that path. `tsconfig.json` names the Bun types
already. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.
**BASE facts:** (generated at 2ae4528)
- `README.md` blob 8f2c587
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/pangram.test.ts`
- Legs: (a) `isPangram('The quick brown fox jumps over the lazy dog')` equals `true` and
  `isPangram('The quick brown fox jumps over the lazy cat')` equals `false` — a result that
  only checks length, or that answers `true` when one letter is missing, fails [M1]; (b)
  `isPangram('ABCDEFGHIJKLMNOPQRSTUVWXYZ')` equals `true`, `isPangram('a-b-c d.e.f g/h/i
  jklmnop, qrstuv; wxyz!')` equals `true`, and `isPangram('abcdefghijklmnopqrstuvwxy 123!')`
  equals `false` — a result that is case-sensitive, that trips on punctuation, or that lets a
  digit count as a letter, fails [M2]; (c) `isPangram('')` equals `false` [M3].
- Run: grep -qE '^\| .isPangram. \| .src/pangram\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/pangram'" tests/pangram.test.ts && grep -qE '^export (const|function) isPangram\b' src/pangram.ts && ! grep -rlE '(const|function) isPangram\b' src --exclude=pangram.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `isPangram` from
  `../src/pangram`, that file exports it at top level, and no other file under `src/` defines
  an `isPangram` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/pangram.ts`
