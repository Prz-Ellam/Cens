import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CommentsPage from './pages/CommentsPage';
import { useAuth } from './hooks/useAuth';
import isEmpty from './utils/is-empty';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Analytics from './pages/Analytics';

function App() {
  const { user } = useAuth();

  if (user === null) {
    return <></>;
  }

  const isEmptyUser = isEmpty(user);

  return (
    <BrowserRouter>
      <Routes>
        {isEmptyUser && <Route path="/" element={<LandingPage />} />}

        <Route path="/login" element={<LoginSignup />} />

        <Route element={<MainLayout />}>
          {!isEmptyUser && <Route path="/" element={<Home />} />}
          {!isEmptyUser && <Route path="/chat" element={<Chat />} />}
          {!isEmptyUser && (
            <Route path="/profile/:userId" element={<Profile />} />
          )}
          {!isEmptyUser && (
            <Route path="/profileEdit" element={<ProfileEdit />} />
          )}
          {!isEmptyUser && (
            <Route path="/survey/:pollId" element={<CommentsPage />} />
          )}
          {!isEmptyUser && <Route path="/search" element={<Search />} />}
          {!isEmptyUser && (
            <Route path="/analytics/:pollId" element={<Analytics />} />
          )}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
