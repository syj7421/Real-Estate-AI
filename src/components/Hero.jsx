// components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

// 전체 컨테이너: 자식 애니메이션을 stagger
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

// 각 텍스트 아이템 애니메이션
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero({
  bgImage,
  overlayOpacity,
  title1,
  subtitle1,
  title2,
  subtitle2,
  height,
}) {
  return (
    <motion.div
      className={`${height} relative`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* Text + Conditional Logo Container */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white h-full px-6 space-y-4 text-center">
        <div className="max-w-2xl">
          <motion.h1 variants={item} className="text-4xl font-bold">
            {title1}
          </motion.h1>

          <motion.p variants={item} className="text-gray-300 text-xl mt-2">
            {subtitle1}
          </motion.p>

          {/* 🔽 Logo section only for second slide */}
          {title1 === "Educational Centre of Australia" && (
  <motion.div
    variants={item}
    className="mt-8 flex justify-center items-start gap-10"
  >
    {/* UniMelb – no white background */}
    <div className="flex flex-col items-center">
      <div className="bg-white p-2 rounded">
        <img src="/uniLogos/unimelb.png" alt="Unimelb" className="h-20" />
      </div>
      <p className="text-lg font-semibold text-white mt-3 leading-tight">
        #19 in the World
      </p>
      <p className="text-lg font-semibold text-gray-300">#1 in Australia</p>
    </div>

    {/* Monash – white background */}
    <div className="flex flex-col items-center">
      <div className="bg-white p-2 rounded">
        <img src="/uniLogos/monash.png" alt="Monash" className="h-20" />
      </div>
      <p className="text-lg font-semibold text-white mt-3 leading-tight">
        #37 in the World
      </p>
    </div>

    {/* RMIT – white background */}
    <div className="flex flex-col items-center">
      <div className="bg-white p-2 rounded">
        <img src="/uniLogos/rmit.png" alt="RMIT" className="h-20" />
      </div>
      <p className="text-lg font-semibold text-white mt-3 leading-tight">
        #125 in the World
      </p>
    </div>
  </motion.div>
)}



          <motion.h1 variants={item} className="text-4xl font-bold mt-6">
            {title2}
          </motion.h1>
          <motion.p variants={item} className="text-gray-300 text-xl mt-2">
            {subtitle2}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
