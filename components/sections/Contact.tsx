"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-el",
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
      id="contact"
      ref={ref}
      className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28 pb-10 text-center"
    >
      <p className="contact-el mb-3 text-sm uppercase tracking-widest text-accent">
        Contact
      </p>
      <h2 className="contact-el text-4xl font-bold md:text-6xl">
        Let's build something <span className="gradient-text">remarkable</span>.
      </h2>
      <p className="contact-el mx-auto mt-6 max-w-2xl text-lg text-muted">
        I'm available for full-stack engineering roles and freelance projects.
        Drop a line — I reply within 24 hours.
      </p>

      <a
        href="mailto:thisismominshaikh@gmail.com"
        className="contact-el mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-white shadow-2xl shadow-accent/30 transition hover:scale-105"
      >
        <Mail className="h-4 w-4" /> thisismominshaikh@gmail.com
      </a>

      <div className="contact-el mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
        <a
          href="tel:+8801405374822"
          className="inline-flex items-center gap-2 hover:text-accent"
        >
          <Phone className="h-4 w-4" /> +880-1405-374822
        </a>
        <a
          href="https://github.com/mominshaikhdev"
          target="_blank"
          className="inline-flex items-center gap-2 hover:text-accent"
        >
          <Github className="h-4 w-4" /> mominshaikhdev
        </a>
        <a
          href="https://linkedin.com/in/themominshaikh"
          target="_blank"
          className="inline-flex items-center gap-2 hover:text-accent"
        >
          <Linkedin className="h-4 w-4" /> themominshaikh
        </a>
      </div>
    </section>
  );
}
