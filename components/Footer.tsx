import Link from "next/link";
import type { Site } from "@/lib/types";

export function Footer({ site }: { site: Site }) {
  const s = site.studio;
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div>
            <h4>Studio</h4>
            <span>
              {s.address_lines.map((l, i) => (
                <span key={i}>
                  {l}
                  {i < s.address_lines.length - 1 && <br />}
                </span>
              ))}
            </span>
          </div>
          <div>
            <h4>Talk to us</h4>
            {s.phones.map((p) => (
              <span key={p.number}>{p.number}</span>
            ))}
            <span>{s.email}</span>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/projects">Projects</Link>
            <a href="/#founders">Founders</a>
            <a href="/#join">Join Us</a>
          </div>
          <div>
            <h4>Follow</h4>
            <a href={s.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </div>
        <div className="wordmark" aria-hidden="true">
          In <span className="amp">&amp;</span> Out
        </div>
        <div className="f-bot">
          <span>© {new Date().getFullYear()} Studio In &amp; Out</span>
          <span>{s.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton({ number }: { number: string }) {
  return (
    <a className="wa" href={`https://wa.me/${number}`} target="_blank" rel="noopener" aria-label="Message the studio on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2l-.4-.2z" />
      </svg>
    </a>
  );
}
