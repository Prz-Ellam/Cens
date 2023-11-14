import { useState } from 'react';
import axios from '@/services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ToastTopEnd } from '@/utils/toast';
import getErrors from '@/utils/error-format';
import ErrorList from '@/components/ErrorList';
import loginValidator from '@/validators/login';

function Login() {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedLoginFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedLoginFormData);

    const result = loginValidator.safeParse(updatedLoginFormData);
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

  async function handleSubmit(event) {
    event.preventDefault();

    const result = loginValidator.safeParse(formData);
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
      const response = await axios.post('/auth', formData);

      await Swal.fire({
        icon: 'success',
        title: response.data.message,
        confirmButtonText: 'Continuar'
      });

      auth(response.data.user, response.data.token);
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
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="chk" aria-hidden="true" className="login-label mb-4">
        Inicia sesión
      </label>
      <div className="mb-4">
        <label
          className="block text-gray-100 text-md font-medium mb-1 cursor-pointer"
          htmlFor="login-email"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          id="login-email"
          placeholder="Corre electrónico"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          defaultValue={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && (
          <div className="bg-[#000000bb]">
            <ErrorList errors={formErrors.email} />
          </div>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-100 text-md font-medium mb-1 cursor-pointer"
          htmlFor="login-password"
        >
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="login-password"
          placeholder="Contraseña"
          className="rounded-md w-full py-2 px-3 bg-[#e0dede] outline-none"
          defaultValue={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <div className="bg-[#000000bb]">
            <ErrorList errors={formErrors.password} />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="mb-4 text-[1em] w-full text-gray-100 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg  px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Acceder
      </button>
    </form>
  );
}

export default Login;
