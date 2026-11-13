import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/components/Login';

describe('Componente Login', () => {
  it('renderiza el formulario y el botón de ingresar correctamente', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const boton = screen.getByRole('button', { name: /Ingresar/i });
    // Comprobación nativa de Jasmine
    expect(boton).toBeDefined();
  });
});