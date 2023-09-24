import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';
import { Route, Routes, useLocation } from 'react-router-dom';
import Chat from './pages/Chat';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Survey from './pages/Survey';

export default function App() {
  // Aplica el estilo 'overflow-hidden' solo cuando la ruta es '/login'
  const location = useLocation();

  useEffect(() => {
    // Aplica el estilo 'overflow-hidden' al body solo cuando la ruta es '/login'
    if (location.pathname !== '/') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Restablece el scroll en otras rutas
    }
  }, [location]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/survey" element={<Survey />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginSignup />} />
    </Routes>
  );
}
