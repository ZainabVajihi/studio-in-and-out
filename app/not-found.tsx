import Link from "next/link";

export default function NotFound() {
  return (
    <main id="top" className="p-projects">
      <header className="page-head wrap">
        <h1>Page not found</h1>
        <p>
          This page does not exist. Go back to the <Link href="/">home page</Link> or see our <Link href="/projects">projects</Link>.
        </p>
      </header>
    </main>
  );
}
