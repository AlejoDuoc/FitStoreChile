# 📘 Documento de Integración: FitStore Chile
**Asignatura:** DSY1104 - Desarrollo Fullstack II  
**Evaluación:** Evaluación Parcial N° 3 (Integrando Backend y Frontend a la Tienda Online)  
**Institución:** Duoc UC  
**Año:** 2024  

---

## 1. Arquitectura General del Sistema

La solución FitStore Chile implementa una arquitectura desacoplada **Cliente-Servidor (SPA + API RESTful)**:

```
+-------------------------------------------------------------+
|                     CAPA CLIENTE (FRONTEND)                 |
|             React 19 + React Router v7 + Bootstrap 5        |
|             (Puerto local: http://localhost:5173)           |
+-------------------------------------------------------------+
                              |
                     Peticiones HTTP/JSON
                     Cabecera: Authorization: Bearer <JWT>
                              |
                              v
+-------------------------------------------------------------+
|                     CAPA SERVIDOR (BACKEND)                 |
|      Spring Boot 3.3.4 + Spring Security 6 + JJWT + Swagger  |
|             (Puerto local: http://localhost:8080)           |
+-------------------------------------------------------------+
                              |
                       Spring Data JPA
                       Hibernate ORM
                              |
                              v
+-------------------------------------------------------------+
|                  CAPA DE DATOS (PERSISTENCIA)               |
|                   Base de Datos Relacional MySQL            |
|                  (Base de datos: fitstore_db:3306)          |
+-------------------------------------------------------------+
```

---

## 2. Flujo de Comunicación e Integración de Datos

### 2.1 Flujo de Autenticación con Token JWT (JSON Web Token)
1. **Solicitud de Credenciales:** El usuario ingresa correo y contraseña en `Login.jsx`.
2. **Petición REST:** Se envía un `POST /api/auth/login` con el payload JSON al backend.
3. **Validación y Hash BCrypt:** `AuthService.java` busca al usuario en MySQL y valida la contraseña usando `BCryptPasswordEncoder.matches()`.
4. **Emisión de Token:** `JwtUtil.java` genera un token firmado con algoritmo HMAC-SHA256 (`HS256`) que contiene en sus Claims el `sub` (email), `rol` (`ROLE_ADMIN` o `ROLE_CLIENTE`) y tiempo de vida (24 horas).
5. **Persistencia en Cliente:** El frontend recibe el token y lo almacena de forma segura en `localStorage` (`fitstore_token` y `fitstore_user`).
6. **Peticiones Autenticadas:** En las solicitudes a recursos protegidos (ej. crear/editar productos), el cliente adjunta la cabecera:
   ```http
   Authorization: Bearer <TOKEN_JWT>
   ```
7. **Filtro de Seguridad (`JwtAuthFilter.java`):** Intercepta la petición HTTP, extrae el token, verifica su firma y validez, y carga la identidad en el `SecurityContextHolder` de Spring Security para autorizar la acción según el rol.

```
+----------+             +--------------------+             +---------------+
| Frontend |             | JwtAuthFilter (SB) |             | Base de Datos |
+----------+             +--------------------+             +---------------+
     |                             |                                |
     |-- POST /api/auth/login ---->|                                |
     |                             |-- Valida usuario y hash ------>|
     |                             |<- Retorna entidad Usuario -----|
     |<- Retorna {token, rol} -----|                                |
     |                             |                                |
     |-- POST /api/productos ----->|                                |
     |   (Bearer <token>)          |-- Valida firma JWT             |
     |                             |-- Comprueba ROLE_ADMIN         |
     |                             |-- Inserta nuevo producto ----->|
     |<- 201 Created --------------|                                |
```

---

## 3. Especificación de Endpoints del API REST

La API se encuentra completamente documentada y disponible para pruebas interactivas en:  
📍 **Swagger UI:** `http://localhost:8080/swagger-ui.html`  
📍 **OpenAPI JSON:** `http://localhost:8080/api-docs`  

### 3.1 Módulo de Autenticación (`/api/auth`)
| Método | Endpoint | Acceso | Descripción | Body Requerido |
|---|---|---|---|---|
| `POST` | `/api/auth/registro` | Público | Registra un nuevo usuario con contraseña hasheada y asigna descuento a `@duocuc.cl`. | `{"nombre","email","password","edad","rol"}` |
| `POST` | `/api/auth/login` | Público | Autentica credenciales y emite token JWT con vigencia de 24 horas. | `{"email","password"}` |
| `POST` | `/api/auth/refresh` | Autenticado | Renueva el token JWT próximo a vencer o activo. Cabecera `Authorization: Bearer <token>`. | N/A |

### 3.2 Módulo de Catálogo e Inventario (`/api/productos`)
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/api/productos` | Público | Obtiene el catálogo completo de productos disponibles. |
| `GET` | `/api/productos/{id}` | Público | Obtiene el detalle técnico y stock de un producto específico. |
| `GET` | `/api/productos/buscar?nombre={txt}` | Público | Búsqueda insensible a mayúsculas/minúsculas. |
| `GET` | `/api/productos/categoria/{cat}` | Público | Filtra por categoría: *Ropa Deportiva*, *Suplementos*, *Accesorios*. |
| `POST` | `/api/productos` | **Solo Admin** (`ROLE_ADMIN`) | Da de alta un nuevo producto con foto, precio y stock inicial. |
| `PUT` | `/api/productos/{id}` | **Solo Admin** (`ROLE_ADMIN`) | Actualiza atributos, precio o existencias de un producto. |
| `DELETE` | `/api/productos/{id}` | **Solo Admin** (`ROLE_ADMIN`) | Elimina un producto del catálogo de la base de datos. |
| `PATCH` | `/api/productos/{id}/stock?cantidad={n}` | **Solo Admin** (`ROLE_ADMIN`) | Actualiza o descuenta inventario tras órdenes de compra. |

### 3.3 Módulo de Usuarios (`/api/usuarios`)
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/api/usuarios` | **Solo Admin** (`ROLE_ADMIN`) | Lista usuarios registrados (ocultando contraseñas). |
| `DELETE` | `/api/usuarios/{id}` | **Solo Admin** (`ROLE_ADMIN`) | Da de baja una cuenta de usuario. |

---

## 4. Gestión de Sesión y Seguridad en el Frontend (React)

- **Persistencia ante recarga (F5):** `App.jsx` sincroniza la sesión recuperando el token y perfil del usuario desde `localStorage` al inicializar el componente principal.
- **Rutas Protegidas (Route Guards):** Rutas como `/carrito` evalúan el estado de autenticación. Si el visitante no está autenticado, es redirigido automáticamente a `/login` mediante `<Navigate to="/login" replace />`.
- **Restricción de Interfaces por Rol:** Acciones críticas como el botón y modal de "Panel Stock / Administración" solo se renderizan condicionalmente si `usuario.rol === 'admin'` (`ROLE_ADMIN`).
- **Resiliencia (Fallback):** El servicio `api.js` está preparado para que, en caso de interrupción del servicio backend, la tienda mantenga disponibilidad operativa a través de caché local garantizando experiencia de usuario ininterrumpida.

---

## 5. Configuración de Entorno y CORS

El servidor Spring Boot tiene habilitado **CORS (Cross-Origin Resource Sharing)** explícitamente en `SecurityConfig.java` para los orígenes:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React default)

Permitiendo los métodos HTTP: `GET, POST, PUT, DELETE, OPTIONS` y el intercambio de cabeceras de autorización.
