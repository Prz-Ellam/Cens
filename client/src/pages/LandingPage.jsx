import { useEffect, useRef } from 'react';
import '@/assets/css/styleLanding.css';
import { Link } from 'react-router-dom';

import CensLogo from '@/assets/img/Cens_Logo.png';
import Stars from '@/assets/img/stars.png';
import Moon from '@/assets/img/moon.png';
import Sea1 from '@/assets/img/sea1.png';
import Sea2 from '@/assets/img/sea2.png';

/**
 * Landing page.
 *
 * @returns {JSX.Element} Componente de la landing page.
 */
function LandingPage() {
  const stars = useRef();
  const moon = useRef();
  const sea = useRef();
  const sea2 = useRef();
  const text = useRef();
  const btn = useRef();
  const header = useRef();
  useEffect(() => {
    // Nueva línea para obtener la altura de la página
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', function () {
      const value = window.scrollY;

      // Calcula la opacidad basada en el desplazamiento
      const opacity = 1 - value / pageHeight;

      // Establece la opacidad de la imagen "sea" (sin reflejo)
      sea.current.style.opacity = opacity;

      // Resto de tu código de movimiento
      stars.current.style.left = value * 0.25 + 'px';
      moon.current.style.top = value * 1.0 + 'px';
      sea2.current.style.top = value * 0 + 'px';
      text.current.style.marginRight = value * 8 + 'px';
      btn.current.style.marginTop = value * 1.0 + 'px';
      header.current.style.top = value * 0.5 + 'px';
    });
  }, []);

  return (
    <div className="mybody-landingPage h-screen">
      <header
        className="landing-header absolute w-full flex items-center top-0 left-0 justify-between z-[1000]"
        ref={header}
      >
        <img src={CensLogo} alt="Cens" width="250" height="150" />
      </header>
      <section className="landing-section p-[100px] relative w-full h-screen flex justify-center items-center overflow-hidden">
        <img src={Stars} ref={stars} alt="Estrellas" />
        <img src={Moon} ref={moon} alt="Luna" className="mix-blend-screen" />
        <img src={Sea1} ref={sea} alt="Mar" className="z-[10]" />
        <img src={Sea2} ref={sea2} alt="Mar 2" className="z-[9]" />
        <h2
          ref={text}
          className="absolute text-gray-300 font-bold whitespace-nowrap text-[3.5vw] z-[9]"
        >
          Bienvenido a Cens
        </h2>
        <Link
          to="/login"
          ref={btn}
          id="btn"
          className="bg-gray-300 hover:bg-gray-400 text-[#2b1055] py-2 px-8 rounded-3xl transition duration-150 ease-out hover:ease-in"
        >
          Iniciar sesión o Registrate
        </Link>
      </section>
      <div className="relative bg-[#1c0522] p-[100px]">
        <h2 className="text-gray-300 text-5xl py-3 text-center font-bold">
          Explora Opiniones
        </h2>
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
