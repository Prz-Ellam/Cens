import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

/**
 * Hook personalizado de React para acceder al contexto de autenticación.
 * Este hook permite a los componentes acceder a datos y funciones relacionadas con la autenticación
 * proporcionados por AuthProvider.
 *
 * @throws {Error} Lanza un error si se utiliza fuera de un contexto de AuthProvider.
 * @returns {Object} Un objeto que contiene datos del usuario y funciones de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
