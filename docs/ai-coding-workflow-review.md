# AI Coding Workflow Review

**Project:** Rhinora / XNP Website  
**Review date:** 30 July 2026  
**Overall maturity:** 4.8 / 10 - functional, but person-dependent  
**Method note:** The requested `better-harness` plugin was not installed, callable, or available in the provided plugin catalogue. This is an equivalent repository-based audit, not a native Better Harness report.

## Executive Summary

The project gives an AI coding agent enough context to make useful changes, and its most important architecture rule - Prisma must remain server-side - is both documented and partially enforced with `server-only`. The committed lockfile, strict TypeScript configuration, ESLint setup, environment example, and existing `lint` and `build` commands are a sound base.

The workflow is not yet a reliable engineering harness. There is no CI, automated test suite, single verification command, pinned Node version, versioned database migration history, or durable pull-request checklist. The main AI instruction file is currently an uncommitted working-tree addition, mixes stable rules with stale status snapshots, and contradicts the README in places. As a result, successful delivery depends heavily on the current agent noticing repository state, interpreting conflicting documentation correctly, and remembering every manual check.

The recommended target is a small, executable contract:

1. Stable project instructions in a committed `AGENTS.md`.
2. One `npm run check` command used locally and in CI.
3. A minimum unit/integration/e2e test pyramid around enquiry submission and critical public routes.
4. Versioned Prisma migrations and an explicit database change procedure.
5. Task branches or worktrees, scoped commits, pull requests, and required checks before merge.

## Current Evidence

| Area | Evidence observed | Result |
|---|---|---|
| Repository instructions | `AGENTS.MD` contains architecture, current state, history, handoff notes, commands, and risks | Useful but volatile, duplicated, and currently uncommitted |
| Server/client database boundary | `src/lib/prisma.ts` and `src/lib/enquiryRepository.ts` import `server-only` | Strong guardrail |
| Type safety | `tsconfig.json` uses `strict: true` and `noEmit: true` | Strong baseline |
| Linting | `npm.cmd run lint` completed successfully on 30 July 2026 | Pass |
| Production build | `npm.cmd run build` completed successfully with Next.js 16.2.6 | Pass |
| Automated tests | No test files, test framework, `test` script, or e2e configuration found | Missing |
| Continuous integration | No `.github/workflows` files found | Missing |
| Reproducible installs | `package-lock.json` is committed | Partial |
| Runtime pinning | No `engines`, `.nvmrc`, or `.node-version`; review machine used Node 22.17.0 and npm 10.9.2 | Missing |
| Dependency health | `npm.cmd audit --omit=dev` reported 7 vulnerabilities: 1 low and 6 high | Failing |
| Database reproducibility | Prisma schema and seed exist, but no migrations directory is present | High-risk gap |
| Secret handling | `.env` and `.env.*` are ignored; `.env.example` is committed | Good |
| Documentation consistency | README says no runtime database is needed and contact submissions are fixture-backed; current enquiry path uses Prisma/Postgres | Stale |
| Working-tree hygiene | `main` is ahead of `origin/main` by one commit and has four modified files before this report; temporary PDF extraction files are tracked | Fragile |
| Commit quality | Five commits total; several are very large, including 2,539 inserted lines and an 8,822-line initial commit; one message is only `Base page` | Weak traceability |

## Maturity Scorecard

| Dimension | Score | Assessment |
|---|---:|---|
| Agent context and instructions | 6 / 10 | Good project knowledge, but mixed with stale temporal state and not committed |
| Reproducibility | 5 / 10 | Lockfile and env example exist; runtime, DB state, and install cleanliness are not controlled |
| Automated validation | 3 / 10 | Lint and build pass manually; no tests, aggregate check, or CI |
| Architecture and safety rails | 6 / 10 | Server-only Prisma boundary is good; sensitive routes and database lifecycle lack enforced gates |
| Change control and collaboration | 4 / 10 | Worktree use is positive; dirty local `main`, large commits, and no PR checks reduce safety |
| Handoff and maintainability | 5 / 10 | Detailed summary exists, but it is duplicated, stale, and located in the same file as durable rules |

