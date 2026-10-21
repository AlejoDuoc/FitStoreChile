import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-fitstore">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>FitStore Chile</h5>
            <p>
              Tu mejor opción en ropa deportiva, suplementos y accesorios para llevar tu entrenamiento al máximo nivel.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Navegación</h5>
            <ul className="list-unstyled">
              <li><Link to="/" style={{ color: 'inherit' }}>Inicio</Link></li>
              <li><Link to="/categorias" style={{ color: 'inherit' }}>Categorías</Link></li>
              <li><Link to="/nosotros" style={{ color: 'inherit' }}>Nosotros</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>📍 Santiago, Chile</li>
              <li>📧 contacto@fitstore.cl</li>
              <li>📱 +56 9 1234 5678</li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0" style={{ fontSize: '0.8rem' }}>
              &copy; {new Date().getFullYear()} FitStore Chile. Todos los derechos reservados.
            </p>
             <p>
              Alejandro Izquierdo, Pedro Tome.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;