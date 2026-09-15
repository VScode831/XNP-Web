# Rhinora / XNP Project Instructions

## Durable Rules

- This is a Next.js App Router application using TypeScript, React 19, Tailwind CSS and Next.js 16.
- Never import or use Prisma from browser/client code. Database access belongs in server-only modules, route handlers or server components.
- Supabase supplies the hosted PostgreSQL database. Prisma is the application's database client and the owner of schema changes and migration history. Do not introduce a parallel Supabase CLI migration workflow unless the user explicitly approves a migration-strategy change.
- Public products, systems, technical documents, projects and categories currently come from `src/data/content.ts` through `src/lib/contentRepository.ts`.
- Enquiry submission and the admin enquiry listing are database-backed through `src/app/api/enquiries/route.ts`, `src/lib/enquiryRepository.ts` and `src/lib/adminRepository.ts`.
- Admin authentication remains placeholder-only. Do not represent the admin area as safe for public exposure until real authentication and authorization are implemented.
- Keep technical, performance, warranty, lifetime and New Zealand compliance claims source-backed and project-specific.

## Scope and Source Control

- Inspect `git status --short` before editing. Treat all existing tracked and untracked changes as user work; preserve unrelated changes and avoid broad cleanup.
- Keep narrow UI requests narrow. Preserve the established Rhinora branding, layout and unrelated features unless the user requests a redesign.
- Do not restore the removed Resources routes or the removed Article model unless explicitly requested.
- Commit, push, deploy, migrate and seed are separate actions. Authorization for one does not authorize the others.
- Stage or commit only the approved task scope. Never claim a check was run when it was not.

## Database Safety

- Never read or display secrets from `.env`. `DATABASE_URL` must remain server-side and must never use a `NEXT_PUBLIC_` name.
- Do not connect to, query or mutate an unknown or production database for routine validation.
- `npm.cmd run db:migrate` uses Prisma migration tooling. Review generated migration files before applying them anywhere; remote application requires explicit authorization and a confirmed target.
- `npm.cmd run db:seed` is destructive: it deletes existing content and all enquiry records before inserting fixtures.
- The seed must remain fail-closed. It requires a non-production `NODE_ENV`, `SEED_ENVIRONMENT=development|test`, `ALLOW_DESTRUCTIVE_SEED=true`, and a `SEED_TARGET_IDENTITY` matching the target derived from `DATABASE_URL` as `username@hostname:port/database`.
- Before any authorized seed, confirm the exact target and required backup. Do not run the seed as a build, lint or smoke-test step.
- Do not submit test enquiries to an unknown or production database.

## Proportionate Validation

- Documentation/content-only edits: inspect the focused diff and verify referenced paths, links and commands.
- UI edits: run lint and focused responsive/browser checks for the affected interface.
- Application-logic edits: run lint, relevant tests if present, and a production build where practical.
- Schema edits: validate the Prisma schema and inspect the generated migration; do not apply it remotely without explicit authorization.
- Report any skipped or blocked checks precisely. A successful lint/build does not prove database connectivity or enquiry persistence.

## Windows Commands

- Prefer PowerShell-compatible commands in this workspace. If PowerShell blocks an npm script shim, use `npm.cmd`.
- Common non-destructive checks: `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd run dev`.
- Database commands are not routine validation and require the relevant authorization and target checks.

<!-- PROJECT_PROGRESS_SUMMARY_START -->
# Project Progress Summary

## Project Snapshot

- The public site presents one Metal Roof Protection System and one XNP Self-Fusing Metal Roof Protection Film.
- Public catalogue/project content is fixture-backed; enquiries are persisted through server-side Prisma to Supabase-hosted PostgreSQL.
- Resources routes and the Article model have been removed in the current working tree and must not be restored unintentionally.

## Current State

- At this update on 10 September 2026, local `main` is at `7564764 Update Rhinora branding and enquiry experience` and its existing tracking reference reports three local commits ahead. Recheck Git before relying on this snapshot.
- The working tree already contains ongoing UI, content, schema, seed and resource-removal changes plus untracked image/output files. Preserve them and inspect the live status for exact scope.
- `prisma/schema.prisma` defines products, solutions, technical documents, projects, categories, enquiries and join models; it does not define Article.
- No Prisma migrations directory is currently present.
- Enquiry submission and the admin enquiry listing require a valid `DATABASE_URL`.
- Most public content and non-enquiry admin listings remain fixture-backed.
- Admin authentication is not implemented.

## Recent Conversation Summary

- Resources and related Article content were removed from the website.
- Rhinora branding, navigation and homepage presentation have ongoing uncommitted revisions.
- The project instruction audit identified stale project notes, conflicting migration ownership and an undocumented destructive seed.
- This update reconciles project documentation and adds a fail-closed seed guard without running any database operation.

## Project Structure

- `src/app/system` and `src/app/system/[slug]`: system listing and detail.
- `src/app/solutions` and `src/app/solutions/[slug]`: compatibility redirects to system routes.
- `src/app/products` and `src/app/products/[slug]`: product listing and detail.
- `src/app/technical-library`, `src/app/projects`, `src/app/about` and `src/app/contact`: remaining public sections.
- `src/data/content.ts` and `src/lib/contentRepository.ts`: fixture-backed content.
- `src/app/api/enquiries/route.ts`, `src/lib/enquiryRepository.ts` and `src/lib/prisma.ts`: database-backed enquiry path.
- `src/app/admin/enquiries/page.tsx` and `src/lib/adminRepository.ts`: database-backed admin enquiry listing.

## Pending Work / Risks

- Add real admin authentication before public exposure.
- Create and review Prisma migrations before managing schema changes across environments.
- Decide separately whether remaining fixture-backed content should move to Prisma, Supabase APIs or a CMS.
- Validate enquiry persistence only against an explicitly approved non-production database.
- Decide separately when to stage, commit, push or deploy the current working-tree changes.

<!-- PROJECT_PROGRESS_SUMMARY_END -->
