// src/components/Content.jsx
import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import MapView from "./Map/MapView";

const slides = [
  {
    bgImage: "/shrine.jpg",
    title1: "4th most liveable city in the world",
    subtitle1: "- EIU 2025 -",
    title2: "Top 6 global city in the world",
    subtitle2: "- Oxford 2025 -",
  },
  {
    bgImage: "/carltonGarden.jpg",
    title1: "Educational Centre of Australia",
    subtitle1:
      'Branded as the "Education State," Victoria lives up to its name, in 2025, Melbourne University ranked 19th, Monash University ranked 36th, and RMIT University ranked 125th in the world.',
    title2: "",
    subtitle2: "- QS World University Rankings 2025 -",
  },
  {
    bgImage: "/arts.png",
    title1: "Paris of the Southern Hemisphere",
    subtitle1:
      'Melbourne, known as the Paris of the Southern Hemisphere, is a vibrant hub of multiculturalism and global prestige, hosting iconic international events like the Formula 1 Grand Prix and Australian Open, making it a true centre of world culture and diversity.',
    title2: "",
    subtitle2: "",
  },
];

export default function Content({
  selectedMode,
  selectedCategory,
  showTramZone,
}) {
  const scrollRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (selectedMode !== "hero") return;
    const el = scrollRef.current;
    const onScroll = () => {
      const y = el.scrollTop;
      const h = window.innerHeight;
      const idx = Math.min(
        slides.length - 1,
        Math.floor((y + h / 2) / h)
      );
      setCurrentIdx(idx);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedMode]);

  if (selectedMode !== "hero") {
    return (
      <main className="pt-16 bg-gray-50 flex-1 overflow-auto">
        {selectedMode === "whyMelbourne" && <Dashboard />}
        {selectedMode === "amenities" && (
          <MapView
            selectedCategory={selectedCategory}
            showTramZone={showTramZone}
          />
        )}
      </main>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-screen overflow-y-scroll scroll-smooth"
    >
      <div className="sticky top-0 h-screen relative">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Hero
              {...slides[currentIdx]}
              overlayOpacity={0.6}
              height="h-screen"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {slides.map((_, i) => (
        <div key={i} className="h-screen" />
      ))}
      <section className="h-screen bg-gray-50">{/* … */}</section>
    </div>
  );
}
