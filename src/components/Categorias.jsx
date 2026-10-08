import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Badge, ButtonGroup } from 'react-bootstrap';

// Aquí volvemos a poner nuestro catálogo para poder filtrarlo
const productosFitStore = [
    // --- ROPA DEPORTIVA ---
    { id: 501, categoria: "Ropa Deportiva", nombre: "Polera Oversize Gym", precio: 15990, imagen: "/imagenes/polera-oversize-gym.jpg" },
    { id: 502, categoria: "Ropa Deportiva", nombre: "Calza Compresión Pro", precio: 20990, imagen: "/imagenes/calza-compresion-pro.jpg" },
    { id: 503, categoria: "Ropa Deportiva", nombre: "Short Running DryFit", precio: 17990, imagen: "/imagenes/short-running-dryfit.jpg" },
    { id: 504, categoria: "Ropa Deportiva", nombre: "Hooded Sweatshirt Heavy", precio: 18990, imagen: "/imagenes/hooded-sweatshirt-heavy.jpg" },
    { id: 505, categoria: "Ropa Deportiva", nombre: "Crop Top Seamless", precio: 15990, imagen: "/imagenes/crop-top-seamless.jpg" },
    { id: 506, categoria: "Ropa Deportiva", nombre: "Short Cargo Entreno", precio: 15990, imagen: "/imagenes/short-cargo-entreno.jpg" },
    { id: 507, categoria: "Ropa Deportiva", nombre: "Tank Top Muscle", precio: 21990, imagen: "/imagenes/tank-top-muscle.jpg" },
    { id: 508, categoria: "Ropa Deportiva", nombre: "Polera Manga Larga Thermal", precio: 28990, imagen: "/imagenes/polera-manga-larga-thermal.jpg" },
    { id: 509, categoria: "Ropa Deportiva", nombre: "Joggers Fit Slim", precio: 34990, imagen: "/imagenes/joggers-fit-slim.jpg" },
    { id: 510, categoria: "Ropa Deportiva", nombre: "Top Deportivo High Support", precio: 28990, imagen: "/imagenes/top-deportivo-high-support.jpg" },

    // --- SUPLEMENTOS ---
    { id: 511, categoria: "Suplementos", nombre: "Proteína Whey Isolate 2kg", precio: 16990, imagen: "/imagenes/proteina-whey-isolate.jpg" },
    { id: 512, categoria: "Suplementos", nombre: "Creatina Monohidratada 300g", precio: 16990, imagen: "/imagenes/creatina-monohidratada.jpg" },
    { id: 513, categoria: "Suplementos", nombre: "Pre-Workout Explosion 300g", precio: 18990, imagen: "/imagenes/pre-workout-explosion.jpg" },
    { id: 514, categoria: "Suplementos", nombre: "BCAA 2:1:1 400g", precio: 48990, imagen: "/imagenes/bcaa.jpg" },
    { id: 515, categoria: "Suplementos", nombre: "Multivitamínico Sport 90 caps", precio: 33990, imagen: "/imagenes/multivitaminico-sport.jpg" },
    { id: 516, categoria: "Suplementos", nombre: "Omega 3 Ultra Pure 120 caps", precio: 39990, imagen: "/imagenes/omega-3.jpg" },
    { id: 517, categoria: "Suplementos", nombre: "Mass Gainer 3kg", precio: 22990, imagen: "/imagenes/mass-gainer.jpg" },
    { id: 518, categoria: "Suplementos", nombre: "Glutamina Micronizada 500g", precio: 33990, imagen: "/imagenes/glutamina.jpg" },
    { id: 519, categoria: "Suplementos", nombre: "Proteína Vegana 1kg", precio: 46990, imagen: "/imagenes/proteina-vegana.jpg" },
    { id: 520, categoria: "Suplementos", nombre: "Electrolitos Hydrate 300g", precio: 46990, imagen: "/imagenes/electrolitos.jpg" },

    // --- ACCESORIOS ---
    { id: 521, categoria: "Accesorios", nombre: "Cinturón Levantamiento Cuero", precio: 10990, imagen: "/imagenes/cinturon-levantamiento.jpg" },
    { id: 522, categoria: "Accesorios", nombre: "Straps de Algodón Heavy", precio: 15990, imagen: "/imagenes/straps-algodon.jpg" },
    { id: 523, categoria: "Accesorios", nombre: "Botella Shaker 1 Litro", precio: 24990, imagen: "/imagenes/botella-shaker.jpg" },
    { id: 524, categoria: "Accesorios", nombre: "Muñequeras Neopreno Pro", precio: 18990, imagen: "/imagenes/munequeras.jpg" },
    { id: 525, categoria: "Accesorios", nombre: "Cuerda de Salto Alta Velocidad", precio: 17990, imagen: "/imagenes/cuerda-salto.jpg" },
    { id: 526, categoria: "Accesorios", nombre: "Bandas de Resistencia (Set 5)", precio: 21990, imagen: "/imagenes/bandas-resistencia.jpg" },
    { id: 527, categoria: "Accesorios", nombre: "Guantes Gimnasio Grip", precio: 22990, imagen: "/imagenes/guantes-gimnasio.jpg" },
    { id: 528, categoria: "Accesorios", nombre: "Mochila Deportiva Waterproof", precio: 19990, imagen: "/imagenes/mochila-deportiva.jpg" },
    { id: 529, categoria: "Accesorios", nombre: "Rodilleras 7mm Neopreno", precio: 20990, imagen: "/imagenes/rodilleras.jpg" },
    { id: 530, categoria: "Accesorios", nombre: "Magnesio Líquido 250ml", precio: 13990, imagen: "/imagenes/magnesio-liquido.jpg" }
];

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