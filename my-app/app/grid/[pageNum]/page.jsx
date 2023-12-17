"use client";

import React, { useCallback, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ImageCellRenderer = ({ value }) => (
  <img
    src={`https://cdn.shabe.ir/upload/image/role/${value}`}
    alt="Gallery"
    className="w-8 h-8"
  />
);

function GridPage({ params }) {
  const [rowData, setRowData] = useState([]);
  const [pageNum, setPageNum] = useState(params.pageNum);

  const [columnDefs] = useState([
    { headerName: "id", field: "id", width: 70 },
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

  useEffect(() => {
    const url = `https://api.shabe.ir/role?page=${pageNum}`;
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setRowData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [pageNum]);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full w-3/4 ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSizeSelector={[5, 10, 15]}
          paginationPageSize={15}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
}

export default GridPage;
