import React from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ cartCount, busqueda = '', onBusquedaChange = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    onBusquedaChange(e.target.value);
    // Si el usuario escribe y no está en Inicio ni Categorías, llévalo al catálogo de inicio
    if (location.pathname !== '/' && location.pathname !== '/categorias') {
      navigate('/');
    }
  };

  return (
    <Navbar expand="lg" className="navbar-fitstore sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">FitStore<span>Chile</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Enlaces de navegación a la izquierda */}
          <Nav className="me-3">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
          </Nav>

          {/* Buscador de productos arriba en el navbar */}
          <div className="navbar-search flex-grow-1 mx-lg-3 my-2 my-lg-0">
            <Form.Control
              type="text"
              placeholder=" Buscar productos..."
              value={busqueda}
              onChange={handleSearchChange}
              className="navbar-search-input"
            />
          </div>

          {/* Acciones a la derecha: Iniciar Sesión, Registrarse y Carrito */}
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="cart-link ms-lg-2">
               Carrito
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;