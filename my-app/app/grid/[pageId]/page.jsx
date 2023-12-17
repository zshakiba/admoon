'use client'
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "tailwindcss/tailwind.css";


const ImageCellRenderer = ({ value }) => {
  return <img src={`https://cdn.shabe.ir/upload/image/role/${value}`} alt="Gallery" className="w-8 h-8" />;
};

function GridPage({pageId}) {
    const [columnDefs] = useState([
        { headerName: "ID", field: "id", width: 70 },
        { headerName: "Name", field: "name" },
        { headerName: "Side", field: "side" },
        { headerName: "Side Type", field: "side_type" },
        { headerName: "Number", field: "number" },
        { headerName: "Status", field: "status" },
        // { headerName: "Gallery Path", field: "gallery.path" },
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

    const fetchUrl = `https://api.shabe.ir/role?page=${pageId || 1}`;
    fetch(fetchUrl)
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
    
        <AgGridReact
          id="staff_grid"
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          className="ag-theme-alpine w-full h-full"
          frameworkComponents={frameworkComponents}
        />
  );
}

export default GridPage;
