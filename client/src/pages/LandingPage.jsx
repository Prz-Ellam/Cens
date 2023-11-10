import { useEffect } from 'react';
import '../assets/css/styleLanding.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  useEffect(() => {
    const stars = document.getElementById('stars');
    const moon = document.getElementById('moon');
    const sea = document.getElementById('sea');
    const sea2 = document.getElementById('sea2');
    const text = document.getElementById('text');
    const btn = document.getElementById('btn');
    const header = document.querySelector('header');

    // Nueva línea para obtener la altura de la página
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', function () {
      const value = window.scrollY;

      // Calcula la opacidad basada en el desplazamiento
      const opacity = 1 - value / pageHeight;

      // Establece la opacidad de la imagen "sea" (sin reflejo)
      sea.style.opacity = opacity;

      // Resto de tu código de movimiento
      stars.style.left = value * 0.25 + 'px';
      moon.style.top = value * 1.0 + 'px';
      sea2.style.top = value * 0 + 'px';
      text.style.marginRight = value * 8 + 'px';
      btn.style.marginTop = value * 1.0 + 'px';
      header.style.top = value * 0.5 + 'px';
    });
  }, []);

  return (
    <div className="mybody-landingPage">
      <header className="landing-header absolute w-full flex items-center">
        <img
          src="../src/assets/img/Cens_Logo2.png"
          alt="Logo de tu página"
          width="250"
          height="150"
        />
      </header>
      <section className="landing-section">
        <img src="../src/assets/img/stars1.png" id="stars" alt="Estrellas" />
        <img src="../src/assets/img/moon.png" id="moon" alt="Luna" />
        <img src="../src/assets/img/sea1.png" id="sea" alt="Mar" />
        <img src="../src/assets/img/sea2.png" id="sea2" alt="Mar 2" />
        <h2 id="text" className="absolute text-gray-300 font-bold whitespace-nowrap text-[3.5vw] z-[9]">Bienvenido a Cens</h2>
        <Link to="/login" id="btn" className="bg-gray-300 text-[#2b1055] py-2 px-8">
          Iniciar sesión o Registrate
        </Link>
      </section>
      <div className="relative bg-[#1c0522] p-[100px]">
        <h2 className="text-gray-300 text-5xl py-3 text-center font-bold">Explora Opiniones</h2>
        <p className="text-gray-300 text-2xl py-4">
          Cens es una propuesta de plataforma en línea que une a personas de
          todas partes del mundo para crear, responder y compartir encuestas de
          una amplia variedad de temas. Nuestra plataforma brinda a las personas
          la oportunidad de expresar sus opiniones y perspectivas. Cens es una
          propuesta de plataforma en línea que une a personas de todas partes
          del mundo para crear, responder y compartir encuestas de una amplia
          variedad de temas. Nuestra plataforma brinda a las personas la
          oportunidad de expresar sus opiniones y perspectivas.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
