"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";

export default function About({ repoCount = 0 }: { repoCount?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-block",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
      gsap.to(".about-portrait", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
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
    { v: repoCount > 0 ? `${repoCount}+` : "—", l: "Public Repositories" },
    { v: "10+", l: "Frameworks Mastered" },
    { v: "2", l: "Languages Fluent" },
    { v: "∞", l: "Curiosity" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-center">
        {/* Portrait */}
        <div className="about-block relative mx-auto h-56 w-56 shrink-0 md:h-72 md:w-72">
          <div
            className="about-blob absolute -inset-4 rounded-full bg-gradient-to-tr from-accent via-accent2 to-accent opacity-40 blur-2xl"
            aria-hidden
          />
          <div className="about-portrait relative h-full w-full overflow-hidden rounded-full border-2 border-accent/40 shadow-2xl shadow-accent/20">
            <img
              src="https://github.com/mominshaikhdev.png?size=400"
              alt="Momin Shaikh"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="about-block mb-3 text-sm uppercase tracking-widest text-accent">
            About
          </p>
          <h2 className="about-block text-4xl font-bold md:text-5xl">
            I build <span className="gradient-text">scalable</span>, intelligent
            web platforms.
          </h2>
          <p className="about-block mt-6 max-w-2xl text-lg text-muted">
            I'm Momin — a full-stack engineer with a unique background bridging
            law and software. I design clean architectures, ship reliable APIs,
            and integrate AI deeply into product experiences. From multi-tenant
            SaaS to RAG-powered chat over PDFs, I love turning hard problems
            into elegant systems.
          </p>
        </div>
      </div>

      <div className="about-block mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="glass rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-accent"
          >
            <div className="gradient-text text-4xl font-bold">{s.v}</div>
            <div className="mt-2 text-xs uppercase tracking-wider text-muted">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
