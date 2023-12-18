// GridComponent.js
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-quartz.css';



const ImageCellRenderer = ({ value }) => (
  <div className="flex items-center " style={{ height: "100%" }}>
    <img
      src={`https://cdn.shabe.ir/upload/image/role/${value}`}
      alt="Gallery"
      width={50}
      height={50}
      className="max-w-full max-h-full"
    />
  </div>
);

const GridComponent = ({ rowData, onGridReady, onPaginationChanged }) => {
  const columnDefs = [
    { headerName: "ID", field: "id", width: 70 },
    {
      headerName: "Gallery Image",
      field: "gallery.image",
      cellRenderer: ImageCellRenderer,
      suppressSizeToFit: true,
      height: 70,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Side", field: "side" },
    { headerName: "Side Type", field: "side_type" },
    { headerName: "Number", field: "number" },
    { headerName: "Status", field: "status" },
  ];

  const getRowHeight = (params) => {
    return 55;
  };
  return (
    <div className="h-full h-[600px] rounded-md mt-4 mb-4">
  <div className="ag-theme-quartz overflow-hidden w-full h-full">
    <AgGridReact
      onGridReady={onGridReady}
      columnDefs={columnDefs}
      rowData={rowData}
      onPaginationChanged={onPaginationChanged}
      // domLayout="autoHeight" // Set domLayout to "autoHeight" for dynamic row height
      getRowHeight={getRowHeight}
      // pagination={true}
    />
  </div>
</div>
  );
};

export default GridComponent;
