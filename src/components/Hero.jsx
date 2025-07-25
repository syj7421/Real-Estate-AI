// components/Hero.jsx
import React from "react";

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
    <div
      className={`${height} relative`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 이 오버레이가 클릭을 막으니 pointer-events: none 을 줍니다 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center text-white h-full px-6">
        <h1 className="text-4xl font-bold">{title1}</h1>
        <p className="text-xl mt-2">{subtitle1}</p>
        <h1 className="text-4xl font-bold mt-6">{title2}</h1>
        <p className="text-xl mt-2">{subtitle2}</p>
      </div>
    </div>
  );
}
