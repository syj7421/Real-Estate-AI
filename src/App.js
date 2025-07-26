// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const [mode, setMode] = useState("hero");

  // Explore 탭용 상태
  const [selectedCategory, setSelectedCategory] = useState("major");
  const [showTramZone, setShowTramZone] = useState(false);

  return (
    <TooltipProvider>
 <div className="relative flex flex-col h-screen overflow-x-hidden">
        <Header
          selectedMode={mode}
          onChangeMode={setMode}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          showTramZone={showTramZone}
          onToggleTramZone={setShowTramZone}
        />
        <Content
          selectedMode={mode}
          selectedCategory={selectedCategory}
          showTramZone={showTramZone}
        />
      </div>
    </TooltipProvider>
  );
}
