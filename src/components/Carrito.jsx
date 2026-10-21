import React from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Carrito = ({ cart, onRemove, onClear, usuario }) => {
  // Agrupamos los productos por id para mostrar cantidades
  const agrupados = cart.reduce((acc, producto, index) => {
    const found = acc.find(item => item.id === producto.id);
    if (found) {
      found.cantidad += 1;
      found.indices.push(index);
    } else {
      acc.push({ ...producto, cantidad: 1, indices: [index] });
    }
    return acc;
  }, []);

  // 1. Calculamos el subtotal (suma normal)
  const subtotal = cart.reduce((suma, producto) => suma + producto.precio, 0);
  
  // 2. Calculamos el descuento si el usuario cumple las reglas
  const descuento = usuario?.tieneDescuento ? (subtotal * 0.20) : 0;
  
  // 3. Calculamos el total final
  const totalFinal = subtotal - descuento;

  const handlePago = () => {
    alert(`¡Pago de $${totalFinal.toLocaleString('es-CL')} realizado con éxito!`);
    onClear();
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="section-title mb-4">Tu Carrito</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}></p>
          <p style={{ color: 'var(--fs-gray-500)', fontSize: '1.1rem' }}>Tu carrito está vacío</p>
          <Link to="/" className="btn btn-add-cart mt-3">Explorar productos</Link>
        </div>
      ) : (
        <>
          <Table hover responsive className="cart-table bg-white align-middle">
            <thead className="table-dark">
              <tr>
                <th>Producto</th><th>Precio unit.</th><th className="text-center">Cantidad</th><th className="text-end">Subtotal</th><th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {agrupados.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.nombre}</td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td className="text-center">
                    <span style={{ 
                      background: 'var(--fs-gray-100)', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '4px',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}>
                      {item.cantidad}
                    </span>
                  </td>
                  <td className="text-end" style={{ fontWeight: 600 }}>
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </td>
                  <td className="text-center">
                    <Button 
                      variant="" 
                      size="sm" 
                      style={{ color: 'var(--fs-danger)', background: 'none', border: 'none', fontSize: '1rem' }}
                      onClick={() => onRemove(item.indices[item.indices.length - 1])}
                    >
                      ✕
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="summary-box mt-4">
            <h5>Subtotal: ${subtotal.toLocaleString('es-CL')}</h5>
            
            {/* Si tiene descuento, mostramos el aviso */}
            {usuario?.tieneDescuento && (
              <h5 style={{ color: 'var(--fs-success)' }}>
                Descuento DuocUC (20%): -${descuento.toLocaleString('es-CL')} <Badge bg="success">¡Aplicado!</Badge>
              </h5>
            )}
            
            <hr style={{ borderColor: 'var(--fs-gray-300)' }} />
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h3 className="mb-0">Total: <span>${totalFinal.toLocaleString('es-CL')}</span></h3>
              <div className="d-flex gap-2">
                <Button variant="" style={{ border: '1px solid var(--fs-gray-300)', color: 'var(--fs-gray-700)', borderRadius: 'var(--fs-radius)' }} onClick={onClear}>Vaciar Carrito</Button>
                <Button className="btn-pay" onClick={handlePago}>Proceder al Pago</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;