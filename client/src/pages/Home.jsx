import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import PollCard from '@/components/PollCard';
import CreatePoll from '@/components/CreatePoll';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import FollowSuggestions from '@/components/FollowSuggestions';
import Pagination from '@/components/Pagination';
import Swal from 'sweetalert2';

/**
 * Página principal con el feed y las recomendaciones de usuarios.
 *
 * @returns {JSX.Element} Componente de la página de inicio.
 */
function Home() {
  const { user } = useAuth();

  const [close, setClose] = useState(true);

  const [polls, setPolls] = useState([]);
  const [pollsPage, setPollsPage] = useState(1);
  const [pollsTotalPages, setPollsTotalPages] = useState(0);

  const [showPolls, setShowPolls] = useState(true);

  const fetchPolls = async (page) => {
    try {
      const response = await axios(
        `/users/${user.id}/polls/following?page=${page}&limit=5`
      );
      setPolls(response.data.polls);
      setPollsTotalPages(response.data.totalPages);
      setPollsPage(page);
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
  };

  const toggleSection = () => {
    setShowPolls(!showPolls);
  };

  useEffect(() => {
    if (user) {
      fetchPolls(pollsPage);
    }
  }, [user]);

  return (
    <>
      <div className="md:hidden flex items-center justify-center mt-3">
        <button
          className="text-gray-300 bg-purple-800 hover:bg-purple-90 focus:outline-none font-bold rounded-lg py-2 px-4 shadow-none cursor-pointer transition duration-150 ease-out hover:ease-in"
          onClick={toggleSection}
        >
          {showPolls ? 'Recomendaciones' : 'Encuestas'}
        </button>
      </div>
      <section className="flex">
        <div
          className={`md:w-2/3 w-full md:block p-3 ${showPolls ? 'block' : 'hidden'}`}
        >
          <div className="rounded-lg bg-accent shadow-lg text-white mb-5">
            <div className="flex flex-row items-center p-4">
              <img
                src={`/api/v1/users/${user?.id}/avatar`}
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

          <section className="flex flex-col gap-4 rounded-lg overflow-y-auto">
            {polls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onUpdate={() => fetchPolls(pollsPage)}
                onDelete={() => fetchPolls(pollsPage)}
              />
            ))}
            <Pagination
              page={pollsPage}
              totalPages={pollsTotalPages}
              onPageChange={(page) => fetchPolls(page)}
            />
          </section>
        </div>
        <div
          className={`md:w-1/3 w-full md:block m-3 ${showPolls ? 'hidden' : 'block'}`}
        >
          <FollowSuggestions onUpdate={() => fetchPolls(pollsPage)} />
        </div>

        <Modal
          question="Crear encuesta"
          close={close}
          setClose={setClose}
          title={'Crear encuesta'}
          bodySlot={<CreatePoll onCreate={() => setClose(true)} />}
        ></Modal>
      </section>
    </>
  );
}

export default Home;
