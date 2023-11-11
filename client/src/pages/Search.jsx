import PollCard from '@/components/PollCard';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from '@/services/api';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';

/**
 * Buscador de encuestas con filtro por pregunta o descripcion
 * @returns 
 */
function Search() {
  const { user } = useAuth();

  const [polls, setPolls] = useState([]);
  const [pollsPage, setPollsPage] = useState(1);
  const [pollsTotalPages, setPollsTotalPages] = useState(0);

  const [searchParams, ] = useSearchParams();

  const fetchPolls = useCallback(async (page) => {
    try {
      const response = await axios(`/polls?page=${page}&limit=5&search=${searchParams.get('search')}`);
      setPolls(response.data.polls);
      setPollsTotalPages(response.data.totalPages);
      setPollsPage(page)
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      fetchPolls(pollsPage);
    }
  }, [user, pollsPage, fetchPolls]);

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <h1 className="text-4xl text-center font-semibold mb-4 text-gray-300">
          Busqueda
        </h1>
        <section className="flex flex-col gap-4 rounded-lg overflow-y-scroll">
          {polls &&
            polls.map((poll, index) => (
              <PollCard
                key={index}
                poll={poll}
                onDelete={() => fetchPolls(pollsPage)}
                onUpdate={() => fetchPolls(pollsPage)}
              />
            ))}
            <Pagination
              page={pollsPage}
              totalPages={pollsTotalPages}
              onSelect={(page) => fetchPolls(page)}
            />
        </section>
      </div>
    </section>
  );
}

export default Search;
