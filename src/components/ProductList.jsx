import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { productosFitStore } from '../productos.js';


const ProductList = ({ onAddToCart }) => {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Catálogo Completo</h2>
      <Row>
        {productosFitStore.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0 bg-light">
              
              {/* Aquí usamos la imagen de cada producto */}
              <Card.Img 
                variant="top" 
                src={producto.imagen} 
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'contain', padding: '10px' }} 
              />

              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg="secondary">{producto.categoria}</Badge>
                </div>
                <Card.Title className="fs-5">{producto.nombre}</Card.Title>
                <Card.Text className="mt-auto pt-3">
                  <strong className="fs-4 text-success">${producto.precio.toLocaleString('es-CL')}</strong>
                </Card.Text>
                
                <Button 
                  variant="dark" 
                  className="w-100 mt-2"
                  onClick={() => onAddToCart(producto)}
                >
                  Añadir al Carrito
                </Button>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;