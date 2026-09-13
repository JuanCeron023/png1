# Understand

This phase is distilled from Brahe (recon agent) and Work Intake. The agent understands the request and codebase before any changes.

## 1. Read the Request Completely
- Read the full ticket/Jira/idea description carefully.
- Read all comments and linked issues.
- Identify: what is being asked? what is the expected outcome?
- If ambiguous, ask for clarification before proceeding.

## 2. Identify Primary Objective & Scope
Understand the real nature of the work without forcing it into artificial, mutually exclusive boxes:
- **Core Intent:** What is the actual goal? (e.g., fixing unexpected behavior, introducing a capability, refactoring for maintainability, or researching). Real tickets often blend these.
- **Root Trigger:** Why is this being requested now? (e.g., user report, performance bottleneck, technical debt, or workflow blocker).
- **Blast Radius Estimate:** Is this a localized, self-contained fix, or does it cross multiple subsystems, APIs, or database boundaries?

## 3. Explore the Relevant Codebase
- Search for the nouns of the ticket: function names, components, routes, models.
- Locate entry points, data flow, and dependencies.
- Read existing tests that encode current behavior.
- Run cheap commands: `--help`, test list, route table.
- Prefer anchors (file:line) over reading whole files.

## 4. Map the Change Surface
- Which files need to change?
- What depends on those files? What do they depend on?
- Are there sibling surfaces (docs, configs, tests) that need updating?
- Prefer shared layers over duplicating changes.

## 5. Classify Every Claim
Every material statement gets a class:
- **observed**: you ran it or read it at a specific location
- **inferred**: reasoned from observed evidence
- **unknown**: couldn't confirm

Don't smooth over unknowns — name them explicitly.

## 6. Deliver the Investigation Packet (For Path C)
When operating under **Path C (Investigation & Spike Flow)**, do NOT proceed to Coder, Cleaner, or QA:
- Deliver an **Evidence Packet**:
  1. **Core Question Answered:** Direct, unambiguous response to the question or diagnostic hypothesis.
  2. **Code Anchors:** Traced hops through the codebase with exact `file:line` locations.
  3. **Observed vs Inferred Facts:** Clear table separating what was directly proven from what is reasoned or unknown.
  4. **Actionable Recommendation:** Explicit verdict: *Resolve as answered*, *Reject as non-viable*, or *Promote to implementation* (defining the proposed outcome for Path A or Path B).

## Complete when:
- **For Path A (Product/Feature):** You can explain the ticket scope, relevant code, change surface, and unknowns before defining the contract (Phase 2).
- **For Path C (Investigation):** The Evidence Packet is delivered with anchored facts and an actionable recommendation, concluding the task without editing code.
