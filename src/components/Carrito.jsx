import React, { useState } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Carrito = ({ cart, onRemove, onClear, onCheckout, usuario, productos = [] }) => {
  const [mensajeExito, setMensajeExito] = useState(null);
  const [errorStock, setErrorStock] = useState(null);

  // Agrupamos los productos por id para mostrar cantidades
  const agrupados = cart.reduce((acc, producto, index) => {
    const found = acc.find(item => item.id === producto.id);
    const prodActual = productos.find(p => p.id === producto.id) || producto;
    const stockActual = prodActual.stock !== undefined ? prodActual.stock : 99;

    if (found) {
      found.cantidad += 1;
      found.indices.push(index);
    } else {
      acc.push({
        ...producto,
        stockDisponible: stockActual,
        cantidad: 1,
        indices: [index]
      });
    }
    return acc;
  }, []);

  // 1. Calculamos el subtotal
  const subtotal = cart.reduce((suma, producto) => suma + producto.precio, 0);
  
  // 2. Calculamos el descuento si el usuario cumple las reglas (ej: alumno duoc o admin)
  const descuento = usuario?.tieneDescuento ? (subtotal * 0.20) : 0;
  
  // 3. Calculamos el total final
  const totalFinal = subtotal - descuento;

  const handlePago = () => {
    setErrorStock(null);

    // Validar si algún producto excede el stock actual
    for (const item of agrupados) {
      const prodOriginal = productos.find(p => p.id === item.id);
      const stockReal = prodOriginal ? prodOriginal.stock : 0;
      if (item.cantidad > stockReal) {
        setErrorStock(`Lo sentimos, "${item.nombre}" solo tiene ${stockReal} unidades en stock (tienes ${item.cantidad} en el carrito).`);
        return;
      }
    }

    if (onCheckout) {
      onCheckout(agrupados, totalFinal);
      setMensajeExito(`¡Compra por $${totalFinal.toLocaleString('es-CL')} confirmada con éxito! El stock ha sido descontado.`);
    } else {
      alert(`¡Pago de $${totalFinal.toLocaleString('es-CL')} realizado con éxito!`);
      onClear();
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="section-title mb-1">Tu Carrito de Compras</h2>
          <p className="section-subtitle mb-0">Revisa tus productos y verifica la disponibilidad de stock</p>
        </div>
        <Link to="/catalogo" className="btn btn-outline-dark btn-sm">
          ← Seguir Comprando
        </Link>
      </div>

      {mensajeExito && (
        <Alert variant="success" className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Confirmacion: </strong> {mensajeExito}
          </div>
          <Link to="/" className="btn btn-sm btn-dark">Volver al Inicio</Link>
        </Alert>
      )}

      {errorStock && (
        <Alert variant="danger">
          <strong>Aviso de Inventario: </strong> {errorStock}
        </Alert>
      )}

      {cart.length === 0 && !mensajeExito ? (
        <div className="text-center py-5 border rounded bg-light">
          <h4 className="fw-normal mb-2 text-dark">Tu carrito está vacío</h4>
          <p style={{ color: 'var(--fs-gray-500)', fontSize: '0.95rem' }}>
            Explora nuestro catálogo de ropa técnica, suplementos de alto rendimiento y accesorios.
          </p>
          <Link to="/catalogo" className="btn btn-dark mt-3 px-4">
            Explorar Productos
          </Link>
        </div>
      ) : !mensajeExito && (
        <>
          <div className="table-responsive">
            <Table hover responsive className="cart-table bg-white align-middle border">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th className="text-center">Stock Disp.</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Quitar</th>
                </tr>
              </thead>
              <tbody>
                {agrupados.map((item) => {
                  const prodDb = productos.find(p => p.id === item.id);
                  const stockActual = prodDb ? prodDb.stock : item.stockDisponible;
                  const sinSuficienteStock = item.cantidad > stockActual;

                  return (
                    <tr key={item.id} className={sinSuficienteStock ? 'table-warning' : ''}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => { e.target.src = '/imagenes/polera-oversize-gym.jpg'; }}
                          />
                          <div>
                            <span className="fw-semibold d-block">{item.nombre}</span>
                            <small className="text-muted">{item.categoria}</small>
                          </div>
                        </div>
                      </td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <span className={`badge ${stockActual === 0 ? 'bg-danger' : stockActual <= 3 ? 'bg-warning text-dark' : 'bg-light text-dark border'}`}>
                          {stockActual} uds.
                        </span>
                      </td>
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
                          variant="link"
                          size="sm"
                          style={{ color: 'var(--fs-danger)', textDecoration: 'none', fontSize: '0.82rem', padding: 0 }}
                          onClick={() => onRemove(item.indices[item.indices.length - 1])}
                          title="Eliminar una unidad"
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div className="summary-box mt-4 p-4 border bg-white rounded">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal de productos:</span>
              <span className="fw-semibold">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            
            {usuario?.tieneDescuento && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Descuento Especial (20%):</span>
                <span>-${descuento.toLocaleString('es-CL')}</span>
              </div>
            )}
            
            <div className="pt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <span className="text-uppercase small text-muted d-block" style={{ letterSpacing: '0.05em' }}>Monto Total</span>
                  <h3 className="mb-0 fw-bold">${totalFinal.toLocaleString('es-CL')} CLP</h3>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={onClear}>
                    Vaciar Carrito
                  </Button>
                  <Button className="btn-pay px-4" onClick={handlePago}>
                    Proceder al Pago & Descontar Stock
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;
