import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, ArcElement } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement);

// 1. Bar Chart: Population Growth
const growthData = [
  { city: "Sydney", growth: 4.2 },
  { city: "Brisbane", growth: 5.8 },
  { city: "Melbourne", growth: 7.1 },
  { city: "Adelaide", growth: 3.6 }
];
const barColors = growthData.map(d => d.city === "Melbourne" ? "#1976d2" : "#bdbdbd");
const barChartData = {
  labels: growthData.map(d => d.city),
  datasets: [
    {
      label: "Growth Rate (%)",
      data: growthData.map(d => d.growth),
      backgroundColor: barColors
    }
  ]
};
const barChartOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
      }
    }
  },
  scales: {
    y: { beginAtZero: true }
  },
  animation: {
    duration: 1200
  }
};

// 2. Animated Number Card
function AnimatedNumber({ value, duration = 1.2, decimals = 2 }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(start + (value - start) * progress);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value]);
  return <span>{value >= 1000000 ? `$${display.toFixed(2)}M` : display.toFixed(decimals)}</span>;
}

// 3. Price Forecast Bar Chart
const forecastData = {
  labels: ["2025", "2026"],
  datasets: [
    {
      label: "Forecast (%)",
      data: [3.5, 6],
      backgroundColor: ["#1976d2", "#1976d2"]
    }
  ]
};
const forecastOptions = {
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
  animation: { duration: 1200 }
};

// 4. Rental Yield Horizontal Bar
const rentalYieldData = {
  labels: ["Average", "Max"],
  datasets: [
    {
      label: "Yield %",
      data: [4.2, 6.9],
      backgroundColor: ["#1976d2", "#43a047"]
    }
  ]
};
const rentalYieldOptions = {
  indexAxis: 'y',
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { beginAtZero: true, max: 7.5 } },
  animation: { duration: 1200 }
};

// 5. Population Donut Chart
const populationData = {
  labels: ["Sydney", "Melbourne", "Brisbane", "Adelaide"],
  datasets: [
    {
      data: [5.73, 5.35, 2.62, 1.39],
      backgroundColor: ["#bdbdbd", "#1976d2", "#bdbdbd", "#bdbdbd"]
    }
  ]
};
const populationOptions = {
  plugins: {
    legend: { display: true, position: "bottom" },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.parsed}M`
      }
    }
  },
  cutout: "70%",
  animation: { duration: 1200 }
};

export default function WhyMelbourne() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "2rem",
        padding: "2rem"
      }}
    >
      {/* 1. Bar Chart: Population Growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem" }}
      >
        <h3>Melbourne – Fastest Growing Major City in Australia</h3>
        <div style={{ color: "#888", marginBottom: 8 }}>Population Growth Rate (2020–2024)</div>
        <Bar data={barChartData} options={barChartOptions} />
      </motion.div>

      {/* 2. Median House Price Number Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h3>💰 Median House Price</h3>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#1976d2" }}>
          <AnimatedNumber value={1.04} duration={1.2} decimals={2} />M
        </div>
        <div style={{ color: "#888" }}>Melbourne (2024) – lower than Sydney</div>
      </motion.div>

      {/* 3. Price Forecast Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem" }}
      >
        <h3>📈 Price Forecast</h3>
        <Bar data={forecastData} options={forecastOptions} />
        <div style={{ color: "#888", marginTop: 8 }}>+3.5% in 2025, +6% in 2026 (KPMG prediction)</div>
      </motion.div>

      {/* 4. Rental Yield Horizontal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem" }}
      >
        <h3>🏢 Rental Yield <span title="ℹ️ Average: 4.2%, Max: 6.9% (units)">ℹ️</span></h3>
        <Bar data={rentalYieldData} options={rentalYieldOptions} />
        <div style={{ color: "#888", marginTop: 8 }}>Average: 4.2%, Up to 6.9% (units)</div>
      </motion.div>

      {/* 5. Population Rank Donut Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem" }}
      >
        <h3>🧍 Population Rank</h3>
        <Doughnut data={populationData} options={populationOptions} />
        <div style={{ color: "#888", marginTop: 8 }}>5.35M, 2nd largest in Australia</div>
      </motion.div>

      {/* 6. Infrastructure Projects Text Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="dashboard-card"
        style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 12px #0001", padding: "2rem" }}
      >
        <h3>🚉 Infrastructure Projects</h3>
        <ul style={{ color: "#1976d2", fontWeight: 500, margin: 0, paddingLeft: 20 }}>
          <li>Suburban Rail Loop</li>
          <li>North East Link</li>
          <li>Metro Tunnel</li>
          <li>West Gate Tunnel</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}