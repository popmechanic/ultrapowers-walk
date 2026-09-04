## fleet run-3 — parked

| | |
|---|---|
| verdict | `NEEDS_ACK` |
| target | `popmechanic/ultrapowers-walk` at `739997153088ff046b187b9520f19810b138e5a5` |
| engine | `dd269bee39fe891c9e695a6a773be7c8fc07e2ae` |
| plan | `.ultrapowers/plan.md` at `8806eddc879c9f444627228d72e49f2d03eea0c4` |
| branch | `ultra/integration-run-3` |
| vm | `fleet-r3-2609041837-c755` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-3",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-3/report.json",
  "branch": "ultra/integration-run-3",
  "gateCheck": {
    "verdict": "NEEDS_ACK",
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
    "acks": [
      {
        "type": "deferred:external",
        "detail": "Plan-level Claim clause: \"every task's exam was written by a peer before the implementer started\" (Tasks 1-3, all Review: peer) \u2014 The exams (tests/count.test.ts, tests/reverse.test.ts, tests/palindrome.test.ts) are present, structurally complete, and each asserts its task's Machine clauses leg-by-leg; but the wave landed as a single squashed fold commit (eae4e41), so the integrated tree carries no authorship-order evidence. This clause is settled by the run's own peer/referee records, not by anything readable in the tree. [structural false-green: sandbox could not execute it against the target]"
      }
    ],
    "repo": "/home/exedev/target"
  },
  "gateCheckExit": 2,
  "acceptance": {
    "disposition": "suite",
    "exit": 0,
    "output": "{\"sealId\": \"(suite)\", \"status\": \"OK\", \"passed\": true, \"exitCode\": 0, \"output\": \"$ bunx tsc --noEmit && bun test\\nbun test v1.4.0 (34cbb9a40)\\n\\ntests/count.test.ts:\\n(pass) leg (a) [M1] runs of whitespace separate words and do not count as words [0.11ms]\\n(pass) leg (a) [M1] the double space is not an empty word and tabs/newlines are not kept inside a word [0.03ms]\\n(pass) leg (b) [M2] the empty string counts 0 [0.01ms]\\n(pass) leg (c) [M2] a whitespace-only string counts 0\\n(pass) leg (d) [M3] a lone word counts 1\\n(pass) [Produces] wordCount returns a number [0.02ms]\\n(pass) README leg [M4] the README table has a wordCount row naming src/count.ts [0.27ms]\\n(pass) README leg [M4] the existing table rows and header are untouched [0.05ms]\\n(pass) module leg [M5] src/count.ts exports wordCount at top level [0.08ms]\\n(pass) module leg [M5] the exam imports wordCount from ../src/count [0.05ms]\\n(pass) module leg [M5] no other module under src/ defines wordCount [0.40ms]\\n(pass) [global constraint] src/index.ts is not created [0.03ms]\\n\\ntests/reverse.test.ts:\\n(pass) leg (a) [M1]: reverseWords(\\\"one two three\\\") is \\\"three two one\\\" [0.06ms]\\n(pass) leg (a) [M1]: words are not reversed character-wise and the order does change [0.03ms]\\n(pass) leg (b) [M2]: reverseWords(\\\"  a   b \\\") is \\\"b a\\\" [0.01ms]\\n(pass) leg (b) [M2]: runs of whitespace collapse to one space, edges are trimmed [0.03ms]\\n(pass) leg (c) [M3]: reverseWords(\\\"\\\") is \\\"\\\"\\n(pass) leg (c) [M3]: whitespace-only input has no words and joins to \\\"\\\"\\n(pass) leg (d) [M3]: reverseWords(\\\"solo\\\") is \\\"solo\\\"\\n(pass) README leg [M4]: README.md has a `reverseWords` | `src/reverse.ts` table row [0.21ms]\\n(pass) README leg [M4]: the existing four rows keep their shape [0.05ms]\\n(pass) module leg [M5]: the test imports from ../src/reverse and that file exports reverseWords [0.09ms]\\n(pass) module leg [M5]: no other file under src/ defines reverseWords, and there is no barrel [0.15ms]\\n\\ntests/truncate.test.ts:\\n(pass) text no longer than max comes back unchanged [0.06ms]\\n(pass) a cut is max-1 characters plus one ellipsis, exactly max long [0.02ms]\\n(pass) a max of 1 leaves just the ellipsis [0.01ms]\\n(pass) a max of 0 throws an Error naming 0 [0.07ms]\\n(pass) a max of -1 throws an Error naming -1 [0.03ms]\\n\\ntests/camel.test.ts:\\n(pass) upper-cases every segment after the first [0.12ms]\\n(pass) leading, trailing and doubled hyphens vanish [0.02ms]\\n(pass) a single segment comes back unchanged\\n(pass) the empty string stays empty\\n\\ntests/slug.test.ts:\\n(pass) lower-cases and hyphenates [0.10ms]\\n(pass) trims hyphens from both ends [0.02ms]\\n(pass) the empty string stays empty\\n\\ntests/palindrome.test.ts:\\n(pass) leg (a) [M1]: punctuation and case are ignored, so both sentences are exactly true [0.14ms]\\n(pass) leg (b) [M2]: a non-palindrome is exactly false, and so is the bare pair \\\"ab\\\" [0.05ms]\\n(pass) leg (c) [M3]: the empty string is exactly true [0.01ms]\\n(pass) leg (d) [M3]: a digit palindrome is exactly true\\n(pass) leg (e) [M1]: underscore and plus sign are ignored like any other non-alphanumeric\\n(pass) [Produces] the result is a real boolean, not a truthy value [0.04ms]\\n(pass) README leg [M4]: the README table has a row for isPalindrome | src/palindrome.ts [0.07ms]\\n(pass) module leg [M5]: src/palindrome.ts exports isPalindrome at top level [0.04ms]\\n(pass) module leg [M5]: no other file under src/ defines isPalindrome [0.16ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.07ms]\\n(pass) interior whitespace is kept as is [0.01ms]\\n(pass) a tab separator survives unchanged\\n(pass) the empty string stays empty [0.01ms]\\n\\n 48 pass\\n 0 fail\\n 101 expect() calls\\nRan 48 tests across 7 files. [19.00ms]\"}\n"
  },
  "verdict": "NEEDS_ACK"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-3/.ultrapowers/runs/3/

- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-3/.ultrapowers/plan.md
