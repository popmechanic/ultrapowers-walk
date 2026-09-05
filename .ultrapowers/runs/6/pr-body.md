## fleet run-6 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `208c1e80ced66786acf808c3e98306638db330e4` |
| engine | `620873b5c4e13de209c318b94ace3d22aae50335` |
| plan | `.ultrapowers/plan.md` at `968da1deaa4fea8aed80035c3b900a5cde5c9ac6` |
| branch | `ultra/integration-run-6` |
| vm | `fleet-r6-2609050917-887a` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-6",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-6/report.json",
  "branch": "ultra/integration-run-6",
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
    "output": "\\n(pass) leg (a) [M1] banana counts 3 and rhythm counts 0 [0.04ms]\\n(pass) leg (a) [M1] y is not a vowel and consonants are not what is counted [0.04ms]\\n(pass) leg (b) [M2] an all-upper-case AEIOU counts 5 [0.01ms]\\n(pass) leg (b) [M2] mixed-case Queue counts 4 [0.01ms]\\n(pass) leg (b) [M2] counting lower-case only fails [0.03ms]\\n(pass) leg (c) [M3] the empty string counts 0 [0.01ms]\\n(pass) leg (c) [M3] a lone consonant counts 0 [0.01ms]\\n(pass) [Produces] countVowels returns a number [0.02ms]\\n(pass) README leg [M4] the README table has a countVowels row naming src/vowels.ts [0.14ms]\\n(pass) README leg [M4] the existing ten table rows and header are untouched [0.12ms]\\n(pass) module leg [M5] src/vowels.ts exports countVowels at top level [0.03ms]\\n(pass) module leg [M5] the exam imports countVowels from ../src/vowels [0.06ms]\\n(pass) module leg [M5] no other module under src/ defines countVowels [0.21ms]\\n(pass) [global constraint] src/index.ts is not created [0.04ms]\\n\\ntests/capitalize.test.ts:\\n(pass) leg (a) [M1]: capitalize('ada') is 'Ada' [0.05ms]\\n(pass) leg (a) [M1]: upper-casing the whole word, or returning the input, fails [0.04ms]\\n(pass) leg (b) [M2]: capitalize('aDA') is 'ADA' [0.02ms]\\n(pass) leg (b) [M2]: lower-casing the rest fails [0.03ms]\\n(pass) leg (b) [M2]: capitalize('  ada') is '  ada' [0.02ms]\\n(pass) leg (b) [M2]: trimming, or capitalising past the leading space, fails [0.04ms]\\n(pass) leg (c) [M3]: capitalize('') is '' [0.01ms]\\n(pass) leg (c) [M3]: capitalize('A') is 'A' [0.02ms]\\n(pass) leg (c) [M3]: capitalize('a') is 'A' [0.01ms]\\n(pass) [Produces] capitalize(text: string) returns a string [0.02ms]\\n(pass) README leg [M4]: README.md has a `capitalize` | `src/capitalize.ts` table row [0.23ms]\\n(pass) README leg [M4]: the header and the ten existing rows are untouched [0.10ms]\\n(pass) module leg [M5]: the exam imports from ../src/capitalize and that file exports capitalize [0.11ms]\\n(pass) module leg [M5]: no other file under src/ defines capitalize, and there is no barrel [0.23ms]\\n\\ntests/snake.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.14ms]\\n(pass) leg (b) [M2]: hyphens and whitespace runs are word boundaries [0.04ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged [0.02ms]\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string [0.02ms]\\n(pass) README leg [M4]: the table lists snakeCase against src/snake.ts [0.07ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.14ms]\\n(pass) README leg [M4]: the seven rows already there are untouched [0.08ms]\\n(pass) module leg [M5]: src/snake.ts exports snakeCase at top level [0.08ms]\\n(pass) module leg [M5]: the exam imports snakeCase from ../src/snake [0.06ms]\\n(pass) module leg [M5]: no other module of src/ defines snakeCase [0.22ms]\\n\\ntests/palindrome.test.ts:\\n(pass) leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true [0.15ms]\\n(pass) leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair \\\"ab\\\" [0.03ms]\\n(pass) leg (c) [M3]: the empty string is exactly true [0.02ms]\\n(pass) leg (d) [M3]: a digit palindrome is exactly true [0.02ms]\\n(pass) leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric [0.02ms]\\n(pass) [Produces] the result is a real boolean, not a truthy value [0.06ms]\\n(pass) README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts [0.15ms]\\n(pass) module leg [M5]: src/palindrome.ts exports isPalindrome at top level [0.10ms]\\n(pass) module leg [M5]: no other file under src/ defines isPalindrome [0.40ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.16ms]\\n(pass) interior whitespace is kept as is [0.02ms]\\n(pass) a tab separator survives unchanged [0.02ms]\\n(pass) the empty string stays empty [0.03ms]\\n\\n 142 pass\\n 0 fail\\n 363 expect() calls\\nRan 142 tests across 15 files. [40.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-6/.ultrapowers/runs/6/

- approve-receipt.json
- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-6/.ultrapowers/plan.md
