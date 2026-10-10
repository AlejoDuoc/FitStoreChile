import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h2 className="mb-4">Sobre FitStore Chile</h2>
          <p className="lead">
            Somos tu tienda de confianza para suplementos, ropa deportiva y accesorios. 
            Nuestra misión es acompañarte en cada paso de tu entrenamiento, ofreciéndote 
            productos de la más alta calidad para que alcances tus metas.
          </p>
          <p>
            ¡Únete a nuestra comunidad y lleva tu rendimiento al siguiente nivel!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Nosotros;