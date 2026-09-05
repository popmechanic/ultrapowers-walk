## fleet run-8 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `208c1e80ced66786acf808c3e98306638db330e4` |
| engine | `e04154b702407ac1efabaa22db6e21eab706a5f1` |
| plan | `.ultrapowers/plan.md` at `9adc2267dadde89fb579d3e9653603594943b01f` |
| branch | `ultra/integration-run-8` |
| vm | `fleet-r8-2609051848-c470` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-8",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-8/report.json",
  "branch": "ultra/integration-run-8",
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
    "output": " [M3]: reverseWords(\\\"\\\") is \\\"\\\"\\n(pass) leg (c) [M3]: whitespace-only input has no words and joins to \\\"\\\"\\n(pass) leg (d) [M3]: reverseWords(\\\"solo\\\") is \\\"solo\\\"\\n(pass) README leg [M4]: README.md has a `reverseWords` | `src/reverse.ts` table row [0.11ms]\\n(pass) README leg [M4]: the existing four rows keep their shape [0.03ms]\\n(pass) module leg [M5]: the test imports from ../src/reverse and that file exports reverseWords [0.05ms]\\n(pass) module leg [M5]: no other file under src/ defines reverseWords, and there is no barrel [0.10ms]\\n\\ntests/truncate.test.ts:\\n(pass) text no longer than max comes back unchanged [0.03ms]\\n(pass) a cut is max-1 characters plus one ellipsis, exactly max long [0.01ms]\\n(pass) a max of 1 leaves just the ellipsis\\n(pass) a max of 0 throws an Error naming 0 [0.05ms]\\n(pass) a max of -1 throws an Error naming -1 [0.02ms]\\n\\ntests/camel.test.ts:\\n(pass) upper-cases every segment after the first [0.05ms]\\n(pass) leading, trailing and doubled hyphens vanish\\n(pass) a single segment comes back unchanged\\n(pass) the empty string stays empty\\n\\ntests/kebab.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.09ms]\\n(pass) leg (b) [M2]: underscores and whitespace runs are word boundaries [0.02ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string\\n(pass) README leg [M4]: the table lists kebabCase against src/kebab.ts [0.02ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.07ms]\\n(pass) README leg [M4]: the ten rows already there are untouched [0.04ms]\\n(pass) README leg [M4]: the new row sits under the last existing row [0.05ms]\\n(pass) module leg [M5]: src/kebab.ts exports kebabCase at top level [0.04ms]\\n(pass) module leg [M5]: the exam imports kebabCase from ../src/kebab [0.03ms]\\n(pass) module leg [M5]: no other module of src/ defines kebabCase [0.09ms]\\n\\ntests/slug.test.ts:\\n(pass) lower-cases and hyphenates [0.03ms]\\n(pass) trims hyphens from both ends [0.01ms]\\n(pass) the empty string stays empty\\n\\ntests/snake.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.05ms]\\n(pass) leg (b) [M2]: hyphens and whitespace runs are word boundaries [0.01ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string [0.01ms]\\n(pass) README leg [M4]: the table lists snakeCase against src/snake.ts [0.02ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.07ms]\\n(pass) README leg [M4]: the seven rows already there are untouched [0.03ms]\\n(pass) module leg [M5]: src/snake.ts exports snakeCase at top level [0.03ms]\\n(pass) module leg [M5]: the exam imports snakeCase from ../src/snake [0.03ms]\\n(pass) module leg [M5]: no other module of src/ defines snakeCase [0.09ms]\\n\\ntests/palindrome.test.ts:\\n(pass) leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true [0.04ms]\\n(pass) leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair \\\"ab\\\" [0.01ms]\\n(pass) leg (c) [M3]: the empty string is exactly true\\n(pass) leg (d) [M3]: a digit palindrome is exactly true\\n(pass) leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric\\n(pass) [Produces] the result is a real boolean, not a truthy value [0.03ms]\\n(pass) README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts [0.06ms]\\n(pass) module leg [M5]: src/palindrome.ts exports isPalindrome at top level [0.05ms]\\n(pass) module leg [M5]: no other file under src/ defines isPalindrome [0.17ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.09ms]\\n(pass) interior whitespace is kept as is\\n(pass) a tab separator survives unchanged\\n(pass) the empty string stays empty [0.01ms]\\n\\n 95 pass\\n 0 fail\\n 232 expect() calls\\nRan 95 tests across 11 files. [14.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-8/.ultrapowers/runs/8/

- approve-receipt.json
- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-8/.ultrapowers/plan.md
