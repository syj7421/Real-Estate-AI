import React, { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  const [mode, setMode] = useState("hero");

  return (
    <TooltipProvider>
      <div className="relative flex flex-col h-screen">
        <Header selectedMode={mode} onChangeMode={setMode} />
        <Content selectedMode={mode} />
      </div>
    </TooltipProvider>
  );
}
