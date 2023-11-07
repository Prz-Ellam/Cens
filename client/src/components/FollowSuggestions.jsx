import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import { Link } from 'react-router-dom';
import { ToastTopEnd } from '../utils/toast';

function FollowSuggestions() {
  const { user } = useAuth();

  const [recomendations, setRecomendations] = useState([]);

  const fetchRecomendations = async () => {
    try {
      const response = await axios(`/users/${user.id}/notFollowing`);

      setRecomendations(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const createFollowing = async (userId) => {
    try {
      const response = await axios.post(`/users/${userId}/followers`);

      ToastTopEnd.fire({
        icon: 'success',
        title: response.data.message
      });
    } catch (error) {
      console.error('Error creating following:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecomendations();
    }
  }, []);

  return (
    <section className="md:w-1/3 md:block hidden p-3">
      <div className="h-screen rounded-lg bg-accent text-white mb-5 p-4">
        <h2 className="text-lg font-bold mb-2">¿A quién seguir?</h2>

        {recomendations.map((user, index) => (
          <Link
            key={index}
            className="flex flex-row items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer"
            to={`/profile/${user.id}`}
          >
            <img
              src={`/api/v1/users/${user.id}/avatar`}
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col flex-grow ml-3 truncate">
              <div className="flex items-center justify-between">
                <p className="text-md font-bold">{user.username}</p>
                <button
                  className="rounded-full bg-gray-300 hover:bg-gray-400 px-3 py-1 text-black"
                  onClick={async (event) => {
                    event.preventDefault();
                    await createFollowing(user.id);
                    await fetchRecomendations();
                  }}
                >
                  Seguir
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FollowSuggestions;
