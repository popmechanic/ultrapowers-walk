## fleet run-5 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `f516d81ce0fc3dcb3bf7902653f3d10522069e60` |
| engine | `7b082042c1044eb88df4a62da1c7bbc2c96f5326` |
| plan | `.ultrapowers/plan.md` at `2acabd64a87a7c686cb6e66d024d1d122c771540` |
| branch | `ultra/integration-run-5` |
| vm | `fleet-r5-2609050806-2465` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-5",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-5/report.json",
  "branch": "ultra/integration-run-5",
  "gateCheck": {
    "verdict": "PASS",
    "checks": [
      {
        "name": "report-parse",
        "ok": true,
        "detail": ""
      },
      {
        "name": "clean-tree",
        "ok": true,
        "detail": ""
      },
      {
        "name": "wave-merges",
        "ok": true,
        "detail": ""
      },
      {
        "name": "head-match",
        "ok": true,
        "detail": ""
      },
      {
        "name": "git-verified",
        "ok": true,
        "detail": ""
      },
      {
        "name": "ancestry",
        "ok": true,
        "detail": ""
      },
      {
        "name": "deliverables",
        "ok": true,
        "detail": ""
      }
    ],
    "acks": [],
    "repo": "/home/exedev/target"
  },
  "gateCheckExit": 0,
  "acceptance": {
    "disposition": "suite",
    "exit": 0,
    "output": "s) README leg [M4]: the README table has a row for isAnagram | src/anagram.ts [0.06ms]\\n(pass) module leg [M5]: src/anagram.ts exports isAnagram at top level [0.03ms]\\n(pass) module leg [M5]: no other file under src/ defines isAnagram [0.13ms]\\n\\ntests/reverse.test.ts:\\n(pass) leg (a) [M1]: reverseWords(\\\"one two three\\\") is \\\"three two one\\\" [0.02ms]\\n(pass) leg (a) [M1]: words are not reversed character-wise and the order does change [0.02ms]\\n(pass) leg (b) [M2]: reverseWords(\\\"  a   b \\\") is \\\"b a\\\"\\n(pass) leg (b) [M2]: runs of whitespace collapse to one space, edges are trimmed [0.02ms]\\n(pass) leg (c) [M3]: reverseWords(\\\"\\\") is \\\"\\\"\\n(pass) leg (c) [M3]: whitespace-only input has no words and joins to \\\"\\\"\\n(pass) leg (d) [M3]: reverseWords(\\\"solo\\\") is \\\"solo\\\"\\n(pass) README leg [M4]: README.md has a `reverseWords` | `src/reverse.ts` table row [0.11ms]\\n(pass) README leg [M4]: the existing four rows keep their shape [0.03ms]\\n(pass) module leg [M5]: the test imports from ../src/reverse and that file exports reverseWords [0.05ms]\\n(pass) module leg [M5]: no other file under src/ defines reverseWords, and there is no barrel [0.09ms]\\n\\ntests/truncate.test.ts:\\n(pass) text no longer than max comes back unchanged [0.04ms]\\n(pass) a cut is max-1 characters plus one ellipsis, exactly max long [0.01ms]\\n(pass) a max of 1 leaves just the ellipsis\\n(pass) a max of 0 throws an Error naming 0 [0.05ms]\\n(pass) a max of -1 throws an Error naming -1 [0.02ms]\\n\\ntests/camel.test.ts:\\n(pass) upper-cases every segment after the first [0.05ms]\\n(pass) leading, trailing and doubled hyphens vanish [0.01ms]\\n(pass) a single segment comes back unchanged\\n(pass) the empty string stays empty\\n\\ntests/slug.test.ts:\\n(pass) lower-cases and hyphenates [0.05ms]\\n(pass) trims hyphens from both ends\\n(pass) the empty string stays empty\\n\\ntests/snake.test.ts:\\n(pass) leg (a) [M1]: snakeCase('helloWorld') is 'hello_world' [0.04ms]\\n(pass) leg (a) [M1]: snakeCase('HelloWorldAgain') is 'hello_world_again'\\n(pass) leg (b) [M2]: snakeCase('kebab-case-in') is 'kebab_case_in'\\n(pass) leg (b) [M2]: snakeCase('two words') is 'two_words'\\n(pass) leg (b) [M2]: a run of whitespace is one boundary, not several\\n(pass) leg (b) [M2]: snakeCase('already_snake') is 'already_snake'\\n(pass) leg (c) [M3]: snakeCase('') is ''\\n(pass) leg (c) [M3]: snakeCase('solo') is 'solo' [0.14ms]\\n(pass) leg (d) [M4]: README.md has a table row for snakeCase / src/snake.ts [0.04ms]\\n(pass) leg (d) [M4]: that row has the same three-column shape as the existing rows [0.08ms]\\n(pass) leg (e) [M5]: src/snake.ts exports snakeCase at top level [0.03ms]\\n(pass) leg (e) [M5]: this test imports snakeCase from '../src/snake' [0.03ms]\\n(pass) leg (e) [M5]: the import is the produced contract snakeCase(text: string) -> string [0.01ms]\\n(pass) leg (e) [M5]: no other module under src/ defines snakeCase [0.19ms]\\n\\ntests/palindrome.test.ts:\\n(pass) leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true [0.05ms]\\n(pass) leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair \\\"ab\\\" [0.04ms]\\n(pass) leg (c) [M3]: the empty string is exactly true\\n(pass) leg (d) [M3]: a digit palindrome is exactly true\\n(pass) leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric\\n(pass) [Produces] the result is a real boolean, not a truthy value [0.03ms]\\n(pass) README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts [0.07ms]\\n(pass) module leg [M5]: src/palindrome.ts exports isPalindrome at top level [0.05ms]\\n(pass) module leg [M5]: no other file under src/ defines isPalindrome [0.15ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.07ms]\\n(pass) interior whitespace is kept as is [0.01ms]\\n(pass) a tab separator survives unchanged\\n(pass) the empty string stays empty [0.01ms]\\n\\n 95 pass\\n 0 fail\\n 218 expect() calls\\nRan 95 tests across 12 files. [39.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-5/.ultrapowers/runs/5/

- approve-receipt.json
- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-5/.ultrapowers/plan.md
