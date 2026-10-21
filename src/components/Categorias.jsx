import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { productosFitStore } from '../productos.js';
// Aquí volvemos a poner nuestro catálogo para poder filtrarlo


const Categorias = ({ onAddToCart }) => {
  // Estado para saber qué categoría estamos buscando (por defecto muestra "Todos")
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [cantidades, setCantidades] = useState({});
  const [toast, setToast] = useState(null);

  // Filtramos la lista dependiendo del botón que se haya presionado
  const productosFiltrados = productosFitStore
    .filter(p => filtro === 'Todos' || p.categoria === filtro)
    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const categorias = ['Todos', 'Ropa Deportiva', 'Suplementos', 'Accesorios'];

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
    setCantidades(prev => ({ ...prev, [producto.id]: 1 }));
    setToast(`${qty}x ${producto.nombre} agregado al carrito`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="section-title">Categorías</h2>
        <p className="section-subtitle">Filtra por tipo de producto</p>
      </div>
      
      {/* Botones de filtro */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`btn-filter ${filtro === cat ? 'active' : ''}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <Form.Control
          type="text"
          placeholder=" Buscar en esta categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={4} key={producto.id} className="mb-4 fade-in-up">
            <Card className="h-100 product-card">
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

export default Categorias;