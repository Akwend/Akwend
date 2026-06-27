"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "À propos", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
            scrolled ? "glass py-4" : "py-6"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="magnetic font-black text-xl tracking-widest gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              AKW<span className="text-[--color-cyan]">END</span>
            </motion.a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <li key={link.href}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    className="magnetic relative text-sm font-medium text-[--color-muted] hover:text-white transition-colors duration-300 group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <span className="font-mono text-[--color-primary] text-xs mr-1">
                      0{i + 1}.
                    </span>
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[--color-primary] to-[--color-cyan] group-hover:w-full transition-all duration-300" />
                  </motion.button>
                </li>
              ))}

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="magnetic animated-border px-5 py-2 rounded-full text-sm font-semibold text-white hover:bg-[--color-primary] hover:border-transparent transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Me contacter
              </motion.a>
            </ul>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{ opacity: menuOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white block"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="md:hidden glass mt-4 mx-4 rounded-2xl overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 flex flex-col gap-4">
                  {links.map((link, i) => (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="text-left text-lg font-medium text-[--color-muted] hover:text-white transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
