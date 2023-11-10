import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ChatList from '@/components/ChatList';
import ChatMessage from '@/components/ChatMessage';
import axios from 'axios';
import { ToastTopEnd } from '@/utils/toast';
import z from 'zod';
// import getErrors from '../utils/error-format';

function Chat() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(-1);

  const [selectedContact, setSelectedContact] = useState(null);
  const messageBox = useRef();

  const formValidator = z.object({
    text: z
      .string({
        invalid_type_error: 'El texto debe ser una cadena de texto'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter')
      .max(255, 'Maximo de 255 caracteres')
  });

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`/conversations/${chatId}/messages`);

      // console.log(response.data);
      setMessages(response.data);
      setTimeout(() => {
        messageBox.current.scrollTo({
          left: 0,
          top: messageBox.current.scrollHeight
        });
      }, 0);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${user.id}/conversations`);

      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }, [user.id]);

  const handleMessage = async (chatId) => {

    const result = formValidator.safeParse({
      text: message
    });
    if (!result.success) {
      // const errors = getErrors(result.error);
      
      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });

      return;
    }

    if (!message) {
      await ToastTopEnd.fire({
        icon: 'error',
        title: 'Hubo un error'
      });
      return;
    }
    try {
      const response = await axios.post(`/conversations/${chatId}/messages`, {
        text: message
      });

      console.log(response.data);
      await fetchMessages(chatId);
      setTimeout(() => {
        messageBox.current.scrollTo({
          left: 0,
          top: messageBox.current.scrollHeight
        });
      }, 0);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user, fetchContacts]);

  const isChatDrawerFocus = true;
  return (
    <section className="h-full flex justify-between gap-3 p-4">
      <div
        className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/4 ${
          isChatDrawerFocus ? 'block' : 'hidden'
        }`}
      >
        <ChatList
          contacts={contacts}
          onSelect={async (contact) => {
            await fetchMessages(contact.chatId);
            setChatId(contact.chatId);
            setSelectedContact(contact);
            await fetchContacts();
          }}
          onUpdate={() => fetchContacts()}
        />
      </div>

      <div className={`w-full`}>
        <div className="h-full flex md:flex-row items-center px-3 md:px-0  overflow-hidden">
          <div className="bg-accent flex flex-col w-full rounded-lg p-3 h-full shadow-lg">
            <div className="flex justify-between items-center mb-1 py-2 ">
              <div className="flex items-center">
                <button className="btn border-0 px-1 md:px-2 md:hidden block">
                  <i className="bi fa-solid fa-chevron-left"></i>
                </button>
                <img
                  className={`min-h-[2.5rem] h-10 w-10 img-fluid rounded-full ms-3 ${
                    !selectedContact?.username ? 'invisible' : ''
                  }`}
                  src={selectedContact?.avatar}
                  alt="Perfil"
                />
                <span
                  className={`text-xl md:text-lg ms-3 text-gray-300 font-bold ${
                    !selectedContact?.username ? 'invisible' : ''
                  }`}
                >
                  {selectedContact?.username || 'Secret message'}
                </span>
              </div>
            </div>
            <hr className="mx-3" />
            <div
              className="overflow-auto px-4 py-2 h-full chat"
              ref={messageBox}
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  id={message.id}
                  avatar={`/api/v1/users/${message.sender.id}/avatar`}
                  message={message.text}
                  own={user.id === message.sender.id}
                  onUpdate={async () => {
                    await fetchMessages(chatId);
                    await fetchContacts();
                  }}
                />
              ))}
            </div>

            <hr className="my-3" />

            <div className="relative mb-4 flex flex-wrap items-stretch">
              <input
                type="text"
                className="bg-dark hover:shadow-md relative m-0 block w-[1px] min-w-0 flex-auto rounded-l bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-400 outline-none transition duration-200 ease-in-out focus:z-[3] focus:outline-none"
                placeholder="Mensaje..."
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={async (event) => {
                  if (event.key == 'Enter' && selectedContact?.chatId) {
                    await handleMessage(selectedContact?.chatId);
                    setMessage('');
                    event.target.value = '';
                    await fetchContacts();
                  }
                }}
              />
              <button
                onClick={() =>
                  selectedContact?.chatId
                    ? handleMessage(selectedContact?.chatId)
                    : ''
                }
                className="bg-[#573b8a] hover:bg-[#402c66] flex items-center whitespace-nowrap rounded-r text-gray-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] transition duration-150 ease-out hover:ease-in"
              >
                <i className="bx bxs-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;
