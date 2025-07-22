import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend, LineElement, PointElement } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend, LineElement,PointElement);

// 1. Bar Chart: Population Growth, from: https://www.abs.gov.au/statistics/people/population/regional-population/2023-24

const groupedBarData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Brisbane",
      data: [59156,81220,72930],
      backgroundColor: "#aed581" // 연한 연두
    },
    {
      label: "Sydney",
      data: [37325,146702,	107538],
      backgroundColor: "#ffcc80" // 연한 오렌지
    },
    {
      label: "Melbourne",
      data: [55038,167484,142637],
      backgroundColor: "#1976d2" // 강조 파랑
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
      title: {
        display: true      }
    }
  },
  animation: {
    duration: 1200
  }
};

// 새로 추가한 Line Chart (인구 증가율 %)
const lineChartData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Brisbane",
      data: [2.3, 3.1, 2.7],
      borderColor: "#aed581",
      backgroundColor: "#aed581",
      tension: 0.3
    },
    {
      label: "Sydney",
      data: [0.7, 2.8, 2.0],
      borderColor: "#ffcc80",
      backgroundColor: "#ffcc80",
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

// 2. 
const priceData = {
  labels: ["Sydney",  "Brisbane", "Melbourne"],
  datasets: [
    {
      label: "House Median Price (2024)",
      data: [1496985, 1010566,947611],
      backgroundColor: "rgba(25, 118, 210)", // 파란색 계열
    },
    {
      label: "Unit Median Price (2024)",
      data: [863257,718196, 617395],
      backgroundColor: "rgba(255, 160, 0)", // 주황색 계열
    },
  ],
};

const priceOptions = {
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (ctx) =>
          `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Price (AUD)",
      },
    },
  },
  animation: {
    duration: 1200,
  },
  responsive: true
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
      {/* 1. Facts */}
      <motion.div
      className="dashboard-card"
      style={{
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 2px 12px #0001",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"}}>
      4th most liveable city in the world (2025 EIU) – ranked 1st in Australia

Top 6 global city in Oxford Economics’ 2025 Global Cities Index
      </motion.div>


      {/* 2. Bar Chart: Population Growth */}
      <motion.div
  className="dashboard-card"
  style={{
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 2px 12px #0001",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  }}
>
  <h3>The Fastest Growing City in Australia</h3>

  <div>
    <Bar data={groupedBarData} options={groupedBarOptions} />
  </div>

  <div>
    <Line data={lineChartData} options={lineChartOptions} />
  </div>
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
      boxShadow: "0 2px 12px #0001",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // 👈 추가
    }}
>
      <h3>💰 Median House Price</h3>
      <h3>3rd in Australia</h3>

      <div style={{ fontSize: 32, fontWeight: 700, color: "#1976d2", marginBottom: "1rem" }}>
        <AnimatedNumber value={947.62} duration={1.2} /> K
      </div>
      <div style={{ width: "100%" }}>
        <Bar data={priceData} options={priceOptions} />
      </div>
      </motion.div>


    </motion.div>
  );
}