import { useState } from 'react';
import MoonAnimation from '../components/MoonAnimation.jsx';
import axios from 'axios';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUserData } from '../utils/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

function LoginSignup() {
  const [email, setEmail] = useState(''); //para login
  const [password, setPassword] = useState(''); //para login
  const [errors, setErrors] = useState({});

  const { setUser } = useAuth();
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

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

  async function handleRegister(event) {
    event.preventDefault();

    const register = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: registerConfirmPassword
    }

    const config = {
      method: 'POST',
      url: '/users', // URL de la API
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(register) // En lugar de { loginInfo }
    };

    try {
      const response = await axios(config);
      // Manejar la respuesta exitosa aquí
      // console.log(response.data.message);

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
      // Manejar errores aquí
      // console.error(error.response.data.message);
      await Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        confirmButtonText: 'Aceptar'
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

    const loginData = { email, password };
    const validationResult = loginValidator.safeParse(loginData);

    if (!validationResult.success) {
      const validationErrors = {};

      validationResult.error.issues.forEach((issue) => {
        validationErrors[issue.path.join('.')] = issue.message;
      });

      setErrors(validationErrors);
      // console.log("Aquí hupo algo")
      // console.error(validationResult.error);
      return;
    }

    // Restablece los errores si la validación es exitosa
    setErrors({});

    // Configuración de axios para la solicitud POST
    const config = {
      method: 'POST',
      url: '/auth', // URL de la API
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(loginData) // En lugar de { loginInfo }
    };

    try {
      const response = await axios(config);
      // Manejar la respuesta exitosa aquí
      // console.log(response.data.message);

      await Swal.fire({
        icon: 'success',
        title: response.data.message,
        confirmButtonText: 'Continuar'
      });

      setToken(response.data.token);
      setUserData(response.data.user);
      setUser(response.data);
      navigate('/home');
      // }
    } catch (error) {
      // Manejar errores aquí
      // console.error(error.response.data.message);

      await Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        confirmButtonText: 'Aceptar'
      });
    }

    //CON METODO FETCH

    // const config =
    // {
    //     method: "POST",
    //     headers:{"Content-Type": "aplication/json"},
    //     body:JSON.stringify({loginInfo})
    // }

    // // console.log("email" + email);
    // // console.log("contrasena" + password);

    // const response = await fetch ("http://localhost:5173/login", config);
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
            <form onSubmit={login}>
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
                  className="login-input"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
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
                  className="login-input"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
              </button>{' '}
            </form>
          </div>
          <div className="signup">
            <form onSubmit={handleRegister}>
              <label htmlFor="chk" aria-hidden="true" className="login-label">
                Regístrate
              </label>
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                placeholder="Nombre de usuario"
                className="login-input"
                onChange={(event) => {
                  setRegisterUsername(event.target.value);
                }}
              />
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                placeholder="Correo electrónico"
                className="login-input"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Contraseña"
                className="login-input"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                className="login-input"
                onChange={(event) => {
                  setRegisterConfirmPassword(event.target.value);
                }}
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