## What Is Working Well

### 1. The critical Prisma boundary is explicit and enforceable

`AGENTS.MD` states that Prisma must not be used directly from frontend browser code. More importantly, `src/lib/prisma.ts` and `src/lib/enquiryRepository.ts` import `server-only`. This converts a prose preference into a build-time boundary and is the strongest part of the current harness.

Keep this invariant at the top of the durable agent instructions and add a lightweight automated import-boundary test or lint rule so future data repositories follow the same pattern.

### 2. Baseline static verification is healthy

The current working tree passes:

```text
npm.cmd run lint
npm.cmd run build
```

The build runs TypeScript checking and completes route generation. This means the project already has two useful gates that can be composed into a standard check command and CI job.

### 3. Environment secrets are handled sensibly

The real `.env` is ignored, `.env.*` is ignored, and `.env.example` documents the required server-side `DATABASE_URL` without containing the database password. This is a good default for human and AI contributors.

### 4. The repository has useful operational context

The instruction file records:

- the current architecture;
- fixture-backed versus database-backed areas;
- key file paths;
- recent restructuring;
- known risks;
- standard commands.

This reduces rediscovery time. The content should be retained, but separated into stable instructions and a volatile handoff document.

### 5. The lockfile is committed

`package-lock.json` provides a reproducible dependency graph. The desired install command for agents and CI should be `npm ci`, not `npm install`.

## Priority Findings

### P0 - No automated merge gate

There is no CI workflow. An agent can report success, commit, merge, or push without any repository-controlled verification. The fact that lint and build pass today is encouraging, but it is not enforceable.

**Impact:** regressions can enter `main`; verification varies by agent; failures may only appear on deployment.

**Recommendation:**

- Add an `npm run check` script.
- Add CI triggered on pull requests and pushes to `main`.
- Run on a pinned Node version with `npm ci`.
- Make the CI check required before merge.

Initial command contract:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "check": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

Until tests are added, use `lint`, `typecheck`, and `build` in `check`; do not leave the aggregate command absent while waiting for a perfect suite.

### P0 - No automated tests for the only database-backed workflow

No unit, integration, component, or browser tests were found. The enquiry flow is the clearest critical path:

```text
ContactForm -> POST /api/enquiries -> enquiryRepository -> Prisma -> Postgres
```

It currently relies on manual testing. The route also performs only basic presence checks before repository mapping.

**Impact:** validation, error handling, database mapping, form status, and admin visibility can regress without lint or build failing.

**Minimum test set:**

1. Unit tests for enquiry input normalization and allowed enquiry types.
2. Route tests for malformed JSON, missing fields, invalid type, repository failure, and success.
3. Repository integration tests against a disposable Postgres database or isolated Supabase development branch.
4. One Playwright smoke test that submits the contact form and confirms the success state.
5. One admin smoke test after real authentication is implemented.

Database-backed tests must use isolated test data and must never point at the production database.

### P0 - Database state cannot be reconstructed from Git

`prisma/schema.prisma` and `prisma/seed.ts` exist, but there is no `prisma/migrations` history. The application depends on an `enquiries` table in Supabase/Postgres, so Git does not currently contain a complete path from an empty database to the expected runtime schema.

**Impact:** new environments, CI, disaster recovery, and parallel agent work can drift from production. Schema changes can be applied ad hoc without review.

**Recommendation:**

- Establish the current database as a reviewed migration baseline.
- Require every schema change to include a migration and verification.
- Document whether Prisma migrations or Supabase CLI migrations are authoritative; do not mix two unmanaged histories.
- Add migration validation to CI using a disposable database.
- Include seed compatibility in the database check.

Supabase's current changelog should be checked before database workflow changes. A relevant 2026 platform change is that new public-schema tables are no longer automatically exposed to the Data API; that does not affect server-side Prisma directly, but it matters if a future Supabase client is introduced: <https://supabase.com/changelog?types=breaking-change>.

### P0 - Agent instructions are not durable or internally consistent

