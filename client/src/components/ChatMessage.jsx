import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * 
 * @param {object} props 
 * @param {string} props.avatar - La URL de la imagen del avatar.
 * @param {string} props.message - El mensaje.
 * @param {boolean} props.own - El usuario actual es dueño del mensaje
 * @returns {JSX.Element} - El elemento JSX del mensaje.
 */
export default function ChatMessage({ avatar, message, own }) {
  return (
    <article className={classNames('flex', 'gap-2', 'my-4', { 'justify-end': own, 'justify-start': !own })}>
      {!own && (
        <img
          className="w-8 h-8 rounded-full"
          src={avatar}
          alt="Avatar"
        />
      )}
      <p
        className={classNames('text-sm', 'p-2', 'rounded-2xl', 'text-gray-300', {
          'bg-purple': own,
          'bg-dark': !own,
          'text-right': own
        })}
      >
        {message}
      </p>
    </article>
  );
}

ChatMessage.propTypes = {
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  own: PropTypes.bool.isRequired,
};

