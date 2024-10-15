// Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/Contrlremovebg.png';
import "../styles/Navbar.css";

const NavbarComponent = ({ authenticated, role, changeJwt }) => {
  const handleLogout = () => {
    changeJwt("");
    localStorage.removeItem("token");
    //setCarrito([]);
  };

  return (
    <div className="navbarback">
      <Navbar expand="lg" className="navbars logoimg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/Home">
            <img
              src={Logo}
              className="neon-border"
              width="100"
              height="50"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" className="custom-toggler" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/NotFound">
                <Button variant="outline-info" className="text-white">Contacto</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/Nosotros">
                <Button variant="outline-info" className="text-white">Nosotros</Button>
              </Nav.Link>
              {authenticated && role === 'admin' && (
                <>
                  <Nav.Link as={Link} to="/productos">
                    <Button variant="outline-info" className="text-white">Productos</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/usuarios">
                    <Button variant="outline-info" className="text-white">Usuarios</Button>
                  </Nav.Link>
                </>
              )}
              {authenticated && (
                <>
                  <Nav.Link as={Link} to="/carrito">
                    <Button variant="outline-info" className="text-white">Carrito</Button>
                  </Nav.Link>
                </>  
                  )}
            </Nav>
            <Nav className="mb-2 mb-lg-0">
              {authenticated ? (
                <Button variant="outline-info" className="text-white" onClick={handleLogout}>Cerrar sesión</Button>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    <Button variant="outline-info" className="text-white">Registrarse ahora</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    <Button variant="primary" className="text-white">Iniciar sesión</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='neon-line'></div> 

    </div>
  );
};

export default NavbarComponent;
