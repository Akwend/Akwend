"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Portfolio Interactif",
    subtitle: "Creative Development",
    description:
      "Ce portfolio lui-même — une expérience immersive construite avec Next.js, Three.js et Framer Motion. Particules 3D réactives, animations au scroll et curseur personnalisé.",
    tags: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
    color: "#6366f1",
    year: "2024",
    status: "Live",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    subtitle: "Web Application",
    description:
      "Interface de visualisation de données temps réel avec graphiques animés, dark mode et composants interactifs. Focus sur l'expérience utilisateur.",
    tags: ["React", "Chart.js", "Tailwind", "API REST"],
    color: "#22d3ee",
    year: "2024",
    status: "En cours",
  },
  {
    id: 3,
    title: "E-Commerce Premium",
    subtitle: "Full-Stack Project",
    description:
      "Boutique en ligne avec animations de transition fluides, panier dynamique et processus de commande optimisé. Design minimaliste haut de gamme.",
    tags: ["Next.js", "Stripe", "GSAP", "MongoDB"],
    color: "#a855f7",
    year: "2024",
    status: "Beta",
  },
  {
    id: 4,
    title: "Landing Page 3D",
    subtitle: "Creative Landing",
    description:
      "Page d'atterrissage avec expérience WebGL immersive, modèles 3D interactifs et animations génératives. Score Lighthouse 95+.",
    tags: ["Three.js", "WebGL", "CSS", "GSAP"],
    color: "#f59e0b",
    year: "2024",
    status: "Live",
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group glass rounded-3xl overflow-hidden border border-[--color-border] cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, borderColor: `${project.color}40` }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              boxShadow: `inset 0 0 60px ${project.color}15`,
              background: `radial-gradient(ellipse at top left, ${project.color}08, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-xs tracking-widest" style={{ color: project.color }}>
              {project.subtitle}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[--color-muted] text-xs">{project.year}</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                color: project.color,
                background: `${project.color}15`,
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[--color-muted] text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-lg border"
              style={{
                color: `${project.color}cc`,
                borderColor: `${project.color}25`,
                background: `${project.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
          animate={hovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: project.color }}
          >
            <path
              d="M3 13L13 3M13 3H7M13 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #6366f1, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[--color-primary] text-sm tracking-widest block mb-3">
              03. Projets
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Mes <span className="gradient-text">créations</span>
            </h2>
          </div>
          <p className="max-w-xs text-[--color-muted] text-sm leading-relaxed">
            Chaque projet est conçu avec une attention particulière aux détails,
            à la performance et à l'expérience utilisateur.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Akwend"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic inline-flex items-center gap-2 animated-border px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Voir tous mes projets sur GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
