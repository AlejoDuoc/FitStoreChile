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
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (parseInt(edad) < 18) {
      setError('Debes ser mayor de 18 años para registrarte.');
      return;
    }

    // LÓGICA DE DESCUENTO
    // Si el correo contiene @duocuc.cl Y la edad es mayor a 50
    const tieneDescuento = email.includes('@duocuc.cl') && parseInt(edad) > 50;

    // Guardamos al usuario en la memoria de la App
    onRegister({ email, edad: parseInt(edad), tieneDescuento });
    
    alert(tieneDescuento ? '¡Bienvenido! Tienes un 20% de descuento activado.' : '¡Registro exitoso! Bienvenido a la comunidad.');
    navigate('/'); // Redirige al inicio
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-sm border-0 bg-light p-4">
        <h3 className="text-center mb-4">Únete a la Comunidad</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@duocuc.cl" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="number" placeholder="Ej: 51" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <Button variant="dark" type="submit" className="w-100">Registrarse</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Registro;