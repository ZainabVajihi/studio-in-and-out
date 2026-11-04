import { createClient } from "@supabase/supabase-js";
import seedSite from "@/content/site.json";
import seedProjects from "@/content/projects.json";
import type { Media, Project, Site } from "./types";

// Content comes from the Supabase database when it is configured, and from the
// files in /content otherwise. The pages never need to know which.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const db = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export const usingDatabase = Boolean(db);

export async function getSite(): Promise<Site> {
  if (!db) return seedSite as Site;
  const { data, error } = await db.from("site_content").select("key, value");
  if (error || !data?.length) {
    console.error("site_content read failed, using built-in content", error);
    return seedSite as Site;
  }
  // Each top-level section of the site is one row; missing rows fall back to the file.
  const fromDb = Object.fromEntries(data.map((r) => [r.key, r.value]));
  return { ...(seedSite as Site), ...fromDb } as Site;
}

type ProjectRow = Omit<Project, "media"> & {
  project_media: (Media & { sort_order: number; poster: string | null })[];
};

export async function getProjects(): Promise<Project[]> {
  if (!db) return (seedProjects as Project[]).filter((p) => p.published).sort((a, b) => a.sort_order - b.sort_order);
  const { data, error } = await db
    .from("projects")
    .select("slug, number, kind, name, facts, concept_note, sort_order, published, project_media(type, src, poster, alt, sort_order)")
    .eq("published", true)
    .order("sort_order");
  if (error || !data) {
    console.error("projects read failed, using built-in content", error);
    return seedProjects as Project[];
  }
  return (data as unknown as ProjectRow[]).map(({ project_media, ...p }) => ({
    ...p,
    media: [...project_media]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) =>
        m.type === "video"
          ? { type: "video" as const, src: m.src, poster: m.poster ?? "", alt: m.alt }
          : { type: "image" as const, src: m.src, alt: m.alt },
      ),
  }));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}
