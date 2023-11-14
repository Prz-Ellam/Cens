import PasswordEdition from '@/components/PasswordEdition';
import ProfileEditInfo from '@/components/ProfileEditInfo';
import ProfilePicture from '@/components/ProfilePicture';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from '@/services/api';
import { ToastTopEnd } from '@/utils/toast';
// import { useNavigate } from 'react-router-dom';

/**
 * Formulario para editar datos básicos del usuario.
 *
 * @returns {JSX.Element} Componente de página de edición.
 */
function ProfileEdit() {
  const { user, logout } = useAuth();
  // const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estas seguro que deseas borrar el comentario?',
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
      // navigate('/');
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
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-dark p-8 rounded-lg shadow-md my-3">
        <ProfilePicture />
        <hr className="my-6" />
        <ProfileEditInfo />
        <hr className="my-6" />
        <PasswordEdition />
        <hr className="my-6" />
        <button
          className="w-full text-gray-300 bg-red-800 hover:bg-red-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
          onClick={() => handleDelete()}
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
