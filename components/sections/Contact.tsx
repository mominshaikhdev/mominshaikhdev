"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/useGsap";
import { Mail, Github, Linkedin, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative mx-auto max-w-5xl px-6 pt-20 md:pt-28 pb-16 text-center"
    >
      <p className="contact-el mb-3 text-sm uppercase tracking-widest text-accent font-semibold">
        Get In Touch
      </p>
      <h2 className="contact-el text-4xl font-extrabold md:text-6xl">
        Let&apos;s build something <span className="gradient-text">remarkable</span>.
      </h2>
      <p className="contact-el mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
        I&apos;m available for full-stack software engineering roles, AI agent integration projects, and freelance engagements. Reach out directly — I typically reply within 24 hours.
      </p>

      {/* Quick Action Badges */}
      <div className="contact-el mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="mailto:thisismominshaikh@gmail.com"
          className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-accent/25 transition hover:scale-105"
        >
          <Mail className="h-4 w-4" /> thisismominshaikh@gmail.com
        </a>

        <a
          href="https://wa.me/8801405374822"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-400 shadow-md transition hover:bg-emerald-500 hover:text-white hover:scale-105"
        >
          <MessageSquare className="h-4 w-4" /> WhatsApp: +880-1405-374822
        </a>
      </div>

      {/* Social Links */}
      <div className="contact-el mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
        <a
          href="tel:+8801405374822"
          className="inline-flex items-center gap-2 hover:text-accent transition"
        >
          <Phone className="h-4 w-4 text-accent" /> +880-1405-374822
        </a>
        <a
          href="https://github.com/mominshaikhdev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-accent transition"
        >
          <Github className="h-4 w-4 text-accent" /> mominshaikhdev
        </a>
        <a
          href="https://linkedin.com/in/themominshaikh"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-accent transition"
        >
          <Linkedin className="h-4 w-4 text-accent" /> themominshaikh
        </a>
      </div>

      {/* Contact Form */}
      <div className="contact-el mt-12 mx-auto max-w-xl text-left glass rounded-3xl border border-border p-8 shadow-xl">
        <h3 className="text-xl font-bold text-fg mb-4 text-center">
          Send a Direct Message
        </h3>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in">
            <CheckCircle className="h-12 w-12 text-emerald-400 mb-3" />
            <h4 className="text-lg font-bold text-fg">Message Received!</h4>
            <p className="text-sm text-muted mt-1">
              Thank you for reaching out. Momin will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Hi Momin, I'd like to discuss a project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
