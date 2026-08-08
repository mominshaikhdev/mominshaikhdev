"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/useGsap";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSenderName, setLastSenderName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [countdown, setCountdown] = useState(5);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const resetFormState = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setFormData({ name: "", email: "", message: "" });
    setCountdown(5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    let isSuccess = false;

    // Step 1: Attempt sending via Next.js backend API
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        isSuccess = true;
      }
    } catch {
      // Backend API call failed, will try direct fallback
    }

    // Step 2: Client-side direct fallback to FormSubmit if backend didn't succeed
    if (!isSuccess) {
      try {
        const fallbackRes = await fetch(
          "https://formsubmit.co/ajax/thisismominshaikh@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              message: payload.message,
              _subject: `Portfolio Message from ${payload.name}`,
              _template: "table",
              _captcha: "false",
              _replyto: payload.email,
            }),
          }
        );
        const fbData = await fallbackRes.json();
        if (fallbackRes.ok || fbData.success === "true" || fbData.success === true) {
          isSuccess = true;
        }
      } catch {
        // Fallback failed
      }
    }

    setIsSubmitting(false);

    if (isSuccess) {
      setLastSenderName(payload.name);
      setSubmitted(true);
      setCountdown(5);

      // Countdown interval for visual feedback
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Exactly 5 seconds (5000ms) before resetting form
      resetTimerRef.current = setTimeout(() => {
        resetFormState();
      }, 5000);
    } else {
      setErrorMessage(
        "Unable to dispatch message directly. You can also reach out via WhatsApp or Email directly below."
      );
    }
  };

  const mailtoFallbackUrl = `mailto:thisismominshaikh@gmail.com?subject=${encodeURIComponent(
    formData.name ? `Portfolio Inquiry from ${formData.name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `${formData.message || ""}\n\nFrom: ${formData.name || "Visitor"} (${
      formData.email || "Email"
    })`
  )}`;

  const whatsappFallbackUrl = `https://wa.me/8801405374822?text=${encodeURIComponent(
    `Hi Momin,\n\nName: ${formData.name || "Visitor"}\nEmail: ${
      formData.email || "N/A"
    }\nMessage: ${formData.message || "I'd like to discuss a project."}`
  )}`;

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

      {/* Contact Form Container */}
      <div className="contact-el mt-12 mx-auto max-w-xl text-left glass rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden">
        <h3 className="text-xl font-bold text-fg mb-4 text-center">
          Send a Direct Message
        </h3>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute h-16 w-16 rounded-full bg-emerald-500/20 animate-ping" />
              <CheckCircle className="h-16 w-16 text-emerald-400 relative z-10" />
            </div>

            <h4 className="text-2xl font-bold text-fg">Message Received! 🚀</h4>
            <p className="text-sm text-muted mt-2 max-w-md leading-relaxed">
              Thank you {lastSenderName ? <b className="text-fg">{lastSenderName}</b> : "for reaching out"}! Your message has been sent directly to <span className="text-accent font-medium">thisismominshaikh@gmail.com</span>. Momin will get back to you shortly.
            </p>

            {/* 5-Second Countdown and Progress Indicator */}
            <div className="mt-6 w-full max-w-xs space-y-2">
              <div className="h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all ease-linear"
                  style={{
                    width: "100%",
                    animation: "progress 5s linear forwards",
                  }}
                />
              </div>
              <p className="text-xs text-muted">
                Resetting form in {countdown} {countdown === 1 ? "second" : "seconds"}...
              </p>
            </div>

            <button
              onClick={resetFormState}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-bg/80 px-4 py-2 text-xs font-semibold text-fg hover:border-accent hover:text-accent transition"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Send Another Message Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="space-y-1 text-left flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={mailtoFallbackUrl}
                      className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                    >
                      <Mail className="h-3 w-3" /> Open in Mail App <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                    <a
                      href={whatsappFallbackUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-emerald-400 hover:underline"
                    >
                      <MessageSquare className="h-3 w-3" /> Chat on WhatsApp <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                disabled={isSubmitting}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
              >
                Your Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                disabled={isSubmitting}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Hi Momin, I'd like to discuss a project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg/80 px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none transition resize-none disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
