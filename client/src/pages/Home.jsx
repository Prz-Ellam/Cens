import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import SurveyForm from '../components/SurveyForm';
import axios from 'axios';
import { getToken, getUserData } from '../utils/auth';
import CreatePoll from '../components/CreatePoll';

// eslint-disable-next-line react/prop-types
export default function Home({ className }) {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const userData = getUserData();
    setUser(userData);

  }, [])


  const [close, setClose] = useState(true);

  let [polls, setPolls] = useState([]);

  useEffect(() => {
    axios('/api/v1/polls', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }).then((response) => {
      setPolls(response.data);
    });
  }, []);

  return (
    <section className={className}>
      <div className="flex">
        <div className="md:w-2/3 w-full p-3">
          <div className="rounded-lg bg-accent shadow-lg text-white mb-5">
            <div className="flex flex-row items-center p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
                <img
                  src={user?.id ? `/api/v1/users/${user?.id}/avatar` : '/default-profile-picture.png'}
                  alt="Your Image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="font-bold">{user?.username}</div>
                </div>
                <p className="text-gray-300">¿Qué deseas compartir?</p>
              </div>
            </div>
            <hr className="mx-3 text-gray-600" />
            <button
              type="button"
              className="ml-3 my-1 text-white hover:bg-gray-500 font-medium rounded-lg px-5 py-2.5 text-center"
              onClick={() => setClose(false)}
            >
              Encuesta
            </button>
          </div>

          <section className="flex flex-col gap-4 rounded-lg">
            {polls.map((poll, index) => (
              <SurveyForm
                key={index}
                id={poll.id}
                question={poll.question}
                description={poll.description}
                options={poll.options}
                name={poll.user.username}
                commentCount={poll.comments.length}
                likeCount={
                  poll.reactions.filter((reaction) => reaction.isLike === true)
                    .length
                }
                dislikeCount={
                  poll.reactions.filter((reaction) => reaction.isLike === false)
                    .length
                }
              />
            ))}
          </section>
        </div>
        <div className="md:w-1/3 md:block hidden p-3">
          <div className="h-screen rounded-lg bg-accent text-white mb-5 p-4">
            <h2 className="text-lg font-bold">Buscar encuestas</h2>

            <div className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer">
              <img
                src="/default-profile-picture.png"
                alt="Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>

            <div className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer">
              <img
                src="/default-profile-picture.png"
                alt="Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>

            <div className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer">
              <img
                src="/default-profile-picture.png"
                alt="Avatar"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
      <Modal 
      question="Crear encuesta" 
      close={close} 
      setClose={setClose} 
      title={"Crear encuesta"} 
      bodySlot={<CreatePoll />}
      >
      </Modal>
    </section>
  );
}
