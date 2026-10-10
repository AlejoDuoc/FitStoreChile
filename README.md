##  FitStore Chile 

**FitStore Chile** es una aplicación web de comercio electrónico tipo SPA (Single Page Application) orientada a la venta de ropa deportiva, suplementos y accesorios de entrenamiento. Proyecto desarrollado con **React**, **Vite** y **React-Bootstrap** para la asignatura de Desarrollo Full Stack / Evaluación 2.

---

##  Características Principales

- **Navegación SPA Reactiva:** Transiciones fluidas entre secciones sin recargar la página utilizando `react-router-dom`.
- **Catálogo Interactivo y Filtrado:** Exploración de más de 30 productos con filtro dinámico por categorías (*Ropa Deportiva*, *Suplementos*, *Accesorios*).
- **Carrito de Compras:** Gestión en tiempo real (añadir productos, eliminar por ítem, vaciar carrito, cálculo automático de subtotal y total).
- **Control de Excepciones y Validaciones:** Formularios de *Login* y *Registro* sanitizados que previenen campos vacíos, exigen edad mínima (18+) y longitud de contraseña.
- **Lógica de Negocio (Descuento DuocUC):** Aplicación automática de un **20% de descuento** en el total de la compra para usuarios registrados con correo `@duocuc.cl` y edad mayor a 50 años.
- **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles, tablets y escritorio gracias al grid de **React-Bootstrap** y pie de página (*Footer*) integrado.

---

##  Tecnologías Utilizadas

- **Frontend Library:** [React.js](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **UI Framework:** [React-Bootstrap](https://react-bootstrap.github.io/) & [Bootstrap 5](https://getbootstrap.com/)
- **Control de Versiones:** Git & GitHub

---

##  Estructura del Proyecto

```text
FitStoreChile/
├── public/
│   └── imagenes/          # Galería de imágenes estáticas de productos
├── src/
│   ├── assets/            # Recursos gráficos secundarios
│   ├── components/        # Componentes modulares
│   │   ├── Carrito.jsx     # Vista y lógica de precios/descuentos del carrito
│   │   ├── Categorias.jsx  # Vista de productos con filtro por categoría
│   │   ├── Footer.jsx      # Pie de página global
│   │   ├── Header.jsx      # Barra de navegación receptiva
│   │   ├── Login.jsx       # Formulario de inicio de sesión
│   │   ├── Nosotros.jsx    # Información institucional
│   │   ├── ProductList.jsx # Catálogo completo inicial
│   │   └── Registro.jsx   # Formulario de registro con validaciones y descuento
│   ├── App.jsx            # Enrutador principal y manejo del estado global
│   ├── main.jsx           # Punto de entrada de React
│   └── index.css          # Estilos globales personalizados
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación del repositorio
