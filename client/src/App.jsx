import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CommentsPage from './pages/CommentsPage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();
  // Aplica el estilo 'overflow-hidden' solo cuando la ruta es '/login'
  // const location = useLocation();

  // useEffect(() => {
  //   // Aplica el estilo 'overflow-hidden' al body solo cuando la ruta es '/login'
  //   if (location.pathname !== '/') {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto'; // Restablece el scroll en otras rutas
  //   }
  // }, [location]);

  const isEmpty = (item) => {
    return Object.keys(item).length === 0;
  };

  if (user === null) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isEmpty(user) && <Route path="/" element={<LandingPage />} />}
        <Route path="/login" element={<LoginSignup />} />
        <Route element={<MainLayout />}>
          <Route path="/chat" element={<Chat />} />
          {!isEmpty(user) && <Route path="/" element={<Home />} />}
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/survey/:pollId" element={<CommentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
