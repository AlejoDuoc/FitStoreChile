import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center about-section">
          <h2 className="section-title mb-3">Sobre FitStore Chile</h2>
          <p className="lead" style={{ color: 'var(--fs-gray-700)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Somos tu tienda de confianza especializada en suplementos, ropa técnica deportiva y accesorios de entrenamiento. 
            Nuestra misión es acompañarte en cada etapa de tu disciplina física, ofreciéndote productos seleccionados 
            con los más altos estándares de calidad para potenciar tu rendimiento.
          </p>
        </Col>
      </Row>

      {/* Pilares / Valores minimalistas */}
      <Row className="mt-5 g-4 text-center">
        <Col md={4}>
          <div className="p-4 h-100" style={{ border: '1px solid var(--fs-gray-300)', borderRadius: 'var(--fs-radius)', background: 'var(--fs-white)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}></div>
            <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Calidad Certificada</h5>
            <p style={{ color: 'var(--fs-gray-700)', fontSize: '0.9rem', margin: 0 }}>
              Suplementos originales y testeados con los mejores ingredientes del mercado fitness.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 h-100" style={{ border: '1px solid var(--fs-gray-300)', borderRadius: 'var(--fs-radius)', background: 'var(--fs-white)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}></div>
            <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Diseño & Comodidad</h5>
            <p style={{ color: 'var(--fs-gray-700)', fontSize: '0.9rem', margin: 0 }}>
              Indumentaria con tecnología DryFit y calces modernos para entrenar con total libertad.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 h-100" style={{ border: '1px solid var(--fs-gray-300)', borderRadius: 'var(--fs-radius)', background: 'var(--fs-white)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}></div>
            <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Despachos Rápidos</h5>
            <p style={{ color: 'var(--fs-gray-700)', fontSize: '0.9rem', margin: 0 }}>
              Envíos a todo Chile con seguimiento en tiempo real y soporte dedicado.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Nosotros;