import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-gray-950">
      <Outlet />
    </div>
  );
}

export default RootLayout;
