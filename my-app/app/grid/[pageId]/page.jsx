"use client";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "tailwindcss/tailwind.css";

const ImageCellRenderer = ({ value }) => {
  return (
    <img
      src={`https://cdn.shabe.ir/upload/image/role/${value}`}
      alt="Gallery"
      className="w-8 h-8"
    />
  );
 };
 

function GridPage({ pageId }) {
  const [columnDefs] = useState([
    {
      headerName: "Gallery Image",
      field: "gallery.image",
      cellRenderer: ImageCellRenderer,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Side", field: "side" },
    { headerName: "Side Type", field: "side_type" },
    { headerName: "Number", field: "number" },
    { headerName: "Status", field: "status" },
  ]);

  const [rowData, setRowData] = useState([]);
  const [perPage, setPerpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUrl = `https://api.shabe.ir/role?page=${pageId || 1}`;
    const mainUrl = `https://api.shabe.ir/role`;

    fetch(mainUrl)
      .then((response) => response.json())
      .then((data) => {
        setPerpage(Number(data.meta.per_page));
      });


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

  const handlePaginationChanged = (event) => {
    console.log(event);
    const newPageId = event.api.paginationGetCurrentPage() + 1;
    if (newPageId !== currentPage) {
      const fetchUrl = `https://api.shabe.ir/role?page=${newPageId}`;
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setRowData(data.data);
          setCurrentPage(newPageId);
        })
        .catch((error) => {
          console.error(error.message);
          // Handle the error as needed
        });
    }
  };

  return (
    <AgGridReact
      id="staff_grid"
      rowData={rowData}
      columnDefs={columnDefs}
      pagination={true}
      className="ag-theme-alpine w-full h-full"
      frameworkComponents={frameworkComponents}
      paginationPageSize={perPage}
      onPaginationChanged={handlePaginationChanged}
    />
  );
}

export default GridPage;
