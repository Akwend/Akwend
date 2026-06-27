"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    icon: "⚡",
    skills: [
      { name: "JavaScript", level: 75 },
      { name: "React / Next.js", level: 70 },
      { name: "HTML / CSS", level: 90 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Animation & 3D",
    icon: "✨",
    skills: [
      { name: "GSAP", level: 60 },
      { name: "Framer Motion", level: 65 },
      { name: "Three.js", level: 50 },
      { name: "CSS Animations", level: 85 },
    ],
  },
  {
    category: "Outils & Workflow",
    icon: "🔧",
    skills: [
      { name: "Git / GitHub", level: 80 },
      { name: "Figma", level: 65 },
      { name: "VS Code", level: 90 },
      { name: "Node.js", level: 55 },
    ],
  },
];

const tools = [
  { name: "JS", color: "#f7df1e" },
  { name: "TS", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next", color: "#ffffff" },
  { name: "CSS", color: "#1572b6" },
  { name: "Git", color: "#f05032" },
  { name: "Figma", color: "#f24e1e" },
  { name: "Node", color: "#339933" },
  { name: "GSAP", color: "#88ce02" },
  { name: "Three", color: "#6366f1" },
];

function SkillBar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[--color-text] font-medium">{name}</span>
        <span className="font-mono text-[--color-muted] text-xs">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #6366f1, #22d3ee)",
            boxShadow: "0 0 10px rgba(99,102,241,0.5)",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-[--color-primary] text-sm tracking-widest block mb-3">
            02. Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Mon{" "}
            <span className="gradient-text">arsenal</span> technique
          </h2>
        </motion.div>

        {/* Skill cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              className="glass rounded-2xl p-6 border border-[--color-border] hover:border-[--color-primary]/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-lg text-white">{cat.category}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={isInView}
                    delay={catIndex * 0.15 + i * 0.1 + 0.3}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[--color-muted] text-sm mb-6 font-mono tracking-wider">
            TECHNOLOGIES MAÎTRISÉES
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="glass px-4 py-2 rounded-xl border border-[--color-border] font-mono font-bold text-sm transition-all duration-300 hover:scale-110"
                style={{ color: tool.color, borderColor: `${tool.color}30` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{
                  boxShadow: `0 0 20px ${tool.color}40`,
                  borderColor: `${tool.color}60`,
                }}
              >
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
