import { useState } from 'react';

import { allCountries } from '../utils/countries';
import { useAuth } from '../hooks/useAuth';

import axios from '@/services/api';

export default function ProfileEdit() {
  const { user, update } = useAuth();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    birthDate: user.birthDate,
    gender: user.gender,
    country: user.country.name
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Envía los datos del formulario para editar el perfil

    console.log(formData);

    const response = await axios.put(`/users/${user.id}`, formData);

    console.log(response.data);

    update(response.data.user);
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handlePasswordChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value
    });
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    // Envía los datos del formulario para cambiar la contraseña
    const response = await axios.put(
      `/users/${user.id}/password`,
      passwordData
    );

    console.log(response.data);
  };

  
  const handleAvatarSubmit = async (event) => {
    event.preventDefault();
    // Envía los datos del formulario para cambiar la contraseña
    const avatarForm = new FormData();
    avatarForm.append("avatar", imageFile);


    const response = await axios.put(
      `/users/${user.id}/avatar`,
      avatarForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log(response.data);
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
      <div className="bg-accent p-8 rounded-lg shadow-md w-96">
        <form action="" noValidate onSubmit={handleAvatarSubmit}>
          <div className="flex justify-center relative">
            <label
              htmlFor="profile-picture"
              role="button"
              className="flex justify-center items-center absolute w-[8rem] h-[8rem] rounded-full profile-picture-label"
            ></label>
            <img
              src={imageSrc}
              alt=""
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
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
          >
            Guardar Cambios
          </button>
        </form>

        <form onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={user.username}
              onChange={handleChange}
            />
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={user.email}
              onChange={handleChange}
            />
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={user.birthDate}
              onChange={handleChange}
            />
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Género
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={handleChange}
              defaultValue={user.gender}
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Hombre</option>
              <option value="femenino">Mujer</option>
              <option value="otro">Otro</option>
            </select>

            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              País
            </label>
            <select
              name="country"
              id="country"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value
                })
              }
              defaultValue={user.country.name}
            >
              <option value="">Seleccionar</option>
              {Object.keys(allCountries).map((key) => (
                <option value={key} key={key}>
                  {allCountries[key]}
                </option>
              ))}
            </select>
          </div>
          {/* Resto de los campos del formulario */}
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
          >
            Guardar Cambios
          </button>
        </form>

        <hr className="my-6" />

        <form onSubmit={handlePasswordSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Cambiar Contraseña</h2>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="currentPassword"
            >
              Contraseña Actual
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />

            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="currentPassword"
            >
              Nueva contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={passwordData.newPassword}
              onChange={handlePasswordChange}
            />

            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="currentPassword"
            >
              Contraseña Actual
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="w-full border border-gray-300 bg-dark p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              defaultValue={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </div>
          {/* Resto de los campos del formulario de cambio de contraseña */}
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
