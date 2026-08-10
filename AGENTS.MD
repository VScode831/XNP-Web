do not use Prisma directly from frontend browser code. Use it only in server-side code.

Current State
Next.js app scaffold exists for the Rhinora/XNP website using App Router, TypeScript, Tailwind, React 19, Next 16.
Prisma is installed: prisma, @prisma/client, tsx, and DB scripts are in package.json.
Supabase/Postgres connection is configured through DATABASE_URL in .env; it points to a Supabase session pooler. No Supabase JS client is installed.
Prisma client wrapper exists in src/lib/prisma.ts.
Prisma schema exists in prisma/schema.prisma with models for products, solutions, documents, projects, articles, categories, enquiries, and join tables.
Enquiry submission is now database-backed through Prisma:API route: src/app/api/enquiries/route.ts
Repository: src/lib/enquiryRepository.ts
Contact form posts to /api/enquiries: src/components/forms/ContactForm.tsx

Still Mock / Fixture-Backed
Public products, solutions, documents, projects, resources, categories, and admin listings still read from fixture data in src/data/content.ts.
Admin dashboard/screens are placeholders using local/mock data, not fully database-backed yet.
Admin auth is only a placeholder; no Supabase Auth, NextAuth, or CMS auth is implemented.
No Prisma migrations folder is currently present in the working tree.
Other Work Done
Seed script exists at prisma/seed.ts, designed to seed the Prisma schema from local content data.
Technical PDF/Markdown output was generated under output/pdf.
Local SVG visual assets exist under public/images.
next.config.ts has allowed dev origins configured.

Git History Summary
e58c7c1 Initial commit: created the main website scaffold, pages, content data, components, admin placeholder, contact form, and styling.
a69167f Add database-backed admin content: previously added heavier Prisma/database-backed work, migrations, docker compose, admin API route, and DB repositories.
567d05d Base page: removed/reworked some database-backed pieces, added generated PDF/Markdown output, and returned much of the site to fixture-backed mode.
0b53d7a Enquiry Table Backend Link: current latest commit; connects enquiry submissions to Prisma/Supabase Postgres.

Bottom line: Prisma is installed and Supabase Postgres is configured via DATABASE_URL; enquiry submissions are connected to the backend. The rest of the site/admin content is still mostly mock-backed and ready to be migrated to Prisma/Supabase later.

<!-- PROJECT_PROGRESS_SUMMARY_START -->
# Project Progress Summary

## Project Snapshot
- Next.js App Router site for Rhinora/XNP using TypeScript, Tailwind, React 19, and Next 16.
- Site has been restructured around one published system: Metal Roof Protection System.
- Public product catalogue now contains one real product: XNP Self-Fusing Metal Roof Protection Film.
- Prisma and Supabase/Postgres remain configured through server-side code only; do not use Prisma in frontend browser code.

## Current State
- `main` contains commit `67992a8 Website restructure around metal roof protection` and is ahead of `origin/main` by 1 commit; it has not been pushed.
- The `Website-Restructure` branch work was fast-forward merged into local `main`.
- Public products, systems, technical documents, projects, resources, categories, and most admin listings still read fixture data from `src/data/content.ts` through `src/lib/contentRepository.ts`.
- Enquiry submission is database-backed again: `src/app/api/enquiries/route.ts` calls `src/lib/enquiryRepository.ts`, which uses Prisma/Supabase Postgres server-side.
- Admin enquiries are database-backed through `src/app/admin/enquiries/page.tsx` -> `src/lib/adminRepository.ts` -> `listEnquiries()`.
- Admin auth is still placeholder-only; no Supabase Auth, NextAuth, or CMS auth is implemented.
- No Prisma migrations folder is present in the working tree.
- README has been updated for the system-first site, but currently still says no runtime database is required; treat that as stale for enquiries.

## Recent Conversation Summary
- User reported work completed in a split worktree on branch `Website-Restructure`, then committed as `67992a8` and fast-forward merged into local `main`.
- User asked to update `AGENTS.MD` based on the split-worktree handoff summary.
- Current local verification shows only `AGENTS.MD` modified; `tmp/ppt-media/` was reported by the user as temporary untracked split-worktree state but is not present in this current worktree.

## Project Structure
- `src/app/system` and `src/app/system/[slug]` serve the Metal Roof Protection System listing and detail pages.
- `src/app/solutions` and `src/app/solutions/[slug]` redirect to `/system` routes for compatibility.
- `src/app/products` and `src/app/products/[slug]` present the XNP self-fusing metal roof protection film.
- `src/app/technical-library`, `src/app/projects`, `src/app/resources`, `src/app/about`, and `src/app/contact` are aligned to the metal roof protection positioning.
- `public/images/xnp-pm-rolls.png` is used for product roll imagery; `public/images/metal-roof-protection-system-photo.png` is used for the system card.
- `prisma/schema.prisma` includes models for products, solutions, documents, projects, articles, categories, enquiries, and join tables.

## Completed Work
- Replaced the old broad waterproofing/catalogue structure with the Metal Roof Protection System.
- Replaced placeholder products with XNP Self-Fusing Metal Roof Protection Film.
- Added `/system` routes and compatibility redirects from old `/solutions` routes.
- Updated homepage, product pages, technical library, projects, resources, about, contact, footer, navigation, metadata, and README.
- Added real product and system images and adjusted card image sizing so the system image is fully visible.
- Restored Supabase-backed enquiry persistence and admin enquiry listing.
- Added `postinstall: prisma generate` to `package.json`.
- User reports verification passed multiple times with `npm.cmd run lint` and `npm.cmd run build`.

## Pending Work / Risks
- Push local `main` to `origin/main` when ready.
- Reconcile README wording around database runtime requirements; enquiries now require a valid `DATABASE_URL`.
- Public content and most admin resources remain fixture-backed and need future Prisma/Supabase or CMS migration if dynamic editing is required.
- Add real admin authentication before exposing admin routes beyond local/internal use.
- Add Prisma migrations for the current schema if database schema management is needed across environments.
- Keep technical, warranty, lifetime, and NZ compliance claims project-specific and source-backed.

## Useful Commands
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run dev`
- `npm.cmd run db:migrate`
- `npm.cmd run db:seed`
- `npm.cmd run db:studio`
<!-- PROJECT_PROGRESS_SUMMARY_END -->
