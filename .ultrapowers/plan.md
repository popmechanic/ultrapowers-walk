# Three more string helpers

**Grammar:** claims-v1

**Claim:** I can import titleCase, truncate and camelCase from their own modules and see
`'hello wORLD'` become `'Hello World'`, a 10-character cut that ends in one `…` and is exactly
10 long, and `'--foo--bar-'` become `'fooBar'` — and the README table lists all four
functions. (elicited)

**Goal:** Grow the one-function library to four, each helper its own module with its own test
file and its own README row. This is the stranger walk's plan on 0.3.12: three independent
contracts in one wave, all three writing a row into the same README table, so the fold is
exercised on a real same-file edit.

**Tech Stack:** Bun + TypeScript; `bunx tsc --noEmit && bun test` is the committed suite
(`bun run test`). No dependencies added.

**Spec:** `docs/superpowers/specs/2026-09-04-three-string-helpers.md` (for the reader; the
sandbox has no `docs/`, and every fact a worker needs is in its Context).

**Parallelization rationale:** One wave, width 3. The three helpers share no symbol — none
consumes another — so no edge is derived. All three `Modify: README.md`, one table row each;
that is a text overlap and folds at merge, so it orders nothing.

## Global Constraints

- No `any` and no non-null assertions in any file under `src/` or `tests/`.
- Check: ! grep -rnE 'as any|: any\b|![.)]' src tests
- Check: test -e src/slug.ts && test -e tests/slug.test.ts
- Check: grep -rn 'TODO' src tests (minor)
- No dependency is added to `package.json`; no helper imports from another helper's module,
  and there is no barrel file (`src/index.ts` is not created).
- `src/slug.ts` and `tests/slug.test.ts` are not edited.
- Error messages name the offending value, so a caller reading only the message knows what it
  passed.
- The README table keeps its three-column shape (`Function | Module | Does`); a new row has the
  same shape as the `slugify` row.

**Acceptance:** suite — the committed suite is the verification.

### Task 1: `titleCase`

**Type:** implementation

**Files:**
- Create: `src/title.ts`
- Modify: `README.md`
- Test: `tests/title.test.ts`

**Claim:** I can import titleCase from its own module and see `'hello wORLD'` become
`'Hello World'`, and the README table lists it. (derived)
Machine: M1. `titleCase('hello wORLD')` is `'Hello World'` and `titleCase('the QUICK brown')`
is `'The Quick Brown'` — the first letter of every whitespace-separated word upper-cased, the
rest lower-cased. M2. Interior whitespace is kept as is: `titleCase('a  b')` is `'A  B'` (two
spaces) and `titleCase('foo\tbar')` is `'Foo\tBar'` (the tab survives). M3. `titleCase('')`
is `''`. M4. `README.md` has a table row whose first cell names `titleCase` and whose second
cell names `src/title.ts`. M5. `src/title.ts` exports `titleCase`, and `tests/title.test.ts` imports it from
`../src/title` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `titleCase(text: string) -> string`

**Context:** The README at BASE ends with a three-column table whose only row is
`| \`slugify\` | \`src/slug.ts\` | title → URL slug |`; add one row of the same shape for
`titleCase` directly under it (a sibling task adds its own row to the same table in the same
run — that is expected, and the merge folds the rows; do not touch the `slugify` row).
"Word" means a maximal run of non-whitespace characters; split on `/(\s+)/` with a capturing
group so the separators come back and can be re-joined unchanged. `tsconfig.json` names the
Bun types already; import `expect`/`test` from `bun:test`. The `Check:` lines under Global
Constraints are the driver's: the first two run in this clone before any review, the third is
`(minor)` and only recorded.

**Proof:**
- Test: `tests/title.test.ts`
- Legs: (a) `titleCase('hello wORLD')` equals `'Hello World'` and `titleCase('the QUICK
  brown')` equals `'The Quick Brown'` — a result with any word not first-upper-rest-lower
  fails [M1]; (b) `titleCase('a  b')` equals `'A  B'` with exactly two interior spaces, so a
  single-space result fails [M2]; (c) `titleCase('foo\tbar')` equals `'Foo\tBar'`, so a
  result where the tab became a space fails [M2]; (d) `titleCase('')` equals `''` [M3].
- Run: grep -qE '^\| .titleCase. \| .src/title\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the `slugify` row
  [M4].
- Run: grep -qE "from '\.\./src/title'" tests/title.test.ts && grep -qE '^export (const|function) titleCase\b' src/title.ts && ! grep -rlE '(const|function) titleCase\b' src --exclude=title.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `titleCase` from `../src/title`,
  that file exports it at top level, and no other file under `src/` defines a `titleCase` — a
  helper defined in `src/slug.ts` or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/title.ts`

### Task 2: `truncate`

**Type:** implementation

**Files:**
- Create: `src/truncate.ts`
- Modify: `README.md`
- Test: `tests/truncate.test.ts`

**Claim:** I can import truncate from its own module and see a 10-character cut that ends in
one `…` and is exactly 10 long, and the README table lists it. (derived)
Machine: M1. When `text.length <= max`, `truncate(text, max)` returns `text` unchanged:
`truncate('short', 10)` is `'short'` and `truncate('exactlyten', 10)` is `'exactlyten'`.
M2. When `text.length > max`, the result is the first `max - 1` characters of `text` followed
by one `…` (U+2026): `truncate('hello wonderful world', 10)` is `'hello won…'`, and its
`.length` is exactly `10`; `truncate('ab', 1)` is `'…'`. M3. For each of `0` and `-1` as
`max`, `truncate('anything', max)` throws an `Error` whose message contains `String(max)`.
M4. `README.md` has a table row whose first cell names `truncate` and whose second cell names
`src/truncate.ts`. M5. `src/truncate.ts` exports `truncate`, and `tests/truncate.test.ts` imports it from
`../src/truncate` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `truncate(text: string, max: number) -> string`

**Context:** The README at BASE ends with a three-column table whose only row is
`| \`slugify\` | \`src/slug.ts\` | title → URL slug |`; add one row of the same shape for
`truncate` directly under it (a sibling task adds its own row to the same table in the same
run — that is expected, and the merge folds the rows; do not touch the `slugify` row). The
ellipsis is the single character U+2026, one UTF-16 code unit, so `.length` counts it as 1 —
the result of a cut is therefore exactly `max` long. Validate `max` before anything else, with
`Number.isInteger(max) && max >= 1`, and put `String(max)` in the message. `tsconfig.json`
names the Bun types already; import `expect`/`test` from `bun:test`. The `Check:` lines under
Global Constraints are the driver's: the first two run in this clone before any review, the
third is `(minor)` and only recorded.

