// PaginationComponent.js
import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const PaginationComponent = ({ currentPage, lastPage, loadPage }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={() => loadPage(1)}
        className={`btn-pagination ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft className="mr-2" /> First Page
      </button>
      <button
        onClick={() => loadPage(currentPage - 1)}
        className={`btn-pagination ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <FaAngleLeft className="mr-2" /> Prev Page
      </button>
      <button
        onClick={() => loadPage(currentPage + 1)}
        className={`btn-pagination ${
          currentPage === lastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === lastPage}
      >
        <FaAngleRight className="ml-2" />
        Next Page
      </button>
      <button
        onClick={() => loadPage(lastPage)}
        className={`btn-pagination ${
          currentPage === lastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === lastPage}
      >
        <FaAngleDoubleRight className="ml-2" />
        Last Page
      </button>
    </div>
  );
};

export default PaginationComponent;
