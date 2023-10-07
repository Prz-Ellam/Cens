import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Logout() {
  const { logout } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    logout();
    navigation('/');
  }, []);

  return <></>;
}

export default Logout;
