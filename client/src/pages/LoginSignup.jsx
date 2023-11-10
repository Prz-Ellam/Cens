import { useState } from 'react';
import MoonAnimation from '@/components/MoonAnimation';
import axios from '@/services/api';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function LoginSignup() {
  const [errors, setErrors] = useState({});

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  /**
   * 
   * @param {Event} event 
   * @returns 
   */
  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    const updatedLoginFormData = {
      ...loginFormData,
      [name]: value
    };
    setLoginFormData(updatedLoginFormData);
  }

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    const updatedRegisterFormData = {
      ...registerFormData,
      [name]: value
    };
    setRegisterFormData(updatedRegisterFormData);
  }

  const { auth } = useAuth();

  const navigate = useNavigate();

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

  /**
   * 
   * @param {Event} event 
   */
  async function handleRegister(event) {
    event.preventDefault();

    const config = {
      method: 'POST',
      url: '/users', // URL de la API
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(registerFormData) // En lugar de { loginInfo }
    };

    try {
      const response = await axios(config);

      await Swal.fire({
        icon: 'success',
        title: response.data.message,
        confirmButtonText: 'Continuar'
      });

      // TODO: Go to Homepage later
      // if (result.isConfirmed) {
      navigate('/');
      // }
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  }

  /**
   * 
   * @param {Event} event 
   * @returns 
   */
  async function login(event) {
    event.preventDefault();

    const validationResult = loginValidator.safeParse(loginFormData);

    if (!validationResult.success) {
      const validationErrors = {};

      validationResult.error.issues.forEach((issue) => {
        validationErrors[issue.path.join('.')] = issue.message;
      });

      setErrors(validationErrors);
      return;
    }

    // Restablece los errores si la validación es exitosa
    setErrors({});

    // Configuración de axios para la solicitud POST
    const config = {
      method: 'POST',
      url: '/auth', // URL de la API
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(loginFormData) // En lugar de { loginInfo }
    };

    try {
      const response = await axios(config);

      await Swal.fire({
        icon: 'success',
        title: response.data.message,
        confirmButtonText: 'Continuar'
      });

      auth(response.data.user, response.data.token)
      navigate('/');
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
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
          <div className="login">
            <form onSubmit={login} noValidate>
              <label
                htmlFor="chk"
                aria-hidden="true"
                className="login-label inicio"
              >
                Inicia sesión
              </label>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Corre electrónico"
                  className="login-input outline-none"
                  defaultValue={loginFormData.email}
                  onChange={handleLoginChange}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="login-input outline-none"
                  defaultValue={loginFormData.password}
                  onChange={handleLoginChange}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              <button
                type="submit"
                className="loginBtn"
              >
                Acceder
              </button>
            </form>
          </div>
          <div className="signup">
            <form onSubmit={handleRegister} noValidate>
              <label htmlFor="chk" aria-hidden="true" className="login-label">
                Regístrate
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nombre de usuario"
                className="login-input outline-none"
                onChange={handleRegisterChange}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                className="login-input outline-none"
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="login-input outline-none"
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                className="login-input outline-none"
                onChange={handleRegisterChange}
              />
              <button type="submit" className="registerBtn">
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
