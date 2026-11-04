"use client";
import { useState, type FormEvent } from "react";

// Nothing is stored: each form only builds a WhatsApp message for the visitor to send.

function useWhatsApp(number: string) {
  const [url, setUrl] = useState<string | null>(null);
  const prepare = (text: string) => setUrl(`https://wa.me/${number}?text=${encodeURIComponent(text)}`);
  const ready = url ? (
    <div className="sent full">
      <p>Your message is ready. Tap below to open WhatsApp and press send.</p>
      <a className="pill" href={url} target="_blank" rel="noopener">
        <i></i>Open WhatsApp
      </a>
    </div>
  ) : null;
  return { prepare, ready };
}

export function EnquiryForm({ number, types }: { number: string; types: string[] }) {
  const { prepare, ready } = useWhatsApp(number);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    prepare(`Hi Studio In & Out, I'm ${f.get("name")} (${f.get("phone")}).\nProject: ${f.get("type")}\n${f.get("msg") || ""}`);
  };
  return (
    <form id="enquiry" onSubmit={submit}>
      <label>
        Name<input id="c-name" name="name" required autoComplete="name" />
      </label>
      <label>
        Phone<input id="c-phone" name="phone" type="tel" required autoComplete="tel" />
      </label>
      <label className="full">
        What are you planning?
        <select id="c-type" name="type">
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="full">
        Tell us a little about it<textarea id="c-msg" name="msg" placeholder="Location, size, timeline" />
      </label>
      <button className="pill" type="submit">
        <i></i>Prepare WhatsApp message
      </button>
      <p className="note">We turn your answers into a WhatsApp message to the studio. You review it and press send.</p>
      {ready}
    </form>
  );
}

export function JoinForm({ number, trades }: { number: string; trades: string[] }) {
  const { prepare, ready } = useWhatsApp(number);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const firm = f.get("firm") ? ` (${f.get("firm")})` : "";
    prepare(
      `Hi Studio In & Out, I'd like to work with you as a contractor.\nName: ${f.get("name")}${firm}\nPhone: ${f.get("phone")}\nTrade: ${f.get("trade")}\nExperience: ${f.get("years") || "-"} years, team of ${f.get("team") || "-"}\nAreas: ${f.get("areas") || "-"}\nWork: ${f.get("link") || "-"}`,
    );
  };
  return (
    <form id="join-form" onSubmit={submit}>
      <label>
        Your name<input id="j-name" name="name" required autoComplete="name" />
      </label>
      <label>
        Firm name<input id="j-firm" name="firm" placeholder="Optional" />
      </label>
      <label>
        Phone / WhatsApp<input id="j-phone" name="phone" type="tel" required autoComplete="tel" />
      </label>
      <label>
        Your trade
        <select id="j-trade" name="trade" required defaultValue="">
          <option value="">Choose one</option>
          {trades.map((t) => (
            <option key={t}>{t}</option>
          ))}
          <option>Other</option>
        </select>
      </label>
      <label>
        Years of experience<input id="j-years" name="years" type="number" min={0} inputMode="numeric" />
      </label>
      <label>
        Team size<input id="j-team" name="team" type="number" min={1} inputMode="numeric" />
      </label>
      <label className="full">
        Areas you work in<input id="j-areas" name="areas" placeholder="e.g. South Mumbai, Thane, Navi Mumbai" />
      </label>
      <label className="full">
        Link to your work<input id="j-link" name="link" placeholder="Instagram, Google Drive or website (optional)" />
      </label>
      <button className="pill" type="submit">
        <i></i>Prepare my details
      </button>
      <p className="note">We turn your answers into a WhatsApp message to the studio. You can attach photos of your work in the same chat.</p>
      {ready}
    </form>
  );
}
