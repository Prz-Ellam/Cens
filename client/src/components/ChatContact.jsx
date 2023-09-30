import PropTypes from 'prop-types';
import className from 'classnames';

const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;

/**
 * Componente que representa un contacto en el chat.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.avatar - La URL de la imagen del avatar.
 * @param {string} props.username - El nombre de usuario del contacto.
 * @param {string} props.lastMessage - El último mensaje del contacto.
 * @param {string} props.date - La fecha del último mensaje.
 * @param {number} props.pending - El número de mensajes pendientes.
 * @returns {JSX.Element} - El elemento JSX del contacto.
 */
export default function ChatContact({
  avatar,
  username,
  lastMessage,
  date,
  pending
}) {
  return (
    <article className="flex justify-between p-2 hover:bg-gray-500 rounded-lg cursor-pointer transition duration-150 ease-out hover:ease-in">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={avatar}
          alt="Profile Picture"
          className="w-10 min-w-[2.5rem] h-10 rounded-full"
        />
        <div className="truncate">
          <p className="text-base text-gray-300 truncate">{username}</p>
          <p
            className={className('text-sm', 'truncate', {
              'font-bold': pending > 0,
              'text-gray-300': pending > 0,
              'text-gray-400': pending <= 0
            })}
          >
            {lastMessage}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400 whitespace-nowrap mb-1">{date}</p>
        {pending > 0 && (
          <span className="text-xs font-bold bg-red-500 text-gray-300 float-right rounded-full py-0.5 px-1.5">
            {pending}
          </span>
        )}
      </div>
    </article>
  );
}

ChatContact.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  date: (props, propName, componentName) => {
    if (!dateTimeRegex.test(props[propName])) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. It should be in the format 'DD/MM/YYYY HH:MM'.`
      );
    }
  },
  pending: PropTypes.number.isRequired
};
