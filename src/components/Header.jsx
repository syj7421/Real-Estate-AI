// src/components/Header.jsx
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";

const modes = [
  { value: "whyMelbourne", label: "Why Melbourne?" },
  { value: "amenities",     label: "Amenities" },
  { value: "growth",        label: "Growth" },
];

export default function Header({ selectedMode, onChangeMode }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Real Estate AI</h1>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {modes.map((m) => (
              <NavigationMenuItem key={m.value}>
                <NavigationMenuLink asChild>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      selectedMode === m.value
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => onChangeMode(m.value)}
                  >
                    {m.label}
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