At review time, `AGENTS.MD` is an uncommitted addition. Its first status block calls `0b53d7a` the latest commit, while the repository is actually at `67992a8`. Its recent-conversation block says only `AGENTS.MD` is modified, while three source files are also modified. The README separately describes enquiry handling as fixture-backed.

**Impact:** another worktree, clone, CI job, or agent may not receive the instructions; agents must decide which contradictory statement is authoritative.

**Recommendation:**

Split the content:

- `AGENTS.md`: stable rules, architecture boundaries, approved commands, definition of done, and file map.
- `docs/HANDOFF.md`: current branch, current task, temporary state, pending decisions, and last verified commit.
- `README.md`: accurate human-facing setup and runtime requirements.

Use the conventional filename `AGENTS.md` so case-sensitive environments and other agent tools discover it consistently.

### P1 - Dependency security is not part of the workflow

`npm.cmd audit --omit=dev` reported seven known vulnerabilities, including six high-severity findings affecting the current dependency tree. The report included findings through Next.js, PostCSS, Sharp, Prisma configuration dependencies, Effect, and esbuild.

**Impact:** known vulnerabilities can remain unnoticed because audit is neither scheduled nor surfaced in CI.

**Recommendation:**

- Review and update affected packages in a dedicated change with regression testing.
- Do not apply `npm audit fix` blindly.
- Add scheduled dependency review or a dependency update service.
- Run audit or an equivalent advisory scanner in CI with an explicit policy for when it blocks.
- Move build-only tools to `devDependencies` where deployment constraints allow, reducing the production dependency surface.

### P1 - Runtime and install behavior are not pinned

The lockfile is committed, but no supported Node/npm version is declared. The review machine used Node 22.17.0 and npm 10.9.2. `npm ls --depth=0` also reported an extraneous `@emnapi/runtime`, showing that the local install differs from the manifest.

**Impact:** agents may get different lint, build, Prisma, or Next.js behavior on different machines.

**Recommendation:**

- Add `engines.node` and `engines.npm`.
- Add `.node-version` or the team's chosen version-manager file.
- Standardize on `npm ci` for clean verification and CI.
- Record the package manager and supported platform expectations in `AGENTS.md`.

### P1 - No explicit definition of done

The instruction file lists useful commands, but it does not specify which commands are mandatory for which type of change, what evidence an agent must report, or when documentation and migrations must be updated.

**Impact:** "done" varies by agent and task; agents can stop after implementation without validating adjacent behavior.

**Recommended definition of done:**

- Inspect `git status` before editing and preserve unrelated user changes.
- Keep Prisma and database credentials out of client components.
- Add or update tests for changed behavior.
- Run `npm run check`.
- For database changes, add and verify a migration against an isolated database.
- For UI changes, verify the affected responsive routes in a browser.
- For technical claims, record the source and avoid broad warranty/compliance claims.
- Review `git diff --check` and the final diff scope.
- Update README, handoff, or architecture notes when behavior or setup changes.
- Report commands run, results, unverified areas, and files changed.

### P1 - Branch and commit discipline is inconsistent

The previous website restructure used a split worktree, which is a good isolation technique. However, local `main` is now ahead of `origin/main`, the worktree is dirty, and the branch still exists in another worktree. Several historical commits are very large, and `Base page` does not communicate intent or risk.

**Impact:** parallel work is harder to reconcile, review is expensive, rollback is coarse, and accidental inclusion of unrelated changes is more likely.

**Recommendation:**

- Start every material AI task on a task-scoped branch or worktree.
- Keep `main` clean and update it only through reviewed merges.
- Use small commits grouped by behavior.
- Use descriptive commit subjects such as `feat(enquiries): persist contact submissions`.
- Require a PR summary, risk notes, screenshots for UI changes, migration notes for DB changes, and verification output.

### P2 - Generated scratch files are tracked

Files under `tmp/pdfs` are committed, including extracted text and page images. These appear to be intermediate inspection artifacts rather than product assets. Their presence increases search noise and makes it easier for agents to modify or recommit generated state accidentally.

**Recommendation:**

- Decide which generated artifacts are deliverables.
- Keep approved outputs under `output/`.
- Ignore `tmp/` and remove already tracked scratch files in a separate, deliberate cleanup.
- Add `.gitattributes` to standardize text line endings; current Git operations warn about LF-to-CRLF conversion.

