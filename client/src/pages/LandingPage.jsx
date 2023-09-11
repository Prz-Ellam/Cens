import { useState, useEffect } from 'react';
import '../assets/css/styleLanding.css'

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
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    
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
      <>
        <div>
            <header>
                <a href="#" className="logo">
                <img src="../src/assets/img/Cens_Logo2.png" alt="Logo de tu página" width="250" height="150" />
                </a>
                <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Acerca de</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#" className="active">Iniciar Sesión</a></li>
                </ul>
            </header>
            <section>
                <img src="../src/assets/img/stars1.png" id="stars" alt="Estrellas" />
                <img src="../src/assets/img/moon.png" id="moon" alt="Luna" />
                <img src="../src/assets/img/sea1.png" id="sea" alt="Mar" />
                <img src="../src/assets/img/sea2.png" id="sea2" alt="Mar 2" />
                <h2 id="text">Bienvenido a Cens</h2>
                <a href="#" id="btn">Explorar</a>
            </section>
            <div className="sec" id="sec">
                <h1>Explora Opiniones</h1>
                <h2>
                Cens es una propuesta de plataforma en línea que une a personas de todas
                partes del mundo para crear, responder y compartir encuestas de una
                amplia variedad de temas. Nuestra plataforma brinda a las personas la
                oportunidad de expresar sus opiniones y perspectivas.

                Cens es una propuesta de plataforma en línea que une a personas de todas
                partes del mundo para crear, responder y compartir encuestas de una
                amplia variedad de temas. Nuestra plataforma brinda a las personas la
                oportunidad de expresar sus opiniones y perspectivas.
                </h2>
            </div>
        </div>
      </>
    )
}

export default LandingPage