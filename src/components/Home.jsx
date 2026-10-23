import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ productos = [], onAddToCart, usuario, onOpenAdmin }) => {
  const [toast, setToast] = useState(null);

  const handleAdd = (producto) => {
    if (producto.stock <= 0) return;
    onAddToCart(producto);
    setToast(`${producto.nombre} agregado al carrito`);
    setTimeout(() => setToast(null), 2400);
  };

  // 6 productos destacados para el catálogo de la página principal
  const destacados = productos.slice(0, 6);

  // Fotografías de gran formato seleccionadas para el capítulo visual
  const atlasVisual = [
    {
      imagen: '/imagenes/hooded-sweatshirt-heavy.jpg',
      nombre: 'Polerón Heavyweight',
      linea: 'Confección Textil Drop-Shoulder'
    },
    {
      imagen: '/imagenes/proteina-whey-isolate.jpg',
      nombre: 'Proteína Whey Isolate CFM',
      linea: 'Nutrición Pura 90% Proteína'
    },
    {
      imagen: '/imagenes/cinturon-levantamiento.jpg',
      nombre: 'Cinturón de Palanca 10mm',
      linea: 'Cuero Genuino de Fuerza'
    },
    {
      imagen: '/imagenes/creatina-monohidratada.jpg',
      nombre: 'Creatina Micronizada 200 Mesh',
      linea: 'Síntesis de Potencia'
    },
    {
      imagen: '/imagenes/rodilleras.jpg',
      nombre: 'Rodilleras 7mm Neopreno',
      linea: 'Soporte Articular Competición'
    },
    {
      imagen: '/imagenes/pre-workout-explosion.jpg',
      nombre: 'Pre-Workout Explosion Matrix',
      linea: 'Energía y Vasodilatación'
    }
  ];

  // Productos destacados para la vitrina del Hero
  const heroShowcase = [
    {
      id: 512,
      nombre: 'Creatina Monohidratada 200 Mesh',
      precio: 16990,
      categoria: 'Suplementos',
      imagen: '/imagenes/creatina-monohidratada.jpg'
    },
    {
      id: 521,
      nombre: 'Cinturón Levantamiento Cuero 10mm',
      precio: 10990,
      categoria: 'Accesorios',
      imagen: '/imagenes/cinturon-levantamiento.jpg'
    },
    {
      id: 511,
      nombre: 'Proteína Whey Isolate 2kg',
      precio: 16990,
      categoria: 'Suplementos',
      imagen: '/imagenes/proteina-whey-isolate.jpg'
    }
  ];

  return (
    <div className="chapters-landing">
      {/* Barra de control para el usuario administrador */}
      {usuario?.rol === 'admin' && (
        <aside className="admin-status-banner">
          <Container className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span>Sesión de Administrador: tienes permisos para modificar catálogo, precios y existencias.</span>
            <Button size="sm" variant="light" className="fw-semibold text-dark" onClick={onOpenAdmin}>
              Gestionar Stock y Catálogo
            </Button>
          </Container>
        </aside>
      )}

      {/* ====================================================================
          CAPÍTULO 1: LA APERTURA (Fondo Deep Dark #0C0D10)
          ==================================================================== */}
      <section className="chapter chapter-dark chapter-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h1 className="chapter-display-title text-white">
                Disciplina sin adornos.
              </h1>
              <p className="chapter-lead-text text-light">
                FitStore Chile forja indumentaria deportiva de alto rendimiento y suplementación pura de grado analítico para atletas que no negocian su progreso.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                <Link to="/catalogo" className="btn-chapter-solid">
                  Explorar Catálogo ({productos.length})
                </Link>
                <Link to="/categorias" className="btn-chapter-outline">
                  Ver Colecciones
                </Link>
                {usuario?.rol === 'admin' && (
                  <Button variant="outline-light" className="btn-chapter-outline" onClick={onOpenAdmin}>
                    Panel Inventario
                  </Button>
                )}
              </div>

              {/* Métricas limpias sin menciones de GSM */}
              <div className="chapter-metrics-band mt-5">
                <div className="metric-cell">
                  <span className="metric-val">{productos.length}</span>
                  <span className="metric-sub">Productos Oficiales</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">3</span>
                  <span className="metric-sub">Líneas de Especialidad</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-val">100%</span>
                  <span className="metric-sub">Stock Sincronizado</span>
                </div>
              </div>
            </Col>

            {/* Vitrina Hero con 3 productos emblemáticos (sin la foto única de la polera ni texto de 320 gsm) */}
            <Col lg={6}>
              <div className="hero-product-grid">
                <div className="hero-product-featured">
                  <div className="featured-media-box">
                    <img src={heroShowcase[0].imagen} alt={heroShowcase[0].nombre} />
                    <span className="badge-featured-tag">{heroShowcase[0].categoria}</span>
                  </div>
                  <div className="featured-info-box">
                    <span className="featured-name">{heroShowcase[0].nombre}</span>
                    <span className="featured-price">${heroShowcase[0].precio.toLocaleString('es-CL')}</span>
                  </div>
                </div>

                <div className="hero-product-subcards">
                  {heroShowcase.slice(1).map((item) => (
                    <div key={item.id} className="hero-mini-card">
                      <div className="mini-media">
                        <img src={item.imagen} alt={item.nombre} />
                      </div>
                      <div className="mini-info">
                        <span className="mini-category">{item.categoria}</span>
                        <span className="mini-title">{item.nombre}</span>
                        <span className="mini-price">${item.precio.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====================================================================
          CAPÍTULO 2: EL MANIFIESTO & HISTORIA (Chalk Stone #EFECE6)
          ==================================================================== */}
      <section className="chapter chapter-stone">
        <Container>
          <div className="chapter-lead-quote-box text-center">
            <blockquote className="chapter-huge-quote">
              "No creemos en atajos ni en fórmulas mágicas. Creemos en la fricción del metal, en telas que resisten el uso intensivo y en suplementos sin rellenos."
            </blockquote>
          </div>

          <Row className="g-5 mt-4">
            <Col lg={6}>
              <div className="chapter-text-card">
                <h2 className="chapter-section-heading">
                  El Origen de FitStore Chile
                </h2>
                <p className="chapter-paragraph">
                  FitStore Chile nació en Santiago de la necesidad directa de practicantes de levantamiento de potencia, cross-training y acondicionamiento físico. Frente a la saturación de indumentaria comercial que pierde su forma rápidamente, diseñamos prendas con patronaje atlético real y confección reforzada.
                </p>
                <p className="chapter-paragraph">
                  En el ámbito nutricional, desterramos las mezclas propietarias y el amino-spiking. Cada fórmula de proteína o creatina detalla con precisión analítica cada miligramo de sus componentes activos.
                </p>
                <div className="pt-2">
                  <Link to="/nosotros" className="chapter-link-bold">
                    Leer más sobre nuestra historia y equipo
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="chapter-pillars-block">
                <h2 className="chapter-section-heading">
                  Nuestros Tres Principios de Fabricación
                </h2>

                <div className="chapter-pillar-row">
                  <div>
                    <h3 className="pillar-heading">Confección Resistente y Duradera</h3>
                    <p className="pillar-detail">
                      Textiles seleccionados de alto calibre y costuras reforzadas para resistir fricción constante con barras y mancuernas.
                    </p>
                  </div>
                </div>

                <div className="chapter-pillar-row">
                  <div>
                    <h3 className="pillar-heading">Nutrición de Grado Analítico</h3>
                    <p className="pillar-detail">
                      Microfiltración de flujo cruzado CFM, creatina 200 mesh y perfiles de aminoácidos completos sin aditivos artificiales.
                    </p>
                  </div>
                </div>

                <div className="chapter-pillar-row">
                  <div>
                    <h3 className="pillar-heading">Control Estricto de Stock Real</h3>
                    <p className="pillar-detail">
                      Cada unidad visible en la tienda se encuentra físicamente en inventario. Cada compra descuenta el stock de manera instantánea.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====================================================================
          CAPÍTULO 3: ATLAS VISUAL DE EQUIPAMIENTO (Deep Slate #15171C)
          ==================================================================== */}
      <section className="chapter chapter-slate text-white">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <h2 className="chapter-display-title text-white mb-2">
                Atlas Visual del Equipamiento
              </h2>
              <p className="chapter-lead-text text-light mb-0">
                Fotografías seleccionadas de nuestras líneas textil, nutricional y de fuerza.
              </p>
            </div>
            <Link to="/catalogo" className="btn-chapter-outline">
              Ver Catálogo Completo
            </Link>
          </div>

          <Row className="g-4">
            {atlasVisual.map((item, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="atlas-card">
                  <div className="atlas-img-wrapper">
                    <img src={item.imagen} alt={item.nombre} />
                  </div>
                  <div className="atlas-meta-box">
                    <span className="atlas-linea">{item.linea}</span>
                    <h3 className="atlas-item-name">{item.nombre}</h3>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ====================================================================
          CAPÍTULO 4: INVENTARIO FÍSICO CON CONTROL DE STOCK (#FFFFFF)
          ==================================================================== */}
      <section className="chapter chapter-white">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
            <div>
              <h2 className="chapter-section-heading mb-1">
                Inventario con Disponibilidad Inmediata
              </h2>
              <p className="chapter-paragraph mb-0">
                Selección de piezas destacadas con conteo de existencias en tiempo real.
              </p>
            </div>
            {usuario?.rol === 'admin' ? (
              <Button variant="dark" size="sm" onClick={onOpenAdmin}>
                Modificar Inventario (Admin)
              </Button>
            ) : (
              <Link to="/catalogo" className="chapter-link-bold">
                Ver todos los productos
              </Link>
            )}
          </div>

          <Row className="g-4">
            {destacados.map((prod) => {
              const sinStock = prod.stock <= 0;
              const stockBajo = prod.stock > 0 && prod.stock <= 4;

              return (
                <Col lg={4} md={6} key={prod.id}>
                  <div className="product-card-modern">
                    <div className="product-media-box">
                      {prod.imagen ? (
                        <img
                          src={prod.imagen}
                          alt={prod.nombre}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentElement.querySelector('.product-no-img-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="product-no-img-fallback"
                        style={{ display: prod.imagen ? 'none' : 'flex' }}
                      >
                        <span className="fallback-brand">FitStore Chile</span>
                        <span className="fallback-cat">{prod.categoria}</span>
                      </div>

                      <span className={`stock-status-pill ${sinStock ? 'pill-out' : stockBajo ? 'pill-low' : 'pill-ok'}`}>
                        {sinStock ? 'Agotado' : stockBajo ? `Últimas ${prod.stock} unidades` : `Stock: ${prod.stock} uds.`}
                      </span>
                    </div>

                    <div className="product-info-box">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="product-category-tag">{prod.categoria}</span>
                        {usuario?.rol === 'admin' && (
                          <button
                            type="button"
                            className="btn-admin-quick-edit"
                            onClick={onOpenAdmin}
                          >
                            Modificar
                          </button>
                        )}
                      </div>

                      <h3 className="product-card-name">{prod.nombre}</h3>
                      <p className="product-card-desc">{prod.descripcion}</p>

                      <div className="product-card-footer mt-auto pt-3">
                        <div className="product-price-column">
                          <span className="price-main">${prod.precio.toLocaleString('es-CL')}</span>
                          <span className="stock-note">
                            {sinStock ? 'Sin existencias' : `${prod.stock} en inventario`}
                          </span>
                        </div>

                        <Button
                          disabled={sinStock}
                          className="btn-add-action"
                          onClick={() => handleAdd(prod)}
                        >
                          {sinStock ? 'Agotado' : 'Agregar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* ====================================================================
          CAPÍTULO 5: LA CODA / CIERRE (#0C0D10)
          ==================================================================== */}
      <section className="chapter chapter-dark chapter-coda">
        <Container>
          <div className="coda-wrapper text-center">
            <h2 className="coda-giant-brand text-white">
              FITSTORE CHILE
            </h2>
            <p className="coda-manifesto-sub text-light">
              Indumentaria atlética de alto calibre y nutrición de grado analítico.
            </p>
            <div className="pt-4">
              <Link to="/catalogo" className="btn-chapter-solid">
                Explorar Toda la Colección
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Notificación flotante al agregar producto */}
      {toast && <div className="toast-added-editorial">{toast}</div>}
    </div>
  );
};

export default Home;
