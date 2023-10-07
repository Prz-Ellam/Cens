import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ChatList from '@/components/ChatList';
import ChatMessage from '@/components/ChatMessage';
import axios from 'axios';
import { ToastTopEnd } from '@/utils/toast';

export default function Chat() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const [selectedContact, setSelectedContact] = useState(null);

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`/conversations/${chatId}/messages`);

      // console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`/users/${user.id}/conversations`);

      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleMessage = async (chatId) => {
    if (!message) {
      await ToastTopEnd.fire('hubo un error');
      return;
    }
    try {
      const response = await axios.post(`/conversations/${chatId}/messages`, {
        text: message
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

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
          onSelect={(contact) => {
            fetchMessages(contact.chatId);
            setSelectedContact(contact);
          }}
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
              id="message-box"
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  avatar={`/users/${message.sender.id}/avatar`}
                  message={message.text}
                  own={user.id === message.sender.id}
                />
              ))}
            </div>

            <hr className="my-3" />

            <div className="relative mb-4 flex flex-wrap items-stretch">
              <input
                type="text"
                className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Recipient's username"
                onChange={(event) => setMessage(event.target.value)}
              />
              <button
                onClick={() =>
                  selectedContact?.chatId
                    ? handleMessage(selectedContact?.chatId)
                    : ''
                }
                className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
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
