import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { getToken } from '../utils/auth';

/**
 * Componente que representa un comentario.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {number} props.id - Identificador del comentario.
 * @param {string} props.text - El texto del comentario.
 * @param {string} props.username - El nombre de usuario que hizo el comentario.
 * @param {boolean} props.isAuthUser - Verifica si el comentario le pertenece al usuario autenticado.
 * @param {function} props.onUpdate - Verifica si el comentario le pertenece al usuario autenticado.
 * @returns {JSX.Element} - El elemento JSX del comentario.
 */
export default function Comment({
  id,
  text,
  username,
  avatar,
  isAuthUser,
  onUpdate
}) {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(text);
  const menuRef = useRef(null);

  useEffect(() => {
    setUpdateText(text);
  }, [text]);
  
  // Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleUpdateComment = async (commentId, text) => {
    try {
      const response = await axios.put(
        `/comments/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      console.log(response.data.message);
      await onUpdate(commentId);
      setIsUpdate(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: '¿Estas seguro que deseas borrar el comentario?',
      text: 'No podrás recuperarlo después',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    });

    if (result.isDenied) {
      return;
    }

    try {
      const response = await axios.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log(response.data.message);
      await onUpdate(commentId);
      setOpen(false);
      // setIsUpdate(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // focus:ring-4 focus:outline-none focus:ring-gray-50  dark:focus:ring-gray-600

  return (
    <article className="p-6 text-baserounded-lg bg-accent border-b text-gray-300">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-10 h-10 rounded-full object-cover"
              src={avatar}
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
        {!isUpdate && (
          <div className="relative" ref={menuRef}>
            {isAuthUser && (
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-300 rounded-lg hover:bg-gray-500 transition duration-150 ease-out hover:ease-in"
                type="button"
                onClick={() => setOpen(!open)}
              >
                <i className="bx bx-dots-vertical-rounded"></i>
                <span className="sr-only">Comment settings</span>
              </button>
            )}
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
                    onClick={() => {
                      setIsUpdate(true);
                      setOpen(false);
                    }}
                  >
                    Editar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleDeleteComment(id)}
                  >
                    Eliminar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </footer>
      {!isUpdate ? (
        <>
          <p className="text-gray-300">{text}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            className="bg-dark shadow appearance-none rounded w-full mb-3 py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            value={updateText}
            onChange={(event) => setUpdateText(event.target.value)}
          />
          <button
            className="bg-green-500 text-xs mr-3 hover:bg-gray-400 inline-flex items-center py-2.5 px-4 font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            onClick={() => handleUpdateComment(id, updateText)}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-xs hover:bg-gray-400 inline-flex items-center py-2.5 px-4 font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            onClick={() => setIsUpdate(false)}
          >
            Cancelar
          </button>
        </>
      )}
    </article>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isAuthUser: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired
};
