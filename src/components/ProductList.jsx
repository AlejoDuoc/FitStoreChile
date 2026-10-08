import React from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';

const productosFitStore = [
    // --- ROPA DEPORTIVA ---
    { id: 501, categoria: "Ropa Deportiva", nombre: "Polera Oversize Gym", precio: 15990, imagen: "/imagenes/polera-oversize-gym.jpg" },
    { id: 502, categoria: "Ropa Deportiva", nombre: "Calza Compresión Pro", precio: 20990, imagen: "/calza-compresion-pro.jpg" },
    { id: 503, categoria: "Ropa Deportiva", nombre: "Short Running DryFit", precio: 17990, imagen: "/short-running-dryfit.jpg" },
    { id: 504, categoria: "Ropa Deportiva", nombre: "Hooded Sweatshirt Heavy", precio: 18990, imagen: "/hooded-sweatshirt-heavy.jpg" },
    { id: 505, categoria: "Ropa Deportiva", nombre: "Crop Top Seamless", precio: 15990, imagen: "/crop-top-seamless.jpg" },
    { id: 506, categoria: "Ropa Deportiva", nombre: "Short Cargo Entreno", precio: 15990, imagen: "/short-cargo-entreno.jpg" },
    { id: 507, categoria: "Ropa Deportiva", nombre: "Tank Top Muscle", precio: 21990, imagen: "/tank-top-muscle.jpg" },
    { id: 508, categoria: "Ropa Deportiva", nombre: "Polera Manga Larga Thermal", precio: 28990, imagen: "/polera-manga-larga-thermal.jpg" },
    { id: 509, categoria: "Ropa Deportiva", nombre: "Joggers Fit Slim", precio: 34990, imagen: "/joggers-fit-slim.jpg" },
    { id: 510, categoria: "Ropa Deportiva", nombre: "Top Deportivo High Support", precio: 28990, imagen: "/top-deportivo-high-support.jpg" },

    // --- SUPLEMENTOS ---
    { id: 511, categoria: "Suplementos", nombre: "Proteína Whey Isolate 2kg", precio: 16990, imagen: "/proteina-whey-isolate.jpg" },
    { id: 512, categoria: "Suplementos", nombre: "Creatina Monohidratada 300g", precio: 16990, imagen: "/creatina-monohidratada.jpg" },
    { id: 513, categoria: "Suplementos", nombre: "Pre-Workout Explosion 300g", precio: 18990, imagen: "/pre-workout-explosion.jpg" },
    { id: 514, categoria: "Suplementos", nombre: "BCAA 2:1:1 400g", precio: 48990, imagen: "/bcaa.jpg" },
    { id: 515, categoria: "Suplementos", nombre: "Multivitamínico Sport 90 caps", precio: 33990, imagen: "/multivitaminico-sport.jpg" },
    { id: 516, categoria: "Suplementos", nombre: "Omega 3 Ultra Pure 120 caps", precio: 39990, imagen: "/omega-3.jpg" },
    { id: 517, categoria: "Suplementos", nombre: "Mass Gainer 3kg", precio: 22990, imagen: "/mass-gainer.jpg" },
    { id: 518, categoria: "Suplementos", nombre: "Glutamina Micronizada 500g", precio: 33990, imagen: "/glutamina.jpg" },
    { id: 519, categoria: "Suplementos", nombre: "Proteína Vegana 1kg", precio: 46990, imagen: "/proteina-vegana.jpg" },
    { id: 520, categoria: "Suplementos", nombre: "Electrolitos Hydrate 300g", precio: 46990, imagen: "/electrolitos.jpg" },

    // --- ACCESORIOS ---
    { id: 521, categoria: "Accesorios", nombre: "Cinturón Levantamiento Cuero", precio: 10990, imagen: "/cinturon-levantamiento.jpg" },
    { id: 522, categoria: "Accesorios", nombre: "Straps de Algodón Heavy", precio: 15990, imagen: "/straps-algodon.jpg" },
    { id: 523, categoria: "Accesorios", nombre: "Botella Shaker 1 Litro", precio: 24990, imagen: "/botella-shaker.jpg" },
    { id: 524, categoria: "Accesorios", nombre: "Muñequeras Neopreno Pro", precio: 18990, imagen: "/munequeras.jpg" },
    { id: 525, categoria: "Accesorios", nombre: "Cuerda de Salto Alta Velocidad", precio: 17990, imagen: "/cuerda-salto.jpg" },
    { id: 526, categoria: "Accesorios", nombre: "Bandas de Resistencia (Set 5)", precio: 21990, imagen: "/bandas-resistencia.jpg" },
    { id: 527, categoria: "Accesorios", nombre: "Guantes Gimnasio Grip", precio: 22990, imagen: "/guantes-gimnasio.jpg" },
    { id: 528, categoria: "Accesorios", nombre: "Mochila Deportiva Waterproof", precio: 19990, imagen: "/mochila-deportiva.jpg" },
    { id: 529, categoria: "Accesorios", nombre: "Rodilleras 7mm Neopreno", precio: 20990, imagen: "/rodilleras.jpg" },
    { id: 530, categoria: "Accesorios", nombre: "Magnesio Líquido 250ml", precio: 13990, imagen: "/magnesio-liquido.jpg" }
];

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