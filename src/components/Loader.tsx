"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const name = "AKWEND";

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased = Math.min(100, Math.round((1 - Math.pow(1 - current / steps, 3)) * 100));
      setProgress(eased);

      if (current >= steps) {
        clearInterval(timer);
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 600);
        }, 1000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-[--color-bg]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[--color-primary] to-transparent opacity-50"
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-12">
            {/* Logo letters */}
            <div className="flex gap-1">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #6366f1, #22d3ee)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{
                    opacity: phase === "loading" || phase === "reveal" ? 1 : 0,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 md:w-96 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[--color-primary] to-[--color-cyan]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.03 }}
              />
            </div>

            {/* Progress number */}
            <motion.span
              className="font-mono text-sm text-[--color-muted] tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {String(progress).padStart(3, "0")}
            </motion.span>
          </div>

          {/* Corner decorations */}
          {[
            "top-8 left-8",
            "top-8 right-8",
            "bottom-8 left-8",
            "bottom-8 right-8",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-8 h-8 opacity-30`}
              style={{
                borderTop: i < 2 ? "1px solid #6366f1" : "none",
                borderBottom: i >= 2 ? "1px solid #6366f1" : "none",
                borderLeft: i % 2 === 0 ? "1px solid #6366f1" : "none",
                borderRight: i % 2 === 1 ? "1px solid #6366f1" : "none",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
