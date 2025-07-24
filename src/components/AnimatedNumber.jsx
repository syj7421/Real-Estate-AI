// src/components/AnimatedNumber.jsx
import React from "react";

export function AnimatedNumber({ value, duration = 1.2, decimals = 2 }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const start = 0;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(start + (value - start) * progress);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value, duration]);
  return (
    <span>
      {value >= 1_000_000
        ? `$${(display / 1_000_000).toFixed(decimals)}M`
        : display.toFixed(decimals)}
    </span>
  );
}
