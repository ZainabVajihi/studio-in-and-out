import type { Metadata } from "next";
import { getProjects, getSite } from "@/lib/content";
import { Amp } from "@/components/Amp";
import { ProjectArticle, Walkthroughs } from "@/components/Project";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Projects",
  description: "Homes designed by Studio In & Out, Mumbai: concept notes, photographs and walkthrough films.",
};

export default async function ProjectsPage() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  return (
    <main id="top" className="p-projects">
      <header className="page-head wrap">
        <h1 id="work-h">Projects</h1>
        <p>
          <Amp text={site.projects_page.intro} />
        </p>
      </header>
      <section className="work wrap" id="work" aria-labelledby="work-h">
        {projects.map((p) => (
          <ProjectArticle key={p.slug} p={p} linkTitle />
        ))}
      </section>
      <Walkthroughs items={site.walkthroughs} />
    </main>
  );
}
