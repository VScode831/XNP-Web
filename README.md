# Rhinora Website

Professional full-stack-ready website scaffold for a New Zealand construction materials supplier. The site launches with waterproofing-focused content while keeping the information architecture open for insulation, roofing accessories, facade products, sealants, drainage, protection boards and broader building envelope materials.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Component-based UI
- MySQL 8 local database via Docker Compose
- Prisma ORM, migrations and seed data
- Mock content fixtures in `src/data/content.ts` used as the database seed and read fallback
- Admin dashboard with API-backed CRUD tables
- Enquiry API route at `src/app/api/enquiries/route.ts`

## Run Locally

```bash
npm install
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

PowerShell on this machine may block `npm.ps1`. Use:

```bash
npm.cmd install
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Open `http://localhost:3000`.

If Docker is not installed, install Docker Desktop first or point `DATABASE_URL` at an existing local MySQL 8 database. Read paths fall back to the seed fixture data if the database is unavailable, but admin writes and contact form persistence require MySQL.

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
  admin                            Admin dashboard and database-backed CRUD pages
  api/admin/[resource]             Generic admin CRUD endpoint
  api/enquiries                    Database-backed form submission endpoint

prisma
  schema.prisma                    MySQL schema
  migrations                       Initial database migration
  seed.ts                          Seed script using existing content fixtures

src/components
  admin                            Admin table/editor component
  cards                            Product, solution and document cards
  forms                            Filters and enquiry form
  site                             Layout, hero and section components

src/data/content.ts                Seed fixtures and database fallback content
src/lib/contentRepository.ts       Public content read/write repository
src/lib/adminRepository.ts         Admin table CRUD repository
src/lib/db.ts                      Shared Prisma client
src/types/content.ts               Shared content types
public/images                      Local placeholder visual assets
```

## Database

Local MySQL is configured through `docker-compose.yml`:

- Database: `rhinora`
- User: `rhinora`
- Password: `rhinora_local_password`
- Port: `3306`

Use `.env.example` as the template for local configuration:

```bash
DATABASE_URL="mysql://rhinora:rhinora_local_password@localhost:3306/rhinora"
```

Useful commands:

```bash
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run db:studio
```

Future CMS integration can replace the repository functions in `src/lib/contentRepository.ts` and `src/lib/adminRepository.ts` without changing the public page components heavily.

## SEO Notes

- Main pages include metadata.
- Product detail pages include schema-ready JSON-LD product data.
- Clean URLs are used for products, solutions, projects and resources.
- Resource content is structured for NZ construction search terms such as waterproofing membrane NZ, commercial waterproofing, roof protection, building envelope materials and technical construction products.

## Admin

The admin area keeps the authentication placeholder but persists table changes to MySQL when the database is running. It covers:

- Products
- Categories
- Solutions
- Documents
- Projects / case studies
- Blog / resources
- Enquiries

The first version keeps compact table forms and preserves richer editorial JSON fields from the seed data unless a row is deleted or recreated.
