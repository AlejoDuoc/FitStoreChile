import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registro = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');

    // CONTROL DE EXCEPCIONES (Validaciones)
    if (!email || !password || !edad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum < 18) {
      setError('Debes ser mayor de 18 años para registrarte.');
      return;
    }
    if (edadNum > 100) {
      setError('Por favor, ingresa una edad válida.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // LÓGICA DE DESCUENTO: Solo con tener correo @duocuc.cl
    const tieneDescuento = email.toLowerCase().includes('@duocuc.cl');

    // Guardamos al usuario en la memoria de la App
    onRegister({ email, edad: edadNum, tieneDescuento });
    
    alert(tieneDescuento ? '¡Bienvenido! Tienes un 20% de descuento DuocUC activado.' : '¡Registro exitoso! Bienvenido a la comunidad.');
    navigate('/'); // Redirige al inicio
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '420px' }} className="auth-card shadow-sm p-4">
        <h3 className="text-center mb-4" style={{ fontWeight: 600 }}>Únete a la Comunidad</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fs-gray-700)' }}>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@duocuc.cl" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fs-gray-700)' }}>Edad</Form.Label>
            <Form.Control type="number" placeholder="Ej: 22" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fs-gray-700)' }}>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <Button className="btn-add-cart w-100" type="submit">Registrarse</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Registro;