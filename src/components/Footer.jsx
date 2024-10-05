import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../assets/Contrlremovebg.png';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Footer.css'; 

function Footer() {

  const navigate = useNavigate()

  return (
    <div>
      <div className='neon-line'></div>
      <footer>
        <Container>
          <Row className="text-center text-md-start">
            <Col xs={12} md={3}>
              <img className="logo img-fluid neon-border mb-5" src={Logo} width="80%" alt="Logo del sitio" />
            </Col>
            <Col xs={12} md={3}>
              <h4>Enlaces útiles</h4>
              <ul>
                <li><Link className='linknone' to="/register"><p>Inicio</p></Link></li>
                <li><Link className='linknone' to="/NotFound"><p>Acerca de nosotros</p></Link></li>
                <li><Link className='linknone' to="/NotFound"><p>Mi Cuenta</p></Link></li>
              </ul>
            </Col>
            <Col xs={12} md={3}>
              <h4>Contáctanos</h4>
              <ul>
                <li><Link className='linknone' to="/NotFound"><p>Pagina de contacto/Soporte</p></Link></li>
                <li><Link className='linknone' to="/NotFound"><p>Preguntas frecuentes</p></Link></li>
                <li><Link className='linknone' to="/NotFound"><p>Términos y Condiciones</p></Link></li>
              </ul>
            </Col>
            <Col xs={12} md={3}>
              <h4>Redes sociales</h4>
              <ul className="social-icons">
                <li><Link className='linknone' to="/NotFound"><a className="linknone fab fa-facebook fa-2x"></a></Link></li>
                <li><Link className='linknone' to="/NotFound"><a className="linknone fab fa-twitter fa-2x" ></a></Link></li>
                <li><Link className='linknone' to="/NotFound"><a className="linknone fab fa-instagram fa-2x"></a></Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
