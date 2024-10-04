import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../assets/Contrlremovebg.png"
import Imagen1 from "../assets/Alex.jpg"
import Imagen2 from "../assets/Maximo.jpeg"
import Imagen3 from "../assets/Leo.jpg"
import Imagen4 from "../assets/Sofia.jpg"
import Imagen5 from "../assets/Pepe.jpg"
import '../styles/Nosotros.css';

const Contacto = () => {
  return (
    <div className='backnosotros'>
      <div className="neon-line mb-2"></div>
      <main>
        <h1 className="text-white text-center">Acerca de nosotros</h1>
        <div className="container mb-4">
          <div className="row justify-content-center">
            <div className="col-10 col-md-7 col-lg-6 d-flex justify-content-center">
              <img src={Logo} className="img-fluid" width="60%" alt="Logo del equipo" />
            </div>
            <div className="col-10 col-md-7 col-lg-6 d-flex align-items-center">
              <p className="text-white lead">
                Somos un equipo dedicado a desarrollar soluciones de control de stock eficientes y fáciles de usar. Nuestro objetivo es proporcionar herramientas que ayuden a las empresas a gestionar sus inventarios de manera efectiva, reduciendo costos y mejorando la eficiencia operativa. Nos mantenemos actualizados con las últimas tecnologías para ofrecer siempre lo mejor a nuestros usuarios.
              </p>
            </div>
          </div>
        </div>

        <div className="neon-line mb-2"></div>
        <h2 className="text-center text-white mb-4">Nuestro Equipo</h2>

        <div className="container">
          <div className="equipo row justify-content-center">
            <div className="miembro col-10 col-md-4 col-lg-3 my-1 mx-3">
              <img src={Imagen1} className="img-fluid neon-border mb-3" width="100%" alt="Avatar de Alex" />
              <h3 className="text-white">Alex</h3>
              <p className="text-white">Desarrollador de la interfaz de usuario y experiencia de usuario.</p>
            </div>

            <div className="miembro col-10 col-md-4 col-lg-3 my-1">
              <img src={Imagen2} className="img-fluid neon-border mb-3" width="100%" alt="Avatar de Maximo" />
              <h3 className="text-white">Maximo</h3>
              <p className="text-white">Desarrolladora de la lógica de negocio y gestión de datos.</p>
            </div>

            <div className="miembro col-10 col-md-4 col-lg-3 my-1 mx-3">
              <img src={Imagen3} className="img-fluid neon-border mb-3" width="100%" alt="Avatar de Leo" />
              <h3 className="text-white">Leo</h3>
              <p className="text-white">Especialista en integración de sistemas y APIs.</p>
            </div>

            <div className="row justify-content-center">
              <div className="miembro col-10 col-md-4 col-lg-3 my-2 mx-2">
                <img src={Imagen4} className="img-fluid neon-border mb-3" width="100%" alt="Avatar de Sofia" />
                <h3 className="text-white">Sofia</h3>
                <p className="text-white">Responsable del diseño y experiencia visual.</p>
              </div>

              <div className="miembro col-10 col-md-4 col-lg-3 my-2 mx-2">
                <img src={Imagen5} className="img-fluid neon-border mb-3" width="100%" alt="Avatar de Pepe" />
                <h3 className="text-white">Pepe</h3>
                <p className="text-white">Encargado de pruebas y aseguramiento de calidad.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contacto;
