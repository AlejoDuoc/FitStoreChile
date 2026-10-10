import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import Carrito from './components/Carrito.jsx';
import Nosotros from './components/Nosotros.jsx';
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import Categorias from './components/Categorias.jsx';
import Footer from './components/Footer.jsx'; // 1. IMPORTAMOS EL FOOTER

function App() {
  const [cart, setCart] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const addToCart = (producto) => setCart([...cart, producto]);
  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const clearCart = () => setCart([]);

  return (
    <Router>
      {/* 2. Le decimos al contenedor principal que ocupe todo el alto de la pantalla (min-vh-100) */}
      <div className="d-flex flex-column min-vh-100">
        
        <Header cartCount={cart.length} /> 
        
        {/* flex-grow-1 empuja el footer hacia abajo */}
        <main className="container mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
            <Route path="/categorias" element={<Categorias onAddToCart={addToCart} />} />
            <Route path="/carrito" element={<Carrito cart={cart} onRemove={removeFromCart} onClear={clearCart} usuario={usuario} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login onLogin={setUsuario} />} />
            <Route path="/registro" element={<Registro onRegister={setUsuario} />} />
          </Routes>
        </main>

        {/* 3. AGREGAMOS EL FOOTER AL FINAL */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;