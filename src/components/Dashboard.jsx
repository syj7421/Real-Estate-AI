import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  ArcElement,
  Legend,
  Title,
  LineElement,
  PointElement,
} from "chart.js";
import { AnimatedNumber } from "./AnimatedNumber";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  ArcElement,
  Legend,
  Title,
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
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Number of People" },
      ticks: {
        callback: value => {
          if (value >= 1e6) return (value / 1e6) + 'm';
          if (value >= 1e3) return (value / 1e3) + 'k';
          return value;
        }
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: "Annual population increase"
    },
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

const lineChartData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    { label: "Brisbane", data: [2.3,3.1,2.7], borderColor: "#5ec6c6", backgroundColor: "#5ec6c6", tension: 0.3 },
    { label: "Sydney",   data: [0.7,2.8,2.0], borderColor: "#ffb366", backgroundColor: "#ffb366", tension: 0.3 },
    { label: "Melbourne",data: [1.1,3.3,2.74], borderColor: "#1976d2", backgroundColor: "#1976d2", tension: 0.3 },
  ],
};
const lineChartOptions = {
  
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, title: { display: true,  text: "Growth Rate (%) " } } },
  plugins: {
    title: {
      display: true,
      text: "Annual population growth rate"
    },
    
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
    { label: "House Median Price", data: [1496985,1010566,947611], backgroundColor: "#1976d2" },
    { label: "Unit Median Price",  data: [863257,718196,617395],   backgroundColor: "#ffb366" },
  ],
};
const priceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Price (AUD)" },
      ticks: {
        callback: value => {
          if (value >= 1e6) return (value / 1e6).toFixed(1) + 'm';
          if (value >= 1e3) return (value / 1e3) + 'k';
          return value;
        }
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: "Median Price by City"
    },
    legend: { position: "bottom" },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
      }
    }
  },
  animation: { duration: 1200 },
};

export default function Dashboard() {
  return (
 <div className="w-full max-w-screen-lg mx-auto grid grid-cols-3 grid-rows-2 gap-3 p-6 h-[90vh]">
    {/* Merged Card for Graphs 1 & 2 */}
      <Card className="flex flex-col justify-center">
        <CardHeader className="basis-[15%] flex items-left px-4">
          <CardTitle className="flex-1 text-left"></CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex flex-col px-4 py-2 h-full space-y-4">
        <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center font-semibold">The fastest growing city in Australia</h1>
            <div className="text-4xl text-gray-600"></div>
          </div>
        
        </CardContent>
        
        <div className="basis-[15%] text-xs text-gray-500 flex items-center px-4">
          <div className="flex-1" />
          <div className="text-right">Australian Bureau of Statistics</div>
        </div>
      </Card>


      <Card className="flex flex-col">
      <CardHeader className="basis-[15%] flex items-left px-4">
          <CardTitle className="flex-1 text-left"></CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex px-4 py-2 h-[90%]">
          {/* Graphs */}
            <Bar data={groupedBarData} options={groupedBarOptions} />
          
          
        </CardContent>
       
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="basis-[15%] flex items-left px-4">
        </CardHeader>
        <CardContent className="basis-[70%] flex px-4 py-2 h-[90%]">
          {/* Graphs */}
          
            <Line data={lineChartData} options={lineChartOptions} />
       
        </CardContent>
      
      </Card>

      
      <Card className="flex flex-col">
        <CardHeader className="basis-[15%] flex items-left px-4">
          <CardTitle className="flex-1 text-xl text-center">Median House Price July 2025</CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex flex-col px-4 py-2 h-full space-y-4">
        <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold">$950k</h1>
            <h2 className="text-4xl text-gray-600">3rd in Australia</h2>
          </div>
        
        </CardContent>
        <div className="basis-[15%] text-xs text-gray-500 flex items-center px-4">
          <div className="flex-1" />
          <div className="text-right">Yourmortgage.com Report</div>
        </div>
      </Card>
      

      

      {/* Merged Card for Median Price spanning two rows */}
      <Card className="flex flex-col ">
      <CardHeader className="basis-[15%] flex items-left px-4">
          <CardTitle className="flex-1 text-left"></CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex flex-col px-4 py-2 h-full space-y-4">
       
            <Bar data={priceData} options={priceOptions} />
          
        </CardContent>
        
      </Card>


      <Card className="flex flex-col">
  <CardHeader className="basis-[15%] flex items-center px-4">
    <CardTitle className="flex-1 text-xl text-center">Melbourne City’s Vacancy Rate in June 2025</CardTitle>
  </CardHeader>
  <CardContent className="basis-[70%] flex flex-col px-4 py-2 h-full space-y-4">
    <div className="flex-1 flex items-center justify-center text-5xl font-bold">
      <div className="flex items-baseline space-x-1">
        <AnimatedNumber value={2.5} decimals={2} />
        <span>%</span>
      </div>
    </div>
  </CardContent>
  <div className="basis-[15%] text-xs text-gray-500 flex items-center px-4">
    <div className="flex-1" />
    <div className="text-right">Real Estate Institute of Victoria</div>
  </div>
</Card>

    </div>
  );
}