**Proof:**
- Test: `tests/truncate.test.ts`
- Legs: (a) `truncate('short', 10)` equals `'short'` and `truncate('exactlyten', 10)` equals
  `'exactlyten'` — a result that appends `…` at the boundary fails [M1]; (b)
  `truncate('hello wonderful world', 10)` equals `'hello won…'` and its `.length` equals `10`,
  so a result of 11 characters (`max` characters plus the ellipsis) fails [M2]; (c)
  `truncate('ab', 1)` equals `'…'` [M2]; (d) `truncate('anything', 0)` throws an `Error`
  whose message contains `0` — a returned string fails the leg [M3]; (e) `truncate('anything',
  -1)` throws an `Error` whose message contains `-1` [M3].
- Run: grep -qE '^\| .truncate. \| .src/truncate\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the `slugify` row
  [M4].
- Run: grep -qE "from '\.\./src/truncate'" tests/truncate.test.ts && grep -qE '^export (const|function) truncate\b' src/truncate.ts && ! grep -rlE '(const|function) truncate\b' src --exclude=truncate.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `truncate` from `../src/truncate`,
  that file exports it at top level, and no other file under `src/` defines a `truncate` — a
  helper defined in `src/slug.ts` or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/truncate.ts`

### Task 3: `camelCase`

**Type:** implementation

**Files:**
- Create: `src/camel.ts`
- Modify: `README.md`
- Test: `tests/camel.test.ts`

**Claim:** I can import camelCase from its own module and see `'--foo--bar-'` become
`'fooBar'`, and the README table lists it. (derived)
Machine: M1. `camelCase('foo-bar-baz')` is `'fooBarBaz'` — the first segment stays as is and
every later segment gets its first letter upper-cased. M2. Leading, trailing and doubled
hyphens are ignored: `camelCase('--foo--bar-')` is `'fooBar'`. M3. A single segment is
returned unchanged, `camelCase('foo')` is `'foo'`, and `camelCase('')` is `''`. M4. `README.md`
has a table row whose first cell names `camelCase` and whose second cell names `src/camel.ts`. M5. `src/camel.ts` exports `camelCase`, and `tests/camel.test.ts` imports it from
`../src/camel` — no other module of `src/` defines it.

**Authorized-by:** the plan-level Claim above, signed by the operator 2026-09-04.

**Interfaces:**
- Consumes: none
- Produces: `camelCase(kebab: string) -> string`

**Context:** The README at BASE ends with a three-column table whose only row is
`| \`slugify\` | \`src/slug.ts\` | title → URL slug |`; add one row of the same shape for
`camelCase` directly under it (a sibling task adds its own row to the same table in the same
run — that is expected, and the merge folds the rows; do not touch the `slugify` row).
Split on `-`, drop the empty segments (that is what makes leading, trailing and doubled
hyphens vanish), keep segment 0 verbatim and upper-case only the first character of each
later segment — the rest of a segment is not lower-cased, so `camelCase('foo-BAR')` is
`'fooBAR'`. `tsconfig.json` names the Bun types already; import `expect`/`test` from
`bun:test`. The `Check:` lines under Global Constraints are the driver's: the first two run in
this clone before any review, the third is `(minor)` and only recorded.

**Proof:**
- Test: `tests/camel.test.ts`
- Legs: (a) `camelCase('foo-bar-baz')` equals `'fooBarBaz'` — a result that upper-cases the
  first segment (`'FooBarBaz'`) fails [M1]; (b) `camelCase('--foo--bar-')` equals `'fooBar'`,
  so a result carrying an empty-segment artefact such as `'FooBar'` or `'foo-Bar'` fails [M2];
  (c) `camelCase('foo')` equals `'foo'` — a result whose case changed, such as `'Foo'`, fails
  [M3]; (d) `camelCase('')` equals `''` — a result that is not the empty string fails [M3].
- Run: grep -qE '^\| .camelCase. \| .src/camel\.ts. \|' README.md
- The previous bullet is the leg for the README row: a table row starting with the function
  in its first cell and the module in its second, in the same shape as the `slugify` row
  [M4].
- Run: grep -qE "from '\.\./src/camel'" tests/camel.test.ts && grep -qE '^export (const|function) camelCase\b' src/camel.ts && ! grep -rlE '(const|function) camelCase\b' src --exclude=camel.ts | grep -q .
- The previous bullet is the leg for the module: the test imports `camelCase` from `../src/camel`,
  that file exports it at top level, and no other file under `src/` defines a `camelCase` — a
  helper defined in `src/slug.ts` or a barrel and re-labelled in the README fails [M5].

**Stale-if:**
- path-absent: `src/slug.ts`
- path-exists: `src/camel.ts`
