"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";

const items = [
  {
    role: "Full-Stack Engineer",
    org: "Independent / Open Source",
    time: "2020 – Present",
    points: [
      "Architected multi-tenant SaaS platforms with strict data isolation and RBAC, using Laravel and Django for robust backend APIs.",
      "Shipped RAG-powered AI products integrating LangChain, LangGraph, OpenAI and Vercel AI SDK with vector database retrieval (Pinecone / Qdrant).",
      "Built real-time collaborative apps with Socket.IO and optimistic UI patterns.",
      "Containerised services with Docker and orchestrated workloads via Kubernetes; deployed to AWS/GCP with full CI/CD pipelines (GitHub Actions).",
      "Integrated Sentry for error monitoring and implemented MLOps practices for model versioning and observability.",
      "Used Redis for caching, session management, and pub/sub in high-throughput APIs.",
    ],
  },
  {
    role: "Intern Lawyer",
    org: "Judge Court Kushtia",
    time: "March 2026 – Present",
    points: [
      "High-volume district court environment; case prep, legal research and drafting.",
      "Sharpened analytical and argumentation skills via precedent and statute analysis.",
    ],
  },
  {
    role: "LL.B (Hon's) — Al-Fiqh and Law",
    org: "Islamic University, Kushtia-Jhenaidah",
    time: "2019 – 2023",
    points: [
      "CGPA: 3.28 / 4.00. Strong analytical foundation in philosophy and physics.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
      gsap.fromTo(
        ".exp-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.5,
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">
        Journey
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">Experience & Education</h2>

      <div className="relative mt-16 pl-8">
        <span className="exp-line absolute left-2 top-0 h-full w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />
        <div className="space-y-12">
          {items.map((it) => (
            <div key={it.role} className="exp-item relative">
              <span className="absolute -left-7 top-2 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.2)]" />
              <div className="text-xs uppercase tracking-widest text-muted">
                {it.time}
              </div>
              <h3 className="mt-1 text-xl font-semibold">{it.role}</h3>
              <div className="text-sm text-accent">{it.org}</div>
              <ul className="mt-3 space-y-1.5 text-muted">
                {it.points.map((p) => (
                  <li key={p} className="text-sm">
                    — {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
