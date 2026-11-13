import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api.js';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleAdminDemo = () => {
    setEmail('admin@fitstore.cl');
    setPassword('admin123');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Debes ingresar tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await loginApi(email, password);
      const usuario = {
        id: respuesta.id,
        nombre: respuesta.nombre,
        email: respuesta.email,
        rol: respuesta.rol,
        tieneDescuento: respuesta.tieneDescuento
      };

      onLogin(usuario, respuesta.token);
      navigate('/');
    } catch (err) {
      if (err.isHttpError) {
        setError(err.message || 'Correo o contraseña incorrectos.');
        return;
      }

      const esAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'admin@fitstore.cl';
      const usuarioSimulado = {
        email,
        nombre: esAdmin ? 'Administrador FitStore' : email.split('@')[0],
        rol: esAdmin ? 'ROLE_ADMIN' : 'ROLE_CLIENTE',
        tieneDescuento: email.includes('@duocuc.cl') || esAdmin
      };

      onLogin(usuarioSimulado, null);
      navigate('/');
    } finally {
      setCargando(false);
    }
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

            <Button
              type="submit"
              className="w-100 btn-auth-submit py-2 mb-3"
              disabled={cargando}
            >
              {cargando ? <Spinner size="sm" animation="border" /> : 'Ingresar a mi cuenta'}
            </Button>

            <Button
              type="button"
              variant="outline-light"
              size="sm"
              className="w-100 mb-3"
              style={{ fontSize: '0.8rem', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={handleAdminDemo}
            >
              Completar datos de Administrador Demo
            </Button>
          </Form>

          <div className="text-center mt-3 pt-3 border-top border-secondary">
            <p className="mb-0 text-muted" style={{ fontSize: '0.88rem' }}>
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" style={{ color: 'var(--fs-accent)', fontWeight: 600 }}>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
