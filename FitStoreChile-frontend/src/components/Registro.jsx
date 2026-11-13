import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { registroApi } from '../api.js';

const Registro = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('ROLE_CLIENTE');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password || !confirmarPassword || !edad) {
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

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden. Verifica e intenta nuevamente.');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await registroApi({ nombre, email, password, edad: edadNum, rol });

      const usuario = {
        id: respuesta.id,
        nombre: respuesta.nombre,
        email: respuesta.email,
        rol: respuesta.rol,
        tieneDescuento: respuesta.tieneDescuento
      };

      onRegister(usuario, respuesta.token);
      navigate('/');

    } catch (err) {
      if (err.isHttpError) {
        setError(err.message || 'Error al registrar usuario.');
        return;
      }

      const usuariosLocales = JSON.parse(localStorage.getItem('fitstore_usuarios') || '[]');
      const yaExiste = usuariosLocales.find(u => u.email === email);
      if (yaExiste) {
        setError('Ya existe una cuenta con ese correo electrónico.');
        return;
      }

      const tieneDescuento = email.toLowerCase().includes('@duocuc.cl') || rol === 'ROLE_ADMIN';
      const nuevoUsuario = { email, nombre, edad: edadNum, rol, tieneDescuento };

      localStorage.setItem('fitstore_usuarios', JSON.stringify([...usuariosLocales, { ...nuevoUsuario, password }]));
      onRegister(nuevoUsuario, null);
      navigate('/');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page-view py-5">
      <Container className="d-flex justify-content-center my-4">
        <Card style={{ width: '100%', maxWidth: '460px' }} className="auth-card-modern p-4">
          <div className="text-center mb-4">
            <h2 className="auth-card-title text-white">Crear Cuenta</h2>
            <p className="auth-card-subtitle">
              Únete a FitStore Chile para gestionar tus pedidos y acceder a beneficios
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Nombre Completo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

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
              <Form.Text className="text-muted" style={{ fontSize: '0.78rem' }}>
                Tip: Si usas tu correo institucional <strong>@duocuc.cl</strong>, obtienes automáticamente 20% de descuento.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Edad (debes ser mayor de 18 años)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="24"
                min="18"
                max="100"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">
                Rol de Cuenta
              </Form.Label>
              <Form.Select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="auth-input-field"
              >
                <option value="ROLE_CLIENTE">Cliente estándar</option>
                <option value="ROLE_ADMIN">Administrador (Gestión de Stock)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-4">
              <Form.Label className="auth-label">
                Confirmar Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                className="auth-input-field"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 btn-auth-submit py-2 mb-3"
              disabled={cargando}
            >
              {cargando ? <Spinner size="sm" animation="border" /> : 'Completar Registro'}
            </Button>
          </Form>

          <div className="text-center mt-3 pt-3 border-top border-secondary">
            <p className="mb-0 text-muted" style={{ fontSize: '0.88rem' }}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" style={{ color: 'var(--fs-accent)', fontWeight: 600 }}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Registro;
