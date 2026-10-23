import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Registro = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !edad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

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

    const tieneDescuento = email.toLowerCase().includes('@duocuc.cl') || rol === 'admin';

    onRegister({
      email,
      nombre: email.split('@')[0],
      edad: edadNum,
      rol,
      tieneDescuento
    });
    
    navigate('/');
  };

  return (
    <div className="auth-page-view py-5">
      <Container className="d-flex justify-content-center my-4">
        <Card style={{ width: '100%', maxWidth: '460px' }} className="auth-card-modern p-4">
          <div className="text-center mb-4">
            <h2 className="auth-card-title text-white">Crear Cuenta</h2>
            <p className="auth-card-subtitle">
              Regístrate para comprar y gestionar tu perfil en FitStore Chile
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
                placeholder="ejemplo@correo.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Edad
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 24"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Tipo de Usuario / Rol
              </Form.Label>
              <Form.Select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="auth-input-field"
              >
                <option value="cliente">Cliente (Comprador habitual)</option>
                <option value="admin">Administrador (Gestión de stock, precios y catálogo)</option>
              </Form.Select>
              <Form.Text className="text-light opacity-75 small">
                Selecciona Administrador si deseas probar el panel de control de inventario.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>
            
            <Button className="btn-auth-primary w-100 mb-3" type="submit">
              Completar Registro
            </Button>

            <div className="text-center pt-2">
              <span className="small text-muted me-1">¿Ya tienes una cuenta?</span>
              <Link to="/login" className="small text-white fw-bold text-decoration-underline">
                Inicia sesión aquí
              </Link>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Registro;
