// // src/components/Dashboard.jsx
// import React, { useEffect, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip as ChartTooltip,
//   ArcElement,
//   Legend,
//   LineElement,
//   PointElement,
// } from "chart.js";

// import DashboardLayout from "./ui/DashboardLayout";
// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// import { Separator } from "./ui/separator";
// import { Badge } from "./ui/badge";
// import { TooltipProvider } from "./ui/tooltip";
// import { AnimatedNumber } from "./AnimatedNumber";

// // register Chart.js plugins
// Chart.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   ChartTooltip,
//   ArcElement,
//   Legend,
//   LineElement,
//   PointElement
// );

// // 1. Population growth bar chart data + options
// const groupedBarData = {
//   labels: ["2022", "2023", "2024"],
//   datasets: [
//     { label: "Brisbane", data: [59156, 81220, 72930], backgroundColor: "#5ec6c6" },
//     { label: "Sydney",   data: [37325,146702,107538], backgroundColor: "#ffb366" },
//     { label: "Melbourne",data: [55038,167484,142637], backgroundColor: "#1976d2" },
//   ],
// };
// const groupedBarOptions = {
//   responsive: true,
//   scales: { y: { beginAtZero: true, title: { display: true } } },
//   plugins: {
//     tooltip: {
//       callbacks: {
//         label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} people`
//       }
//     },
//     legend: {
//       display: true,
//       position: "bottom",
//       labels: { usePointStyle: true, pointStyle: "rectRounded" }
//     }
//   },
//   animation: { duration: 1200 },
// };

// // 2. Population growth rate line chart
// // const lineChartData = {
// //   labels: ["2022", "2023", "2024"],
// //   datasets: [
// //     { label: "Brisbane", data: [2.3,3.1,2.7], borderColor: "#5ec6c6", backgroundColor: "#5ec6c6", tension: 0.3 },
// //     { label: "Sydney",   data: [0.7,2.8,2.0], borderColor: "#ffb366", backgroundColor: "#ffb366", tension: 0.3 },
// //     { label: "Melbourne",data: [1.1,3.3,2.7], borderColor: "#1976d2", backgroundColor: "#1976d2", tension: 0.3 },
// //   ],
// // };
// // const lineChartOptions = {
// //   responsive: true,
// //   scales: { y: { beginAtZero: true, title: { display: true } } },
// //   plugins: {
// //     legend: { position: "bottom" },
// //     tooltip: {
// //       callbacks: {
// //         label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
// //       }
// //     }
// //   },
// //   animation: { duration: 1200 },
// // };

// // 3. Median house & unit price
// const priceData = {
//   labels: ["Sydney","Brisbane","Melbourne"],
//   datasets: [
//     { label: "House Median Price", data: [1496985,1010566,947611], backgroundColor: "#1976d2" },
//     { label: "Unit Median Price",  data: [863257,718196,617395],   backgroundColor: "#ffb366" },
//   ],
// };
// const priceOptions = {
//   responsive: true,
//   scales: { y: { beginAtZero: true, title: { display: true, text: "Price (AUD)" } } },
//   plugins: {
//     legend: { position: "bottom" },
//     tooltip: {
//       callbacks: {
//         label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
//       }
//     }
//   },
//   animation: { duration: 1200 },
// };



// export default function Dashboard() {
//   const ref = useRef(null);
//   useEffect(() => {
//     if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   return (
//     <TooltipProvider> {/* make sure App.jsx wraps in <TooltipProvider> */}
//       <DashboardLayout>
//         {/* 1. Facts */}
        
//         <Card className="relative bg-white overflow-hidden h-[22rem]">
        
//   {/* 原图 */}
//   <img
//     src="/flinders.jpg"
//     alt=""
//     className="absolute inset-0 w-full h-full object-cover"
//   />
//   {/* 蒙版 */}
//   <div className="absolute inset-0 bg-black/40"></div>


//   <CardContent className="relative flex flex-col items-center justify-center gap-6 h-full">
//     {[
//       { title: "4th most liveable city in the world", cite: "EIU 2025" },
//       { title: "Top 6 global city in the world",    cite: "Oxford 2025" },
//       { title: "Perfect AAA credit rating",         cite: "Trading Economics" },
//     ].map(({ title, cite }, idx) => (
//       <div key={idx} className="relative">
//         {/* blurred border */}
//         <div className="absolute inset-0 rounded-md border border-gray-200 filter blur-md"></div>
//         {/* actual card with reduced padding/margin */}
//         <div className="absolute inset-0 rounded-xl bg-black/10"></div>
//         <div className="relative flex flex-col items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl w-80 space-y-0">
//         <div className="font-extrabold text-gray-800 text-center text-sm">
//             {title}
//           </div>
//           <div className="text-xs text-gray-400 text-center">
//             {cite}
//           </div>
//         </div>
//       </div>
//     ))}
//   </CardContent>
// </Card>



//         {/* 2. Population Growth */}
//         <Card className="bg-white">
//           <CardHeader><CardTitle>Fastest Growing City in Australia</CardTitle></CardHeader>
//           <Separator />
//           <CardContent>
//             <Bar data={groupedBarData} options={groupedBarOptions} />
//             {/* <Separator className="my-4" />
//             <Line data={lineChartData} options={lineChartOptions} /> */}
//           </CardContent>
//         </Card>

//         {/* 3.  */}

