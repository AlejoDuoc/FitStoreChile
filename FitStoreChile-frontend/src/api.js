const BASE_URL = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('fitstore_token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

const publicHeaders = () => ({
  'Content-Type': 'application/json'
});

export const loginApi = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const error = new Error(err.error || 'Credenciales inválidas');
    error.isHttpError = true;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const registroApi = async (datos) => {
  const res = await fetch(`${BASE_URL}/auth/registro`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(datos)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const error = new Error(err.error || 'Error al registrar usuario');
    error.isHttpError = true;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const renovarTokenApi = async () => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al renovar token');
  return res.json();
};

export const getProductosApi = async () => {
  const res = await fetch(`${BASE_URL}/productos`, { headers: publicHeaders() });
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
};

export const getProductoPorIdApi = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, { headers: publicHeaders() });
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
};

export const buscarProductosApi = async (nombre) => {
  const res = await fetch(`${BASE_URL}/productos/buscar?nombre=${encodeURIComponent(nombre)}`, { headers: publicHeaders() });
  if (!res.ok) throw new Error('Error en la búsqueda');
  return res.json();
};

export const getProductosPorCategoriaApi = async (categoria) => {
  const res = await fetch(`${BASE_URL}/productos/categoria/${encodeURIComponent(categoria)}`, { headers: publicHeaders() });
  if (!res.ok) throw new Error('Error al filtrar por categoría');
  return res.json();
};

export const crearProductoApi = async (producto) => {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error('Error al crear el producto');
  return res.json();
};

export const actualizarProductoApi = async (id, producto) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error('Error al actualizar el producto');
  return res.json();
};

export const eliminarProductoApi = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al eliminar el producto');
};

export const descontarStockApi = async (id, cantidad) => {
  const res = await fetch(`${BASE_URL}/productos/${id}/stock?cantidad=${cantidad}`, {
    method: 'PATCH',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Error al descontar stock');
  return res.json();
};
