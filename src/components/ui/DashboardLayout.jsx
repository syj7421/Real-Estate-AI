// src/components/ui/DashboardLayout.jsx
import React from "react";

/**
 * DashboardLayout
 * - grid-cols-1    : mobile (1 column)
 * - sm:grid-cols-2 : ≥640px (2 columns)
 * - lg:grid-cols-3 : ≥1024px (3 columns)
 * - gap-6          : 1.5rem gap between cards
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
