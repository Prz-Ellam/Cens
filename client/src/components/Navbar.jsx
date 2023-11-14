import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import censLogo from '@/assets/img/Cens_Logo.png';

/**
 * Cabecera principal de las pantallas
 * 
 * @returns {JSX.Element} Componente del navbar.
 */ 
function Navbar() {
  const { logout } = useAuth();
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="border-gray-200 bg-gradient-to-r from-secondary to-primary h-14 shadow-md">
      <nav className="w-full flex items-center justify-between px-8">
        <Link to="/" className="flex float-left ">
          <img
            src={censLogo}
            className="h-14 mr-3"
            alt="Avatar"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <input
          type="text"
          id="search-navbar"
          className="block w-[50%] bg-accent shadow hover:shadow-md appearance-none rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Buscar encuestas..."
          onKeyDown={(event) => {
            if (event.key == 'Enter') {
              navigate(`/search?search=${event.target.value}`)
            }
          }}
        />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to={`/profile/${user.id}`}
                className="block font-bold py-2 pl-3 pr-4 text-white rounded bg-transparent md:p-0 hover:text-violet-200"
              >
                {user?.username}
              </Link>
            </li>
            <li>
              <a
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="cursor-pointer block font-bold py-2 pl-3 pr-4 text-white rounded bg-transparent md:p-0 hover:text-violet-200"
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
