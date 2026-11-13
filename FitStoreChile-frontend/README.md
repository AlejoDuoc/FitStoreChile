# FitStore Chile

**FitStore Chile** es una aplicación web de comercio electrónico tipo SPA (*Single Page Application*) orientada a la venta de ropa deportiva, suplementos nutricionales y accesorios para el entrenamiento físico. Proyecto desarrollado con **React**, **Vite** y **React-Bootstrap** enfocado en una experiencia de usuario moderna, minimalista y elegante.

---

##  Características Principales

- **Diseño Minimalista y Sofisticado:** Paleta de colores sobria (monocromática con acentos dorados), sombras sutiles y microinteracciones fluidas en tarjetas de producto.
- **Buscador en Tiempo Real en Navbar:** Barra de búsqueda integrada en la cabecera superior para filtrar productos de forma instantánea desde cualquier vista del sitio.
- **Selector de Cantidades Dinámico:** Posibilidad de seleccionar múltiples unidades de un mismo producto (`-` / `+`) antes de agregarlo al carrito de compras.
- **Notificaciones Toast Interactivas:** Alerta flotante de confirmación inmediata al agregar productos al carrito.
- **Carrito de Compras Agrupado:** Agrupación inteligente de productos iguales, visualización de precio unitario, cantidad acumulada, subtotal por ítem, eliminación individual y vaciado completo.
- **Lógica de Descuento DuocUC (20%):** Detección automática de correos institucionales `@duocuc.cl` en Login y Registro, aplicando un 20% de descuento sobre el total de la compra.
- **Control de Excepciones y Validaciones:** Formularios protegidos con validación de campos obligatorios, formato de correo válido, mayoría de edad (+18) y longitud segura de contraseña.
- **Filtro por Categorías:** Exploración organizada en Ropa Deportiva, Suplementos y Accesorios.
- **Sección Institucional "Nosotros":** Presentación de marca con tarjetas de pilares de valor (Calidad Certificada, Diseño & Comodidad, Despachos Rápidos).
- **Diseño 100% Responsivo:** Adaptación completa a dispositivos móviles, tablets y monitores de escritorio.

---

##  Tecnologías Utilizadas

- **React 19** - Librería para interfaces de usuario reactivas
- **Vite 8** - Entorno de desarrollo y empaquetador ultrarrápido
- **React Router DOM 7** - Enrutamiento dinámico tipo SPA
- **React-Bootstrap 2 & Bootstrap 5** - Sistema de grillas y componentes base
- **Google Fonts (Inter)** - Tipografía limpia y moderna
- **Karma & Jasmine** - Configuración de pruebas unitarias

---

##  Estructura del Proyecto

```text
FitStoreChile/
├── public/
│   └── imagenes/          # Imágenes estáticas de los productos del catálogo
├── src/
│   ├── assets/            # Recursos visuales secundarios
│   ├── components/        # Componentes modulares de la interfaz
│   │   ├── Carrito.jsx     # Tabla agrupada de compras, subtotales y descuento DuocUC
│   │   ├── Categorias.jsx  # Filtrado de catálogo por tipo de producto y búsqueda
│   │   ├── Footer.jsx      # Pie de página institucional y enlaces rápidos
│   │   ├── Header.jsx      # Navbar con buscador global, accesos a sesión y badge de carrito
│   │   ├── Login.jsx       # Inicio de sesión con validaciones
│   │   ├── Nosotros.jsx    # Presentación corporativa y pilares de la tienda
│   │   ├── ProductList.jsx # Catálogo completo con selector de cantidades y toast
│   │   └── Registro.jsx   # Registro con control de excepciones y detección DuocUC
│   ├── App.css            # Sobrescrituras específicas de la aplicación
│   ├── App.jsx            # Estado global (carrito, usuario, búsqueda) y rutas
│   ├── index.css          # Sistema de diseño, variables CSS y estilos minimalistas
│   ├── main.jsx           # Punto de entrada de la aplicación
│   └── productos.js       # Base de datos local de catálogo de productos
├── test/
│   └── Login.test.jsx     # Pruebas unitarias de componentes
├── index.html             # Plantilla HTML principal con preconnect de tipografía
├── package.json           # Dependencias y scripts del proyecto
└── README.md              # Documentación del proyecto
```