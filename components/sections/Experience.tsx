"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { Building2, MapPin, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    role: "Independent | Open-Source Developer",
    organization: "Self-Directed",
    location: "Remote",
    period: "2020 – Present",
    tagline: "Building Agentic AI, Multi-Tenant SaaS & Real-Time Web Systems",
    points: [
      "Designed and shipped multiple full-stack open-source projects spanning agentic AI systems, SaaS platforms, real-time collaboration tools, and multi-tenant architectures — entirely self-directed.",
      "Built CodeFusion Research Agent — a Django/Next.js AI agent using Google Gemini 2.0 Flash function calling to autonomously explore GitHub repositories and answer deep technical questions.",
      "Engineered Collaborative Team Hub with dual-database architecture (PostgreSQL + MongoDB), real-time Socket.IO, JWT auth with transparent refresh interceptor, RBAC, and Kanban workflows deployed on Railway.",
      "Shipped Bookified — a production RAG PDF voice & chat platform powered by OpenAI Whisper, TTS, LangChain, and Vercel AI SDK streaming with Stripe subscriptions.",
      "Contributed reusable, well-documented codebases to GitHub; maintained production deployments on Vercel and Railway with automated CI/CD pipelines.",
    ],
  },
  {
    role: "WebFlow Developer",
    organization: "Flow Seek",
    location: "Khulna, Bangladesh",
    period: "2020 – 2023",
    tagline: "Client Web Engineering, Webflow CMS & Custom JS Integrations",
    points: [
      "Designed and built 20+ responsive marketing websites and landing pages in Webflow for clients across e-commerce, real estate, and local service industries, translating Figma designs into pixel-perfect, production-ready sites.",
      "Architected reusable Webflow CMS collections (blog, portfolio, case studies, team profiles) that empowered non-technical clients to self-manage content post-launch, reducing recurring developer support requests.",
      "Implemented custom scroll-triggered animations and micro-interactions using Webflow's native interaction engine, improving on-page engagement.",
      "Optimized on-page SEO fundamentals — semantic HTML, meta tags, structured data, image compression, and Core Web Vitals — on every project, consistently achieving 90+ Lighthouse scores.",
      "Extended Webflow's native functionality with custom JavaScript embeds and third-party integrations (Google Analytics, Mailchimp, Stripe payment links, Zapier automations).",
      "Owned the full client engagement lifecycle — requirements gathering, wireframing, design handoff, staging review, and launch — over a 3-year period.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-item",
        { x: -40, opacity: 0 },
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
      <p className="mb-3 text-sm uppercase tracking-widest text-accent font-semibold">
        Professional Journey
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">Work Experience</h2>
      <p className="mt-4 max-w-2xl text-muted">
        Hands-on experience delivering production web software, client solutions, and open-source contributions.
      </p>

      <div className="relative mt-16 pl-6 sm:pl-10">
        {/* Timeline vertical bar */}
        <span className="exp-line absolute left-2 sm:left-3 top-0 h-full w-0.5 bg-gradient-to-b from-accent via-accent2 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.role} className="exp-item relative">
              {/* Timeline marker */}
              <span className="absolute -left-6 sm:-left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_hsl(var(--accent)/0.5)]" />

              <div className="glass rounded-3xl border border-border p-6 sm:p-8 transition hover:border-accent/60 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent/10 border border-accent/30 px-3.5 py-1 text-xs font-bold text-accent">
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-muted">
                      <MapPin className="h-3.5 w-3.5" /> {exp.location}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-accent/80 flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" /> {exp.organization}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-fg">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {exp.tagline}
                </p>

                <ul className="mt-6 space-y-3">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
