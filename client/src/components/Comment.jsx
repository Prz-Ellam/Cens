import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

/**
 * Componente que representa un comentario.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.text - El texto del comentario.
 * @param {string} props.username - El nombre de usuario que hizo el comentario.
 * @returns {JSX.Element} - El elemento JSX del comentario.
 */
export default function Comment({ text, username }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // focus:ring-4 focus:outline-none focus:ring-gray-50  dark:focus:ring-gray-600

  return (
    <article className="p-6 text-baserounded-lg bg-accent border-b text-gray-300">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-10 h-10 rounded-full"
              src="/default-profile-picture.png"
              alt="Avatar"
            />
            {username}
          </p>
          <p className="text-sm text-gray-400">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              Feb. 8, 2022
            </time>
          </p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-300 rounded-lg hover:bg-gray-500 transition duration-150 ease-out hover:ease-in"
            type="button"
            onClick={() => setOpen(!open)}
          >
            <i className="bx bx-dots-vertical-rounded"></i>
            <span className="sr-only">Comment settings</span>
          </button>
          <div
            className={`z-10 w-36 bg-dark rounded divide-y divide-gray-100 shadow right-0
          ${open ? 'absolute' : 'hidden'}`}
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Editar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Eliminar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <p className="text-gray-300">{text}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Responder
        </button>
      </div>
    </article>
  );
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
