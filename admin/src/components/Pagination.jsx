import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({ page, totalPages, setPage }) {
  const canGoBack = page > 1;
  const canGoForward = page < totalPages;
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {/* First Page */}
      <button
        onClick={() => setPage(1)}
        disabled={!canGoBack}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        aria-label="First page"
      >
        <ChevronsLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => setPage(p => p - 1)}
        disabled={!canGoBack}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }
          
          const isActive = pageNum === page;
          
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Page */}
      <button
        onClick={() => setPage(p => p + 1)}
        disabled={!canGoForward}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {/* Last Page */}
      <button
        onClick={() => setPage(totalPages)}
        disabled={!canGoForward}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        aria-label="Last page"
      >
        <ChevronsRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

// Demo component to showcase the pagination
function Demo() {
  const [page, setPage] = React.useState(1);
  const totalPages = 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Modern Pagination Component</h2>
        <p className="text-gray-600 mb-8">Interactive example with {totalPages} pages</p>
        
        {/* Content Area */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 mb-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">{page}</div>
            <p className="text-gray-600">Current Page Content</p>
          </div>
        </div>

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        
        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
}