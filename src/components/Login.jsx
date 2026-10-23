import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminDemo = () => {
    setEmail('admin@fitstore.cl');
    setPassword('admin123');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Debes ingresar tu correo y contraseña.');
      return;
    }

    const esAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'admin@fitstore.cl';
    const nuevoUsuario = {
      email,
      nombre: esAdmin ? 'Administrador FitStore' : email.split('@')[0],
      rol: esAdmin ? 'admin' : 'cliente',
      tieneDescuento: email.includes('@duocuc.cl') || esAdmin
    };

    onLogin(nuevoUsuario);
    navigate('/');
  };

  return (
    <div className="auth-page-view py-5">
      <Container className="d-flex justify-content-center my-4">
        <Card style={{ width: '100%', maxWidth: '440px' }} className="auth-card-modern p-4">
          <div className="text-center mb-4">
            <h2 className="auth-card-title text-white">Iniciar Sesión</h2>
            <p className="auth-card-subtitle">
              Ingresa con tus credenciales de cliente o administrador
            </p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Correo Electrónico
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>
            
            <Button className="btn-auth-primary w-100 mb-3" type="submit">
              Ingresar a la Plataforma
            </Button>

            {/* Acceso Rápido Demo Administrador */}
            <div className="auth-demo-box p-3 text-center mb-3">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <span className="small fw-bold text-white">¿Deseas probar el rol Administrador?</span>
                <Badge bg="warning" text="dark" style={{ fontSize: '0.7rem', fontWeight: 800 }}>Admin</Badge>
              </div>
              <p className="auth-demo-desc mb-2">
                El rol admin permite crear productos (con foto propia o sin imagen), modificar precios y controlar existencias.
              </p>
              <Button
                variant="outline-light"
                size="sm"
                type="button"
                className="w-100"
                onClick={handleAdminDemo}
              >
                Completar datos de Administrador Demo
              </Button>
            </div>

            <div className="text-center pt-2">
              <span className="small text-muted me-1">¿No tienes cuenta?</span>
              <Link to="/registro" className="small text-white fw-bold text-decoration-underline">
                Regístrate aquí
              </Link>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
