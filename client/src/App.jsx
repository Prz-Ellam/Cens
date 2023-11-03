import LandingPage from './pages/LandingPage';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CommentsPage from './pages/CommentsPage';
import { useAuth } from './hooks/useAuth';
import Logout from './pages/Logout';
import isEmpty from './utils/is-empty';
import ProfileEdit from './components/ProfileEdit';
import Search from './pages/Search';
import Analytics from './pages/Analytics';

function App() {
  const { user } = useAuth();

  if (user === null) {
    return <></>;
  }

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        {isEmpty(user) && <Route exact path="/" element={<LandingPage />} />}

        <Route path="/login" element={<LoginSignup />} />

        <Route element={<MainLayout />}>
          <Route path="/chat" element={<Chat />} />
          {!isEmpty(user) && <Route path="/" element={<Home />} />}
          
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/survey/:pollId" element={<CommentsPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/analytics/:pollId" element={<Analytics />} />
        </Route>

        <Route path="/logout" element={<Logout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
