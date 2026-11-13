import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../src/components/Registro';

describe('Componente Registro de Usuario', () => {
  it('renderiza todos los campos obligatorios del formulario de registro', () => {
    render(
      <BrowserRouter>
        <Registro onRegister={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Juan Pérez/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/ejemplo@correo\.cl/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/24/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Mínimo 6 caracteres/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Repite tu contraseña/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Completar Registro/i })).toBeDefined();
  });
});
