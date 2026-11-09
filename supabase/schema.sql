-- Studio In & Out: website content tables.
-- Run this once in Supabase (SQL Editor > New query > Run), then run seed.sql.
-- Later phases (admin panel, accounts, work orders, ledgers, bills) add their
-- own tables next to these; nothing here needs to change for them.

create extension if not exists "pgcrypto";

-- One row per section of the site (hero, statement, philosophy, services,
-- founders, contact, join, studio, projects_page, walkthroughs).
-- The value has the same shape as the matching section of content/site.json.
create table if not exists public.site_content (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9-]+$'),
  number        text not null,
  kind          text not null,
  name          text not null,
  facts         jsonb not null default '[]'::jsonb,   -- [{ "label": "Area", "value": "350 sq. ft." }]
  concept_note  text[] not null default '{}',          -- one entry per paragraph; "## " starts a small heading
  documents     jsonb not null default '[]'::jsonb,   -- [{ "label": "Download the project panel (PDF)", "href": "/assets/x.pdf" }]
  sort_order    integer not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Photos and films of a project, in display order.
-- The first item is the large photo beside the text.
create table if not exists public.project_media (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  type        text not null check (type in ('image', 'video')),
  src         text not null,
  poster      text,
  alt         text not null default '',
  display     text check (display in ('full')),     -- 'full' = across the whole width, uncropped
  caption     text,
  sort_order  integer not null default 0
);
-- Columns added after the first release (safe to run on an existing database).
alter table public.projects      add column if not exists documents jsonb not null default '[]'::jsonb;
alter table public.project_media add column if not exists display text check (display in ('full'));
alter table public.project_media add column if not exists caption text;

create index if not exists project_media_project_idx on public.project_media (project_id, sort_order);

-- Keep updated_at current.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists site_content_touch on public.site_content;
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

-- Security: the public website may only read, and only published projects.
-- Editing will happen through the admin panel with a signed-in owner account.
alter table public.site_content  enable row level security;
alter table public.projects      enable row level security;
alter table public.project_media enable row level security;

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content" on public.site_content
  for select using (true);

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select using (published);

drop policy if exists "public read media of published projects" on public.project_media;
create policy "public read media of published projects" on public.project_media
  for select using (exists (select 1 from public.projects p where p.id = project_id and p.published));
