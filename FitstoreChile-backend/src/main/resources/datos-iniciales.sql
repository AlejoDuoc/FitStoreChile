CREATE DATABASE IF NOT EXISTS fitstore_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fitstore_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    edad INT,
    rol VARCHAR(20) NOT NULL DEFAULT 'ROLE_CLIENTE',
    tiene_descuento BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL,
    descripcion VARCHAR(500),
    imagen VARCHAR(1000)
);

INSERT INTO usuarios (nombre, email, password, edad, rol, tiene_descuento)
VALUES ('Administrador FitStore', 'admin@fitstore.cl', '$2a$10$wU0M4a1b0xLhT7XpB1nLNu9R5K6g7D8vE9fA0bC1dE2fG3hI4jK5l', 30, 'ROLE_ADMIN', TRUE)
ON DUPLICATE KEY UPDATE email=email;

INSERT INTO productos (nombre, categoria, precio, stock, descripcion, imagen) VALUES
('Polera Oversize Gym', 'Ropa Deportiva', 15990, 14, 'Algodón peinado de alto gramaje con caída drop-shoulder para máxima comodidad.', '/imagenes/polera-oversize-gym.jpg'),
('Calza Compresión Pro', 'Ropa Deportiva', 20990, 8, 'Tejido técnico bielástico que mejora el retorno venoso y soporte muscular.', '/imagenes/calza-compresion-pro.jpg'),
('Short Running DryFit', 'Ropa Deportiva', 17990, 12, 'Secado ultrarrápido con forro interno antirozaduras y bolsillo seguro.', '/imagenes/short-running-dryfit.jpg'),
('Hooded Sweatshirt Heavy', 'Ropa Deportiva', 18990, 6, 'Polerón térmico con interior polar cepillado para entrenamientos invernales.', '/imagenes/hooded-sweatshirt-heavy.jpg'),
('Crop Top Ergonomico', 'Ropa Deportiva', 15990, 10, 'Diseño anatomico con compresion zonificada para cero friccion.', '/imagenes/crop-top-seamless.jpg'),
('Short Cargo Entreno', 'Ropa Deportiva', 15990, 9, 'Bolsillos funcionales reforzados y pretina ajustable de alta resistencia.', '/imagenes/short-cargo-entreno.jpg'),
('Tank Top Muscle', 'Ropa Deportiva', 21990, 11, 'Sisa amplia y caída atlética diseñada para libertad total de movimiento.', '/imagenes/tank-top-muscle.jpg'),
('Polera Manga Larga Thermal', 'Ropa Deportiva', 28990, 7, 'Regulación térmica avanzada para sesiones en exteriores y climas fríos.', '/imagenes/polera-manga-larga-thermal.jpg'),
('Joggers Fit Slim', 'Ropa Deportiva', 34990, 5, 'Corte ahusado con puños elásticos y bolsillos con cremalleras ocultas.', '/imagenes/joggers-fit-slim.jpg'),
('Top Deportivo High Support', 'Ropa Deportiva', 28990, 13, 'Soporte de alto impacto con tirantes ergonómicos y copas transpirables.', '/imagenes/top-deportivo-high-support.jpg'),

('Proteína Whey Isolate 2kg', 'Suplementos', 16990, 15, 'Aislado de suero 90% proteína pura por servicio, cero azúcares añadidos.', '/imagenes/proteina-whey-isolate.jpg'),
('Creatina Monohidratada 300g', 'Suplementos', 16990, 22, 'Creatina micronizada 200 mesh para solubilidad perfecta y fuerza explosiva.', '/imagenes/creatina-monohidratada.jpg'),
('Pre-Workout Explosion 300g', 'Suplementos', 18990, 14, 'Complejo de beta-alanina, cafeína anhidra y citrulina malato para foco total.', '/imagenes/pre-workout-explosion.jpg'),
('BCAA 2:1:1 400g', 'Suplementos', 48990, 8, 'Aminoácidos ramificados para acelerar la recuperación y síntesis proteica.', '/imagenes/bcaa.jpg'),
('Multivitamínico Sport 90 caps', 'Suplementos', 33990, 16, 'Fórmula de micronutrientes optimizada para el desgaste físico de atletas.', '/imagenes/multivitaminico-sport.jpg'),
('Omega 3 Ultra Pure 120 caps', 'Suplementos', 39990, 12, 'Ácidos grasos EPA/DHA de alta concentración destilados molecularmente.', '/imagenes/omega-3.jpg'),
('Mass Gainer 3kg', 'Suplementos', 22990, 6, 'Matriz balanceada de carbohidratos complejos y proteínas para fase de volumen.', '/imagenes/mass-gainer.jpg'),
('Glutamina Micronizada 500g', 'Suplementos', 33990, 9, 'L-glutamina pura para protección muscular y refuerzo del sistema inmune.', '/imagenes/glutamina.jpg'),
('Proteína Vegana 1kg', 'Suplementos', 46990, 10, 'Fórmula a base de aislado de arveja y arroz con perfil de aminoácidos completo.', '/imagenes/proteina-vegana.jpg'),
('Electrolitos Hydrate 300g', 'Suplementos', 46990, 18, 'Sodio, magnesio y potasio en proporciones fisiológicas para rehidratación.', '/imagenes/electrolitos.jpg'),

('Cinturón Levantamiento Cuero', 'Accesorios', 10990, 7, 'Cuero genuino 10mm de espesor con hebilla de acero inoxidable de palanca.', '/imagenes/cinturon-levantamiento.jpg'),
('Straps de Algodón Heavy', 'Accesorios', 15990, 25, 'Cintas reforzadas con acolchado de neopreno en muñeca para agarre inquebrantable.', '/imagenes/straps-algodon.jpg'),
('Botella Shaker 1 Litro', 'Accesorios', 24990, 20, 'Libre de BPA con mezclador de rejilla y cierre hermético a prueba de fugas.', '/imagenes/botella-shaker.jpg'),
('Muñequeras Neopreno Pro', 'Accesorios', 18990, 14, 'Soporte de compresión articular para press banca y levantamientos olímpicos.', '/imagenes/munequeras.jpg'),
('Cuerda de Salto Alta Velocidad', 'Accesorios', 17990, 15, 'Cable de acero con rodamientos dobles 360° para saltos dobles fluidos.', '/imagenes/cuerda-salto.jpg'),
('Bandas de Resistencia (Set 5)', 'Accesorios', 21990, 13, 'Látex natural de cinco resistencias graduadas para calentamiento y fuerza.', '/imagenes/bandas-resistencia.jpg'),
('Guantes Gimnasio Grip', 'Accesorios', 22990, 11, 'Palma antideslizante con ventilación transpirable para protección de callos.', '/imagenes/guantes-gimnasio.jpg'),
('Mochila Deportiva Waterproof', 'Accesorios', 19990, 5, 'Compartimento estanco para calzado húmedo y múltiples bolsillos tácticos.', '/imagenes/mochila-deportiva.jpg'),
('Rodilleras 7mm Neopreno', 'Accesorios', 20990, 8, 'Grosor reglamentario para sentadillas profundas y calor articular constante.', '/imagenes/rodilleras.jpg'),
('Magnesio Líquido 250ml', 'Accesorios', 13990, 30, 'Fórmula de secado en 10 segundos, cero polvo residual y máxima adherencia.', '/imagenes/magnesio-liquido.jpg');
