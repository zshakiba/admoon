'use client'
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "tailwindcss/tailwind.css";

// Custom React component for rendering images in cells
const ImageCellRenderer = ({ value }) => {
  return <img src={`https://cdn.shabe.ir/upload/image/role/${value}`} alt="Gallery" className="w-8 h-8" />;
};

function Page() {
  const [columnDefs] = useState([
    { headerName: "ID", field: "id", width: 70 },
    { headerName: "Name", field: "name" },
    { headerName: "Side", field: "side" },
    { headerName: "Side Type", field: "side_type" },
    { headerName: "Number", field: "number" },
    { headerName: "Status", field: "status" },
    { headerName: "Gallery Path", field: "gallery.path" },
    { 
      headerName: 'Gallery Image', 
      field: 'gallery.image',
      cellRenderer: 'imageCellRenderer',
      cellRendererParams: {
        component: 'ImageCellRenderer',
      },
    },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch("https://api.shabe.ir/role?page=1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRowData(data.data);
      });
  }, []);

  const frameworkComponents = {
    ImageCellRenderer: ImageCellRenderer,
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-3xl font-bold mb-4">Custom Header Text</p>

      <div className="ag-theme-alpine w-full flex-grow mx-4">
        <AgGridReact
          id="staff_grid"
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          className="ag-theme-alpine w-full h-full"
          frameworkComponents={frameworkComponents}
        />
      </div>

      <p className="text-lg mt-4">Custom Footer Text</p>
    </div>
  );
}

export default Page;
