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

src/components
  admin                            Admin table/editor component
  cards                            Product, solution and document cards
  forms                            Filters and enquiry form
  site                             Layout, hero and section components

src/data/content.ts                Mock products, solutions, documents, projects, articles and enquiries
src/types/content.ts               Shared content types
public/images                      Local placeholder visual assets
```

## Future Database or CMS Integration

The current pages read from `src/data/content.ts`. To connect PostgreSQL, Supabase, Prisma or a headless CMS later:

1. Keep the types in `src/types/content.ts` as the initial contract.
2. Replace direct imports from `src/data/content.ts` with service functions such as `getProducts()`, `getProductBySlug()`, `getDocuments()`, and `createEnquiry()`.
3. Move admin CRUD operations from local React state to API routes or server actions.
4. Add real authentication for `/admin` using NextAuth, Supabase Auth or the selected CMS.
5. Replace placeholder file URLs in `technicalDocuments` with object storage or CMS asset URLs.

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

Changes made in admin tables are held in browser state only until a database or CMS is connected.
