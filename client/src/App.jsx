import { useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";

function App() {
  // Aplica el estilo 'overflow-hidden' solo cuando la ruta es '/login'
  const location = useLocation();

  useEffect(() => {
    // Aplica el estilo 'overflow-hidden' al body solo cuando la ruta es '/login'
    if (location.pathname === "/login") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Restablece el scroll en otras rutas
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
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginSignup />} />
    </Routes>
  );
}

export default App;
