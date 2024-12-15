import React from 'react';

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxDisplayedPages?: number;
  className?: string;
  labels?: {
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
    page?: string;
  };
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  responsive?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  maxDisplayedPages = 10,
  className = '',
  labels = {
    first: '«',
    last: '»',
    next: '›',
    previous: '‹',
    page: 'Page'
  },
  showFirstLast = true,
  showPrevNext = true,
  responsive = true,
}) => {
  // Calculate page range without Array.from
  const getPageRange = () => {
    const sidePages = Math.floor((maxDisplayedPages - 1) / 2);
    let start = Math.max(1, currentPage - sidePages);
    let end = Math.min(pageCount, start + maxDisplayedPages - 1);

    if (end - start + 1 < maxDisplayedPages) {
      start = Math.max(1, end - maxDisplayedPages + 1);
    }

    // Create array using regular for loop instead of Array.from
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const renderPageButton = (pageNum: number, isCurrentPage: boolean) => {
    if (isCurrentPage) {
      return (
        <React.Fragment key={pageNum}>
          <button
            className={`${
              responsive ? 'hidden md:flex' : 'flex'
            } items-center justify-center w-8 h-8 rounded bg-blue-500 text-white`}
            aria-current="page"
          >
            {pageNum}
          </button>
          {responsive && (
            <button
              className="md:hidden flex items-center justify-center px-3 h-8 rounded bg-blue-500 text-white"
              aria-current="page"
            >
              {`${labels.page}: ${pageNum}`}
            </button>
          )}
        </React.Fragment>
      );
    }

    return (
      <button
        key={pageNum}
        onClick={() => onPageChange(pageNum)}
        className={`${
          responsive ? 'hidden md:flex' : 'flex'
        } items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-100`}
      >
        {pageNum}
      </button>
    );
  };

  const pages = getPageRange();

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`}>
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
          aria-label="First page"
        >
          {labels.first}
        </button>
      )}

      {showPrevNext && currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
          aria-label="Previous page"
        >
          {labels.previous}
        </button>
      )}

      {pages.map((page) => renderPageButton(page, page === currentPage))}

      {showPrevNext && currentPage < pageCount && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
          aria-label="Next page"
        >
          {labels.next}
        </button>
      )}

      {showFirstLast && currentPage < pageCount && (
        <button
          onClick={() => onPageChange(pageCount)}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-100"
          aria-label="Last page"
        >
          {labels.last}
        </button>
      )}
    </nav>
  );
};

export default Pagination;