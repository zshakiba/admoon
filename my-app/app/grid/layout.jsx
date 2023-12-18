import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "tailwindcss/tailwind.css";

function GridLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="header-section h-1/6 w-full bg-gray-200 flex items-center justify-center">
        <p className="text-3xl font-bold mb-4">Custom Header Text</p>
      </div>

      {/* Content Section */}
      <div className="w-full flex-grow mx-4">{children}</div>

      {/* Footer Section */}
      <div className="footer-section h-6/5 w-full  mt-4 bg-gray-200 flex items-center justify-center">
        <p className="text-lg mt-4">Custom Footer Text</p>
      </div>
    </div>
  );
}

export default GridLayout;
