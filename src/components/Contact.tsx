"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    handle: "@Akwend",
    href: "https://github.com/Akwend",
    color: "#ffffff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "Kelyanleroy0@gmail.com",
    href: "mailto:Kelyanleroy0@gmail.com",
    color: "#6366f1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  const inputClass =
    "w-full glass border border-[--color-border] rounded-xl px-4 py-3 text-white placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-primary]/60 transition-colors duration-300 bg-transparent text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-[--color-muted] mb-2">
            NOM
          </label>
          <input
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-[--color-muted] mb-2">
            EMAIL
          </label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-[--color-muted] mb-2">
          MESSAGE
        </label>
        <textarea
          placeholder="Décrivez votre projet ou votre message..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
          rows={5}
          required
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
          >
            <span className="text-xl">✓</span>
            Message envoyé ! Je vous répondrai sous 24h.
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            type="submit"
            disabled={status === "sending"}
            className="magnetic w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden transition-all duration-300 disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {status === "sending" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Envoi...
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Envoyer le message →
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,102,241,0.1), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[--color-primary] text-sm tracking-widest block mb-3">
            04. Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Travaillons{" "}
            <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-[--color-muted] max-w-md mx-auto">
            Un projet en tête ? Une collaboration à envisager ? Je suis disponible
            et enthousiaste à l'idée de découvrir de nouvelles opportunités.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">Me rejoindre</h3>
              <p className="text-[--color-muted] text-sm leading-relaxed">
                Que ce soit pour un projet freelance, une opportunité en CDI ou
                simplement pour échanger sur le web, n'hésitez pas à me contacter.
                Je réponds généralement sous 24h.
              </p>
            </div>

            <div className="space-y-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="magnetic flex items-center gap-4 glass p-4 rounded-2xl border border-[--color-border] hover:border-[--color-primary]/30 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{ color: social.color }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${social.color}15` }}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{social.name}</div>
                    <div className="text-xs text-[--color-muted] font-mono">
                      {social.handle}
                    </div>
                  </div>
                  <svg
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 13L13 3M13 3H7M13 3V9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-4 glass rounded-2xl border border-green-500/20"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-40" />
              </div>
              <span className="text-sm text-green-400 font-medium">
                Disponible pour de nouveaux projets
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="glass rounded-2xl p-8 border border-[--color-border]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
