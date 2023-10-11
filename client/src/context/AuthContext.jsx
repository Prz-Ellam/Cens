import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getUserData,
  removeToken,
  removeUserData,
  setToken,
  setUserData
} from '@/utils/auth';

export const AuthContext = createContext();

/**
 * Proveedor de autenticación para la aplicación.
 * Este componente envuelve la aplicación y proporciona el contexto de autenticación
 * que incluye datos de usuario y funciones de autenticación.
 *
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes secundarios para envolver con el contexto de autenticación.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  /**
   * Función de autenticación que establece el token y los datos del usuario.
   *
   * @param {object} user - Datos del usuario autenticado.
   * @param {string} token - Token de autenticación.
   */
  const auth = async (user, token) => {
    setToken(token);
    setUserData(user);
    setUser(user);
  };

  const update = async (user) => {
    setUserData(user);
    setUser(user);
  }

  /**
   * Función para cerrar la sesión del usuario, eliminando el token y los datos del usuario.
   */
  const logout = async () => {
    removeToken();
    removeUserData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, auth, update, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
