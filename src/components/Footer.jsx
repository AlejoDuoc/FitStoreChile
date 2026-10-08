import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>FitStore Chile</h5>
            <p className="text-muted">
              Tu mejor opción en ropa deportiva, suplementos y accesorios para llevar tu entrenamiento al máximo nivel.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled text-muted">
              <li>Inicio</li>
              <li>Categorías</li>
              <li>Nosotros</li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contáctanos</h5>
            <ul className="list-unstyled text-muted">
              <li>📍 Santiago, Chile</li>
              <li>📧 contacto@fitstore.cl</li>
              <li>📱 +56912345678</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} FitStore Chile. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;