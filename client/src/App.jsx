import { useEffect } from 'react';
import './App.css';
// import LandingPage from './pages/LandingPage.jsx';
// import LoginSignup from './pages/LoginSignup.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  // Aplica el estilo 'overflow-hidden' solo cuando la ruta es '/login'
  const location = useLocation();

  useEffect(() => {
    // Aplica el estilo 'overflow-hidden' al body solo cuando la ruta es '/login'
    if (location.pathname === '/login') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Restablece el scroll en otras rutas
    }
  }, [location]);

  // return (
  //   <>
  //     <Routes>
  //       <Route path='/' element={<LandingPage />} />
  //       <Route path='/login' element={<LoginSignup />} />
  //       <Route path='/chat' element={<Chat />} />
  //     </Routes>
  //   </>
  // )
  return (
    <div className='h-screen flex flex-col bg-gradient-to-r from-primary to-secondary'>
      <Navbar className='flex-grow flex-shrink-0' />
      <div className='flex flex-col md:flex-row-reverse flex-grow flex-shrink overflow-hidden'>
        
          <Routes>
            <Route path='/chat' element={<Chat className='flex-grow flex-shrink md:overflow-auto overflow-hidden' />} />
          </Routes>
        
        <Sidebar className='flex flex-grow-0 flex-shrink' />
      </div>
    </div>
  )
}

export default App
