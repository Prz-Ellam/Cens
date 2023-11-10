import { useState } from 'react';
import MoonAnimation from '@/components/MoonAnimation';
import axios from '@/services/api';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ToastTopEnd } from '../utils/toast';
import getErrors from '@/utils/error-format';
import ErrorList from '../components/ErrorList';

function LoginSignup() {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [loginFormErrors, setLoginFormErrors] = useState({});

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [registerFormErrors, setRegisterFormErrors] = useState({});

  const loginValidator = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'El campo email debe tener al menos 1 caracter.' })
      .max(255, {
        message: 'El campo email no debe tener más de 255 caracteres.'
      }),
    password: z
      .string()
      .trim()
      .min(1, { message: 'El campo password debe tener al menos 1 caracter.' })
      .max(255, {
        message: 'El campo password no debe tener más de 255 caracteres.'
      })
  });

  const registerValidator = z
    .object({
      email: z
        .string({
          invalid_type_error:
            'El correo electrónico debe ser una cadena de texto'
        })
        .email('El correo electrónico no tiene el formato requerido'),
      username: z
        .string({
          invalid_type_error:
            'El nombre de usuario debe ser una cadena de texto'
        })
        .trim()
        // .regex(/^[a-zA-Z0-9_]{2,16}$/, 'El nombre de usuario no es válido')
        .min(2, 'Es requerido al menos 2 caracteres')
        .max(16, 'Maximo de 16 caracteres'),
      password: z
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
      confirmPassword: z
        .string({
          invalid_type_error:
            'La confirmación de contraseña debe ser una cadena de texto'
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Maximo de 255 caracteres')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas no coinciden'
    });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    const updatedLoginFormData = {
      ...loginFormData,
      [name]: value
    };
    setLoginFormData(updatedLoginFormData);

    const result = loginValidator.safeParse(updatedLoginFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setLoginFormErrors({
        ...loginFormErrors,
        [name]: errors[name]
      });
      return;
    }

    const updatedFormErrors = loginFormErrors;
    delete updatedFormErrors[name];
    setLoginFormErrors(updatedFormErrors);
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    const updatedRegisterFormData = {
      ...registerFormData,
      [name]: value
    };
    setRegisterFormData(updatedRegisterFormData);

    const result = registerValidator.safeParse(updatedRegisterFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setRegisterFormErrors({
        ...registerFormErrors,
        [name]: errors[name]
      });
      return;
    }

    const updatedFormErrors = registerFormErrors;
    delete updatedFormErrors[name];
    setRegisterFormErrors(updatedFormErrors);
  };

  async function handleRegister(event) {
    event.preventDefault();

    const result = registerValidator.safeParse(registerFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setRegisterFormErrors(errors);

      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });

      return;
    }

    try {
      const response = await axios.post('/users', registerFormData);

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

  async function handleLogin(event) {
    event.preventDefault();

    const result = loginValidator.safeParse(loginFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setLoginFormErrors(errors);

      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });

      return;
    }

    try {
      const response = await axios.post('/auth', loginFormData);

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
    <div className="row mybody-loginsignup">
      <MoonAnimation />
      <div className="main-container">
        <div className="login-register">
          <Link to="/" className="btnBack link-style">
            X
          </Link>
          <input type="checkbox" id="chk" aria-hidden="true"></input>
          <div className="login px-10">
            <form onSubmit={handleLogin} noValidate>
              <label
                htmlFor="chk"
                aria-hidden="true"
                className="login-label mb-10"
              >
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
                  defaultValue={loginFormData.email}
                  onChange={handleLoginChange}
                />
                {loginFormErrors.email && (
                  <div className="bg-[#000000bb]">
                    <ErrorList errors={loginFormErrors.email} />
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
                  defaultValue={loginFormData.password}
                  onChange={handleLoginChange}
                />
                {loginFormErrors.password && (
                  <div className="bg-[#000000bb]">
                    <ErrorList errors={loginFormErrors.password} />
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
          </div>

          <div className="signup px-10">
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
                  onChange={handleRegisterChange}
                />
                {registerFormErrors.username && (
                  <ErrorList errors={registerFormErrors.username} />
                )}
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
                  onChange={handleRegisterChange}
                />
                {registerFormErrors.email && (
                  <ErrorList errors={registerFormErrors.email} />
                )}
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
                  onChange={handleRegisterChange}
                />
                {registerFormErrors.password && (
                  <ErrorList errors={registerFormErrors.password} />
                )}
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
                  onChange={handleRegisterChange}
                />
                {registerFormErrors.confirmPassword && (
                  <ErrorList errors={registerFormErrors.confirmPassword} />
                )}
              </div>
              <button
                type="submit"
                className="mb-4 text-[1em] w-full text-gray-100 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg  px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
