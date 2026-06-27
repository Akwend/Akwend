"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-[--color-border] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 100% at 50% 100%, rgba(99,102,241,0.05), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-black text-lg tracking-widest gradient-text">
          AKWEND
        </div>

        <p className="text-[--color-muted] text-sm text-center">
          Conçu & développé avec{" "}
          <span className="text-[--color-primary]">♥</span> par Kelyan Leroy
        </p>

        <div className="flex items-center gap-1 text-xs font-mono text-[--color-muted]">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
