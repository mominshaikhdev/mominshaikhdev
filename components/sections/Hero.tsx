"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { ArrowDown, Download, Github, Linkedin, Mail, MessageSquare } from "lucide-react";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        stagger: 0.1,
      });
      gsap.from(".hero-3d", {
        scale: 0.6,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(".parallax-slow", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
      gsap.to(".parallax-mid", {
        yPercent: -55,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
      gsap.to(".parallax-fast", {
        yPercent: -85,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
      gsap.to(".hero-3d", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
      gsap.to(".hero-content", {
        yPercent: 15,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    }, root);

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(".parallax-slow", { x: x * 15, y: y * 10, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-mid",  { x: x * 30, y: y * 20, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-fast", { x: x * 50, y: y * 35, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const titleWords = "Full-Stack Engineer".split(" ");

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg parallax-slow" aria-hidden />
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl parallax-fast" aria-hidden />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-accent2/30 blur-3xl parallax-slow" aria-hidden />
      <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl parallax-mid" aria-hidden />
      <div className="absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl parallax-mid" aria-hidden />

      <div className="hero-content relative mx-auto grid max-w-7xl gap-12 px-6 pt-4 pb-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="hero-sub mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Full-Stack & AI Integration Specialist
          </div>
          <h1 className="hero-title text-5xl font-bold leading-tight md:text-7xl">
            <span className="inline-block">Momin</span>{" "}
            <span className="inline-block">Shaikh</span>
            <br />
            {titleWords.map((w, i) => (
              <span key={i} className="inline-block gradient-text mr-3">
                {w}
              </span>
            ))}
          </h1>
          <p className="hero-sub mt-6 max-w-xl text-lg text-muted leading-relaxed">
            I architect production-grade web platforms — multi-tenant SaaS systems,
            bounded agentic AI tool loops, RAG applications, and real-time collaborative platforms using{" "}
            <b className="text-fg font-semibold">React, Next.js, Node.js, Django, Laravel</b> and{" "}
            <b className="text-fg font-semibold">modern AI SDKs.</b>
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              download="Momin_Shaikh_Resume.pdf"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-accent/30 transition hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#projects"
              className="hero-cta rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition hover:scale-105 hover:border-accent"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="hero-cta rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition hover:scale-105 hover:border-accent"
            >
              Get in Touch
            </a>
          </div>

          {/* Social Profiles */}
          <div className="hero-cta mt-8 flex items-center gap-4 text-muted">
            <span className="text-xs uppercase tracking-wider text-muted font-medium">Connect:</span>
            <a
              href="https://github.com/mominshaikhdev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border bg-card p-2.5 transition hover:border-accent hover:text-accent hover:scale-110"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/themominshaikh"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border bg-card p-2.5 transition hover:border-accent hover:text-accent hover:scale-110"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:thisismominshaikh@gmail.com"
              aria-label="Email"
              className="rounded-full border border-border bg-card p-2.5 transition hover:border-accent hover:text-accent hover:scale-110"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/8801405374822"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-border bg-card p-2.5 transition hover:border-accent hover:text-accent hover:scale-110"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="hero-3d relative aspect-square w-full max-w-lg justify-self-center">
          <ThreeScene />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted"
        aria-label="Scroll"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
}
