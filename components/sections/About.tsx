"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { Code2, Compass, Heart } from "lucide-react";

export default function About({ repoCount = 0 }: { repoCount?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
      gsap.to(".about-blob", {
        yPercent: 20,
        rotate: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { v: repoCount > 0 ? `${repoCount}+` : "20+", l: "Public Repositories" },
    { v: "10+", l: "Frameworks Mastered" },
    { v: "2", l: "Languages Fluent" },
    { v: "∞", l: "Curiosity & Grit" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-12 md:py-20"
    >
      <div className="grid gap-6 md:gap-12 md:grid-cols-[320px_1fr] md:items-start">
        {/* Portrait & Profile Card */}
        <div className="about-block relative mx-auto h-64 w-64 shrink-0 md:h-80 md:w-80 md:sticky md:top-28">
          <div
            className="about-blob absolute -inset-4 rounded-full bg-gradient-to-tr from-accent via-accent2 to-cyan-500 opacity-40 blur-2xl"
            aria-hidden
          />
          <div className="about-portrait relative h-full w-full overflow-hidden rounded-3xl border-2 border-accent/40 shadow-2xl shadow-accent/20 bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/mominshaikhdev.png?size=400"
              alt="Momin Shaikh"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="about-block mb-2 text-sm uppercase tracking-widest text-accent font-semibold">
            About Me
          </p>
          <h2 className="about-block text-3xl font-bold md:text-5xl leading-tight">
            Building scalable web platforms & <span className="gradient-text">intelligent software</span> architecture.
          </h2>

          {/* Programming Journey */}
          <div className="about-block mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-fg">
              <Code2 className="h-5 w-5 text-accent" /> My Programming Journey
            </h3>
            <p className="mt-3 text-base text-muted leading-relaxed">
              My engineering journey began in 2020 with a relentless, self-directed drive to build tools that solve complex real-world problems. Over the years, I mastered full-stack development across JavaScript/TypeScript, Python, and PHP ecosystems — building production-grade web platforms with <b>React, Next.js, Express, Django, and Laravel</b>. Recently, I specialized in <b>Agentic AI systems</b>, function-calling tool loops, and RAG architectures that push the boundaries of automated software intelligence.
            </p>
          </div>

          {/* Work I Enjoy */}
          <div className="about-block mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-fg">
              <Compass className="h-5 w-5 text-accent" /> The Work I Enjoy
            </h3>
            <p className="mt-3 text-base text-muted leading-relaxed">
              I thrive on building high-impact systems: <b>multi-tenant SaaS platforms</b> with strict data isolation, <b>autonomous AI research agents</b>, <b>real-time collaborative applications</b> using WebSockets, and high-throughput RESTful/GraphQL APIs. I enjoy designing clean database schemas (PostgreSQL, MongoDB, Redis) and writing maintainable, type-safe code.
            </p>
          </div>

          {/* Interests Outside Coding */}
          <div className="about-block mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-lg font-bold text-fg">
              <Heart className="h-5 w-5 text-accent" /> Interests & Beyond Code
            </h3>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Outside of programming, I have a deep background in <b>Philosophy and Physics</b>, which sharpens my first-principles problem-solving approach. I bring logical structure and discipline to software engineering. I am also an avid Linux/CLI enthusiast, open-source contributor, and reader of scientific literature.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="about-block mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="glass rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-accent shadow-md"
          >
            <div className="gradient-text text-4xl font-extrabold">{s.v}</div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
