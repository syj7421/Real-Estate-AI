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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

<div className="relative z-10 flex flex-col justify-center items-center text-white h-full px-6 space-y-4 text-center">
  <div className="max-w-2xl">
    <motion.h1 variants={item} className="text-4xl font-bold">
      {title1}
    </motion.h1>
    <motion.p variants={item} className="text-xl mt-2">
      {subtitle1}
    </motion.p>
    <motion.h1 variants={item} className="text-4xl font-bold mt-6">
      {title2}
    </motion.h1>
    <motion.p variants={item} className="text-xl mt-2">
      {subtitle2}
    </motion.p>
  </div>
</div>
<div className="relative z-10 flex flex-col justify-center items-center text-white h-full px-6 space-y-4 text-center">
  <div className="">
    <motion.h1 variants={item} className="text-4xl font-bold">
      {title1}
    </motion.h1>
    <motion.p variants={item} className=" text-gray-300 text-xl mt-2">
      {subtitle1}
    </motion.p>
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
