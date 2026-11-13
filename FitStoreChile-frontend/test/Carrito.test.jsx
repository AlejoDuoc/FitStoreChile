import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../src/components/Carrito';

describe('Módulo de Carrito e Integración de Negocio', () => {
  const mockProductos = [
    { id: 1, nombre: 'Proteína Whey Isolate', precio: 20000, stock: 5, categoria: 'Suplementos', imagen: '/img.jpg' }
  ];

  it('calcula correctamente el subtotal sin descuento para cliente estándar', () => {
    const cart = [mockProductos[0], mockProductos[0]]; // 2 unidades = $40.000
    const usuarioEstandar = { nombre: 'Cliente', tieneDescuento: false, rol: 'cliente' };

    render(
      <BrowserRouter>
        <Carrito cart={cart} productos={mockProductos} usuario={usuarioEstandar} />
      </BrowserRouter>
    );

    // Debe mostrar el total de 40.000
    expect(screen.getByText(/\$40\.000 CLP/i)).toBeDefined();
  });

  it('aplica el 20% de descuento institucional a usuarios con tieneDescuento activo', () => {
    const cart = [mockProductos[0]]; // $20.000 -> con 20% descuento queda en $16.000
    const usuarioDuoc = { nombre: 'Alumno Duoc', tieneDescuento: true, rol: 'cliente' };

    render(
      <BrowserRouter>
        <Carrito cart={cart} productos={mockProductos} usuario={usuarioDuoc} />
      </BrowserRouter>
    );

    // Debe mostrar la etiqueta de Descuento Especial (20%) y el monto final con descuento
    expect(screen.getByText(/Descuento Especial \(20%\)/i)).toBeDefined();
    expect(screen.getByText(/\$16\.000 CLP/i)).toBeDefined();
  });

  it('muestra estado vacío cuando el carrito no tiene artículos agregados', () => {
    render(
      <BrowserRouter>
        <Carrito cart={[]} productos={mockProductos} usuario={null} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeDefined();
  });
});
