"use client";

import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
// import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ImageCellRenderer = ({ value }) => (
  <img
    src={`https://cdn.shabe.ir/upload/image/role/${value}`}
    alt="Gallery"
    className="w-8 h-8"
  />
);

const GridPage = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
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
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Group",
      minWidth: 170,
      field: "athlete",
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://api.shabe.ir/role?page=1")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRowData(data.data); 
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          autoGroupColumnDef={autoGroupColumnDef}
          defaultColDef={defaultColDef}
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default GridPage;
