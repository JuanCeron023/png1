# Review

This phase is distilled from Review Gate and Occam (the review agent). Final quality gate before the change is ready.

The core principle: **deterministic checks first, judgment second**. Automated checks have full recall on their class — use them before spending judgment.

## 1. Deterministic checks
Run everything the repo defines:
- Lint / format
- Type checking
- Full test suite
- Build
- Any repo-specific checks (CI scripts, pre-commit hooks)

Every finding is fixed or acknowledged with evidence. Never skipped silently.

## 2. Sibling surface sweep
For every file the diff touches, search for sibling surfaces:
- Does the feature appear in docs, README, help text, config files?
- If you renamed something, grep repo-wide for the old name — zero hits required.
- If you changed behavior, check every documentation surface that mentions it.
- Check tests: are there tests that encode the OLD behavior?

A file already in the diff is NOT automatically covered — check if UNTOUCHED lines in that file reference the changed behavior.

- For the complete catalog of essential review lenses (Stale Values, Callers, Surfaces, Force-Red, Expanded Domains), see `references/review-lenses.md`.

## 3. Caller and dependency sweep
If the change modified a function's contract (new param, new error, changed return):
- Find ALL call sites outside the diff.
- Verify each handles the new contract correctly.
- Or acknowledge the gap with a reason.

## 4. Review the diff holistically
Look for:
- Logic errors the tests might not catch.
- Race conditions or ordering issues.
- Missing error handling.
- Hardcoded values that should be configurable.
- TODOs or temporary code left behind.
- Inconsistency with existing patterns in the codebase.

## 5. Validate QA Scenarios & Architecture Integrity (QA Role)
- **Execute every QA scenario** established in the contract:
  - Run the automated test suite if tests were authored.
  - If no framework exists, test pragmatically: execute CLI commands, send API payloads, or run temporary scratch scripts to observe the actual output.
  - Verify happy paths, edge cases, error handling, and realistic system conditions.
- **Verify against the Architecture Diagram (Phase 3):** Does the code touch only the components and data flows declared in the diagram? Flag any undocumented side effects or unintended dependencies.
- Verify the **EFFECT**, not the **ARTIFACT**: computed style over "class is in CSS", real HTTP response over "env var is set", live output over "code looks right".
- Refute findings at the layer of the claim: a unit test of a helper does not refute an ordering defect at the caller.

## 6. Strict Failure Loop (If QA or Checks Fail)
Never patch code casually during review:
1. Report the exact failing scenario or check, accompanied by verbatim command output/evidence.
2. Route the defect back through the formal pipeline:
   $$\text{QA / Review} \rightarrow \text{Coder (Phase 4)} \rightarrow \text{Cleaner (Phase 5)} \rightarrow \text{Hardener (Phase 6)} \rightarrow \text{QA (Phase 7)}$$
3. Repeat this loop until all required scenarios pass and the resulting code satisfies clean code standards.

## 7. Report Findings
- When running as a delegated subagent, prefer a different model context than the one that wrote the code ("fresh eyes" principle from Occam).

Structure findings by severity:
- **Blockers**: Must fix before promotion/merge.
- **Improvements**: Should fix, but do not block delivery.
- **Notes**: Informational observations for future tickets.

Always include:
- **Exemptions claimed**: Each with its one-sentence verifiable evidence.
- **Out-of-scope findings**: Real issues discovered outside the diff's scope (do not let them die in conversation—document them clearly).

## Complete when
All deterministic checks pass. All QA scenarios pass with observed evidence. The code faithfully matches the Architecture Diagram. No open blockers remain. The change is ready for human promotion.
