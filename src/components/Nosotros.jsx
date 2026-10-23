import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nosotros = () => {
  return (
    <div className="about-page-view py-5">
      <Container className="my-4">
        {/* Encabezado Principal de Alta Legibilidad */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={9} lg={8}>
            <h1 className="about-main-title text-white mb-3">Sobre FitStore Chile</h1>
            <p className="about-lead-description">
              Somos una tienda especializada en suplementación de grado analítico, textil de alto calibre y equipamiento forjado para atletas de fuerza y acondicionamiento físico.
            </p>
            <p className="about-lead-sub">
              Fundada en Santiago por deportistas que comprenden la disciplina del entrenamiento diario, desterramos las fórmulas con aditivos ocultos y la indumentaria comercial frágil para ofrecer piezas con garantía real de durabilidad y transparencia.
            </p>
          </Col>
        </Row>

        {/* Pilares & Valores con Tarjetas de Alto Contraste */}
        <Row className="g-4 text-start mt-3">
          <Col md={4}>
            <div className="about-card-modern">
              <h3 className="about-card-title">Calidad Certificada</h3>
              <p className="about-card-text">
                Cada suplemento declara con exactitud matemática el 100% de sus ingredientes activos. Sin azúcares añadidos ni rellenos industriales.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="about-card-modern">
              <h3 className="about-card-title">Confección & Resistencia</h3>
              <p className="about-card-text">
                Prendas estructuradas con patronaje atlético drop-shoulder y costuras cuádruples diseñadas para soportar la fricción de barras y mancuernas.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="about-card-modern">
              <h3 className="about-card-title">Inventario Físico Real</h3>
              <p className="about-card-text">
                Gestión estricta de existencias con stock sincronizado en tiempo real. Lo que ves en el catálogo cuenta con disponibilidad física inmediata.
              </p>
            </div>
          </Col>
        </Row>

        {/* Cierre / Enlace al catálogo */}
        <div className="text-center mt-5 pt-4">
          <Link to="/catalogo" className="btn-chapter-solid">
            Explorar Nuestro Catálogo
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Nosotros;
