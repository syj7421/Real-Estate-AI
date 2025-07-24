// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { TooltipProvider } from "./components/ui/tooltip"; // ← 추가


export default function App() {
  const [mode, setMode] = useState("whyMelbourne");

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <Header selectedMode={mode} onChangeMode={setMode} />
        <Content selectedMode={mode} />
      </div>
    </TooltipProvider>
  );
}
