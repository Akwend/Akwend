"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const roles = [
  "Creative Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
  "Motion Designer",
];

function AnimatedRole() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const role = roles[indexRef.current];

      if (pauseRef.current) {
        pauseRef.current = false;
        deletingRef.current = true;
        timeout = setTimeout(type, 1200);
        return;
      }

      if (!deletingRef.current) {
        charIndexRef.current++;
        if (roleRef.current) {
          roleRef.current.textContent = role.slice(0, charIndexRef.current);
        }
        if (charIndexRef.current >= role.length) {
          pauseRef.current = true;
          timeout = setTimeout(type, 100);
        } else {
          timeout = setTimeout(type, 75);
        }
      } else {
        charIndexRef.current--;
        if (roleRef.current) {
          roleRef.current.textContent = role.slice(0, charIndexRef.current);
        }
        if (charIndexRef.current <= 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % roles.length;
          timeout = setTimeout(type, 300);
        } else {
          timeout = setTimeout(type, 40);
        }
      }
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="relative inline-flex items-center">
      <span ref={roleRef} className="gradient-text" />
      <span className="ml-1 inline-block w-0.5 h-8 md:h-12 bg-[--color-cyan] animate-pulse" />
    </span>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ visible }: { visible: boolean }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <ParticleField />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate={visible ? "show" : "hidden"}
          className="max-w-4xl"
        >
          {/* Tag */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-[--color-muted]">
              <span className="w-2 h-2 rounded-full bg-[--color-cyan] animate-pulse" />
              <span className="font-mono">Disponible pour des projets</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-4"
          >
            <span className="block text-white">Kelyan</span>
            <span className="block text-glow" style={{ color: "#6366f1" }}>
              Leroy
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div
            variants={item}
            className="text-2xl md:text-4xl font-bold mb-8 h-12 md:h-14 flex items-center"
          >
            <AnimatedRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-xl text-base md:text-lg text-[--color-muted] leading-relaxed mb-12"
          >
            Je crée des expériences web immersives qui mêlent{" "}
            <span className="text-white font-medium">design premium</span> et{" "}
            <span className="text-white font-medium">code de qualité</span>.
            Passionné par les interfaces qui racontent une histoire.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="magnetic group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Voir mes projets</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            <motion.button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="magnetic animated-border px-8 py-4 rounded-full font-semibold text-white hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={item}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[--color-muted] tracking-widest">
              SCROLL
            </span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-[--color-primary] to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
