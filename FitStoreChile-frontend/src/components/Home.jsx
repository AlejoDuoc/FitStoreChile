import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ productos = [], onAddToCart, usuario, onOpenAdmin }) => {
  const [cantidades, setCantidades] = useState({});
  const [toast, setToast] = useState(null);

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

  const destacados = productos.slice(0, 6);

  const heroShowcase = [
    {
      id: 512,
      nombre: 'Creatina Monohidratada 300g',
      precio: 16990,
      categoria: 'Suplementos',
      stock: 22,
      imagen: '/imagenes/creatina-monohidratada.jpg'
    },
    {
      id: 521,
      nombre: 'Cinturón Levantamiento Cuero 10mm',
      precio: 10990,
      categoria: 'Accesorios',
      stock: 7,
      imagen: '/imagenes/cinturon-levantamiento.jpg'
    },
    {
      id: 511,
      nombre: 'Proteína Whey Isolate 2kg',
      precio: 16990,
      categoria: 'Suplementos',
      stock: 15,
      imagen: '/imagenes/proteina-whey-isolate.jpg'
    }
  ];

  return (
    <div className="landing-modern">
      {usuario?.rol === 'admin' && (
        <aside className="admin-status-banner">
          <Container className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="text-white">Sesión de Administrador activa: tienes permisos de creación, edición y control de inventario.</span>
            <Button size="sm" variant="warning" className="fw-bold text-dark px-3 py-1" onClick={onOpenAdmin}>
              Abrir Panel de Stock
            </Button>
          </Container>
        </aside>
      )}

      {/* Hero Principal */}
      <section className="hero-modern-section py-5">
        <Container>
          <Row className="align-items-center g-5 py-4">
            <Col lg={7}>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 rounded-pill hero-tag-pill">
                <span className="hero-tag-dot"></span>
                <span className="small text-uppercase fw-bold letter-spacing-1">Colección Oficial 2024 • FitStore Chile</span>
              </div>

              <h1 className="hero-modern-title text-white mb-4">
                Fuerza, Rendimiento y Nutrición <span className="text-accent-gradient">Sin Compromisos.</span>
              </h1>

              <p className="hero-modern-desc mb-4 text-light-silver">
                Indumentaria técnica de alto calibre, suplementación analítica con pureza declarada y accesorios profesionales de fuerza. Sincronización de existencias en tiempo real con <strong className="text-white">20% de descuento automático</strong> para la comunidad Duoc UC.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/catalogo" className="btn btn-warning px-4 py-3 fw-bold text-dark text-uppercase letter-spacing-1">
                  Ver Catálogo Completo ({productos.length > 0 ? productos.length : '30'} Artículos) →
                </Link>
                <Link to="/categorias" className="btn btn-outline-light px-4 py-3 fw-semibold text-uppercase letter-spacing-1">
                  Explorar por Categoría
                </Link>
              </div>

              <div className="hero-stats-grid pt-4 border-top border-secondary border-opacity-50">
                <div className="hero-stat-box">
                  <div className="stat-val text-white">30</div>
                  <div className="stat-lbl stat-lbl-bright text-uppercase">Productos Oficiales</div>
                </div>
                <div className="hero-stat-box">
                  <div className="stat-val text-warning">100%</div>
                  <div className="stat-lbl stat-lbl-bright text-uppercase">Stock Físico en Bodega</div>
                </div>
                <div className="hero-stat-box">
                  <div className="stat-val text-white">20%</div>
                  <div className="stat-lbl stat-lbl-bright text-uppercase">Descuento Alumnos Duoc</div>
                </div>
                <div className="hero-stat-box">
                  <div className="stat-val text-warning">24h</div>
                  <div className="stat-lbl stat-lbl-bright text-uppercase">Despacho Santiago</div>
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div className="hero-showcase-panel p-4 rounded-4 border border-secondary border-opacity-50 bg-dark">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white fw-bold small text-uppercase letter-spacing-1">Top Artículos en Bodega</span>
                  <Link to="/catalogo" className="text-warning small fw-bold text-decoration-none">
                    Ver catálogo →
                  </Link>
                </div>

                <div className="d-flex flex-column gap-3">
                  {heroShowcase.map((prod) => (
                    <div className="hero-card-item p-3 rounded-3 bg-black border border-secondary border-opacity-50 d-flex align-items-center gap-3" key={prod.id}>
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="rounded-2"
                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/imagenes/polera-oversize-gym.jpg'; }}
                      />
                      <div className="flex-grow-1 min-w-0">
                        <span className="badge bg-secondary text-white mb-1" style={{ fontSize: '0.7rem' }}>{prod.categoria}</span>
                        <h4 className="text-white text-truncate mb-1 fs-6 fw-bold">{prod.nombre}</h4>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-warning fw-bold">${prod.precio.toLocaleString('es-CL')}</span>
                          <span className="text-light-silver small">• Stock: {prod.stock}</span>
                        </div>
                      </div>
                      <Link to="/catalogo" className="btn btn-sm btn-outline-light px-3 py-1 fw-bold">
                        Ver
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Colecciones Técnicas (3 Categorías) */}
      <section className="py-5 bg-black border-top border-bottom border-secondary border-opacity-50">
        <Container className="py-3">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-warning small text-uppercase fw-bold letter-spacing-1">Segmentación de Rendimiento</span>
            <h2 className="text-white fw-bold mt-1 mb-2">Colecciones Técnicas</h2>
            <p className="card-desc-bright fs-6">
              Equipamiento catalogado según las necesidades de tu disciplina y nivel de entrenamiento.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="category-bento-card p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-warning text-dark fw-bold text-uppercase">10 Productos</span>
                    <span className="badge bg-secondary text-white fw-semibold">Algodón 280g</span>
                  </div>
                  <h3 className="text-white fs-4 fw-bold mb-2">Ropa Deportiva</h3>
                  <p className="card-desc-bright mb-4">
                    Poleras oversize drop-shoulder, calzas de compresión bielásticas, polerones térmicos y shorts técnicos de secado rápido.
                  </p>
                </div>
                <Link to="/categorias" className="btn btn-outline-light w-100 fw-bold">
                  Ver Ropa Deportiva →
                </Link>
              </div>
            </Col>

            <Col md={4}>
              <div className="category-bento-card p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-warning text-dark fw-bold text-uppercase">10 Productos</span>
                    <span className="badge bg-secondary text-white fw-semibold">Grado Analítico</span>
                  </div>
                  <h3 className="text-white fs-4 fw-bold mb-2">Suplementos</h3>
                  <p className="card-desc-bright mb-4">
                    Proteína Whey Isolate CFM pura 90%, creatina micronizada 200 mesh, pre-workouts con citrulina y matrices de recuperación.
                  </p>
                </div>
                <Link to="/categorias" className="btn btn-outline-light w-100 fw-bold">
                  Ver Suplementos →
                </Link>
              </div>
            </Col>

            <Col md={4}>
              <div className="category-bento-card p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-warning text-dark fw-bold text-uppercase">10 Productos</span>
                    <span className="badge bg-secondary text-white fw-semibold">Cargas Pesadas</span>
                  </div>
                  <h3 className="text-white fs-4 fw-bold mb-2">Accesorios de Fuerza</h3>
                  <p className="card-desc-bright mb-4">
                    Cinturones de palanca en cuero genuino 10mm, straps de algodón reforzado, rodilleras de neopreno 7mm y magnesio líquido.
                  </p>
                </div>
                <Link to="/categorias" className="btn btn-outline-light w-100 fw-bold">
                  Ver Accesorios →
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vitrina Destacada con interacción directa */}
      <section className="py-5">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-5">
            <div>
              <span className="text-warning small text-uppercase fw-bold letter-spacing-1">Disponibilidad Inmediata</span>
              <h2 className="text-white fw-bold mt-1 mb-0">Artículos Destacados</h2>
            </div>
            <Link to="/catalogo" className="text-warning fw-bold text-decoration-none">
              Ver todo el catálogo ({productos.length}) →
            </Link>
          </div>

          <Row className="g-4">
            {destacados.map((producto) => {
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
                            title="Editar como Administrador"
                          >
                            Modificar
                          </button>
                        )}
                      </div>

                      <h3 className="product-card-name text-white">{producto.nombre}</h3>
                      <p className="product-card-desc text-light-silver">{producto.descripcion}</p>

                      <div className="product-card-footer mt-auto pt-3">
                        <div className="product-price-column">
                          <span className="price-main">${producto.precio.toLocaleString('es-CL')}</span>
                          <span className="stock-note text-light-silver">
                            {sinStock ? 'Sin stock disponible' : pocoStock ? `Solo ${producto.stock} en bodega` : `${producto.stock} disponibles`}
                          </span>
                        </div>

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
                            <span className="stepper-count">{qty}</span>
                            <button
                              type="button"
                              disabled={sinStock || qty >= producto.stock}
                              onClick={() => cambiarCantidad(producto.id, 1, producto.stock)}
                              aria-label="Sumar unidad"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="btn-add-action"
                            disabled={sinStock}
                            onClick={() => handleAdd(producto)}
                          >
                            {sinStock ? 'Sin Stock' : 'Agregar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Los Estándares FitStore (4 Pilares) */}
      <section className="py-5 bg-black border-top border-bottom border-secondary border-opacity-50">
        <Container className="py-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-warning small text-uppercase fw-bold letter-spacing-1">Compromiso de Calidad</span>
            <h2 className="text-white fw-bold mt-1 mb-2">Por Qué Elegir FitStore Chile</h2>
            <p className="card-desc-bright fs-6">
              Desarrollamos una plataforma de estándar profesional enfocada en transparencia, trazabilidad y soporte a atletas.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={3} sm={6}>
              <div className="p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100">
                <div className="text-warning fs-3 mb-2">⚡</div>
                <h4 className="text-white fs-6 fw-bold mb-2">Pureza 100% Declarada</h4>
                <p className="feature-desc-bright mb-0">
                  Fórmulas analíticas sin azúcares añadidos ni rellenos de volumen para que aproveches cada gramo.
                </p>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100">
                <div className="text-warning fs-3 mb-2">🛡️</div>
                <h4 className="text-white fs-6 fw-bold mb-2">Textil de Alto Calibre</h4>
                <p className="feature-desc-bright mb-0">
                  Confección de 280g/m² diseñada para resistir el roce continuo de barras moleteadas y poleas.
                </p>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100">
                <div className="text-warning fs-3 mb-2">📦</div>
                <h4 className="text-white fs-6 fw-bold mb-2">Stock Real en Bodega</h4>
                <p className="feature-desc-bright mb-0">
                  Inventario sincronizado con base de datos MySQL. Lo que compras está físicamente disponible para despacho.
                </p>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="p-4 rounded-4 border border-secondary border-opacity-50 bg-dark h-100">
                <div className="text-warning fs-3 mb-2">🎓</div>
                <h4 className="text-white fs-6 fw-bold mb-2">20% Alumnos Duoc UC</h4>
                <p className="feature-desc-bright mb-0">
                  Beneficio institucional activado automáticamente al registrarte con tu correo institucional @duocuc.cl.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Banner Duoc UC y Cierre */}
      <section className="py-5 text-center">
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="p-5 rounded-4 border border-warning border-opacity-50 bg-dark text-white">
                <h2 className="fw-bold mb-3 text-white">¿Eres alumno de Duoc UC?</h2>
                <p className="text-light-silver mx-auto mb-4 fs-6" style={{ maxWidth: '580px' }}>
                  Aprovecha tu beneficio exclusivo del <strong className="text-warning">20% de descuento automático</strong> en todas las compras de indumentaria, suplementos y accesorios registrándote con tu correo institucional.
                </p>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  <Link to="/registro" className="btn btn-warning px-4 py-3 fw-bold text-dark text-uppercase letter-spacing-1">
                    Crear Cuenta con Descuento
                  </Link>
                  <Link to="/catalogo" className="btn btn-outline-light px-4 py-3 fw-semibold text-uppercase letter-spacing-1">
                    Ver Catálogo Oficial
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {toast && (
        <div className="toast-added" role="status">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Home;
