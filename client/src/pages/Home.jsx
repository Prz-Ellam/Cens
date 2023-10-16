import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import SurveyForm from '@/components/SurveyForm';
import CreatePoll from '@/components/CreatePoll';
import { useAuth } from '@/hooks/useAuth';
import Observable from '@/components/Observable';
import axios from '@/services/api';

function Home() {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [fetchMore, setFetchMore] = useState(true);
  const [close, setClose] = useState(true);
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const response = await axios(
        `/users/${user.id}/polls/following?page=${page}`
      );
      setPage(page + 1);

      if (response.data.length < 1) {
        setFetchMore(false);
      }

      const combinedPolls = [...polls, ...response.data];

      setPolls(combinedPolls);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  /**
   * Actualiza los datos realizados por el usuario en una encuesta si existe
   * @param {number} pollId
   */
  const updatePoll = async (pollId) => {
    try {
      const response = await axios.get(`/polls/${pollId}`);

      const newPoll = response.data;
      const newPolls = polls.map((poll) =>
        poll.id === pollId ? newPoll : poll
      );
      setPolls(newPolls);
    } catch (error) {
      console.error('Error updating poll:', error);
    }
  };

  const deletePoll = async (pollId) => {
    try {
      const newPolls = polls.filter((poll) => poll.id !== pollId);
      setPolls(newPolls);
    } catch (error) {
      console.error('Error deleting poll:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPolls();
    }
  }, []);

  return (
    <section className="flex">
      <div className="md:w-2/3 w-full p-3">
        <div className="rounded-lg bg-accent shadow-lg text-white mb-5">
          <div className="flex flex-row items-center p-4">
            <img
              src={
                user?.id
                  ? `/api/v1/users/${user?.id}/avatar`
                  : '/default-profile-picture.png'
              }
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col flex-grow ml-3 truncate">
              <p className="font-bold">{user?.username}</p>
              <p className="text-gray-300">¿Qué deseas compartir?</p>
            </div>
          </div>
          <hr className="mx-3 text-gray-600" />
          <button
            type="button"
            className="ml-3 my-1 text-gray-300 hover:bg-gray-500 font-medium rounded-lg px-5 py-2.5 text-center"
            onClick={() => setClose(false)}
          >
            Encuesta
          </button>
        </div>

        <section className="flex flex-col gap-4 rounded-lg overflow-y-scroll">
          {polls.map((poll, index) => (
            <SurveyForm key={index} poll={poll} onUpdate={updatePoll} onDelete={deletePoll} />
          ))}
          {polls.length > 0 && fetchMore && (
            <Observable onElementVisible={() => setTimeout(fetchPolls, 1000)} className="text-gray-300 font-bold text-lg">
              Cargando más...
            </Observable>
          )}
        </section>
      </div>
      <div className="md:w-1/3 md:block hidden p-3">
        <div className="h-screen rounded-lg bg-accent text-white mb-5 p-4">
          <h2 className="text-lg font-bold mb-2">Buscar encuestas</h2>

          <div className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer">
            <img
              src="/default-profile-picture.png"
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
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
              className="h-12 w-12 rounded-full object-cover"
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
              className="h-12 w-12 rounded-full object-cover"
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
      <Modal
        question="Crear encuesta"
        close={close}
        setClose={setClose}
        title={'Crear encuesta'}
        bodySlot={<CreatePoll />}
      ></Modal>
    </section>
  );
}

export default Home;
