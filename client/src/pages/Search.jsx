import SurveyForm from '@/components/SurveyForm';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from '@/services/api';

function Search() {
  const { user } = useAuth();

  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const response = await axios(`/users/${user.id}/polls/following`);

      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPolls();
    }
  }, []);

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <h1 className="text-4xl text-center font-semibold mb-4 text-gray-300">
          Busqueda
        </h1>
        <section className="flex flex-col gap-4 rounded-lg overflow-y-scroll">
          {polls &&
            polls.map((poll, index) => (
              <SurveyForm
                key={index}
                poll={poll}
                onDelete={async () => {}}
                onUpdate={async () => {}}
              />
            ))}
        </section>
      </div>
    </section>
  );
}

export default Search;
