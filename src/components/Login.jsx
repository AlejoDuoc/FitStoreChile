import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // CONTROL DE EXCEPCIONES
    if (!email || !password) {
      setError('Debes ingresar tu correo y contraseña.');
      return;
    }

    // Simulamos que inició sesión (sin descuento por defecto, asumiendo que es un usuario normal para este ejemplo rápido)
    onLogin({ email, tieneDescuento: email.includes('@duocuc.cl') }); 
    alert('¡Inicio de sesión exitoso!');
    navigate('/');
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-sm border-0 bg-light p-4">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <Button variant="dark" type="submit" className="w-100">Ingresar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;