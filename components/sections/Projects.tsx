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
  Info,
  Layers,
} from "lucide-react";
import { gradientFor, type Repo } from "@/lib/github";
import { featuredProjects, FeaturedProject } from "@/lib/projectsData";
import ProjectModal from "@/components/ProjectModal";

const DEFAULT_VISIBLE = 6;

function prettify(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Projects({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visibleRepos = expanded ? repos : repos.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = repos.length - DEFAULT_VISIBLE;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [visibleRepos]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <p className="mb-3 text-sm uppercase tracking-widest text-accent font-semibold">
        Featured Work
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold md:text-5xl">Projects & Systems</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Explore production applications, AI agents, and open-source platforms. Click <b>&quot;View Details&quot;</b> on any card to view architecture, challenges, and future roadmaps.
          </p>
        </div>
        <a
          href="https://github.com/mominshaikhdev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent"
        >
          <Github className="h-4 w-4" /> {repos.length} Repositories on GitHub
        </a>
      </div>

      {/* Flagship Curated Projects */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((proj) => (
          <article
            key={proj.id}
            className="project-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/10"
          >
            {/* Background Blob */}
            <div
              className={`pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br ${gradientFor(proj.name)} opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40`}
            />

            <div className="relative flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
                  <span className="rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-[11px] font-bold text-accent">
                    {proj.category}
                  </span>
                  <span>{proj.year}</span>
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-fg group-hover:text-accent transition-colors">
                  {proj.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-accent/90">
                  {proj.tagline}
                </p>

                <p className="mt-4 text-sm text-muted leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-bg/80 px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="rounded-full border border-border bg-bg/80 px-2.5 py-1 text-[11px] font-medium text-accent">
                      +{proj.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-8 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/40 px-4 py-2 text-xs font-bold text-accent transition hover:bg-accent hover:text-white"
                >
                  <Info className="h-3.5 w-3.5" /> View Details
                </button>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Code"
                      className="rounded-full border border-border bg-bg p-2 text-muted transition hover:border-accent hover:text-accent"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Website"
                      className="rounded-full bg-accent p-2 text-white transition hover:scale-110"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* GitHub Live Repos Section Header */}
      <div className="mt-24 border-t border-border pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl flex items-center gap-2">
              <Layers className="h-6 w-6 text-accent" /> GitHub Live Feed
            </h3>
            <p className="mt-2 text-sm text-muted">
              Live repositories fetched automatically from GitHub.
            </p>
          </div>
        </div>

        {repos.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRepos.map((r) => (
              <article
                key={r.id}
                className="project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${gradientFor(r.name)} opacity-20 blur-3xl`}
                />
                <div className="relative flex flex-1 flex-col justify-between">
                  <div>
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
                    <h4 className="mt-3 text-lg font-bold">{prettify(r.name)}</h4>
                    <p className="mt-2 text-xs text-muted line-clamp-2">
                      {r.description || "An open-source repository on GitHub."}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    {r.language && (
                      <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted font-medium">
                        {r.language}
                      </span>
                    )}
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium transition hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Expand / Collapse button */}
        {hiddenCount > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card px-6 py-3 text-sm font-medium shadow-md transition hover:border-accent hover:scale-105"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              {expanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-4 w-4 text-accent" />
                </>
              ) : (
                <>
                  <span>Show {hiddenCount} more repos</span>
                  <ChevronDown className="h-4 w-4 text-accent" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
