import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import { Link } from 'react-router-dom';
import { ToastTopEnd } from '@/utils/toast';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

/**
 * Componente con las sugerencias de seguidores.
 * 
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onUpdate - Evento si se actualiza las sugerencias.
 * @returns {JSX.Element} Componente del sugerencias.
 */
function FollowSuggestions({ onUpdate = () => {} }) {
  const { user } = useAuth();

  const [recomendations, setRecomendations] = useState([]);

  /**
   * Obtiene usuarios que el usuario autenticado no sigue.
   */
  const fetchRecomendations = useCallback(async () => {
    try {
      const response = await axios(`/users/${user.id}/notFollowing`);
      setRecomendations(response.data);
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
  }, [user.id]);

  /**
   * Hace que el usuario actual siga al usuario seleccionado.
   * 
   * @param {number} userId - El identificador del usuario a seguir.
   */
  const createFollowing = async (userId) => {
    try {
      const response = await axios.post(`/users/${userId}/followers`);

      ToastTopEnd.fire({
        icon: 'success',
        title: response.data.message
      });
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

  useEffect(() => {
    if (user) {
      fetchRecomendations();
    }
  }, [user, fetchRecomendations]);

  return (
    <section className="md:w-1/3 md:block hidden m-3">
      <div className="h-screen bg-accent text-gray-300 rounded-lg mb-5 p-3">
        <h2 className="text-lg font-bold my-2">¿A quién seguir?</h2>
        {recomendations.map((user, index) => (
          <Link
            key={index}
            className="flex items-center p-2 hover:bg-gray-500 rounded-lg cursor-pointer"
            to={`/profile/${user.id}`}
          >
            <img
              src={`/api/v1/users/${user.id}/avatar`}
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-grow justify-between items-center ml-3 truncate">
              <p className="text-md font-bold">{user.username}</p>
              <button
                className="rounded-full bg-gray-300 hover:bg-gray-400 text-gray-900 px-3 py-1"
                onClick={async (event) => {
                  event.preventDefault();
                  await createFollowing(user.id);
                  await fetchRecomendations();
                  onUpdate();
                }}
              >
                Seguir
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

FollowSuggestions.propTypes = {
  onUpdate: PropTypes.func
};

export default FollowSuggestions;
