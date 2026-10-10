import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Badge, ButtonGroup } from 'react-bootstrap';
import { productosFitStore } from '../productos.js';
// Aquí volvemos a poner nuestro catálogo para poder filtrarlo


const Categorias = ({ onAddToCart }) => {
  // Estado para saber qué categoría estamos buscando (por defecto muestra "Todos")
  const [filtro, setFiltro] = useState('Todos');

  // Filtramos la lista dependiendo del botón que se haya presionado
  const productosFiltrados = filtro === 'Todos' 
    ? productosFitStore 
    : productosFitStore.filter(producto => producto.categoria === filtro);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Filtrar por Categorías</h2>
      
      {/* Botones de filtro */}
      <div className="d-flex justify-content-center mb-5">
        <ButtonGroup>
          <Button variant={filtro === 'Todos' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('Todos')}>
            Todos
          </Button>
          <Button variant={filtro === 'Ropa Deportiva' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('Ropa Deportiva')}>
            Ropa Deportiva
          </Button>
          <Button variant={filtro === 'Suplementos' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('Suplementos')}>
            Suplementos
          </Button>
          <Button variant={filtro === 'Accesorios' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('Accesorios')}>
            Accesorios
          </Button>
        </ButtonGroup>
      </div>

      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0 bg-light">
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
                
                <Button variant="dark" className="w-100 mt-2" onClick={() => onAddToCart(producto)}>
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

export default Categorias;