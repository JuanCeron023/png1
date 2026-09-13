---
name: feature
description: "Orchestrate a complete engineering workflow for any ticket, feature, or idea. Runs 7 sequential phases: Understand → Contract → Design → Implement → Clean → Verify → Review. Ensures professional-quality output with evidence-based decisions, clean code, edge case coverage, and thorough verification. Use for any development request from bug fixes to new features to refactors."
---

# Feature

One skill to take any ticket, feature, or idea from understanding to reviewed implementation. Each phase has a clear entry, exit, and evidence standard.

This system is distilled from a 20-skill evidence-driven engineering framework (`Railly/skills`) into a single actionable workflow.

## How to Use: Three Entry Paths

Depending on the nature of the request, choose the natural entry path:

### Path A: Jira / Product Ticket Flow (Business features, user stories, complex bugs)
Use when the request comes as a business requirement, user ticket, or feature idea where behavior and architecture must be agreed upon first:
$$\text{Recon (01)} \rightarrow \text{Specifier (02: Conceptual Scenarios)} \rightarrow \text{Architecture (03: Mermaid)} \rightarrow \text{Coder (04)} \rightarrow \text{Cleaner (05)} \rightarrow \text{Hardener (06)} \rightarrow \text{QA (07)}$$

### Path B: Direct Code Flow (Technical refactors, localized bug fixes, direct developer tasks)
Use when the code location, problem, or technical change is already known and doesn't require product ceremony:
$$\text{Coder (04: Implement)} \rightarrow \text{Cleaner (05: Simplify)} \rightarrow \text{Hardener (06: Falsify)} \rightarrow \text{QA (07: Review)}$$
*(Note: If a direct code task alters system boundaries or component interfaces, invoke Architecture (03) first to draw the Mermaid diagram).*

### Path C: Investigation & Spike Flow (Root cause analysis, feasibility spikes, architectural audits)
Use when the request is exploratory, diagnostic, or research-only without implementation:
$$\text{Recon (01: Frame & Map)} \rightarrow \text{Evidence Packet (Anchored Facts)} \rightarrow \text{Actionable Verdict / Path A or B Recommendation}$$
- **Strictly read-only:** Zero production code modifications. Do not invoke Coder, Cleaner, or QA.
- **Evidence-based:** No theoretical essays or speculative opinions. Every finding must be anchored to concrete `file:line` locations, observed command traces, or verifiable codebase facts.
- **Outcome:** A concise, actionable verdict answering the core question, with an explicit decision on whether to stop or promote to an implementation ticket (Path A or B).

---

## Phase Overview & Engineering Roles

The 7 operational phases serve as the exact action guides for the 6 Engineering Roles:

| Phase | Engineering Role | What it does | Complete when |
| --- | --- | --- | --- |
| **01-Understand** | **Recon (Brahe)** | Investigates code, traces data flow, isolates unknowns. | Change surface anchored with `file:line`. |
| **02-Contract** | **Specifier** | Defines observable behavior in **conceptual QA scenarios**. | Acceptance scenarios, non-goals, and invariants frozen. |
| **03-Design** | **Architecture** | Reaches dual consensus; draws **Visual Architecture Diagram**. | Ground-truth Mermaid diagram approved; no overengineering. |
| **04-Implement** | **Coder** | Implements logic; cyclomatic complexity $\le 6$; source-before-memory. | Tests pass; verified on real effect, not mere artifact. |
| **05-Clean** | **Cleaner** | Refactors for clarity and simplicity without expanding scope. | Cleaner code; cyclomatic complexity $\le 6$; zero behavior change. |
| **06-Verify** | **Hardener** | Falsification at call-site; failure matrix; security; performance. | Mutants killed; failure paths and edge cases verified. |
| **07-Review** | **QA & Review Gate** | Validates QA scenarios (tests/CLI/scripts); checks architecture; diff lenses. | All scenarios pass; deterministic checks clean; ready to ship. |

## Core Principles

1. **Evidence over assumptions** — Don't assume something works. Run it. Read it. Verify it. Classify every claim as `observed`, `inferred`, or `unknown`.
2. **Understand before modifying** — Read the codebase, understand data flow, dependencies, and existing patterns before writing a single line.
3. **Design before coding** — Challenge the architecture. Produce a ground-truth visual diagram in Mermaid. Never optimize for hypothetical scale.
4. **Reuse before reinventing** — Search for existing code, utilities, patterns. A shared layer beats N copies.
5. **Source before memory** — For external APIs, read official docs. Never code from memory.
6. **Small functions, clear names** — Cyclomatic complexity $\le 6$ per function. One function does one thing. Names reveal intention.
7. **Verify at the layer of the claim** — A unit test of a helper doesn't verify caller behavior. Test at the call-site.
8. **Falsify, don't just pass** — A test that never fails protects nothing. Break the implementation and confirm the test catches it.
9. **Edge cases are not optional** — Null, empty, maximum, special characters, concurrent access, timeouts, malformed input.
10. **Professional, not over-engineered** — Build the right solution for the actual scale. Interfaces clarify contracts, not mere abstraction.
11. **Context transfer with verification ("Trust, but verify")** — Every agent must leave enough context for the next agent to understand what was decided, why, and what remains. However, the receiving agent must NEVER blindly trust claims: verify them against git status, command outputs, and code anchors before proceeding.

## Phase Execution

For each phase, read the corresponding detailed file in the `phases/` directory before beginning its execution:
- **Phase 1: Understand** (`phases/01-understand.md`): Reconnaissance and change-surface mapping.
- **Phase 2: Contract** (`phases/02-contract.md`): Specifier Gherkin QA scenarios and invariants.
- **Phase 3: Design** (`phases/03-design.md`): Architecture, dual analysis, and **mandatory Mermaid diagram**.
- **Phase 4: Implement** (`phases/04-implement.md`): Coder execution, clean code, unit tests.
- **Phase 5: Clean** (`phases/05-clean.md`): Cleaner refactoring (no scope creep, complexity $\le 6$).
- **Phase 6: Verify** (`phases/06-verify.md`): Hardener falsification, failure injection, security.
- **Phase 7: Review** (`phases/07-review.md`): QA execution of Gherkin scenarios and diff lenses.

## Delegation

The agent may delegate phases to subagents when:
- The codebase is large and understanding requires deep exploration.
- Competing solution shapes benefit from being formulated in isolated contexts without cross-contamination (Phase 3 Design).
- Review benefits from a fresh perspective with a different context or model family ("fresh eyes" in Phase 7 Review).
- Multiple independent verification tasks can run in parallel.

Delegated work must return with evidence, not just conclusions.

## Strict Failure & Recovery Loop

If QA (Phase 7) fails or checks report defects, do not patch casually:
$$\text{QA Failure} \rightarrow \text{Coder (Phase 4)} \rightarrow \text{Cleaner (Phase 5)} \rightarrow \text{Hardener (Phase 6)} \rightarrow \text{QA (Phase 7)}$$

If implementation thrashes (2+ reversals on the same behavior pair), the underlying design is wrong → Return to **Design (Phase 3)**.

## Handoff

When a session ends before completing all phases, prepare a handoff document capturing:
- Current phase and what's complete.
- What is explicitly verified versus what is merely assumed.
- Decisions made and their reasoning.
- The next concrete action to resume work.

See `templates/handoff.md` for the correct format.
