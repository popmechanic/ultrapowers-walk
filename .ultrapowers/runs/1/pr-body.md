## fleet run-1 — gate-green

| | |
|---|---|
| verdict | `PASS` |
| target | `popmechanic/ultrapowers-walk` at `a5cd141275ac512a6c9aaece9888e350b48a7680` |
| engine | `6c79cfbdad78a29e7dcdac6cb3c246d53bc2ecb5` |
| plan | `.ultrapowers/plan.md` at `6b7547caf0dd8a17a9a21d446ed00539f1499528` |
| branch | `ultra/integration-run-1` |
| vm | `fleet-r1-2609041730-7d98` |

### Checks

```json
{
  "mode": "gate",
  "stamp": "run-1",
  "reportPath": "/home/exedev/target/.claude/ultrapowers/run-run-1/report.json",
  "branch": "ultra/integration-run-1",
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
    "output": "{\"sealId\": \"(suite)\", \"status\": \"OK\", \"passed\": true, \"exitCode\": 0, \"output\": \"$ bunx tsc --noEmit && bun test\\nbun test v1.4.0 (34cbb9a40)\\n\\ntests/truncate.test.ts:\\n(pass) text no longer than max comes back unchanged [0.15ms]\\n(pass) a cut is max-1 characters plus one ellipsis, exactly max long [0.07ms]\\n(pass) a max of 1 leaves just the ellipsis [0.02ms]\\n(pass) a max of 0 throws an Error naming 0 [0.13ms]\\n(pass) a max of -1 throws an Error naming -1 [0.07ms]\\n\\ntests/camel.test.ts:\\n(pass) upper-cases every segment after the first [0.31ms]\\n(pass) leading, trailing and doubled hyphens vanish [0.04ms]\\n(pass) a single segment comes back unchanged [0.02ms]\\n(pass) the empty string stays empty [0.02ms]\\n\\ntests/slug.test.ts:\\n(pass) lower-cases and hyphenates [0.16ms]\\n(pass) trims hyphens from both ends [0.02ms]\\n(pass) the empty string stays empty [0.02ms]\\n\\ntests/title.test.ts:\\n(pass) upper-cases the first letter of every word and lower-cases the rest [0.22ms]\\n(pass) interior whitespace is kept as is [0.03ms]\\n(pass) a tab separator survives unchanged [0.02ms]\\n(pass) the empty string stays empty [0.03ms]\\n\\n 16 pass\\n 0 fail\\n 21 expect() calls\\nRan 16 tests across 4 files. [9.00ms]\"}\n"
  },
  "verdict": "PASS"
}
```

### Evidence

https://github.com/popmechanic/ultrapowers-walk/tree/ultra/evidence-run-1/.ultrapowers/runs/1/

- engine.log
- events.jsonl
- gate-receipt.json
- pr-body.md
- receipt.json
- report.json
- status.json

### Plan

https://github.com/popmechanic/ultrapowers-walk/blob/ultra/plan-run-1/.ultrapowers/plan.md
