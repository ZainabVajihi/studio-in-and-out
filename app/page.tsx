/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getSite } from "@/lib/content";
import { Amp } from "@/components/Amp";
import { EnquiryForm, JoinForm } from "@/components/Forms";

export const revalidate = 300;

export default async function Home() {
  const site = await getSite();
  const { hero, statement: st, philosophy: ph, services: sv, founders: fo, contact, join, studio } = site;

  return (
    <main id="top">
      <section className="hero wrap" aria-labelledby="hero-h">
        <div className="intro">
          <h1 id="hero-h">
            {hero.headline_before} <em>{hero.headline_em}</em> {hero.headline_after}
          </h1>
        </div>
        <div className="halves">
          {(["in", "out"] as const).map((side) => (
            <figure className={`half ${side}`} key={side}>
              <div className="ph">
                <img src={hero[side].image} alt={hero[side].alt} fetchPriority="high" />
              </div>
              <figcaption className="lbl">
                <span>{hero[side].word}</span>
                <small>{hero[side].label}</small>
              </figcaption>
            </figure>
          ))}
          <div className="knot" aria-hidden="true">
            <span className="amp">&amp;</span>
          </div>
        </div>
      </section>

      <section className="statement wrap" id="studio">
        <div className="st-grid">
          <div>
            <p className="reveal-text">
              {st.text.split(" ").map((w, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  <span className="w">{w}</span>
                </span>
              ))}
            </p>
            <div className="st-note">
              <p>
                <Amp text={st.note} />
              </p>
            </div>
            <div className="stat">
              <strong>
                {st.stat_value}
                <small>{st.stat_unit}</small>
              </strong>
              <span>
                <Amp text={st.stat_caption} />
              </span>
            </div>
          </div>
          <div className="st-media" aria-hidden="true">
            <figure className="st-arch">
              <img src={st.image_arch} alt="" />
            </figure>
            <figure className="st-small">
              <img src={st.image_small} alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section className="creed" aria-labelledby="creed-h">
        <div className="wrap">
          <div className="creed-head">
            <h2 id="creed-h">
              {ph.title_before} <em>{ph.title_em}</em>
            </h2>
            <p>{ph.intro}</p>
          </div>
          <div className="ideas">
            {ph.ideas.map((idea) => (
              <article className="idea rv" key={idea.word}>
                <figure>
                  <img src={idea.image} alt={idea.alt} loading="lazy" />
                </figure>
                <span className="lead-in">{idea.lead_in}</span>
                <h3 className="word">
                  <span>{idea.word}</span>
                </h3>
                <p>{idea.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="disc wrap" aria-labelledby="disc-h">
        <div className="sec-head">
          <div>
            <h2 className="sec-title" id="disc-h">
              {sv.title}
            </h2>
            <p style={{ marginTop: 14 }}>{sv.intro}</p>
          </div>
          <Link className="pill" href="/projects" style={{ marginTop: 0 }}>
            <i></i>See our projects
          </Link>
        </div>
        <div className="cards">
          {sv.cards.map((c) => (
            <article className="card rv" key={c.title}>
              <figure>
                <img src={c.image} alt={c.alt} loading="lazy" />
                <span className={`tag amp${c.tag === "&" ? " tag-amp" : ""}`}>{c.tag}</span>
              </figure>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="founders" id="founders" aria-labelledby="f-h">
        <div className="wrap">
          <div className="f-grid">
            <div className="f-copy">
              <div className="f-head">
                <h2 className="sec-title" id="f-h">
                  The minds behind Studio In <span className="amp">&amp;</span> Out
                </h2>
                <p className="names">{fo.names}</p>
              </div>
              {fo.paragraphs.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
              <blockquote>{fo.quote}</blockquote>
            </div>
            <figure className="duo-photo rv">
              <div className="ph">
                <img src={fo.photo} alt={fo.photo_alt} loading="lazy" />
              </div>
              <figcaption>
                {fo.people.map((p) => (
                  <span key={p.name}>
                    <b>{p.name}</b>
                    {p.role}
                  </span>
                ))}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="form-sec wrap" id="contact" aria-labelledby="c-h">
        <div className="panel">
          <div>
            <h2 id="c-h">{contact.title}</h2>
            <p className="lead">{contact.lead}</p>
            <div className="contact-list">
              {studio.phones.map((p) => (
                <div key={p.number}>
                  <small>{p.name}</small>
                  {p.number}
                </div>
              ))}
              <div>
                <small>Email</small>
                {studio.email}
              </div>
              <div>
                <small>Studio</small>
                {studio.address_lines.join(" ").replace(/,\s*/g, ", ").replace(/,\s*$/, "")}
              </div>
            </div>
          </div>
          <EnquiryForm number={studio.whatsapp} types={contact.project_types} />
        </div>
      </section>

      <section className="form-sec alt wrap" id="join" aria-labelledby="t-h">
        <div className="panel">
          <div>
            <h2 id="t-h">{join.title}</h2>
            <p className="lead">{join.lead}</p>
            <div className="trades">
              {join.trades.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <ol className="steps">
              {join.steps.map((s) => (
                <li key={s.title}>
                  <div>
                    <b>{s.title}</b>
                    {s.text}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <JoinForm number={studio.whatsapp} trades={join.trades} />
        </div>
      </section>
    </main>
  );
}
