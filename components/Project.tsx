/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Media, Project, Walkthrough } from "@/lib/types";

function Fig({ m, cls }: { m: Media; cls: string }) {
  return (
    <figure className={`${cls} rv`.trim()}>
      {m.type === "video" ? (
        <video src={m.src} poster={m.poster} autoPlay muted loop playsInline preload="auto" aria-label={m.alt} />
      ) : (
        <img src={m.src} alt={m.alt} loading="lazy" />
      )}
    </figure>
  );
}

/**
 * Text on the left and one photo on the right at the same height, then the
 * remaining photos in an even three-column grid. Wide tiles are added at the
 * start so every row ends full.
 */
export function ProjectArticle({ p, linkTitle }: { p: Project; linkTitle?: boolean }) {
  const rest = [...p.media];
  const lead = rest.shift();
  const hasNote = p.concept_note.length > 0;
  const fill = hasNote ? undefined : rest.shift();
  const wide = (3 - (rest.length % 3)) % 3;

  return (
    <article className="proj" id={p.slug} aria-labelledby={`${p.slug}-h`}>
      <div className="proj-text">
        <div>
          <span className="no">
            {p.number} / {p.kind}
          </span>
          <h3 id={`${p.slug}-h`}>{linkTitle ? <Link href={`/projects/${p.slug}`}>{p.name}</Link> : p.name}</h3>
          <dl className="facts">
            {p.facts.map((f) => (
              <FactRow key={f.label} label={f.label} value={f.value} />
            ))}
          </dl>
          <div className="note">
            {hasNote ? p.concept_note.map((t, i) => <p key={i}>{t}</p>) : <p className="muted">Concept note coming soon.</p>}
          </div>
        </div>
        {fill && <Fig m={fill} cls="fill" />}
      </div>
      {lead && <Fig m={lead} cls="lead" />}
      <div className="gallery">
        {rest.map((m, i) => (
          <Fig key={m.src} m={m} cls={i % 2 === 0 && i / 2 < wide ? "span2" : ""} />
        ))}
      </div>
    </article>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}

export function Walkthroughs({ items, linkBase = "#" }: { items: Walkthrough[]; linkBase?: string }) {
  if (!items.length) return null;
  return (
    <section className="film" aria-labelledby="film-h">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="sec-title" id="film-h">
              Walkthroughs
            </h2>
            <p style={{ marginTop: 14 }}>
              {items.length === 1 ? "Step inside the finished home. A short film shot on site." : `Step inside ${items.length === 2 ? "two" : items.length} finished homes. Short films shot on site.`}
            </p>
          </div>
          <a className="pill" href="https://www.instagram.com/studio.inandout/" target="_blank" rel="noopener">
            <i></i>More films on Instagram
          </a>
        </div>
        <div className="films">
          {items.map((w) => (
            <article className="walk rv" key={w.video}>
              <div className="reel">
                <video src={w.video} poster={w.poster} autoPlay muted loop playsInline aria-label={w.alt} />
                <span className="badge">
                  <i></i>
                  {w.badge}
                </span>
              </div>
              <div className="meta">
                <small>Film / Residence</small>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                {linkBase && <a href={linkBase === "#" ? `#${w.project_slug}` : `${linkBase}${w.project_slug}`}>See the project</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
