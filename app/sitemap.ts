import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioinandout.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, priority: 0.6 })),
  ];
}
