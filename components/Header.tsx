"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const onHome = usePathname() === "/";
  const h = onHome ? "" : "/"; // section links point back to the home page from other pages
  const onProjects = !onHome;
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="Studio In and Out, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="Studio In & Out" />
        </Link>
        <nav className="nav" aria-label="Main">
          <a href={`${h}#studio`}>Studio</a>
          <Link href="/projects" className={onProjects ? "cur" : undefined} aria-current={onProjects ? "page" : undefined}>
            Projects
          </Link>
          <a href={`${h}#founders`}>Founders</a>
          <a href={`${h}#contact`}>Contact</a>
          <a href={`${h}#join`}>Join Us</a>
        </nav>
      </div>
    </header>
  );
}
