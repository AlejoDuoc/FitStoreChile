import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { productosFitStore } from '../productos.js';


const ProductList = ({ onAddToCart, busqueda = '' }) => {
  const [cantidades, setCantidades] = useState({});
  const [toast, setToast] = useState(null);

  // Filtrar productos según la búsqueda global del navbar
  const productosFiltrados = productosFitStore.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getCantidad = (id) => cantidades[id] || 1;

  const cambiarCantidad = (id, delta) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAdd = (producto) => {
    const qty = getCantidad(producto.id);
    for (let i = 0; i < qty; i++) {
      onAddToCart(producto);
    }
    // Reset cantidad después de agregar
    setCantidades(prev => ({ ...prev, [producto.id]: 1 }));
    // Toast de confirmación
    setToast(`${qty}x ${producto.nombre} agregado al carrito`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <Container className="mt-4 mb-5">
      <div className="text-center mb-4">
        <h2 className="section-title">Catálogo Completo</h2>
        <p className="section-subtitle mb-0">Encuentra todo lo que necesitas para tu entrenamiento</p>
      </div>

      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4 fade-in-up">
            <Card className="h-100 product-card">
              
              {/* Aquí usamos la imagen de cada producto */}
              <Card.Img 
                variant="top" 
                src={producto.imagen} 
                alt={producto.nombre}
                className="card-img-top"
              />

              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <span className="category-badge">{producto.categoria}</span>
                </div>
                <Card.Title>{producto.nombre}</Card.Title>
                <div className="mt-auto pt-3">
                  <span className="product-price">${producto.precio.toLocaleString('es-CL')}</span>
                </div>
                
                {/* Selector de cantidad */}
                <div className="d-flex align-items-center gap-2 mt-3">
                  <div className="qty-control">
                    <button type="button" onClick={() => cambiarCantidad(producto.id, -1)}>−</button>
                    <input type="number" value={getCantidad(producto.id)} readOnly />
                    <button type="button" onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                  </div>
                  <Button 
                    className="btn-add-cart flex-grow-1"
                    onClick={() => handleAdd(producto)}
                  >
                    Agregar
                  </Button>
                </div>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {productosFiltrados.length === 0 && (
        <p className="text-center" style={{ color: 'var(--fs-gray-500)' }}>No se encontraron productos.</p>
      )}

      {/* Toast de confirmación */}
      {toast && <div className="toast-added">{toast}</div>}
    </Container>
  );
};

export default ProductList;