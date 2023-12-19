import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "tailwindcss/tailwind.css";

function GridLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="header-section h-[150px] w-full bg-gray-200 flex items-center justify-center">
        <p className="text-3xl font-bold mb-4">Custom Header Text</p>
      </div>

      <div className="w-full flex-grow mx-4">{children}</div>

      <div className="footer-section h-[100px] w-full  mt-4 bg-gray-200 flex items-center justify-center">
        <p className="text-lg mt-4">Custom Footer Text</p>
      </div>
    </div>
  );
}

export default GridLayout;
