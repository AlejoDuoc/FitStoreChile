import React from 'react';
import { Navbar, Nav, Container, Form, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ cartCount, busqueda = '', onBusquedaChange = () => {}, usuario, onLogout, onOpenAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    onBusquedaChange(e.target.value);
    if (location.pathname !== '/catalogo' && location.pathname !== '/categorias') {
      navigate('/catalogo');
    }
  };

  return (
    <Navbar expand="lg" className="navbar-fitstore sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FitStore<span>Chile</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Enlaces de navegación principales */}
          <Nav className="me-3 align-items-lg-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
          </Nav>

          {/* Buscador global con acceso rápido */}
          <div className="navbar-search flex-grow-1 mx-lg-3 my-2 my-lg-0">
            <Form.Control
              type="text"
              placeholder="Buscar indumentaria, suplementos o accesorios..."
              value={busqueda}
              onChange={handleSearchChange}
              className="navbar-search-input"
            />
          </div>

          {/* Acciones a la derecha: Estado de sesión, Admin & Carrito */}
          <Nav className="ms-auto align-items-lg-center gap-2">
            {usuario ? (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <div className="d-flex align-items-center gap-1">
                  <span className="small fw-semibold text-dark text-truncate" style={{ maxWidth: '140px' }}>
                    {usuario.nombre || usuario.email.split('@')[0]}
                  </span>
                  {usuario.rol === 'admin' ? (
                    <Badge bg="dark" className="text-uppercase" style={{ fontSize: '0.65rem' }}>Admin</Badge>
                  ) : (
                    <Badge bg="light" text="dark" className="border" style={{ fontSize: '0.65rem' }}>Cliente</Badge>
                  )}
                </div>

                {usuario.rol === 'admin' && (
                  <Button
                    variant="warning"
                    size="sm"
                    className="fw-bold py-1 px-2 text-dark border-0"
                    style={{ fontSize: '0.75rem', backgroundColor: 'var(--fs-accent)' }}
                    onClick={onOpenAdmin}
                  >
                    Panel Stock
                  </Button>
                )}

                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="py-1 px-2"
                  style={{ fontSize: '0.75rem' }}
                  onClick={onLogout}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
              </>
            )}

            <Nav.Link as={Link} to="/carrito" className="cart-link ms-lg-2">
              <span>Carrito</span>
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
