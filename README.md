# Rhinora Website

System-first website for Rhinora, the NZ-facing supplier and technical contact for XNP/Xiniupi self-fusing metal roof protection film.

The site is currently fixture-backed. It presents one published system, one core product, source-derived technical documents, metal roof application examples and resource articles.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based UI
- Mock content repository in `src/data/content.ts`
- Admin dashboard with local mock state
- Enquiry API route at `src/app/api/enquiries/route.ts`
- Prisma retained for future Supabase/Postgres integration

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

No local database is required. Public pages, admin screens and contact form responses use in-repo fixture data for now.

## Main Structure

```text
src/app
  page.tsx                         Home
  system                           Metal roof protection system listing and detail pages
  solutions                        Redirects to system routes for compatibility
  products                         Core product listing and detail pages
  technical-library                Requestable source document library
  projects                         Generic metal roof application examples
  resources                        Metal roof protection articles
  about                            Rhinora distributor positioning
  contact                          Forms and contact details
  admin                            Admin dashboard and mock CRUD pages
  api/enquiries                    Basic form submission endpoint

src/data/content.ts                Mock system, product, documents, projects, articles and enquiries
src/lib/contentRepository.ts       Fixture-backed public content service
src/types/content.ts               Shared content types
public/images                      Local visual assets
```

## Content Notes

- The core public product is `XNP Self-Fusing Metal Roof Protection Film`.
- The public system is `Metal Roof Protection System`.
- The 216 MB brochure is represented as request-only until a web-ready file is prepared.
- Technical claims should remain source-backed and project-specific. Avoid unconditional warranty, lifetime or NZ compliance claims unless reviewed.

## Future Supabase, Database or CMS Integration

The current website does not connect to a database at runtime. `@prisma/client`, `prisma` and `prisma/schema.prisma` remain in the project so a future Supabase/Postgres integration can reuse the existing data model.

1. Keep the types in `src/types/content.ts` as the initial contract.
2. Keep page components calling service functions such as `getProducts()`, `getProductBySlug()`, `getDocuments()`, and `createEnquiry()`.
3. Replace the fixture-backed implementation in `src/lib/contentRepository.ts` with Prisma, Supabase or CMS calls.
4. Add real authentication for `/admin` using NextAuth, Supabase Auth or the selected CMS.
5. Replace request-only document URLs with object storage or CMS asset URLs after files are optimized for web delivery.
