"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";

const groups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "GSAP",
      "Three.js",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js / Express",
      "Laravel",
      "Django",
      "REST",
      "GraphQL",
      "WebSockets",
      "Prisma",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    title: "AI / ML",
    items: [
      "RAG (LangChain)",
      "LangGraph",
      "OpenAI GPT",
      "Whisper STT",
      "OpenAI TTS",
      "Vercel AI SDK",
      "Vector Databases",
      "MLOps",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "Cloud Deployment (AWS/GCP)",
      "Sentry",
      "Vercel",
      "Linux/CLI",
    ],
  },
  {
    title: "Platform",
    items: ["Stripe", "Clerk", "Sanctum", "Cloudinary", "Uploadthing"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">
        Toolkit
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">Skills & Stack</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {groups.map((g) => (
          <div
            key={g.title}
            className="skill-card glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-accent"
          >
            <h3 className="mb-4 text-lg font-semibold gradient-text">
              {g.title}
            </h3>
            <ul className="space-y-2">
              {g.items.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
