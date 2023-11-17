import { Link } from 'react-router-dom';

/**
 * Barra lateral izquierda con enlaces a otras páginas.
 *
 * @returns {JSX.Element} Componente del sidebar.
 */
function Sidebar() {
  return (
    <aside>
      <div className="flex justify-center align-middle h-full px-3 py-3 overflow-y-auto overflow-x-hidden bg-dark">
        <ul className="md:space-y-2 font-medium flex flex-row md:flex-col">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group"
            >
              <i className="bx-sm bx bxs-home text-gray-300"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group"
            >
              <i className="bx-sm bx bxs-conversation text-gray-300"></i>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