### P2 - Environment-specific development configuration is embedded in source

`next.config.ts` contains fixed development origins for `127.0.0.1` and `172.19.240.1`.

**Impact:** contributors and agents on other networks may change shared config merely to run locally.

**Recommendation:** document why each origin is needed and prefer environment-derived configuration where Next.js permits it.

## Recommended Agent Instruction Structure

The durable `AGENTS.md` should be short enough to remain current and specific enough to be executable:

```markdown
# Project contract
- Next.js App Router, TypeScript, React, Tailwind.
- Prisma is server-only. Client components must call route handlers or server actions.
- Public catalogue data is fixture-backed; enquiries are Postgres-backed.

# Before editing
- Read README.md and docs/HANDOFF.md.
- Run git status --short and preserve unrelated changes.
- Identify whether the task affects UI, API, or database behavior.

# Required checks
- All changes: npm run check
- UI changes: browser smoke test for affected routes
- DB changes: migration + disposable-database verification
- Content claims: source review

# Definition of done
- Tests updated, checks pass, diff scoped, docs current.
- Report files changed, commands run, and anything not verified.

# High-risk areas
- /admin has no production-ready authentication.
- Never expose DATABASE_URL or Prisma to browser bundles.
- Do not make unconditional warranty, lifetime, or NZ compliance claims.
```

Volatile status such as branch names, unpushed commits, temporary files, and conversation summaries belongs in `docs/HANDOFF.md`.

## Recommended Task Brief for AI Work

Use this small template when assigning implementation work:

```markdown
Goal:
Non-goals:
Acceptance criteria:
Affected routes/data:
Source material:
Required tests:
Database or migration impact:
Visual verification:
Deployment constraints:
```

This prevents agents from inferring scope from a broad request and gives reviewers a direct acceptance checklist.

## Phased Improvement Plan

### Phase 1 - Make the existing checks enforceable

1. Commit and simplify `AGENTS.md`.
2. Correct README database and enquiry documentation.
3. Add `typecheck` and `check` scripts.
4. Add CI with `npm ci`, lint, typecheck, and build.
5. Pin Node/npm versions.
6. Triage the dependency audit findings.

**Exit condition:** every pull request has one required, reproducible check.

### Phase 2 - Protect critical behavior

1. Add Vitest or an equivalent unit test runner.
2. Extract enquiry validation into a testable schema/module.
3. Add route and repository integration tests.
4. Add a small Playwright smoke suite.
5. Establish the database migration baseline and test it in isolation.

**Exit condition:** enquiry submission and key public routes are verified without manual-only testing.

### Phase 3 - Improve collaboration and release confidence

1. Adopt task branches/worktrees and scoped commit conventions.
2. Add a pull-request template and required review checklist.
3. Separate durable instructions from handoff status.
4. Add scheduled dependency/security checks.
5. Add deployment preview checks and production smoke monitoring when a hosting target is selected.

**Exit condition:** a new human or AI contributor can clone, install, change, verify, and hand off work using only version-controlled instructions.

## Suggested Success Metrics

Track a few simple measures rather than process for its own sake:

- 100% of pull requests run the same `npm run check` command used locally.
- 0 changes merged with failing required checks.
- Critical enquiry-flow coverage includes success, validation failure, and database failure.
- Every database schema change includes a reviewed migration.
- `AGENTS.md` contains no branch-specific or conversation-specific status.
- No temporary files or secrets appear in Git.
- Dependency audit findings have an owner, decision, and review date.
- Median pull request size trends downward from the current multi-thousand-line commits.

## Final Assessment

The project is ready for a lightweight harness upgrade, not a heavyweight platform rewrite. Its architectural foundation is understandable, lint and build are currently healthy, and the server-only database boundary is a strong precedent. The highest return comes from turning today's manual knowledge into version-controlled, executable gates: clean instructions, one check command, CI, critical-path tests, and migrations.

Until those are in place, treat AI-generated changes as requiring active human review even when lint and build pass.
