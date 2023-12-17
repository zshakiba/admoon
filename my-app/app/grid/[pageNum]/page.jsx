"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
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
  const [rowData, setRowData] = useState();
  const [pageNum, setPageNum] = useState(params.pageNum);

  const [columnDefs] = useState([
    { headerName: "id", field: "id" },
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
    console.log("params: ", params.pageNum);
    setPageNum(params.pageNum);
    console.log("params.pageNum: ", params.pageNum);
    console.log("pageNum1: ", pageNum);

    const url = `https://api.shabe.ir/role?page=${pageNum}`;
    console.log("url: ", url);
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
  }, [params.pageNum]);

  console.log("pageNum2: ", pageNum);
  const onGridReady = useCallback(() => {
    console.log("pageNum3: ", pageNum);
    const url = `https://api.shabe.ir/role?page=${pageNum}`;
    console.log("url: ", url);
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
        />
      </div>
    </div>
  );
}

export default GridPage;
