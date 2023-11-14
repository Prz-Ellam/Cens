import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from '@/services/api';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

/**
 * Componente que representa un mensaje en la caja de conversación
 *
 * @param {object} props
 * @param {string} props.avatar - La URL de la imagen del avatar.
 * @param {string} props.message - El mensaje.
 * @param {boolean} props.own - El usuario actual es dueño del mensaje
 * @returns {JSX.Element} - El elemento JSX del mensaje.
 */
function ChatMessage({ id, avatar, message, own, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const menuRef = useRef(null);

  // Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const deleteMessage = async () => {
    try {
      setIsMenuOpen(false);

      const result = await Swal.fire({
        title: '¿Estas seguro que deseas borrar la encuesta?',
        text: 'No podrás recuperarla después',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`
      });
  
      if (result.isDenied) {
        return;
      }

      await axios.delete(`/messages/${id}`);
      onUpdate();
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const updateMessageFunc = async () => {
    try {
      await axios.put(`/messages/${id}`, { text: updateMessage });
      setIsUpdate(false);
      onUpdate();
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  return (
    <article
      className={classNames('flex gap-2 my-4', {
        'justify-end': own,
        'justify-start': !own
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!own ? (
        <img className="w-8 h-8 rounded-full" src={avatar} alt="Avatar" />
      ) : (
        <div className="relative my-auto" ref={menuRef}>
          <button
            className={classNames('text-gray-300 rounded-full font-bold', {
              invisible: !isHovered || isUpdate
            })}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bx bx-dots-vertical-rounded hover:bg-gray-500 rounded-full py-1 px-1"></i>
          </button>

          <div
            className={classNames(
              'z-10 w-36 bg-dark rounded divide-y divide-gray-100 shadow right-0',
              {
                absolute: isMenuOpen,
                hidden: !isMenuOpen
              }
            )}
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setUpdateMessage(message);
                    setIsMenuOpen(false);
                    setIsUpdate(true);
                  }}
                >
                  Editar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => deleteMessage()}
                >
                  Eliminar
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isUpdate ? (
        <>
          <div className="w-[90%] flex">
            <input
              type="text"
              className="bg-dark hover:shadow-md relative m-0 block min-w-0 flex-auto rounded bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-400 outline-none transition duration-200 ease-in-out focus:z-[3] focus:outline-none"
              placeholder="Mensaje..."
              defaultValue={updateMessage}
              onChange={(event) => setUpdateMessage(event.target.value)}
            />
          </div>
          <button
            className="bg-green-500 text-xs mr-1 hover:bg-green-700 inline-flex items-center py-2 px-4 font-medium text-center text-white bg-primary-700 rounded-md"
            onClick={() => updateMessageFunc()}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-xs hover:bg-gray-400 inline-flex items-center py-2 px-4 font-medium text-center text-white bg-primary-700 rounded-md"
            onClick={() => setIsUpdate(false)}
          >
            Cancelar
          </button>
        </>
      ) : (
        <p
          className={classNames(
            'text-sm p-2 rounded-2xl max-w-[85%] text-gray-300',
            {
              'bg-purple': own,
              'bg-dark': !own,
              'text-right': own
            }
          )}
        >
          {message}
        </p>
      )}
    </article>
  );
}

ChatMessage.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  own: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ChatMessage;
