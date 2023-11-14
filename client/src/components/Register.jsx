import { useState } from 'react';
import axios from '@/services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ToastTopEnd } from '@/utils/toast';
import getErrors from '@/utils/error-format';
import ErrorList from '@/components/ErrorList';
import registerValidator from '@/validators/register';

/**
 * Componente de formulario de registro.
 *
 * @returns {JSX.Element} Componente de registro.
 */
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    const result = registerValidator.safeParse(updatedFormData);
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

  async function handleRegister(event) {
    event.preventDefault();

    const result = registerValidator.safeParse(formData);
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
      const response = await axios.post('/users', formData);

      await Swal.fire({
        icon: 'success',
        title: response.data.message,
        confirmButtonText: 'Continuar'
      });

      navigate('/');
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
    <form onSubmit={handleRegister} noValidate>
      <label
        htmlFor="chk"
        aria-hidden="true"
        className="signup-label login-label"
      >
        Regístrate
      </label>

      <div className="mb-4">
        <label
          className="block text-purple-800 text-md font-medium mb-1 cursor-pointer"
          htmlFor="register-username"
        >
          Nombre de usuario
        </label>
        <input
          type="text"
          id="register-username"
          name="username"
          placeholder="Nombre de usuario"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          onChange={handleChange}
        />
        {formErrors.username && <ErrorList errors={formErrors.username} />}
      </div>

      <div className="mb-4">
        <label
          className="block text-purple-800 text-md font-medium mb-1 cursor-pointer"
          htmlFor="register-email"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="register-email"
          name="email"
          placeholder="Correo electrónico"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          onChange={handleChange}
        />
        {formErrors.email && <ErrorList errors={formErrors.email} />}
      </div>
      <div className="mb-4">
        <label
          className="block text-purple-800 text-md font-medium mb-1 cursor-pointer"
          htmlFor="register-password"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="register-password"
          name="password"
          placeholder="Contraseña"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          onChange={handleChange}
        />
        {formErrors.password && <ErrorList errors={formErrors.password} />}
      </div>
      <div className="mb-4">
        <label
          className="block text-purple-800 text-md font-medium mb-1 cursor-pointer"
          htmlFor="register-confirm-password"
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="register-confirm-password"
          name="confirmPassword"
          placeholder="Confirma tu contraseña"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          onChange={handleChange}
        />
        {formErrors.confirmPassword && (
          <ErrorList errors={formErrors.confirmPassword} />
        )}
      </div>
      <button
        type="submit"
        className="mb-4 text-[1em] w-full text-gray-100 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg  px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Registrarse
      </button>
    </form>
  );
}

export default Register;
