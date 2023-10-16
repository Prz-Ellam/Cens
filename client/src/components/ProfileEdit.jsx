import { useState } from 'react';

import { allCountries } from '../utils/countries';
import { useAuth } from '../hooks/useAuth';

import axios from '@/services/api';
import PasswordEdition from './PasswordEdition';
import ErrorList from './ErrorList';
import getErrors from '../utils/error-format';
import z from 'zod';
import Swal from 'sweetalert2';

function ProfileEdit() {
  const { user, update } = useAuth();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    birthDate: user.birthDate,
    gender: user.gender,
    country: user.country?.name
  });

  const [formErrors, setFormErrors] = useState({});

  const formValidator = z.object({
    email: z
      .string({
        invalid_type_error: 'El correo electrónico debe ser una cadena de texto'
      })
      .email('Es requerido que sea un email')
      .optional(),
    username: z
      .string({
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter')
      .max(255, 'Maximo de 255 caracteres')
      .optional(),
    birthDate: z.coerce.date().optional().or(z.literal('')),
    country: z.enum(Object.keys(allCountries)).optional().or(z.literal('')),
    gender: z
      .enum(['masculino', 'femenino', 'otro'])
      .optional()
      .or(z.literal(''))
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    const result = formValidator.safeParse(updatedFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors({
        ...formErrors,
        [name]: errors[name]
      });
      return;
    }

    const updatedFormErrors = formErrors;
    delete updatedFormErrors[name];
    setFormErrors(updatedFormErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = formValidator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);
      console.error(errors);
      return;
    }

    try {
      console.log(formData);

      const response = await axios.put(`/users/${user.id}`, formData);

      await Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });

      update(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envía los datos del formulario para cambiar la contraseña
      const avatarForm = new FormData();
      avatarForm.append('avatar', imageFile);

      const response = await axios.put(`/users/${user.id}/avatar`, avatarForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      await Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(`/api/v1/users/${user.id}/avatar`);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      setImageSrc('/default-profile-picture.png');
      return;
    }
    const file = files[0];

    const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!allowedExtensions.includes(file.type)) {
      setImageSrc('/default-profile-picture.png');
      return;
    }

    // Solo 8MB
    if (file.size >= 8 * 1024 * 1024) {
      setImageSrc('/default-profile-picture.png');
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-dark p-8 rounded-lg shadow-md my-3">
        <form action="" noValidate onSubmit={handleAvatarSubmit}>
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
            ></input>
          </div>
          <br />
          <button
            type="submit"
            className="w-full text-gray-300 bg-[#573b8a] hover:bg-[#402c66] focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
          >
            Guardar Cambios
          </button>
        </form>

        <hr className="my-6" />

        <form onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl text-center font-semibold mb-4 text-gray-300">
            Editar Perfil
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
              htmlFor="username"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={user.username}
              onChange={handleChange}
            />
            {formErrors.username && <ErrorList errors={formErrors.username} />}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={user.email}
              onChange={handleChange}
            />
            {formErrors.email && <ErrorList errors={formErrors.email} />}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
              htmlFor="birthDate"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="w-full bg-accent text-gray-400 p-2 rounded-md focus:outline-none"
              defaultValue={user.birthDate}
              onChange={handleChange}
            />
            {formErrors.birthDate && (
              <ErrorList errors={formErrors.birthDate} />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
              htmlFor="gender"
            >
              Género
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full bg-accent text-gray-400 p-2 rounded-md focus:outline-none"
              onChange={handleChange}
              defaultValue={user.gender}
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Hombre</option>
              <option value="femenino">Mujer</option>
              <option value="otro">Otro</option>
            </select>
            {formErrors.gender && <ErrorList errors={formErrors.gender} />}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
              htmlFor="country"
            >
              País
            </label>
            <select
              name="country"
              id="country"
              className="w-full bg-accent text-gray-400 p-2 rounded-md focus:outline-none"
              onChange={handleChange}
              defaultValue={formData.country}
            >
              <option value="">Seleccionar</option>
              {Object.keys(allCountries).map((key) => (
                <option value={key} key={key}>
                  {allCountries[key]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full text-gray-300 bg-[#573b8a] hover:bg-[#402c66] focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
          >
            Guardar Cambios
          </button>
        </form>

        <hr className="my-6" />

        <PasswordEdition />
      </div>
    </div>
  );
}

export default ProfileEdit;
