"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { gradientFor, type Repo } from "@/lib/github";

function prettify(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Projects({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLElement>(null);
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
            scrollTrigger: { trigger: card, start: "top 92%", once: true }
          }
        );
        const bg = card.querySelector(".project-bg");
        if (bg) {
          gsap.to(bg, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, [repos]);

  return (
    <section id="projects" ref={ref} className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
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
        Pulled live from my GitHub — every new repository I publish appears here automatically.
      </p>

      {repos.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Couldn't reach GitHub right now. Visit{" "}
          <a className="text-accent underline" href="https://github.com/mominshaikhdev" target="_blank" rel="noreferrer">
            github.com/mominshaikhdev
          </a>
          .
        </p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <article
              key={r.id}
              className="project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent"
            >
              <div
                className={`project-bg pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${gradientFor(r.name)} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
              />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                  <span>{new Date(r.pushed_at).getFullYear()}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />{r.stargazers_count}</span>
                    <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" />{r.forks_count}</span>
                  </div>
                </div>
                <h3 className="mt-3 text-xl font-bold">{prettify(r.name)}</h3>
                <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
                  {r.description || "An open-source project — open the repo for details."}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {r.language && (
                    <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted">{r.language}</span>
                  )}
                  {(r.topics || []).slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted">{t}</span>
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
      )}
    </section>
  );
}
