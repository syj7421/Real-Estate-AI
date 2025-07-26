// components/Header.jsx
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";

const modes = [
  { value: "hero", label: "Introduce" },
  { value: "whyMelbourne", label: "Why Melbourne?" },
  { value: "amenities",   label: "Explore" },
  { value: "growth",      label: "Growth" },
];

export default function Header({ selectedMode, onChangeMode }) {
  return (
    <header
      className="
        fixed top-0 left-0 w-full
        z-50                             /* << z‑index 확 높임 */
        bg-transparent
        backdrop-filter backdrop-blur-xl backdrop-saturate-150
        border border-[rgba(255,255,255,0.2)]
        shadow-lg
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {modes.map((m) => (
              <NavigationMenuItem key={m.value}>
                <NavigationMenuLink asChild>
                  <button
                    className={`
                      px-3 py-1 rounded-md text-sm font-medium transition
                      ${
                        selectedMode === m.value
                          ? "bg-[rgba(56,96,178,0.3)] text-white"
                          : "text-white hover:bg-[rgba(56,96,178,0.2)]"
                      }
                    `}
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
