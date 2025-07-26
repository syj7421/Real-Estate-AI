// src/components/Header.jsx
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
  { value: "amenities", label: "Explore" },
];

const categories = [
  "major",
  "education",
  "medical",
  "park",
  "shopping",
  "culture & entertainment",
  "station",
];

export default function Header({
  selectedMode,
  onChangeMode,
  selectedCategory,
  onChangeCategory,
  showTramZone,
  onToggleTramZone,
}) {
  // Introduce 모드일 때 흰색, 나머지 검은색
  const textColorClass = selectedMode === "hero" ? "text-white" : "text-black";

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-[1000]
        bg-transparent backdrop-filter backdrop-blur-xl backdrop-saturate-150
        border border-[rgba(255,255,255,0.2)] shadow-lg
        ${textColorClass}
      `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
        {/* 네비게이션 */}
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
                          ? "bg-[rgba(56,96,178,0.3)]"
                          : "hover:bg-[rgba(56,96,178,0.2)]"
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

        {/* Explore 모드일 때만: 카테고리 라디오 + 트램존 체크박스 */}
        {selectedMode === "amenities" && (
          <div className="flex flex-wrap gap-4 items-center pt-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-1 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="facility-category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => onChangeCategory(cat)}
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
            <label className="flex items-center gap-1 ml-4 cursor-pointer text-sm font-medium">
              <input
                type="checkbox"
                checked={showTramZone}
                onChange={(e) => onToggleTramZone(e.target.checked)}
              />
              <span>Show Free Tram Zone</span>
            </label>
          </div>
        )}
      </div>
    </header>
  );
}
