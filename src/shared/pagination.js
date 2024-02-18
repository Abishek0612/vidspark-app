import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="pagination-container flex items-center justify-center gap-4 mt-4">
      <button
        disabled={isPrevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
          isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>
      <span className="px-4 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={isNextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
