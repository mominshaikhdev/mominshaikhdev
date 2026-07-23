"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, FileText, Download } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // scroll glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver: auto-highlight active section
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }

          if (visible.size > 0) {
            const best = [...visible.entries()].sort(
              (a, b) => b[1] - a[1],
            )[0][0];
            setActive(`#${best}`);
          }
        },
        { threshold: [0, 0.15, 0.5], rootMargin: "-64px 0px -35% 0px" },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const rafScroll = useCallback((targetY: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) return;
    const duration = 380;
    let startTime: number | null = null;

    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  // single-click smooth scroll
  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const navH = 72;
      const targetY = el.getBoundingClientRect().top + window.scrollY - navH;
      rafScroll(targetY);
      setActive(href);
    },
    [rafScroll],
  );

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="gradient-text">Momin</span> Shaikh
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className={`
                  relative px-3.5 py-2 text-sm font-medium rounded-full
                  transition-all duration-200
                  ${isActive ? "text-fg" : "text-muted hover:text-fg"}
                  group
                `}
              >
                {/* Active pill */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-accent/15 border border-accent/30" />
                )}

                {/* Hover underline */}
                <span
                  className={`
                    absolute bottom-1.5 left-3.5 right-3.5 h-px rounded-full
                    bg-gradient-to-r from-accent to-accent2
                    transition-all duration-300
                    ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"}
                  `}
                />

                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            download="Momin_Shaikh_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition hover:bg-accent hover:text-white"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>

          <ThemeToggle />

          <button
            className="md:hidden rounded-full border border-border p-2 transition hover:border-accent"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-4 mb-4 rounded-2xl p-3 md:hidden space-y-1">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-accent/15 text-fg font-medium"
                      : "text-muted hover:bg-card hover:text-fg"
                  }
                `}
              >
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                )}
                {l.label}
              </a>
            );
          })}

          <div className="pt-2 border-t border-border/50">
            <a
              href="/resume.pdf"
              target="_blank"
              download="Momin_Shaikh_Resume.pdf"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-md"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
