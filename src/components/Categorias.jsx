import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const Categorias = ({ productos = [], onAddToCart, usuario, onOpenAdmin }) => {
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [cantidades, setCantidades] = useState({});
  const [toast, setToast] = useState(null);

  const productosFiltrados = productos
    .filter(p => filtro === 'Todos' || p.categoria === filtro)
    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

  const categorias = ['Todos', 'Ropa Deportiva', 'Suplementos', 'Accesorios'];

  const getCantidad = (id) => cantidades[id] || 1;

  const cambiarCantidad = (id, delta, maxStock) => {
    setCantidades(prev => {
      const actual = prev[id] || 1;
      const nuevo = actual + delta;
      if (nuevo < 1) return { ...prev, [id]: 1 };
      if (nuevo > maxStock) return { ...prev, [id]: maxStock };
      return { ...prev, [id]: nuevo };
    });
  };

  const handleAdd = (producto) => {
    if (producto.stock <= 0) return;
    const qty = Math.min(getCantidad(producto.id), producto.stock);
    for (let i = 0; i < qty; i++) {
      onAddToCart(producto);
    }
    setCantidades(prev => ({ ...prev, [producto.id]: 1 }));
    setToast(`${qty}x ${producto.nombre} agregado al carrito`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="categories-view">
      {/* Encabezado Superior con Alto Contraste y Selección Visual Clara */}
      <section className="catalog-hero-header">
        <Container>
          <div className="text-center max-w-700 mx-auto mb-4">
            <h1 className="catalog-header-title text-white">Categorías de Productos</h1>
            <p className="catalog-header-subtitle">
              Explora nuestra colección segmentada por disciplina deportiva y tipo de producto.
            </p>
          </div>

          {/* Botones de filtro de alto contraste */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`category-filter-pill ${filtro === cat ? 'active' : ''}`}
                onClick={() => setFiltro(cat)}
              >
                {cat} {cat !== 'Todos' && `(${productos.filter(p => p.categoria === cat).length})`}
              </button>
            ))}
          </div>

          {/* Buscador de alto contraste */}
          <div className="category-search-container mx-auto">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o descripción técnica..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="category-search-field"
            />
          </div>
        </Container>
      </section>

      {/* Grid de Productos Filtrados con Tarjetas Renovadas */}
      <Container className="py-5">
        <Row className="g-4">
          {productosFiltrados.map((producto) => {
            const sinStock = producto.stock <= 0;
            const pocoStock = producto.stock > 0 && producto.stock <= 4;
            const qty = getCantidad(producto.id);

            return (
              <Col md={4} sm={6} key={producto.id}>
                <div className="product-card-modern">
                  <div className="product-media-box">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.parentElement.querySelector('.product-no-img-fallback');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="product-no-img-fallback"
                      style={{ display: producto.imagen ? 'none' : 'flex' }}
                    >
                      <span className="fallback-brand">FitStore Chile</span>
                      <span className="fallback-cat">{producto.categoria}</span>
                    </div>

                    <span className={`stock-status-pill ${sinStock ? 'pill-out' : pocoStock ? 'pill-low' : 'pill-ok'}`}>
                      {sinStock ? 'Agotado' : pocoStock ? `Últimas ${producto.stock} unidades` : `Stock: ${producto.stock} uds.`}
                    </span>
                  </div>

                  <div className="product-info-box">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="product-category-tag">{producto.categoria}</span>
                      {usuario?.rol === 'admin' && (
                        <button
                          type="button"
                          className="btn-admin-quick-edit"
                          onClick={onOpenAdmin}
                          title="Modificar como Administrador"
                        >
                          Modificar
                        </button>
                      )}
                    </div>

                    <h3 className="product-card-name">{producto.nombre}</h3>
                    <p className="product-card-desc">{producto.descripcion}</p>

                    <div className="product-card-footer mt-auto pt-3">
                      <div className="product-price-column">
                        <span className="price-main">${producto.precio.toLocaleString('es-CL')}</span>
                        <span className="stock-note">
                          {sinStock ? 'Sin stock' : pocoStock ? `Solo ${producto.stock} en inventario` : `${producto.stock} en inventario`}
                        </span>
                      </div>

                      {/* Selector de cantidad y botón */}
                      <div className="action-stepper-row">
                        <div className="modern-stepper">
                          <button
                            type="button"
                            disabled={sinStock || qty <= 1}
                            onClick={() => cambiarCantidad(producto.id, -1, producto.stock)}
                            aria-label="Restar unidad"
                          >
                            -
                          </button>
                          <span className="stepper-count">{sinStock ? 0 : qty}</span>
                          <button
                            type="button"
                            disabled={sinStock || qty >= producto.stock}
                            onClick={() => cambiarCantidad(producto.id, 1, producto.stock)}
                            aria-label="Sumar unidad"
                          >
                            +
                          </button>
                        </div>

                        <Button
                          disabled={sinStock}
                          className="btn-add-action flex-grow-1"
                          onClick={() => handleAdd(producto)}
                        >
                          {sinStock ? 'Agotado' : 'Agregar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-white fw-normal">No se encontraron productos en esta sección</h4>
            <p className="text-muted">Prueba seleccionando "Todos" o cambiando tu término de búsqueda.</p>
          </div>
        )}

        {toast && <div className="toast-added-editorial">{toast}</div>}
      </Container>
    </div>
  );
};

export default Categorias;