//         <Card className="relative overflow-hidden cursor-pointer group  shadow-md">
//   <img
//     src="/formula.jpg"
//     alt="Melbourne F1"
//     className="absolute inset-0 -z-1 w-full h-full object-cover opacity-80 blur-[1px] group-hover:opacity-50 transition"
//   />
//   <div className="relative z-10 p-5 text-white">
//     <h3 className="text-lg font-semibold drop-shadow-md">
//       Centre of Global Events and Cultural Diversity
//     </h3>

//   </div>
// </Card>

//  {/* 4. Top Universities */}
//  <Card className="relative bg-white overflow-hidden h-[22rem]">
//   {/* background image */}
//   <img
//     src="/skyscrapers.jpg"
//     alt=""
//     className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
//   />

//   {/* 이 wrapper에 z-10을 걸어 모든 콘텐츠를 이미지 위로 올려줌 */}
//   <div className="relative z-10 flex flex-col h-full">
//     <CardHeader>
//       <CardTitle className="text-black">
//         Home to World class Universities (QS World Rankings 2025)
//       </CardTitle>
//     </CardHeader>

//     <CardContent className="flex flex-col items-center justify-center gap-6 h-full">
//       {[
//         { rank: 19, logo: "/uniLogos/unimelb.png", name: "University of Melbourne" },
//         { rank: 36, logo: "/uniLogos/monash.png",       name: "Monash University"      },
//         { rank: 125, logo: "/uniLogos/rmit.png",        name: "RMIT"                   },
//       ].map(({ rank, logo, name }) => (
//         <div
//  key={rank}
//  className="flex items-center p-2 rounded-md border shadow-sm space-x-3 bg-white w-80">
//           <div className="flex items-center w-20 gap-2">
//             <div className="text-xl font-bold text-blue-600 min-w-[2.5rem] text-left">
//               {rank}
//             </div>
//             <img
//               src={logo}
//               alt={`${name} Logo`}
//               className="w-6 h-6 object-contain"
//             />
//           </div>
//           <div className="flex-1 text-base font-medium whitespace-nowrap text-[clamp(0.75rem,1.2vw,0.875rem)]">
//             {name}
//           </div>
//         </div>
//       ))}
//     </CardContent>
//   </div>
// </Card>


//         {/* 5. */}
//         <Card className="relative overflow-hidden cursor-pointer group  shadow-md">
         
//   <div className="relative z-10 p-5 text-white">
//     <h3 className="text-lg font-semibold drop-shadow-md">
//     Residential Permits in CBD Since 2016
//     </h3>
//     <h4>Only</h4>
//     <AnimatedNumber value={1} decimals={0} />

//   </div>

//           <CardHeader><CardTitle></CardTitle></CardHeader>
//           <Separator />


//           <CardContent className="flex justify-center">

//           </CardContent>
//         </Card>

       

// {/* 6.  */}
// <Card className="bg-white flex flex-col items-center">
//           <CardHeader><CardTitle>Median House Price</CardTitle></CardHeader>
//           <Separator />
//           <CardContent className="text-center">
//             <span className="text-4xl font-bold">
//               <Badge variant="outline">$947.6K</Badge>
//             </span>
//             <span className="text-4xl font-bold">
//               <Badge variant="outline">3rd among major cities in Australia</Badge>
//             </span>
//             <div className="w-full mt-4">
//               <Bar data={priceData} options={priceOptions} />
//             </div>
//           </CardContent>
//         </Card>


        
//       </DashboardLayout>
//     </TooltipProvider>
//   );
// }
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
  LineElement,
  PointElement,
} from "chart.js";

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

/// 1. Population growth bar chart data + options
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
    { label: "Melbourne",data: [1.1,3.3,2.7], borderColor: "#1976d2", backgroundColor: "#1976d2", tension: 0.3 },
  ],
};
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, title: { display: true,  text: "Growth Rate (%) " } } },
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
    <div className="w-4/5 mx-auto grid grid-cols-3 grid-rows-2 gap-3 p-6 h-[90vh]">
      {/* Merged Card for Graphs 1 & 2 */}
      <Card className="flex flex-col col-span-2">
        <CardHeader className="basis-[15%] flex items-left px-4">
          <CardTitle className="flex-1 text-left">The fastest growing city in Australia</CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex px-4 py-2 h-[90%]">
          <div className="flex-1 h-full flex items-center justify-center">
            <Bar data={groupedBarData} options={groupedBarOptions} />
          </div>
          <div className="flex-1 h-full flex items-center justify-center">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardContent>
        <div className="basis-[15%] text-xs text-gray-500 flex items-center px-4">
          <div className="flex-1" />
          <div className="text-right">Australian Bureau of Statistics</div>
        </div>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="basis-[15%] px-4">
          <CardTitle>Median House Price July 2025</CardTitle>
        </CardHeader>
        <CardContent className="basis-[70%] flex items-center justify-center px-4 py-2 h-[90%]">
          <Bar data={priceData} options={priceOptions} />
        </CardContent>
        <div className="basis-[15%] text-xs text-gray-500 flex items-center px-4">
          <div className="flex-1" />
          <div className="text-right">Yourmortgage.com Report</div>
        </div>
      </Card>

      {/* Remaining Cards 3 to 6 */}
      {['Card 4', 'Card 5', 'Card 6'].map((title) => (
        <Card key={title} className="flex flex-col">
          <CardHeader className="basis-[15%] px-4">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="basis-[70%] flex items-center justify-center px-4 py-2 h-[90%]">
            {/* Content for {title} */}
          </CardContent>
          <div className="basis-[15%] text-xs text-gray-500 text-right px-4">Source: ...</div>
        </Card>
      ))}
    </div>
  );
}
