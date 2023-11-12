import PropTypes from 'prop-types';
import className from 'classnames';
import { useAuth } from '@/hooks/useAuth';

/**
 * Componente que representa un contacto en el chat.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {number} props.chatId - Identificador de la conversación.
 * @param {string} props.avatar - La URL de la imagen del avatar.
 * @param {string} props.username - El nombre de usuario del contacto.
 * @param {string} props.lastMessage - El último mensaje del contacto.
 * @param {string} props.date - La fecha del último mensaje.
 * @param {number} props.pending - El número de mensajes pendientes.
 * @param {function} props.onSelect - Evento si se da click al contacto.
 * @returns {JSX.Element} Componente del contacto.
 */
function ChatContact({
  chatId,
  avatar,
  username,
  lastMessage,
  lastMessageCreatedBy,
  date,
  pending,
  onSelect = () => {}
}) {
  const { user } = useAuth();
  return (
    <article
      className="flex justify-between p-2 hover:bg-gray-500 rounded-lg cursor-pointer transition duration-150 ease-out hover:ease-in"
      onClick={() =>
        onSelect({ chatId, avatar, username, lastMessage, date, pending })
      }
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={avatar}
          alt="Profile Picture"
          className="w-10 min-w-[2.5rem] h-10 rounded-full object-cover"
        />
        <div className="truncate">
          <p className="text-base text-gray-300 truncate">{username}</p>
          <p
            className={className('text-sm truncate', {
              'font-bold': pending > 0,
              'text-gray-300': pending > 0,
              'text-gray-400': pending <= 0
            })}
          >
            {user.id === lastMessageCreatedBy ? 'Tú' : username}: {lastMessage}
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
  chatId: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  lastMessageCreatedBy: PropTypes.number,
  date: PropTypes.string,
  pending: PropTypes.number,
  onSelect: PropTypes.func
};

export default ChatContact;
