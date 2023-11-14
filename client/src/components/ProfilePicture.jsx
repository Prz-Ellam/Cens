import { useState } from 'react';
import { ToastTopEnd } from '@/utils/toast';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import Swal from 'sweetalert2';

/**
 * Componente para editar fotos de perfil
 * 
 * @returns {JSX.Element} Componente de la edicion de foto de perfil.
 */
function ProfilePicture() {
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envía los datos del formulario para cambiar la contraseña
      if (!imageFile) {
        ToastTopEnd.fire({
          title: 'La imagen ya se encuentra actualizada',
          icon: 'question'
        });
        return;
      }

      const avatarForm = new FormData();
      avatarForm.append('avatar', imageFile);

      const response = await axios.put(`/users/${user.id}/avatar`, avatarForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });
      setImageFile(null);
      // update();
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

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(`/api/v1/users/${user.id}/avatar`);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      ToastTopEnd.fire({
        title: 'Imagen no válida',
        icon: 'error'
      });
      setImageSrc(`/api/v1/users/${user.id}/avatar`);
      return;
    }
    const file = files[0];

    const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!allowedExtensions.includes(file.type)) {
      ToastTopEnd.fire({
        title: 'Extensión no válida',
        icon: 'error'
      });
      setImageSrc(`/api/v1/users/${user.id}/avatar`);
      return;
    }

    // Solo 8MB
    if (file.size >= 8 * 1024 * 1024) {
      ToastTopEnd.fire({
        title: 'La imagen es demasiado pesada (solo 8MB)',
        icon: 'error'
      });
      setImageSrc(`/api/v1/users/${user.id}/avatar`);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        setImageFile(file);
        setImageSrc(newImageSrc);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-300">
        Editar foto de perfil
      </h2>
      <div className="flex justify-center relative">
        <label
          htmlFor="profile-picture"
          role="button"
          className="flex justify-center items-center absolute w-[8rem] h-[8rem] rounded-full profile-picture-label"
        ></label>
        <img
          src={imageSrc}
          alt="Avatar"
          className="w-[8rem] h-[8rem] rounded-full"
        />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          name="image"
          id="profile-picture"
          autoComplete="off"
          onChange={handleImageChange}
        />
      </div>
      <br />
      <button
        type="submit"
        className="w-full text-gray-300 bg-[#573b8a] hover:bg-[#402c66] focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Guardar Cambios
      </button>
    </form>
  );
}

export default ProfilePicture;
