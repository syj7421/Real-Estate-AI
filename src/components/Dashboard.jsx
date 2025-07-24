// src/components/Dashboard.jsx
import React, { useEffect, useRef } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  ArcElement,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

import DashboardLayout from "./ui/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { AnimatedNumber } from "./AnimatedNumber";

// register Chart.js plugins
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  ArcElement,
  Legend,
  LineElement,
  PointElement
);

// 1. Population growth bar chart data + options
const groupedBarData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    { label: "Brisbane", data: [59156, 81220, 72930], backgroundColor: "#5ec6c6" },
    { label: "Sydney",   data: [37325,146702,107538], backgroundColor: "#ffb366" },
    { label: "Melbourne",data: [55038,167484,142637], backgroundColor: "#1976d2" },
  ],
};
const groupedBarOptions = {
  responsive: true,
  scales: { y: { beginAtZero: true, title: { display: true } } },
  plugins: {
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} people`
      }
    },
    legend: {
      display: true,
      position: "bottom",
      labels: { usePointStyle: true, pointStyle: "rectRounded" }
    }
  },
  animation: { duration: 1200 },
};

// 2. Population growth rate line chart
const lineChartData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    { label: "Brisbane", data: [2.3,3.1,2.7], borderColor: "#5ec6c6", backgroundColor: "#5ec6c6", tension: 0.3 },
    { label: "Sydney",   data: [0.7,2.8,2.0], borderColor: "#ffb366", backgroundColor: "#ffb366", tension: 0.3 },
    { label: "Melbourne",data: [1.1,3.3,2.7], borderColor: "#1976d2", backgroundColor: "#1976d2", tension: 0.3 },
  ],
};
const lineChartOptions = {
  responsive: true,
  scales: { y: { beginAtZero: true, title: { display: true } } },
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
      }
    }
  },
  animation: { duration: 1200 },
};

// 3. Median house & unit price
const priceData = {
  labels: ["Sydney","Brisbane","Melbourne"],
  datasets: [
    { label: "House Median Price (2024)", data: [1496985,1010566,947611], backgroundColor: "#1976d2" },
    { label: "Unit Median Price (2024)",  data: [863257,718196,617395],   backgroundColor: "#ffb366" },
  ],
};
const priceOptions = {
  responsive: true,
  scales: { y: { beginAtZero: true, title: { display: true, text: "Price (AUD)" } } },
  plugins: {
    legend: { position: "top" },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
      }
    }
  },
  animation: { duration: 1200 },
};

// 4. Rental yield horizontal bar
const rentalYieldData = {
  labels: ["Average","Max"],
  datasets: [{ label: "Yield %", data: [4.2,6.9], backgroundColor: ["#5ec6c6","#ffb366"] }],
};
const rentalYieldOptions = {
  indexAxis: "y",
  scales: { x: { beginAtZero: true, max: 7.5 } },
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  animation: { duration: 1200 },
};

// 5. Population donut chart
const populationData = {
  labels: ["Sydney","Melbourne","Brisbane","Adelaide"],
  datasets: [{ data: [5.73,5.35,2.62,1.39], backgroundColor: ["#bdbdbd","#1976d2","#5ec6c6","#ffb366"] }],
};
const populationOptions = {
  cutout: "70%",
  plugins: {
    legend: { position: "bottom" },
    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}M` } }
  },
  animation: { duration: 1200 },
};



export default function Dashboard() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <TooltipProvider> {/* make sure App.jsx wraps in <TooltipProvider> */}
      <DashboardLayout>
        {/* 1. Facts */}
        <Card className="bg-white">
          <CardHeader><CardTitle>Why Melbourne?</CardTitle></CardHeader>
          <Separator />
          <CardContent className="space-y-2">
            <p className="text-gray-700">• 4th most liveable city (2025 EIU)</p>
            <p className="text-gray-700">• Top 6 global city (Oxford 2025)</p>
            <p className="text-gray-700">• AAA</p>

          </CardContent>
        </Card>

        {/* 2. Population Growth */}
        <Card className="bg-white">
          <CardHeader><CardTitle>Fastest Growing City</CardTitle></CardHeader>
          <Separator />
          <CardContent>
            <Bar data={groupedBarData} options={groupedBarOptions} />
            <Separator className="my-4" />
            <Line data={lineChartData} options={lineChartOptions} />
          </CardContent>
        </Card>

        {/* 3. Median Price */}
        <Card className="bg-white flex flex-col items-center">
          <CardHeader><CardTitle>Median House Price</CardTitle></CardHeader>
          <Separator />
          <CardContent className="text-center">
            <span className="text-4xl font-bold">
              <Badge variant="outline">$947.6K</Badge>
            </span>
            <div className="w-full mt-4">
              <Bar data={priceData} options={priceOptions} />
            </div>
          </CardContent>
        </Card>

        {/* 4. Top Universities */}
        <Card className="bg-white">
  <CardHeader>
    <CardTitle>Home to World class Universities (QS World rankings 2025)</CardTitle>
  </CardHeader>
  <Separator />
  <CardContent className="flex flex-col gap-3">

    {[
      { rank: 19, logo: "/uniLogos/unimelb.png", name: "University of Melbourne" },
      { rank: 36, logo: "/uniLogos/monash.png",       name: "Monash University"      },
      { rank: 125, logo: "/uniLogos/rmit.png",        name: "RMIT"                   },
    ].map(({ rank, logo, name }) => (
      <div key={rank}
           className="flex items-center p-2 rounded-md border shadow-sm space-x-3">

        {/* 순위 + 로고 영역 */}
        <div className="flex items-center w-20 gap-2">
          {/* 숫자는 왼쪽 정렬, 폰트 크기 작게 */}
          <div className="text-xl font-bold text-blue-600 min-w-[2.5rem] text-left">
            {rank}
          </div>
          {/* 로고도 작게 */}
          <img src={logo}
               alt={`${name} Logo`}
               className="w-6 h-6 object-contain" />
        </div>

        {/* 학교명: 폰트 크기 작게, 한 줄 유지 */}
        <div className="flex-1 text-base font-medium whitespace-nowrap
                        text-[clamp(0.75rem,1.2vw,0.875rem)]">
          {name}
        </div>
      </div>
    ))}

  </CardContent>
</Card>






        {/* 5. Population Donut */}
        <Card className="bg-white">
          <CardHeader><CardTitle>City Populations (M)</CardTitle></CardHeader>
          <Separator />
          <CardContent className="flex justify-center">
            <Doughnut data={populationData} options={populationOptions} />
          </CardContent>
        </Card>

        {/* 6. Projected Growth */}
        <Card className="bg-white text-center">
          <CardHeader><CardTitle>Projected Growth</CardTitle></CardHeader>
          <Separator />
          <CardContent>
            <span className="text-5xl font-extrabold text-indigo-600">
              <AnimatedNumber value={3.5} decimals={1} />%
            </span>
          </CardContent>
        </Card>
      </DashboardLayout>
    </TooltipProvider>
  );
}
