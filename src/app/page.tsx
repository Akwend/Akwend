"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Cursor />
      <Loader onComplete={handleLoadComplete} />

      <SmoothScroll>
        <main className="min-h-screen">
          <Navigation visible={loaded} />
          <Hero visible={loaded} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
