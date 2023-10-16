import { useState } from 'react';
import axios from '@/services/api';
import { useAuth } from '../hooks/useAuth';
import z from 'zod';
import getErrors from '@/utils/error-format';
import ErrorList from './ErrorList';
import Swal from 'sweetalert2';

/**
 * El componente PasswordEdition es una interfaz de usuario para permitir a los usuarios cambiar su contraseña.
 * @returns 
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

  const formValidator = z
    .object({
      currentPassword: z
        .string({
          invalid_type_error: 'La contraseña debe ser una cadena de texto'
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Maximo de 255 caracteres'),
      newPassword: z
        .string({
          invalid_type_error: 'La contraseña debe ser una cadena de texto'
        })
        .trim()
        .min(8, 'Es requerido un mínimo de 8 caracteres')
        .max(255, 'Maximo de 255 caracteres')
        .regex(/[A-Z]/, 'Es requerido al menos una mayuscula')
        .regex(/[a-z]/, 'Es requerido al menos una minuscula')
        .regex(/[0-9]/, 'Es requerido al menos un número')
        .regex(
          /([°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@])/,
          'Es requerido al menos un caracter especial'
        ),
      confirmNewPassword: z
        .string({
          invalid_type_error:
            'La confirmación de contraseña debe ser una cadena de texto'
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Maximo de 255 caracteres')
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['confirmNewPassword']
    });

  /**
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

  /**
   *
   * @param {Event} event
   */
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    // Validaciones de frontend
    const result = formValidator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.put(`/users/${user.id}/password`, formData);

      await Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });
    } catch (error) {
      await Swal.fire({
        title: 'Ocurrio un error',
        icon: 'error',
        text: error.response.data.message
      });
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} noValidate>
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-300">
        Cambiar Contraseña
      </h2>
      {Object.entries(formData).map(([key, value]) => (
        <div className="mb-4" key={key}>
          <label
            className="block text-gray-300 text-md font-medium mb-2 cursor-pointer"
            htmlFor="currentPassword"
          >
            {labelMappings[key]}
          </label>
          <input
            className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id={key}
            name={key}
            defaultValue={value}
            onChange={handleChange}
          />
          {formErrors[key] && <ErrorList errors={formErrors[key]} />}
        </div>
      ))}
      <button
        type="submit"
        className="w-full text-gray-300 bg-[#573b8a] hover:bg-[#402c66] focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Cambiar Contraseña
      </button>
    </form>
  );
}

export default PasswordEdition;
