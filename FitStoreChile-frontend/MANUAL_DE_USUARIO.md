# 📖 Manual de Usuario: FitStore Chile
**Proyecto:** Plataforma E-Commerce FitStore Chile  
**Asignatura:** DSY1104 - Desarrollo Fullstack II  
**Institución:** Duoc UC  
**Año:** 2024  

---

## 1. Introducción
**FitStore Chile** es una plataforma web integral de comercio electrónico diseñada para la venta de ropa deportiva de alto rendimiento, suplementación nutricional de grado analítico y accesorios de entrenamiento de fuerza. 

El sistema cuenta con una arquitectura Fullstack moderna compuesta por:
- **Frontend SPA:** Desarrollado en React 19 con Bootstrap 5, responsive y persistencia de sesión.
- **Backend API REST:** Desarrollado en Java con Spring Boot 3, Spring Security, Swagger y autenticación basada en tokens JWT.
- **Base de Datos:** MySQL para almacenamiento transaccional de productos, usuarios e inventario.

---

## 2. Puesta en Marcha del Sistema

### 2.1 Requisitos Previos
1. **Java Development Kit (JDK 17 o superior):** Verificable con `java -version`.
2. **MySQL Server (o XAMPP / MySQL Workbench):** En ejecución en el puerto por defecto `3306`.
3. **Node.js (v14+ o superior):** Para compilar el frontend.
4. **IntelliJ IDEA (o VS Code / Eclipse):** Para ejecutar el proyecto backend.

---

### 2.2 Ejecución del Backend (Spring Boot)

#### Opción A: Desde IntelliJ IDEA (Recomendada)
1. Abre **IntelliJ IDEA**.
2. Selecciona **File -> Open...** y navega a la carpeta:
   `c:\Users\av-alumno\Downloads\fitstore-backend`
3. IntelliJ detectará automáticamente el archivo `pom.xml` y descargará las dependencias de Maven.
4. En el panel izquierdo de proyecto, abre:
   `src/main/java/com/fitstore/backend/FitstoreBackendApplication.java`
5. Haz clic en el ícono verde **Run ▶** (o presiona `Shift + F10`).
6. El backend iniciará en el puerto `http://localhost:8080`.
7. Verifica la conexión abriendo Swagger en tu navegador:
   👉 **http://localhost:8080/swagger-ui.html**

#### Opción B: Base de Datos Inicial
El archivo `src/main/resources/datos-iniciales.sql` contiene las sentencias SQL para crear la base de datos `fitstore_db` e insertar el usuario Administrador y los 15 productos oficiales por defecto.

---

### 2.3 Ejecución del Frontend (React)
1. Abre una terminal en la carpeta:
   `c:\Users\av-alumno\Downloads\FitStoreChile-main`
2. Inicia el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
3. Accede en el navegador a:  
   👉 **http://localhost:5173**

---

## 3. Módulos y Funcionalidades del Sistema

### 3.1 Pantalla Principal (Home / Catálogo Destacado)
- **URL:** `http://localhost:5173/`
- **Características:**
  - Hero banner con manifiesto de marca y acceso rápido al catálogo.
  - Vitrina de productos destacados con stock en tiempo real.
  - Si el usuario logueado es Administrador, se despliega una barra dorada superior con accesos directos al panel de inventario.

---

### 3.2 Catálogo General y Búsqueda
- **URL:** `http://localhost:5173/catalogo`
- **Características:**
  - Buscador reactivo en el Navbar que filtra por nombre y categoría simultáneamente.
  - Selector de cantidad (+ / -) con tope dinámico según el stock existente en bodega.
  - Indicadores visuales de stock:
    - 🟢 *Stock normal* (verde)
    - 🟡 *Últimas unidades* (amarillo, 4 o menos)
    - 🔴 *Agotado* (botón deshabilitado)

---

### 3.3 Filtro por Categorías
- **URL:** `http://localhost:5173/categorias`
- **Categorías Disponibles:**
  - *Ropa Deportiva*
  - *Suplementos*
  - *Accesorios*
- Permite segmentar el catálogo mediante pestañas de filtrado interactivo.

---

### 3.4 Registro de Usuarios
- **URL:** `http://localhost:5173/registro`
- **Validaciones Implementadas:**
  - Nombre completo obligatorio.
  - Formato válido de correo electrónico mediante expresión regular.
  - Edad mínima de 18 años requerida.
  - Contraseña de al menos 6 caracteres con campo de confirmación obligatoria.
  - Asignación de rol: **Cliente** o **Administrador**.
  - **Beneficio Duoc UC:** Si el correo contiene `@duocuc.cl` o el rol es Administrador, se activa automáticamente el 20% de descuento institucional.

---

### 3.5 Inicio de Sesión (Login) y Gestión de Sesión JWT
- **URL:** `http://localhost:5173/login`
- **Credenciales Demo Administrador:**
  - **Email:** `admin@fitstore.cl`
  - **Password:** `admin123`
  - Botón *"Completar datos de Administrador Demo"* para ingreso rápido en demostraciones.
- **Seguridad:**
  - Al iniciar sesión exitosamente, el backend emite un token JWT con vigencia de 24 horas.
  - El token se guarda en el navegador (`localStorage`) persistiendo la sesión ante recargas (F5).
  - Al presionar **Salir**, el token y el perfil son eliminados inmediatamente.

---

### 3.6 Carrito de Compras y Control de Stock
- **URL:** `http://localhost:5173/carrito`
- **Protección de Ruta:** Si un usuario no autenticado intenta ingresar al carrito por URL, es redirigido automáticamente a `/login`.
- **Lógica de Negocio:**
  - Agrupación automática de productos por ID.
  - Validación estricta que impide solicitar más unidades que el stock disponible en bodega.
  - Descuento del 20% desglosado en el resumen de compra para usuarios beneficiados.
  - Botón *"Proceder al Pago & Descontar Stock"*: descuenta de forma permanente el inventario tanto en memoria/API como en la base de datos.

---

### 3.7 Panel de Administración (Gestión de Stock y Catálogo)
- **Acceso:** Solo visible para usuarios con rol `ROLE_ADMIN` / `admin`.
- **Operaciones CRUD:**
  1. **Crear Producto:** Permite ingresar nombre, categoría, precio, stock inicial, descripción y seleccionar fotografía (subir archivo, elegir del catálogo o sin imagen).
  2. **Modificar Producto:** Edición en línea de precios y cantidades en bodega con guardado instantáneo.
  3. **Eliminar Producto:** Da de baja un artículo del catálogo previa confirmación.

---

### 3.8 Documentación Interactiva Swagger (OpenAPI 3)
- **URL:** `http://localhost:8080/swagger-ui.html`
- Permite a evaluadores y desarrolladores probar cada endpoint REST en vivo.
- Cuenta con botón **Authorize 🔓** para ingresar el token JWT obtenido desde `/api/auth/login` y probar endpoints protegidos de administrador directamente desde la interfaz web.
