"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/useGsap";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { gradientFor, type Repo } from "@/lib/github";

const DEFAULT_VISIBLE = 5;

function prettify(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Projects({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const expandBtnRef = useRef<HTMLButtonElement>(null);

  const visibleRepos = expanded ? repos : repos.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = repos.length - DEFAULT_VISIBLE;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          },
        );
        const bg = card.querySelector(".project-bg");
        if (bg) {
          gsap.to(bg, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, [visibleRepos]);

  const handleToggle = () => {
    if (expanded) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setExpanded(false), 300);
    } else {
      setExpanded(true);
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">Work</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl font-bold md:text-5xl">Featured Projects</h2>
        <a
          href="https://github.com/mominshaikhdev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
        >
          <Github className="h-4 w-4" /> {repos.length} repositories on GitHub
        </a>
      </div>
      <p className="mt-4 max-w-2xl text-muted">
        Pulled live from my GitHub — every new repository I publish appears here
        automatically, sorted by newest first.
      </p>

      {repos.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Couldn&apos;t reach GitHub right now. Visit{" "}
          <a
            className="text-accent underline"
            href="https://github.com/mominshaikhdev"
            target="_blank"
            rel="noreferrer"
          >
            github.com/mominshaikhdev
          </a>
          .
        </p>
      ) : (
        <>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRepos.map((r) => (
              <article
                key={r.id}
                className="project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent"
              >
                <div
                  className={`project-bg pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${gradientFor(r.name)} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
                />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                    <span>{new Date(r.created_at).getFullYear()}</span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {r.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {r.forks_count}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{prettify(r.name)}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
                    {r.description ||
                      "An open-source project — open the repo for details."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {r.language && (
                      <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted">
                        {r.language}
                      </span>
                    )}
                    {(r.topics || []).slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3.5 py-1.5 text-xs transition hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    {r.homepage && (
                      <a
                        href={r.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs text-white transition hover:scale-105"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Expand / Collapse button */}
          {hiddenCount > 0 && (
            <div className="mt-12 flex flex-col items-center gap-3">
              {/* Fade divider */}
              {!expanded && (
                <div className="pointer-events-none relative w-full">
                  <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
                </div>
              )}

              <button
                ref={expandBtnRef}
                onClick={handleToggle}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/40 bg-card px-8 py-3.5 text-sm font-medium shadow-lg shadow-accent/10 transition-all duration-300 hover:border-accent hover:shadow-accent/25 hover:scale-105 active:scale-100"
              >
                {/* Animated gradient background */}
                <span
                  className={`absolute inset-0 bg-gradient-to-r from-accent/10 via-fuchsia-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <span className="relative flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {expanded ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp className="h-4 w-4 text-accent transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      <span>
                        Explore{" "}
                        <span className="font-bold text-accent">
                          {hiddenCount} more
                        </span>{" "}
                        {hiddenCount === 1 ? "project" : "projects"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
                    </>
                  )}
                </span>
              </button>

              {!expanded && (
                <p className="text-xs text-muted/60">
                  Showing 5 of {repos.length} repositories
                </p>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
