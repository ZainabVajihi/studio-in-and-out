import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, getSite } from "@/lib/content";
import { ProjectArticle, Walkthroughs } from "@/components/Project";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProject((await params).slug);
  if (!p) return {};
  const cover = p.media.find((m) => m.type === "image");
  return {
    title: p.name,
    description: p.concept_note[0] ?? `${p.name}, a ${p.kind.toLowerCase()} by Studio In & Out, Mumbai.`,
    openGraph: { title: `${p.name} | Studio In & Out`, images: cover ? [cover.src] : undefined },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const films = site.walkthroughs.filter((w) => w.project_slug === slug);

  return (
    <main id="top" className="p-projects p-single">
      <header className="page-head wrap">
        <p style={{ marginTop: 0 }}>
          <Link href="/projects">All projects</Link>
        </p>
      </header>
      <section className="work wrap" aria-label={p.name}>
        <ProjectArticle p={p} />
      </section>
      <Walkthroughs items={films} linkBase="" />
      {next && next.slug !== slug && (
        <section className="wrap next-proj">
          <Link href={`/projects/${next.slug}`}>
            <small>Next project</small>
            <span>{next.name}</span>
          </Link>
        </section>
      )}
    </main>
  );
}
