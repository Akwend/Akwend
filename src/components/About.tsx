"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Projets réalisés" },
  { value: 2, suffix: " ans", label: "D'expérience" },
  { value: 100, suffix: "%", label: "Passion" },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number, startTime: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, value]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text */}
          <div>
            <motion.div variants={fadeUp} className="mb-4">
              <span className="font-mono text-[--color-primary] text-sm tracking-widest">
                01. À propos
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            >
              Passionné par le{" "}
              <span className="gradient-text">web moderne</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="space-y-4 text-[--color-muted] leading-relaxed"
            >
              <p>
                Je m'appelle <span className="text-white font-semibold">Kelyan Leroy</span>,
                développeur web passionné par la création d'expériences digitales
                uniques. Mon approche combine rigueur technique et sensibilité
                artistique.
              </p>
              <p>
                Actuellement en apprentissage intensif de{" "}
                <span className="text-[--color-cyan] font-medium">JavaScript</span>,
                je construis des interfaces modernes qui marient performance et
                esthétique. Chaque projet est une opportunité d'innover.
              </p>
              <p>
                Ouvert aux collaborations et aux nouveaux défis, je cherche à
                rejoindre des équipes ambitieuses pour créer ensemble.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
              {["JavaScript", "React", "Next.js", "CSS", "Three.js", "GSAP"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="glass px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[--color-primary] border border-[--color-border]"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right: Stats + Visual */}
          <div className="space-y-6">
            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 text-center border border-[--color-border] hover:border-[--color-primary]/40 transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </div>
                  <div className="text-xs text-[--color-muted] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Visual card */}
            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-6 border border-[--color-border] relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-30"
                style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                      <div
                        key={c}
                        className="w-3 h-3 rounded-full"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-[--color-muted]">
                    akwend.dev
                  </span>
                </div>

                <pre className="font-mono text-sm leading-relaxed">
                  <span className="text-[--color-muted]">const </span>
                  <span className="text-[--color-cyan]">developer</span>
                  <span className="text-white"> = {"{"}</span>
                  {"\n  "}
                  <span className="text-[--color-primary]">name</span>
                  <span className="text-white">: </span>
                  <span style={{ color: "#86efac" }}>"Kelyan Leroy"</span>
                  <span className="text-white">,</span>
                  {"\n  "}
                  <span className="text-[--color-primary]">role</span>
                  <span className="text-white">: </span>
                  <span style={{ color: "#86efac" }}>"Creative Dev"</span>
                  <span className="text-white">,</span>
                  {"\n  "}
                  <span className="text-[--color-primary]">status</span>
                  <span className="text-white">: </span>
                  <span style={{ color: "#86efac" }}>"Open to work"</span>
                  {"\n"}
                  <span className="text-white">{"}"}</span>
                  <span className="text-[--color-cyan] animate-pulse">_</span>
                </pre>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
