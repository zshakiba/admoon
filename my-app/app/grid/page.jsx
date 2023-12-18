"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PaginationComponent from "../../components/Pagination";
import GridComponent from "../../components/Grid";
import { fetchPage } from "../utils/api";



const Page = () => {
  const gridApiRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const onGridReady = useCallback((params) => {
    if (params && params.api) {
      params.api.sizeColumnsToFit();
      gridApiRef.current = params.api;
    }
  }, []);

  const onPaginationChanged = useCallback(() => {
    if (gridApiRef.current) {
      gridApiRef.current.paginationGetCurrentPage();
    }
  }, []);

  const loadPage = async (pageNumber) => {
    console.log("pageNumber: ",pageNumber);
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const data = await fetchPage(pageNumber);
      if (data) {
        // console.log(data.meta.current_page);
        setRowData(data.data);
        setCurrentPage(data.meta.current_page);
        setLastPage(data.meta.last_page);
      }
    } catch (error) {
      console.error("Error loading page:", error);
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center">
      <div className="h-full w-3/4">
        <GridComponent
          rowData={rowData}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
        />
        {/* Move PaginationComponent here */}
        <PaginationComponent
          currentPage={currentPage}
          lastPage={lastPage}
          loadPage={loadPage}
        />
      </div>
    </div>
  );
};

export default Page;
