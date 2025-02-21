type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  };

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border px-3 py-1 disabled:opacity-50"
      >
        &lt;
      </button>

      {getPageNumbers().map(page => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`rounded-md border px-3 py-1 ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border px-3 py-1 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
