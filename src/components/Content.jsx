// components/Content.jsx
import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import MapView from "./Map/MapView";

const slides = [
  {
    bgImage: "/carltonGarden.jpg",
    title1: "4th most liveable city in the world",
    subtitle1: "EIU 2025",
    title2: "Top 6 global city in the world",
    subtitle2: "Oxford 2025",
  },

  {
    bgImage: "/flinders.jpg",
    title1: "Iconic transport hub",
    subtitle1: "Flinders St Station",
    title2: "Gateway to the city",
    subtitle2: "Since 1854",
  },
];

export default function Content({ selectedMode }) {
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
        {selectedMode === "amenities" && <MapView />}
        {selectedMode === "growth" && <div>Growth Content</div>}
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
            transition={{ duration: 1.5 }}    // ← 천천히, 1.5초
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

      {/* 빈 블록으로 스크롤 공간 확보 */}
      {slides.map((_, i) => (
        <div key={i} className="h-screen" />
      ))}

      {/* Hero 이후 실제 컨텐츠 */}
      <section className="h-screen bg-gray-50">
        {/* … */}
      </section>
    </div>
  );
}
