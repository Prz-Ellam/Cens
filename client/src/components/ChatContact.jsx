import PropTypes from "prop-types";

export default function ChatContact({ avatar, username, lastMessage, date, pending }) {
  return (
    <article className="flex justify-between hover:bg-gray-500 rounded-lg p-2 cursor-pointer">
      <div className="flex items-center overflow-hidden">
        <img
          src={avatar}
          alt="Profile Picture"
          className="w-10 h-10 rounded-full me-3 min-w-10"
        />
        <div className="truncate">
          <p className="text-base text-gray-300 truncate">{username}</p>
          <p className={`text-sm truncate ${pending > 0 ? 'font-bold text-gray-200' : 'text-gray-400'}`}>
            {lastMessage}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400 text-right whitespace-nowrap mb-1">
          {date}
        </p>
        {pending > 0 && <span className="bg-red-500 text-gray-300 text-xs font-bold float-right rounded-full py-0.5 px-1.5">
          {pending}
        </span>}
      </div>
    </article>
  );
}

ChatContact.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  pending: PropTypes.number.isRequired,
};
