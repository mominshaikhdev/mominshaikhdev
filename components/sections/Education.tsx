"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useGsap";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";

const educationList = [
  {
    degree: "LL.B (Hon's) in Al-Fiqh and Law",
    institution: "Faculty of Law, Islamic University, Kushtia-Jhenaidah",
    period: "2019 – 2023",
    score: "CGPA: 3.28 / 4.00",
    description:
      "Comprehensive 4-year legal education covering jurisprudence, constitutional law, international law, statutory interpretation, and analytical argumentation logic.",
    highlight: "Graduated with Honors in Law & Jurisprudence",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C), Science",
    institution: "Nachole Govt. College, Rajshahi Board",
    period: "2018",
    score: "GPA: 4.58 / 5.00",
    description:
      "Advanced science curriculum specializing in Physics, Chemistry, Higher Mathematics, and Biology.",
    highlight: "Rajshahi Board Excellence",
  },
  {
    degree: "Secondary School Certificate (S.S.C), Science",
    institution: "Maktapur High School, Rajshahi Board",
    period: "2015",
    score: "GPA: 5.00 / 5.00",
    description:
      "Foundational science education with top academic standing across mathematics, physics, and computer studies.",
    highlight: "Perfect 5.00 GPA Score",
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      id="education"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
    >
      <p className="mb-3 text-sm uppercase tracking-widest text-accent font-semibold">
        Academic Credentials
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">Educational Qualification</h2>
      <p className="mt-4 max-w-2xl text-muted">
        Formal academic degrees and qualifications demonstrating a strong foundation in law, science, logic, and analytical problem-solving.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {educationList.map((edu) => (
          <div
            key={edu.degree}
            className="edu-card glass relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-accent">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5" /> {edu.period}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-400">
                  <Award className="h-3.5 w-3.5" /> {edu.score}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-fg leading-snug">
                {edu.degree}
              </h3>
              <p className="mt-2 text-sm font-semibold text-accent/90">
                {edu.institution}
              </p>
              <p className="mt-4 text-xs text-muted leading-relaxed">
                {edu.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-xs font-medium text-muted">
              <BookOpen className="h-4 w-4 text-accent shrink-0" />
              <span>{edu.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
