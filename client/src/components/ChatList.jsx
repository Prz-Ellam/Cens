import PropTypes from 'prop-types';
import ChatContact from './ChatContact';
import { formatDate } from '../utils/format-date';

/**
 *
 * @param {object} params
 * @param {object[]} params.contacts - Lista de contactos del usuario
 * @param {function} params.onSelect - Lista de contactos del usuario
 * @returns
 */
function ChatList({ contacts, onSelect }) {
  return (
    <section className="flex flex-col h-full p-3 bg-accent rounded-lg shadow-lg">
      <div className="flex justify-between items-center mx-5 mb-1 py-2">
        <h2 className="text-center text-4xl font-bold text-gray-300">
          Contactos
        </h2>
        <button>
          <i className="bx-sm bx bxs-edit text-gray-300 hover:text-violet-300"></i>
        </button>
      </div>

      <hr className="mb-2 bg-gray-300" />
      <div className="overflow-auto">
        {contacts && contacts.map((contact, index) => (
          <ChatContact
            key={index}
            chatId={contact.conversationId}
            avatar={`/api/v1/users/${contact.userId}/avatar`}
            username={contact.username}
            lastMessage={contact.lastMessage}
            date={formatDate(contact.lastMessageCreatedAt)}
            pending={0}
            onSelect={(contact) => onSelect(contact)}
          />
        ))}
      </div>
    </section>
  );
}

ChatList.propTypes = {
  contacts: PropTypes.array,
  onSelect: PropTypes.func
};

export default ChatList;
