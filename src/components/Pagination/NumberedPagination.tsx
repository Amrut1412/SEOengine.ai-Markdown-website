import { ChevronLeft, ChevronRight } from "lucide-react";

interface NumberedPaginationProps {
  currentPage: number; // Current page number (1-based)
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Callback when page changes
  maxPagesToShow?: number; // Maximum page buttons to show (default: 7)
  className?: string;
}

/**
 * NumberedPagination component
 *
 * Displays numbered page buttons with Previous/Next navigation
 *
 * @example
 * ```tsx
 * <NumberedPagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(page) => console.log('Go to page:', page)}
 * />
 * ```
 */
export default function NumberedPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 7,
  className = "",
}: NumberedPaginationProps) {
  // Don't render if there's only 1 page
  if (totalPages <= 1) {
    return null;
  }

  // Generate array of page numbers to show
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    // Adjust window if we're near the edges
    if (currentPage <= halfWindow) {
      endPage = Math.min(totalPages, maxPagesToShow - 1);
    }
    if (currentPage + halfWindow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 2);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add page numbers in window
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    // Scroll to top of posts section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`numbered-pagination ${className}`}>
      <div className="pagination-inner">
        {/* Previous Button */}
        <button
          className="pagination-button pagination-prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                className={`pagination-page ${isActive ? "pagination-page-active" : ""}`}
                onClick={() => handlePageClick(pageNumber)}
                disabled={isActive}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="pagination-button pagination-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Page Info */}
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
