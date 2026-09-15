# Rhinora Website

System-first website for Rhinora, the NZ-facing supplier and technical contact for XNP/Xiniupi self-fusing metal roof protection film.

The site presents one published system, one core product, source-derived technical documents and metal roof application examples.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based UI
- Fixture-backed public content repository in `src/data/content.ts`
- Admin dashboard with fixture-backed content screens and database-backed enquiries
- Enquiry API route at `src/app/api/enquiries/route.ts`
- Prisma for server-side access to Supabase-hosted PostgreSQL

## Run Locally

```bash
npm install
npm run dev
```

PowerShell on this machine may block `npm.ps1`. Use:

```bash
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

The public catalogue and project pages can render from fixture data without a database. Enquiry submission and the admin enquiry listing require a valid server-side `DATABASE_URL`; without it, those database-backed features will fail. Never expose this value through a `NEXT_PUBLIC_` variable.

## Main Structure

```text
src/app
  page.tsx                         Home
  system                           Metal roof protection system listing and detail pages
  solutions                        Redirects to system routes for compatibility
  products                         Core product listing and detail pages
  technical-library                Requestable source document library
  projects                         Generic metal roof application examples
  about                            Rhinora distributor positioning
  contact                          Forms and contact details
  admin                            Fixture-backed content screens and database-backed enquiries
  api/enquiries                    Database-backed form submission endpoint

src/data/content.ts                Mock system, product, documents, projects and enquiries
src/lib/contentRepository.ts       Fixture-backed public content service
src/lib/enquiryRepository.ts       Server-only Prisma enquiry service
src/lib/prisma.ts                  Server-only Prisma client wrapper
src/types/content.ts               Shared content types
public/images                      Local visual assets
```

## Content Notes

- The core public product is `XNP Self-Fusing Metal Roof Protection Film`.
- The public system is `Metal Roof Protection System`.
- The 216 MB brochure is represented as request-only until a web-ready file is prepared.
- Technical claims should remain source-backed and project-specific. Avoid unconditional warranty, lifetime or NZ compliance claims unless reviewed.

## Database Responsibilities

Supabase hosts the PostgreSQL database. Prisma is the application's server-side database client and the owner of schema changes and migration history. Do not introduce a parallel Supabase CLI migration workflow unless the project explicitly changes migration strategy.

- `src/app/api/enquiries/route.ts` and `src/lib/enquiryRepository.ts` persist contact enquiries through Prisma.
- `src/app/admin/enquiries/page.tsx` reads enquiries through the same server-side repository.
- Public products, systems, technical documents, projects and categories remain fixture-backed through `src/lib/contentRepository.ts`.
- Most admin content screens remain fixture-backed. Admin authentication is still placeholder-only and must be completed before the admin area is exposed publicly.
- No Prisma migrations directory is currently committed; create and review migrations before relying on the schema in another environment.

## Destructive Seed Safety

`npm.cmd run db:seed` is destructive. The seed script deletes existing products, systems, documents, projects, categories, relationships and **all enquiries** before loading fixture data. Do not use it against production or a database containing records that must be retained.

The script fails closed unless all of these conditions are satisfied:

- `NODE_ENV` is not `production`.
- `SEED_ENVIRONMENT` is explicitly set to `development` or `test`.
- `ALLOW_DESTRUCTIVE_SEED` is exactly `true`.
- `SEED_TARGET_IDENTITY` exactly matches the non-secret identity derived from `DATABASE_URL` as `username@hostname:port/database` (the password is never included).

Before an authorized seed, verify the exact database target and ensure any required backup exists. Seeding, migrating and opening Prisma Studio are separate actions and are not part of normal lint/build validation.

## Future Content and Admin Work

1. Keep the types in `src/types/content.ts` as the initial contract.
2. Keep page components calling repository/service functions rather than Prisma directly.
3. Migrate fixture-backed content to Prisma, Supabase or a CMS only through an approved architecture change.
4. Add real authentication for `/admin` before public exposure.
5. Replace request-only document URLs with object storage or CMS asset URLs after files are optimized for web delivery.
