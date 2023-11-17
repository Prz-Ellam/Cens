import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/services/api';
import { useState } from 'react';
import ErrorList from '@/components/ErrorList';
import getErrors from '@/utils/error-format';
import { allCountries } from '@/utils/countries';
import { ToastTopEnd } from '@/utils/toast';
import validator from '@/validators/profile-info';

/**
 * Componente de la edición de información del perfil.
 *
 * @returns {JSX.Element} Componente de la edicion de perfil.
 */
function ProfileEditInfo() {
  const { user, update } = useAuth();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    birthDate: user.birthDate,
    gender: user.gender,
    country: user.country?.name
  });
  const [formErrors, setFormErrors] = useState({});

  /**
   * Evento si se actualiza un input
   *
   * @param {Event} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    const result = validator.safeParse(updatedFormData);
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

  /**
   * Evento al mandar el formulario
   *
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = validator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);

      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });

      return;
    }

    try {
      const response = await axios.put(`/users/${user.id}`, formData);

      Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });

      update(response.data.user);
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
          className="w-full bg-accent text-gray-300 p-2 rounded-md focus:outline-none"
          defaultValue={user.birthDate}
          onChange={handleChange}
        />
        {formErrors.birthDate && <ErrorList errors={formErrors.birthDate} />}
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
          className="w-full bg-accent text-gray-300 p-2 rounded-md focus:outline-none cursor-pointer"
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
          className="w-full bg-accent text-gray-300 p-2 rounded-md focus:outline-none cursor-pointer"
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
        className="w-full text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Guardar Cambios
      </button>
    </form>
  );
}

export default ProfileEditInfo;
