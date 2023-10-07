import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CommentsPage from './pages/CommentsPage';
import { useAuth } from './context/AuthContext';
import Logout from './pages/Logout';

export default function App() {
  const { user } = useAuth();

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
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
