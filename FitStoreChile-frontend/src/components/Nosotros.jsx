import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nosotros = () => {
  return (
    <div className="about-page-view py-5">
      <Container className="my-4">
        <section className="about-hero-section text-center mb-5 pb-3">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill about-pill-badge">
            <span className="about-badge-dot"></span>
            <span className="small text-uppercase fw-bold letter-spacing-1">Identidad FitStore Chile</span>
          </div>
          
          <h1 className="about-main-title text-white mb-3">
            Nacidos de la disciplina diaria, no del marketing.
          </h1>
          
          <p className="about-lead-description mx-auto">
            Somos una tienda especializada en suplementación de grado analítico, confección textil de alto gramaje y equipamiento para atletas de fuerza y acondicionamiento físico en Chile.
          </p>

          <p className="about-lead-sub mx-auto">
            Fundada en Santiago por entrenadores y deportistas que entienden el desgaste del entrenamiento pesado, desterramos las fórmulas con rellenos industriales y la ropa deportiva comercial frágil para ofrecer piezas con garantía real de durabilidad, pureza y transparencia.
          </p>
        </section>

        <section className="about-pillars-section mb-5">
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="about-card-modern h-100 p-4">
                <div className="about-card-num">01</div>
                <h3 className="about-card-title text-white mt-3 mb-2">Formulación Transparente</h3>
                <p className="about-card-text">
                  Cada suplemento declara con exactitud matemática el 100% de sus ingredientes activos. Cero azúcares añadidos, sin amino-spiking y sin mezclas propietarias ocultas.
                </p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="about-card-modern h-100 p-4">
                <div className="about-card-num">02</div>
                <h3 className="about-card-title text-white mt-3 mb-2">Confección & Resistencia</h3>
                <p className="about-card-text">
                  Textiles de algodón peinado de 280g/m² con caída drop-shoulder y costuras cuádruples diseñadas para soportar la fricción constante de barras moleteadas y mancuernas.
                </p>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <div className="about-card-modern h-100 p-4">
                <div className="about-card-num">03</div>
                <h3 className="about-card-title text-white mt-3 mb-2">Inventario Físico Real</h3>
                <p className="about-card-text">
                  Gestión estricta de existencias con stock sincronizado en tiempo real con nuestra base de datos. Lo que ves en el catálogo cuenta con disponibilidad física inmediata en bodega.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        <section className="about-metrics-section mb-5 p-4 rounded-3 border border-secondary border-opacity-25 bg-dark">
          <Row className="text-center g-4">
            <Col sm={6} md={3}>
              <div className="about-metric-item">
                <div className="about-metric-value text-white">30</div>
                <div className="about-metric-label stat-lbl-bright small text-uppercase">Productos Oficiales</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="about-metric-item">
                <div className="about-metric-value text-warning">100%</div>
                <div className="about-metric-label stat-lbl-bright small text-uppercase">Trazabilidad de Stock</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="about-metric-item">
                <div className="about-metric-value text-white">20%</div>
                <div className="about-metric-label stat-lbl-bright small text-uppercase">Beneficio Alumnos Duoc</div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="about-metric-item">
                <div className="about-metric-value text-warning">24h</div>
                <div className="about-metric-label stat-lbl-bright small text-uppercase">Despacho en Santiago</div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="about-academic-badge text-center p-4 rounded-3 border border-secondary border-opacity-25 bg-black mb-5">
          <h4 className="text-white mb-2 fs-5">Proyecto Académico Duoc UC</h4>
          <p className="academic-badge-desc small mx-auto mb-0" style={{ maxWidth: '680px' }}>
            Desarrollado para la asignatura <strong>DSY1104 - Desarrollo Fullstack II</strong> (Evaluación Parcial N° 3). Integra una arquitectura desacoplada SPA en React 19, servicios RESTful con Spring Boot 3, autenticación basada en tokens JWT y persistencia transaccional con MySQL.
          </p>
        </section>

        <div className="text-center pt-2">
          <Link to="/catalogo" className="btn btn-warning px-5 py-3 fw-bold text-dark text-uppercase letter-spacing-1">
            Explorar Nuestro Catálogo
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Nosotros;
