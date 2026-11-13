import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import Carrito from './components/Carrito.jsx';
import Nosotros from './components/Nosotros.jsx';
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import Categorias from './components/Categorias.jsx';
import Footer from './components/Footer.jsx';
import AdminModal from './components/AdminModal.jsx';
import { getProductosApi, crearProductoApi, actualizarProductoApi, eliminarProductoApi, descontarStockApi } from './api.js';
import { getStoredProducts, saveStoredProducts } from './productos.js';

function App() {
  const [productos, setProductos] = useState(() => getStoredProducts());
  const [cart, setCart] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    try {
      const saved = localStorage.getItem('fitstore_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [busqueda, setBusqueda] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    const cargarDesdeApi = async () => {
      try {
        setCargandoProductos(true);
        const datos = await getProductosApi();
        setProductos(datos);
        saveStoredProducts(datos);
      } catch (err) {
        setProductos(getStoredProducts());
      } finally {
        setCargandoProductos(false);
      }
    };
    cargarDesdeApi();
  }, []);

  const handleLogin = (user, token) => {
    if (!user) return;
    const esAdmin = user.rol && user.rol.toUpperCase().includes('ADMIN');
    const usuarioFormateado = {
      ...user,
      rol: esAdmin ? 'admin' : 'cliente',
      rolSpring: esAdmin ? 'ROLE_ADMIN' : 'ROLE_CLIENTE'
    };
    setUsuario(usuarioFormateado);
    try {
      localStorage.setItem('fitstore_user', JSON.stringify(usuarioFormateado));
      if (token) {
        localStorage.setItem('fitstore_token', token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUsuario(null);
    try {
      localStorage.removeItem('fitstore_user');
      localStorage.removeItem('fitstore_token');
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (producto) => {
    const prodDb = productos.find(p => p.id === producto.id) || producto;
    const currentInCart = cart.filter(item => item.id === producto.id).length;

    if (currentInCart >= prodDb.stock) {
      alert(`No es posible agregar más unidades de "${prodDb.nombre}". Stock máximo alcanzado (${prodDb.stock} uds).`);
      return;
    }

    setCart(prev => [...prev, prodDb]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => setCart([]);

  const handleCheckout = async (itemsComprados) => {
    // Descontar en backend si está disponible
    for (const item of itemsComprados) {
      try {
        await descontarStockApi(item.id, item.cantidad);
      } catch (err) {
        console.warn(`No se pudo actualizar stock en API para item ${item.id}:`, err.message);
      }
    }

    // Actualizar estado local
    setProductos(prevProductos => {
      const actualizados = prevProductos.map(prod => {
        const itemComprado = itemsComprados.find(i => i.id === prod.id);
        if (itemComprado) {
          const nuevoStock = Math.max(0, prod.stock - itemComprado.cantidad);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      });
      saveStoredProducts(actualizados);
      return actualizados;
    });

    clearCart();
  };

  const handleAddProduct = async (nuevoProducto) => {
    try {
      const creado = await crearProductoApi(nuevoProducto);
      setProductos(prev => [creado, ...prev]);
    } catch {
      setProductos(prev => [nuevoProducto, ...prev]);
    }
  };

  const handleUpdateProduct = async (id, datosActualizados) => {
    try {
      const actualizado = await actualizarProductoApi(id, datosActualizados);
      setProductos(prev => prev.map(p => (p.id === id ? actualizado : p)));
    } catch {
      setProductos(prev => prev.map(p => (p.id === id ? { ...p, ...datosActualizados } : p)));
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await eliminarProductoApi(id);
    } catch {
      // Manejo de error silencioso
    }
    setProductos(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header 
          cartCount={cart.length} 
          busqueda={busqueda} 
          onBusquedaChange={setBusqueda}
          usuario={usuario}
          onLogout={handleLogout}
          onOpenAdmin={() => setShowAdminModal(true)}
        /> 
        
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  productos={productos}
                  onAddToCart={addToCart}
                  usuario={usuario}
                  onOpenAdmin={() => setShowAdminModal(true)}
                />
              }
            />
            <Route
              path="/catalogo"
              element={
                <ProductList
                  productos={productos}
                  onAddToCart={addToCart}
                  busqueda={busqueda}
                  usuario={usuario}
                  onOpenAdmin={() => setShowAdminModal(true)}
                />
              }
            />
            <Route
              path="/categorias"
              element={
                <Categorias
                  productos={productos}
                  onAddToCart={addToCart}
                  usuario={usuario}
                  onOpenAdmin={() => setShowAdminModal(true)}
                />
              }
            />
            <Route
              path="/carrito"
              element={
                usuario
                  ? (
                    <Carrito
                      cart={cart}
                      productos={productos}
                      onRemove={removeFromCart}
                      onClear={clearCart}
                      onCheckout={handleCheckout}
                      usuario={usuario}
                    />
                  )
                  : <Navigate to="/login" replace />
              }
            />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/registro" element={<Registro onRegister={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        <AdminModal
          show={showAdminModal && usuario?.rol === 'admin'}
          onHide={() => setShowAdminModal(false)}
          productos={productos}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </Router>
  );
}

export default App;
