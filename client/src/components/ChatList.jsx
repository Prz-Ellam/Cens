import PropTypes from 'prop-types';
import ChatContact from './ChatContact';
import { formatDate } from '@/utils/format-date';
import Modal from './Modal';
import { useCallback, useEffect, useState } from 'react';
import axios from '@/services/api';
import Swal from 'sweetalert2';

/**
 * Componente que representa la lista de contactos de un usuario.
 *
 * @param {object} params
 * @param {object[]} params.contacts - Lista de contactos del usuario
 * @param {function} params.onSelect - Lista de contactos del usuario
 * @returns
 */
function ChatList({ contacts, onSelect = () => {}, onUpdate = () => {} }) {
  const [closeModal, setCloseModal] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`/users?username=${search}`);
      setUsers(response.data.users);
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
  }, [search]);

  const createConversation = async (userId) => {
    /* const response = */ await axios.post(`users/${userId}/conversations`);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="flex flex-col h-full p-3 bg-accent rounded-lg shadow-lg">
      <div className="flex justify-between items-center mx-5 mb-1 py-2">
        <h2 className="text-center text-4xl font-bold text-gray-300">
          Contactos
        </h2>
        <button onClick={() => setCloseModal(false)}>
          <i className="bx-sm bx bxs-edit text-gray-300 hover:text-violet-300"></i>
        </button>
      </div>

      <hr className="mb-2 bg-gray-300" />
      <div className="overflow-auto">
        {contacts &&
          contacts.map((contact, index) => (
            <ChatContact
              key={index}
              chatId={contact.conversationId}
              avatar={`/api/v1/users/${contact.userId}/avatar`}
              username={contact.username}
              lastMessage={contact.lastMessage}
              lastMessageCreatedBy={contact.lastMessageCreatedBy}
              date={formatDate(contact.lastMessageCreatedAt)}
              pending={contact.pending}
              onSelect={(contact) => onSelect(contact)}
            />
          ))}
      </div>
      <Modal
        close={closeModal}
        setClose={() => setCloseModal(true)}
        title={'Crear contacto'}
        bodySlot={
          <>
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
                htmlFor="question"
              >
                Buscar usuario
              </label>
              <input
                className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                id="question"
                type="text"
                name="question"
                placeholder="¿A quien estas buscando?..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <section className="h-[320px] overflow-scroll">
              {users.map((user, index) => (
                <article
                  key={index}
                  className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer"
                  onClick={async () => {
                    await createConversation(user.id);
                    await fetchUsers();
                    setCloseModal(true);
                    onUpdate();
                  }}
                >
                  <img
                    src={`/api/v1/users/${user.id}/avatar`}
                    alt="Profile Picture"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col flex-grow ml-3 truncate">
                    <p className="text-base text-gray-300 truncate">
                      {user.username}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          </>
        }
      ></Modal>
    </section>
  );
}

ChatList.propTypes = {
  contacts: PropTypes.array,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func
};

export default ChatList;
