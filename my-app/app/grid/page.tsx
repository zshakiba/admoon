"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PaginationComponent from "../../components/Pagination";
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import GridComponent from "../../components/Grid";
import { fetchPage} from "../utils/api";

interface PageProps {}

interface PageState {
  rowData: []; 
  currentPage: number;
  lastPage: number | null;
}

const Page: React.FC<PageProps> = () => {
  const gridApiRef = useRef<any>(null); 
  const abortControllerRef = useRef(new AbortController());

  const [state, setState] = useState<PageState>({
    rowData: [],
    currentPage: 1,
    lastPage: null,
  });

  const onGridReady = useCallback((params: GridReadyEvent) => {
    if (params && params.api) {
      params.api.sizeColumnsToFit();
      gridApiRef.current = params.api as GridApi;
    }
  }, []);

  const onPaginationChanged = useCallback(() => {
    if (gridApiRef.current) {
      gridApiRef.current.paginationGetCurrentPage();
    }
  }, []);

  const loadPage = async (pageNumber: number) => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const data = await fetchPage(pageNumber);
      if (data) {
        setState({
          rowData: data.data,
          currentPage: data.meta.current_page,
          lastPage: data.meta.last_page,
        });
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
          rowData={state.rowData}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
        />
        <PaginationComponent
          currentPage={state.currentPage}
          lastPage={state.lastPage}
          loadPage={loadPage}
        />
      </div>
    </div>
  );
};

export default Page;

