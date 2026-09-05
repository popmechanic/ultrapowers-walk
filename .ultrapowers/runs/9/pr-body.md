## fleet run-9 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `2ae4528eac803773a52567729c66af2ecc746206` |
| engine | `e04154b702407ac1efabaa22db6e21eab706a5f1` |
| plan | `.ultrapowers/plan.md` at `fbef340ced5fd77cca19094c76e6df2f76025e88` |
| branch | `ultra/integration-run-9` |
| vm | `fleet-r9-2609051854-d3fc` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-9",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-9/report.json",
  "branch": "ultra/integration-run-9",
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
    "output": "ms]\\n(pass) the empty string stays empty [0.01ms]\\n\\ntests/kebab.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.12ms]\\n(pass) leg (b) [M2]: underscores and whitespace runs are word boundaries [0.02ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged [0.01ms]\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string [0.02ms]\\n(pass) README leg [M4]: the table lists kebabCase against src/kebab.ts [0.03ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.11ms]\\n(pass) README leg [M4]: the ten rows already there are untouched [0.06ms]\\n(pass) README leg [M4]: the new row sits under the last existing row [0.09ms]\\n(pass) module leg [M5]: src/kebab.ts exports kebabCase at top level [0.08ms]\\n(pass) module leg [M5]: the exam imports kebabCase from ../src/kebab [0.04ms]\\n(pass) module leg [M5]: no other module of src/ defines kebabCase [0.15ms]\\n\\ntests/slug.test.ts:\\n(pass) lower-cases and hyphenates [0.05ms]\\n(pass) trims hyphens from both ends [0.02ms]\\n(pass) the empty string stays empty\\n\\ntests/snake.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.08ms]\\n(pass) leg (b) [M2]: hyphens and whitespace runs are word boundaries [0.02ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged [0.02ms]\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string [0.02ms]\\n(pass) README leg [M4]: the table lists snakeCase against src/snake.ts [0.03ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.11ms]\\n(pass) README leg [M4]: the seven rows already there are untouched [0.05ms]\\n(pass) module leg [M5]: src/snake.ts exports snakeCase at top level [0.06ms]\\n(pass) module leg [M5]: the exam imports snakeCase from ../src/snake [0.04ms]\\n(pass) module leg [M5]: no other module of src/ defines snakeCase [0.16ms]\\n\\ntests/palindrome.test.ts:\\n(pass) leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true [0.07ms]\\n(pass) leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair \\\"ab\\\" [0.02ms]\\n(pass) leg (c) [M3]: the empty string is exactly true\\n(pass) leg (d) [M3]: a digit palindrome is exactly true\\n(pass) leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric [0.01ms]\\n(pass) [Produces] the result is a real boolean, not a truthy value [0.05ms]\\n(pass) README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts [0.11ms]\\n(pass) module leg [M5]: src/palindrome.ts exports isPalindrome at top level [0.07ms]\\n(pass) module leg [M5]: no other file under src/ defines isPalindrome [0.36ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.12ms]\\n(pass) interior whitespace is kept as is [0.02ms]\\n(pass) a tab separator survives unchanged [0.01ms]\\n(pass) the empty string stays empty [0.03ms]\\n\\ntests/pangram.test.ts:\\n(pass) leg (a) [M1]: the quick brown fox is exactly true, and its \\\"cat\\\" variant exactly false [0.08ms]\\n(pass) leg (b) [M2]: the upper-case alphabet is exactly true, so case is ignored [0.02ms]\\n(pass) leg (b) [M2]: an upper- and lower-case pair is one letter, not two [0.03ms]\\n(pass) leg (b) [M2]: punctuation and spacing are ignored, so the split alphabet is exactly true [0.02ms]\\n(pass) leg (b) [M2]: a digit never stands in for the missing letter, so this is exactly false [0.01ms]\\n(pass) leg (c) [M3]: the empty string is exactly false [0.01ms]\\n(pass) [Produces] the result is a real boolean, not a truthy or falsy stand-in [0.10ms]\\n(pass) README leg [M4]: the README table has a three-column row for isPangram | src/pangram.ts [0.16ms]\\n(pass) module leg [M5]: src/pangram.ts exports isPangram at top level and the exam imports it from ../src/pangram [0.07ms]\\n(pass) module leg [M5]: no other file under src/ defines isPangram [0.26ms]\\n\\n 105 pass\\n 0 fail\\n 264 expect() calls\\nRan 105 tests across 12 files. [28.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-9/.ultrapowers/runs/9/

- approve-receipt.json
- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-9/.ultrapowers/plan.md
