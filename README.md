# Studio In & Out website

Next.js (App Router, TypeScript) site for Studio In & Out, architecture and interior design, Mumbai.
Hosted on Vercel; the domain studioinandout.com is registered at GoDaddy.

## Pages

| Address | What it shows |
|---|---|
| `/` | Home: opening, studio statement, philosophy, what we do, founders, Start a project, Join Us |
| `/projects` | All projects in full, then the walkthrough films |
| `/projects/[slug]` | One project on its own page (for sharing and Google), e.g. `/projects/a3805` |

The old addresses `/index.html` and `/projects.html` redirect to the new ones.

## Where the content lives

All text, photos and projects come from `lib/content.ts`, which reads:

- **the Supabase database**, when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, or
- **the files in `content/`** (`site.json`, `projects.json`) otherwise.

Pages refresh their content from the database every 5 minutes.
Photos and videos are in `public/assets/`.

The forms do not store anything: they build a WhatsApp message for the visitor to send.

## Database (Supabase)

1. Create a project at supabase.com (region: Mumbai, `ap-south-1`).
2. In **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. In **Project Settings > API**, copy the Project URL and the `anon` public key.
4. In Vercel, **Settings > Environment Variables**, add them as
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then redeploy.

Tables: `site_content` (one row per site section, JSON), `projects`, `project_media`.
The public site can only read; row-level security blocks writes until the admin panel adds signed-in owners.

After editing anything in `content/`, run `npm run db:seed-sql` to regenerate `supabase/seed.sql`.

## Working on it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also checks types
```

Fonts (Poppins and Playfair Display, matching the logo) are bundled from npm, so the site makes no requests to Google.
