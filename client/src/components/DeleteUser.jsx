import axios from '@/services/api';
import { ToastTopEnd } from '@/utils/toast';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';

/**
 * Componente para eliminar el perfil de un usuario.
 * 
 * @returns {JSX.Element} Componente para eliminar usuario.
 */
function DeleteUser() {
  const { user, logout } = useAuth();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estas seguro que deseas borrar tu usuario?',
      text: 'No podrás recuperarlo después',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`
    });

    if (result.isDenied) {
      return;
    }

    try {
      const response = await axios.delete(`/users/${user.id}`);

      ToastTopEnd.fire({
        icon: 'success',
        title: response.data.message
      });

      logout();
      window.location.href = '/';
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

  return (
    <button
      className="w-full text-gray-300 bg-red-800 hover:bg-red-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      onClick={() => handleDelete()}
    >
      Eliminar cuenta
    </button>
  );
}

export default DeleteUser;
