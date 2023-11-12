import PropTypes from 'prop-types';
import className from 'classnames';

/**
 * Componente para paginar elementos
 *
 * @param {object} props - Las propiedades del componente.
 * @param {number} props.page - Pagina actual.
 * @param {number} props.totalPages - Total de paginas.
 * @param {number} props.limit - Total de elementos por pagina.
 * @param {function} props.onSelect - Evento al seleccionar una pagina.
 * @returns {JSX.Element} Componente de paginación.
 */
function Pagination({ page, totalPages, limit = 5, onSelect = () => {} }) {
  /**
   * Encontrar el rango actual donde se encuentra la paginacion ej. [1-5, 6-10]
   * @param {number} number
   * @returns
   */
  const calculatePaginationRange = (number) => {
    const start = Math.ceil(number / limit) * limit - limit + 1;
    const end = Math.min(start + limit - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const paginationSection = calculatePaginationRange(page);

  return (
    <nav className="text-center">
      <ul className="inline-flex h-10">
        <li>
          <button
            disabled={page <= 1}
            onClick={() => page > 1 && onSelect(page - 1)}
            className={className(
              'px-4 h-10 bg-dark rounded-l-lg transition duration-150 ease-out hover:ease-in',
              {
                'text-gray-500': page <= 1,
                'text-gray-300 hover:bg-purple': page > 1
              }
            )}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
        </li>
        {paginationSection.map((value, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(value)}
              className={className(
                'px-4 h-10 text-gray-300 cursor-pointer transition duration-150 ease-out hover:ease-in',
                {
                  'bg-purple': value === page,
                  'bg-dark hover:bg-purple': value !== page
                }
              )}
            >
              {value}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={page >= totalPages}
            onClick={() => page < totalPages && onSelect(page + 1)}
            className={className(
              'px-4 h-10 bg-dark rounded-r-lg transition duration-150 ease-out hover:ease-in',
              {
                'text-gray-500': page >= totalPages,
                'text-gray-300 hover:bg-purple': page < totalPages
              }
            )}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  limit: PropTypes.number,
  onSelect: PropTypes.func
};

export default Pagination;
