"use client";
import { useEffect } from "react";
import { X, ExternalLink, Github, Sparkles, AlertCircle, Lightbulb, Rocket } from "lucide-react";
import { FeaturedProject } from "@/lib/projectsData";

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-accent/30 bg-card text-fg shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-accent/20 via-accent2/20 to-cyan-500/20 px-6 py-8 md:px-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-border bg-bg/80 p-2 text-muted transition hover:border-accent hover:text-fg"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {project.category}
            </span>
            <span className="text-xs font-medium text-muted">{project.year}</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            {project.name}
          </h2>
          <p className="mt-2 text-lg text-muted">{project.tagline}</p>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 space-y-8">
          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo / Website
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
              >
                <Github className="h-4 w-4" /> GitHub Repository
              </a>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
              <Sparkles className="h-5 w-5 text-accent" /> Overview & Architecture
            </h3>
            <p className="mt-3 leading-relaxed text-muted text-base">
              {project.longDescription}
            </p>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-fg">
              <Rocket className="h-5 w-5 text-accent" /> Technology Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-fg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges Faced */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-500">
              <AlertCircle className="h-5 w-5" /> Key Challenges Faced
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Plans & Roadmap */}
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-cyan-400">
              <Lightbulb className="h-5 w-5" /> Potential Improvements & Future Plans
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {project.futurePlans.map((fp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                  <span>{fp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-bg/50 px-6 py-4 text-right md:px-10">
          <button
            onClick={onClose}
            className="rounded-full border border-border bg-card px-6 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
