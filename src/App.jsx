import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { getStoredProducts, saveStoredProducts } from './productos.js';

function App() {
  const [productos, setProductos] = useState(() => getStoredProducts());
  const [cart, setCart] = useState([]);
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

  // Sincronizar productos con localStorage cada vez que cambien
  useEffect(() => {
    saveStoredProducts(productos);
  }, [productos]);

  // Manejo de sesión de usuario
  const handleLogin = (user) => {
    setUsuario(user);
    try {
      localStorage.setItem('fitstore_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUsuario(null);
    try {
      localStorage.removeItem('fitstore_user');
    } catch (e) {
      console.error(e);
    }
  };

  // Carrito con control estricto de stock
  const addToCart = (producto) => {
    // Buscar la versión más actualizada del producto
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

  // Finalizar compra y descontar stock automáticamente
  const handleCheckout = (itemsComprados) => {
    setProductos(prevProductos => {
      const actualizados = prevProductos.map(prod => {
        const itemComprado = itemsComprados.find(i => i.id === prod.id);
        if (itemComprado) {
          const nuevoStock = Math.max(0, prod.stock - itemComprado.cantidad);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      });
      return actualizados;
    });

    // Vaciar carrito
    clearCart();
  };

  // Funciones de Administrador para gestión de productos
  const handleAddProduct = (nuevoProducto) => {
    setProductos(prev => [nuevoProducto, ...prev]);
  };

  const handleUpdateProduct = (id, datosActualizados) => {
    setProductos(prev => prev.map(p => (p.id === id ? { ...p, ...datosActualizados } : p)));
  };

  const handleDeleteProduct = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
    // También quitar del carrito si estaba
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
                <Carrito
                  cart={cart}
                  productos={productos}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                  onCheckout={handleCheckout}
                  usuario={usuario}
                />
              }
            />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/registro" element={<Registro onRegister={handleLogin} />} />
          </Routes>
        </main>

        <Footer />

        {/* Modal de administración para crear/editar productos y stock */}
        <AdminModal
          show={showAdminModal}
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
