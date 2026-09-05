# Smoke 0.3.18: tags, no branches, and a Closes line

**Grammar:** claims-v1

**Claim:** I can import countVowels from its own module and see `'Ada Lovelace'` become `4`, and
the README table lists it. (elicited)

**Goal:** The confidence run for 0.3.18 on `popmechanic/ultrapowers-walk`: the first launch on the
engine whose sandbox tags the plan commit and the evidence head and deletes both branches at
publish (#624), and whose PR body ends with a `Closes` line read from the plan (#679). It exists so
the operator can see a run end with two tags, no `ultra/*` branch, and walk issue #9 closed by the
self-merge. Same shape as runs 3–9 (one peer-examined helper adding a row to the README table).
**Closes:** #9

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** none — this plan descends from the operator's sentence above (walk issue #9, 2026-09-05).

**Parallelization rationale:** One wave, width 1. One module, one contract; a one-task plan is
linear by construction.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e src/snake.ts && test -e src/kebab.ts
- Check: grep -rn 'TODO' src tests (minor)
- No dependency is added to `package.json`; no helper imports from another helper's module,
  and there is no barrel file (`src/index.ts` is not created).
- The modules at BASE under `src/` and their test files under `tests/` are not edited.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the rows already there.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `countVowels`

**Type:** implementation
**Review:** peer

**Files:**
- Create: `src/vowels.ts`
- Modify: `README.md`
- Test: `tests/vowels.test.ts`

**Claim:** I can import countVowels from its own module and see 'Ada Lovelace' become 4, and the README table lists it. (quoted from #9)
Machine: M1. `countVowels('Ada Lovelace')` is `4` and `countVowels('rhythm')` is `0` — the
vowels are `a`, `e`, `i`, `o`, `u` and nothing else, counted with multiplicity. M2. Case is
ignored: `countVowels('AEIOU')` is `5` and `countVowels('aeiou')` is `5`; and `countVowels('y')`
is `0` — `y` is never a vowel here. M3. `countVowels('')` is `0` and
`countVowels('123 !?')` is `0`. M4. `README.md` has a table row whose first cell names
`countVowels` and whose second cell names `src/vowels.ts`. M5. `src/vowels.ts` exports
`countVowels`, and `tests/vowels.test.ts` imports it from `../src/vowels` — no other module of
`src/` defines it.

**Authorized-by:** walk issue #9 (2026-09-05).

**Interfaces:**
- Consumes: none
- Produces: `countVowels(text: string) -> number`

**Context:** The README at BASE ends with a three-column table (`Function | Module | Does`);
add one row of the same shape for `countVowels` under the last one and do not touch the existing
rows. One shape that satisfies every clause: match `/[aeiou]/gi` and return the match count (`0`
when there is none). Return a `number`. This task is `Review: peer`: a peer writes
`tests/vowels.test.ts` against the clauses above; the driver runs it on your tree before any
referee reads the patch, and an edit to the exam is recorded and named to the referee — so do not
write at that path. `tsconfig.json` names the Bun types already. The `Check:` lines under Global
Constraints are the driver's: the first two run in this clone before any review, the third is
`(minor)` and only recorded.
**BASE facts:** (generated at 2ae4528)
- `README.md` blob 8f2c587
- `tsconfig.json` blob 66a1ea4
- `src/slug.ts` blob 9b9f54a

**Proof:**
- Test: `tests/vowels.test.ts`
- Legs: (a) `countVowels('Ada Lovelace')` equals `4` and `countVowels('rhythm')` equals `0` — a
  result that counts consonants, or counts each distinct vowel once, fails [M1]; (b)
  `countVowels('AEIOU')` equals `5`, `countVowels('aeiou')` equals `5`, and `countVowels('y')`
  equals `0` — a case-sensitive count, or one that admits `y`, fails [M2]; (c) `countVowels('')`
  equals `0` and `countVowels('123 !?')` equals `0` [M3].
- Run: grep -qE '^\| .countVowels. \| .src/vowels\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function in
  its first cell and the module in its second, in the same shape as the existing rows [M4].
- Run: grep -qE "from '\.\./src/vowels'" tests/vowels.test.ts && grep -qE '^export (const|function) countVowels\b' src/vowels.ts && ! grep -rlE '(const|function) countVowels\b' src --exclude=vowels.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `countVowels` from
  `../src/vowels`, that file exports it at top level, and no other file under `src/` defines a
  `countVowels` [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/vowels.ts`
