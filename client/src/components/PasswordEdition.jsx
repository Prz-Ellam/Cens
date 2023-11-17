import { useState } from 'react';
import axios from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import validator from '@/validators/password-edition';
import getErrors from '@/utils/error-format';
import ErrorList from './ErrorList';
import Swal from 'sweetalert2';
import { ToastTopEnd } from '@/utils/toast';

/**
 * Componente de usuario para permitir a los usuarios cambiar su contraseña.
 *
 * @returns {JSX.Element} Componente del formulario para editar contraseña.
 */
function PasswordEdition() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const labelMappings = Object.freeze({
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmNewPassword: 'Confirmar nueva contraseña'
  });

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

    // Pasamos updatedFormData en lugar de formData porque tiene un delay con los caracteres
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
      const response = await axios.put(`/users/${user.id}/password`, formData);

      Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-300">
        Cambiar Contraseña
      </h2>
      {Object.entries(formData).map(([key, value], index) => (
        <div className="mb-4" key={index}>
          <label
            className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
            htmlFor={key}
          >
            {labelMappings[key]}
          </label>
          <input
            className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
          />
          {formErrors[key] && <ErrorList errors={formErrors[key]} />}
        </div>
      ))}
      <button
        type="submit"
        className="w-full text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Cambiar Contraseña
      </button>
    </form>
  );
}

export default PasswordEdition;
