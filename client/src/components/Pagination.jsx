// eslint-disable-next-line react/prop-types
function Pagination({ page, totalPages, onSelect }) {
  const findPaginationSection = (number) => {
    const sectionSize = 5;
    const start =
      Math.ceil(number / sectionSize) * sectionSize - sectionSize + 1;
    const end = Math.min(start + sectionSize - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <nav className="pt-5 text-center">
      <ul className="inline-flex text-base h-10">
        <li>
          <button
            disabled={page <= 1}
            onClick={() => (page <= 1 ? null : onSelect(page - 1))}
            className={`${
              page <= 1 ? 'text-gray-500' : 'text-gray-300 hover:bg-purple'
            } flex items-center justify-center px-4 h-10 ml-0 leading-tigh bg-dark rounded-l-lg`}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
        </li>
        {findPaginationSection(page).map((value, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(value)}
              className={`${
                value === page ? 'bg-purple' : 'bg-dark hover:bg-purple'
              } flex items-center justify-center px-4 h-10 leading-tight text-gray-300 cursor-pointer`}
            >
              {value}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={page >= totalPages}
            onClick={() => (page < totalPages ? onSelect(page + 1) : null)}
            className={`${
              page < totalPages
                ? 'text-gray-300 hover:bg-purple'
                : 'text-gray-500'
            } flex items-center justify-center px-4 h-10 leading-tight bg-dark rounded-r-lg`}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
