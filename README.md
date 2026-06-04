# Rhinora Website

Professional full-stack-ready website scaffold for a New Zealand construction materials supplier. The site launches with waterproofing-focused content while keeping the information architecture open for insulation, roofing accessories, facade products, sealants, drainage, protection boards and broader building envelope materials.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based UI
- Mock content repository in `src/data/content.ts`
- Admin dashboard placeholder with local CRUD state
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
  solutions                        Solution listing and detail pages
  products                         Product catalogue and detail pages
  technical-library                Searchable download library
  projects                         Case studies
  resources                        Blog/resource articles
  about                            Company positioning
  contact                          Forms and contact details
  admin                            Admin dashboard and mock CRUD pages
  api/enquiries                    Basic form submission endpoint

prisma
  schema.prisma                    Future Supabase/Postgres Prisma schema
  seed.ts                          Future seed script

src/components
  admin                            Admin table/editor component
  cards                            Product, solution and document cards
  forms                            Filters and enquiry form
  site                             Layout, hero and section components

src/data/content.ts                Mock products, solutions, documents, projects, articles and enquiries
src/lib/contentRepository.ts       Fixture-backed public content service
src/lib/adminRepository.ts         Fixture-backed admin table listing service
src/types/content.ts               Shared content types
public/images                      Local placeholder visual assets
```

## Future Supabase, Database or CMS Integration

The current website does not connect to a database at runtime. `@prisma/client`, `prisma` and `prisma/schema.prisma` remain in the project so a future Supabase/Postgres integration can reuse the existing data model.

1. Keep the types in `src/types/content.ts` as the initial contract.
2. Keep page components calling service functions such as `getProducts()`, `getProductBySlug()`, `getDocuments()`, and `createEnquiry()`.
3. Replace the fixture-backed implementation in `src/lib/contentRepository.ts` with Prisma, Supabase or CMS calls.
4. Add real authentication for `/admin` using NextAuth, Supabase Auth or the selected CMS.
5. Replace placeholder file URLs in `technicalDocuments` with object storage or CMS asset URLs.

For future Prisma work, copy `.env.example`, set `DATABASE_URL` to a Supabase/Postgres connection string, then run the Prisma command needed for that integration. Do not run any database command for normal local website development.

## SEO Notes

- Main pages include metadata.
- Product detail pages include schema-ready JSON-LD product data.
- Clean URLs are used for products, solutions, projects and resources.
- Resource content is structured for NZ construction search terms such as waterproofing membrane NZ, commercial waterproofing, roof protection, building envelope materials and technical construction products.

## Admin Placeholder

The admin area is intentionally functional but mock-backed. It demonstrates the expected content management surfaces:

- Products
- Categories
- Solutions
- Documents
- Projects / case studies
- Blog / resources
- Enquiries

Changes made in admin tables are held in browser state only until Supabase, another database or a CMS is connected. Contact form submissions return a shaped response from the API route but are not persisted.
