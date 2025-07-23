import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend, LineElement, PointElement } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend, LineElement, PointElement);

// 1. Bar Chart: Population Growth, from: https://www.abs.gov.au/statistics/people/population/regional-population/2023-24
const groupedBarData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Brisbane",
      data: [59156, 81220, 72930],
      backgroundColor: "#5ec6c6"
    },
    {
      label: "Sydney",
      data: [37325, 146702, 107538],
      backgroundColor: "#ffb366"
    },
    {
      label: "Melbourne",
      data: [55038, 167484, 142637],
      backgroundColor: "#1976d2"
    }
  ]
};
const groupedBarOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} people`
      }
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "rectRounded"
      }
    }
  },
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true }
    }
  },
  animation: { duration: 1200 }
};

// Line Chart (인구 증가율 %)
const lineChartData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Brisbane",
      data: [2.3, 3.1, 2.7],
      borderColor: "#5ec6c6",
      backgroundColor: "#5ec6c6",
      tension: 0.3
    },
    {
      label: "Sydney",
      data: [0.7, 2.8, 2.0],
      borderColor: "#ffb366",
      backgroundColor: "#ffb366",
      tension: 0.3
    },
    {
      label: "Melbourne",
      data: [1.1, 3.3, 2.7],
      borderColor: "#1976d2",
      backgroundColor: "#1976d2",
      tension: 0.3
    }
  ]
};
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true }
    }
  },
  animation: { duration: 1200 }
};

// Median House Price
const priceData = {
  labels: ["Sydney", "Brisbane", "Melbourne"],
  datasets: [
    {
      label: "House Median Price (2024)",
      data: [1496985, 1010566, 947611],
      backgroundColor: "#1976d2"
    },
    {
      label: "Unit Median Price (2024)",
      data: [863257, 718196, 617395],
      backgroundColor: "#ffb366"
    }
  ]
};
const priceOptions = {
  plugins: {
    legend: { display: true, position: "top" },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Price (AUD)" }
    }
  },
  animation: { duration: 1200 },
  responsive: true
};

// Animated Number Card
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

// Rental Yield Horizontal Bar
const rentalYieldData = {
  labels: ["Average", "Max"],
  datasets: [
    {
      label: "Yield %",
      data: [4.2, 6.9],
      backgroundColor: ["#5ec6c6", "#ffb366"]
    }
  ]
};
const rentalYieldOptions = {
  indexAxis: 'y',
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { beginAtZero: true, max: 7.5 } },
  animation: { duration: 1200 }
};

// Population Donut Chart
const populationData = {
  labels: ["Sydney", "Melbourne", "Brisbane", "Adelaide"],
  datasets: [
    {
      data: [5.73, 5.35, 2.62, 1.39],
      backgroundColor: ["#bdbdbd", "#1976d2", "#5ec6c6", "#ffb366"]
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
        fontFamily: 'Inter, Nunito, Helvetica, Arial, sans-serif',
        background: '#f7f9fc',
        minHeight: '100vh',
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "2rem",
        padding: "2.5rem 2rem"
      }}
    >
      {/* 1. Facts */}
      <motion.div
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          color: '#1976d2',
          fontWeight: 600,
          fontSize: '1.1rem',
        }}
      >
        4th most liveable city in the world (2025 EIU) – ranked 1st in Australia
        <br />
        Top 6 global city in Oxford Economics’ 2025 Global Cities Index
      </motion.div>

      {/* 2. Bar Chart: Population Growth */}
      <motion.div
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}
      >
        <h3 style={{ color: '#1976d2', margin: 0 }}>The Fastest Growing City in Australia</h3>
        <Bar data={groupedBarData} options={groupedBarOptions} />
        <Line data={lineChartData} options={lineChartOptions} />
      </motion.div>

      {/* 3. Median House Price Number Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h3 style={{ color: '#1976d2', margin: 0 }}>💰 Median House Price</h3>
        <h3 style={{ color: '#43a047', margin: 0 }}>3rd in Australia</h3>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#1976d2", marginBottom: "1rem" }}>
          <AnimatedNumber value={947.62} duration={1.2} /> K
        </div>
        <div style={{ width: "100%" }}>
          <Bar data={priceData} options={priceOptions} />
        </div>
      </motion.div>

      {/* 4. Rental Yield Horizontal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem"
        }}
      >
        <h3 style={{ color: '#1976d2', margin: 0 }}>🏢 Rental Yield <span title="ℹ️ Average: 4.2%, Max: 6.9% (units)">ℹ️</span></h3>
        <Bar data={rentalYieldData} options={rentalYieldOptions} />
        <div style={{ color: "#888", marginTop: 8 }}>Average: 4.2%, Up to 6.9% (units)</div>
      </motion.div>

      {/* 5. Population Rank Donut Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem"
        }}
      >
        <h3 style={{ color: '#1976d2', margin: 0 }}>🧍 Population Rank</h3>
        <Doughnut data={populationData} options={populationOptions} />
        <div style={{ color: "#888", marginTop: 8 }}>5.35M, 2nd largest in Australia</div>
      </motion.div>

      {/* 6. Infrastructure Projects Text Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
          color: '#1976d2',
          fontWeight: 600
        }}
      >
        <h3 style={{ color: '#1976d2', margin: 0 }}>🚉 Infrastructure Projects</h3>
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