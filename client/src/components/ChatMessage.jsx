import PropTypes from 'prop-types';

export default function ChatMessage({ avatar, message, own }) {
  return (
    <div className={`flex my-4 ${own ? "justify-end" : "justify-start"}`}>
      {!own && (
        <img
          className="rounded-full me-2 w-8 h-8"
          src={avatar}
          alt="Avatar"
        />
      )}
      <small
        className={`text-sm p-2 rounded-2xl overflow-aut text-white ${
          own ? "bg-purple text-right" : "bg-gray-800"
        }`}
      >
        {message}
      </small>
    </div>
  );
}

ChatMessage.propTypes = {
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  own: PropTypes.bool.isRequired,
};

