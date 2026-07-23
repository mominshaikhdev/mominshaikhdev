"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { Code, Cpu, Database, Wrench, Layers, Terminal } from "lucide-react";

const groups = [
  {
    title: "Languages",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Python",
      "PHP",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    items: [
      "React.js",
      "Next.js",
      "Express.js",
      "Node.js",
      "Django / DRF",
      "Laravel",
      "LangChain",
      "LangGraph",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS v4",
      "GSAP",
      "Three.js",
      "Recharts",
      "Better Auth / Clerk",
    ],
  },
  {
    title: "AI & ML Integration",
    icon: Cpu,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "OpenAI GPT",
      "Google Gemini 2.0 (Function Calling)",
      "Groq (Llama 3.3 70B & 3.2 Vision)",
      "Agentic AI Systems (Tool Loops)",
      "Whisper STT / OpenAI TTS",
      "Vercel AI SDK",
      "Vector DBs (Pinecone/Qdrant)",
      "MLOps & Prompt Engineering",
    ],
  },
  {
    title: "Databases & ORMs",
    icon: Database,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Prisma ORM",
      "Mongoose ORM",
      "Eloquent ORM",
      "Query Optimization",
      "N+1 Elimination",
      "Eager Loading",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/30",
    items: [
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "GitHub Actions (CI/CD)",
      "AWS & GCP",
      "Vercel & Railway",
      "Sentry Monitoring",
      "Linux / Unix CLI",
      "Uploadthing",
      "Vite",
    ],
  },
  {
    title: "System Concepts",
    icon: Terminal,
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
    items: [
      "Multi-tenant Architecture",
      "Role-Based Access Control (RBAC)",
      "Agentic AI Execution Systems",
      "Dual-DB Architecture (PostgreSQL+MongoDB)",
      "Event-Driven & WebSockets",
      "RESTful & GraphQL API Design",
      "Microservices",
      "Webhooks Integration",
    ],
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
      <p className="mb-3 text-sm uppercase tracking-widest text-accent font-semibold">
        Technical Toolkit
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">Skills & Competencies</h2>
      <p className="mt-4 max-w-2xl text-muted">
        A comprehensive breakdown of technologies, frameworks, AI SDKs, and architectural concepts I use to construct high-performance applications.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              className={`skill-card glass relative overflow-hidden rounded-3xl border ${g.borderColor} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${g.color} opacity-50 blur-2xl pointer-events-none`} />

              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-fg">
                  {g.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-medium text-muted transition hover:border-accent hover:text-fg"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
