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
      <Card style={{ width: '100%', maxWidth: '420px' }} className="auth-card shadow-sm p-4">
        <h3 className="text-center mb-4" style={{ fontWeight: 600 }}>Iniciar Sesión</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fs-gray-700)' }}>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fs-gray-700)' }}>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <Button className="btn-add-cart w-100" type="submit">Ingresar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;