import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentro Memory Pendant",
  description: "Frontend prototype for a dementia care AI pendant system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <header className="top-nav" aria-label="Zentro Memory Pendant navigation">
            <Link className="brand-mark" href="/memory-pendant">
              <span className="brand-orb" aria-hidden="true">
                Z
              </span>
              <span>Zentro Memory Pendant</span>
            </Link>
            <nav className="nav-links">
              <Link href="/memory-pendant">Overview</Link>
              <Link href="/memory-pendant/dashboard">Dashboard</Link>
              <Link href="/memory-pendant/simulator">Simulator</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
