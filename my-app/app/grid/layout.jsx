import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "tailwindcss/tailwind.css";

function GridLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-3xl font-bold mb-4">Custom Header Text</p>

      <div className="ag-theme-alpine w-full flex-grow mx-4">{children}</div>

      <p className="text-lg mt-4">Custom Footer Text</p>
    </div>
  );
}

export default GridLayout;
