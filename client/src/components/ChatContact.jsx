import PropTypes from 'prop-types';

const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;

export default function ChatContact({ avatar, username, lastMessage, date, pending }) {
  return (
    <article className="flex justify-between p-2 hover:bg-gray-500 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={avatar}
          alt="Profile Picture"
          className="w-10 h-10 rounded-full min-w-[2.5rem]"
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
  date: (props, propName, componentName) => {
    if (!dateTimeRegex.test(props[propName])) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. It should be in the format 'DD/MM/YYYY HH:MM'.`
      );
    }
  },
  pending: PropTypes.number.isRequired,
};
