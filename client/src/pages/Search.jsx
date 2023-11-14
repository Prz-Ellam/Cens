import PollCard from '@/components/PollCard';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

/**
 * Buscador de encuestas con filtro por pregunta o descripcion.
 *
 * @returns {JSX.Element} Componente de las busquedas.
 */
function Search() {
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  const [polls, setPolls] = useState([]);
  const pollsPage = Number.parseInt(searchParams.get('page')) || 1;
  const [pollsTotalPages, setPollsTotalPages] = useState(0);
  const search = searchParams.get('search') ?? '';

  /**
   * Obtiene encuestas de acuerdo a la pagina y a la busqueda seleccionada.
   */
  const fetchPolls = useCallback(
    async (page) => {
      try {
        const response = await axios(
          `/polls?page=${page}&limit=5&search=${search}`
        );
        setPolls(response.data.polls);
        setPollsTotalPages(response.data.totalPages);
        if (page != pollsPage) {
          searchParams.set('page', page);
          setSearchParams(searchParams);
        }
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
    },
    [searchParams, pollsPage, setSearchParams, search]
  );

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
                onUpdate={() => fetchPolls(pollsPage)}
              />
            ))}
          <Pagination
            page={pollsPage}
            totalPages={pollsTotalPages}
            onPageChange={(page) => fetchPolls(page)}
          />
        </section>
      </div>
    </section>
  );
}

export default Search;
