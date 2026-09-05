## fleet run-11 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `2ae4528eac803773a52567729c66af2ecc746206` |
| engine | `043b686f4489fe6fa1d804ed3e00a9362c2131e0` |
| plan | `.ultrapowers/plan.md` at `ac92cc413deb96f5f9a59cd237739f07cd498eb7` |
| branch | `ultra/integration-run-11` |
| vm | `fleet-r11-2609052124-c114` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-11",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-11/report.json",
  "branch": "ultra/integration-run-11",
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
    "output": ": a whitespace-only string has no words and joins to \\\"\\\"\\n(pass) leg (c) [M3]: initials(\\\"solo\\\") is \\\"S\\\"\\n(pass) [Produces] initials returns a string [0.01ms]\\n(pass) README leg [M4]: README.md has an `initials` | `src/initials.ts` table row [0.09ms]\\n(pass) README leg [M4]: the header and the seven existing rows are untouched [0.04ms]\\n(pass) module leg [M5]: the exam imports from ../src/initials and that file exports initials [0.06ms]\\n(pass) module leg [M5]: no other file under src/ defines initials, and there is no barrel [0.09ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.06ms]\\n(pass) interior whitespace is kept as is\\n(pass) a tab separator survives unchanged\\n(pass) the empty string stays empty [0.01ms]\\n\\ntests/vowels.test.ts:\\n(pass) leg (a) [M1] countVowels('Ada Lovelace') is 6 and countVowels('rhythm') is 0 [0.04ms]\\n(pass) leg (a) [M1] the count is neither the consonants nor the distinct vowels [0.01ms]\\n(pass) leg (a) [M1] repeated vowels are counted with multiplicity\\n(pass) leg (b) [M2] countVowels('AEIOU') is 5 and countVowels('aeiou') is 5\\n(pass) leg (b) [M2] the count is not case-sensitive\\n(pass) leg (b) [M2] countVowels('y') is 0 and y is never admitted [0.01ms]\\n(pass) leg (c) [M3] countVowels('') is 0\\n(pass) leg (c) [M3] countVowels('123 !?') is 0\\n(pass) [Produces] countVowels returns a number [0.01ms]\\n(pass) README leg [M4] the README table has a countVowels row naming src/vowels.ts [0.08ms]\\n(pass) README leg [M4] the existing table rows and header are untouched [0.05ms]\\n(pass) module leg [M5] src/vowels.ts exports countVowels at top level [0.03ms]\\n(pass) module leg [M5] the exam imports countVowels from ../src/vowels [0.03ms]\\n(pass) module leg [M5] no other module under src/ defines countVowels [0.11ms]\\n(pass) [global constraint] src/index.ts is not created [0.02ms]\\n\\ntests/anagram.test.ts:\\n(pass) leg (a) [M1] ('listen','silent') is exactly true and ('listen','silence') is exactly false [0.05ms]\\n(pass) leg (a) [M1] length-only and set-only comparisons are rejected [0.01ms]\\n(pass) leg (b) [M2] ('Dormitory','dirty room!') is exactly true \\u2014 case and non-letters ignored [0.01ms]\\n(pass) leg (b) [M2] ('aab','abb') is exactly false \\u2014 letter counts matter, not the set\\n(pass) leg (b) [M2] case alone is ignored, and non-letters alone are ignored [0.03ms]\\n(pass) leg (c) [M3] ('','') is exactly true\\n(pass) leg (c) [M3] ('a','') is exactly false\\n(pass) [Produces] isAnagram returns a real boolean [0.05ms]\\n(pass) README leg [M4] the README table has an isAnagram row naming src/anagram.ts [0.11ms]\\n(pass) README leg [M4] the header and the seven existing rows are untouched [0.04ms]\\n(pass) module leg [M5] src/anagram.ts exports isAnagram at top level [0.03ms]\\n(pass) module leg [M5] the exam imports isAnagram from ../src/anagram [0.03ms]\\n(pass) module leg [M5] no other module under src/ defines isAnagram [0.14ms]\\n(pass) [global constraint] src/index.ts is not created [0.03ms]\\n\\ntests/kebab.test.ts:\\n(pass) leg (a) [M1]: an upper-case letter starts a new word, lower-cased [0.05ms]\\n(pass) leg (b) [M2]: underscores and whitespace runs are word boundaries [0.02ms]\\n(pass) leg (c) [M3]: the empty string stays empty and a lone word is unchanged\\n(pass) legs (a)-(c) [M1-M3]: the return value is a string [0.01ms]\\n(pass) README leg [M4]: the table lists kebabCase against src/kebab.ts [0.02ms]\\n(pass) README leg [M4]: the new row keeps the three-column shape [0.06ms]\\n(pass) README leg [M4]: the ten rows already there are untouched [0.04ms]\\n(pass) README leg [M4]: the new row sits under the last existing row [0.06ms]\\n(pass) module leg [M5]: src/kebab.ts exports kebabCase at top level [0.04ms]\\n(pass) module leg [M5]: the exam imports kebabCase from ../src/kebab [0.03ms]\\n(pass) module leg [M5]: no other module of src/ defines kebabCase [0.09ms]\\n\\n 110 pass\\n 0 fail\\n 260 expect() calls\\nRan 110 tests across 12 files. [15.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence/run-11/.ultrapowers/runs/11/

- approve-receipt.json
- claude-version.txt
- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan/run-11/.ultrapowers/plan.md
Closes #9
