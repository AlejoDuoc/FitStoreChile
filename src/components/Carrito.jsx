import React from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Carrito = ({ cart, onRemove, onClear, usuario }) => {
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
      <h2 className="mb-4">Tu Carrito de Compras</h2>

      {cart.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío en este momento.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="bg-white align-middle">
            <thead className="table-dark">
              <tr>
                <th>Producto</th><th>Precio</th><th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td className="text-center">
                    <Button variant="danger" size="sm" onClick={() => onRemove(index)}>❌</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-4 p-4 bg-light border rounded">
            <h5>Subtotal: ${subtotal.toLocaleString('es-CL')}</h5>
            
            {/* Si tiene descuento, mostramos el aviso */}
            {usuario?.tieneDescuento && (
              <h5 className="text-success">
                Descuento DuocUC (20%): -${descuento.toLocaleString('es-CL')} <Badge bg="success">¡Aplicado!</Badge>
              </h5>
            )}
            
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Total a pagar: <span className="text-primary">${totalFinal.toLocaleString('es-CL')}</span></h3>
              <div>
                <Button variant="outline-danger" className="me-2" onClick={onClear}>Vaciar Carrito</Button>
                <Button variant="success" size="lg" onClick={handlePago}>Proceder al Pago</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;