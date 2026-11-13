import React, { useState } from 'react';
import { Modal, Button, Form, Table, Badge, Row, Col, Alert } from 'react-bootstrap';

const AdminModal = ({ show, onHide, productos, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [activeTab, setActiveTab] = useState('lista');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', categoria: 'Ropa Deportiva', precio: '', stock: '', imagen: '', descripcion: '' });
  const [tipoImagen, setTipoImagen] = useState('catalogo');

  const [nuevoForm, setNuevoForm] = useState({
    nombre: '',
    categoria: 'Ropa Deportiva',
    precio: '',
    stock: '',
    imagen: '/imagenes/polera-oversize-gym.jpg',
    descripcion: ''
  });
  const [alerta, setAlerta] = useState(null);

  const imagenesDisponibles = [
    { label: 'Polera Oversize Gym', path: '/imagenes/polera-oversize-gym.jpg' },
    { label: 'Hooded Sweatshirt Heavy', path: '/imagenes/hooded-sweatshirt-heavy.jpg' },
    { label: 'Calza Compresión Pro', path: '/imagenes/calza-compresion-pro.jpg' },
    { label: 'Short Running DryFit', path: '/imagenes/short-running-dryfit.jpg' },
    { label: 'Proteína Whey Isolate', path: '/imagenes/proteina-whey-isolate.jpg' },
    { label: 'Creatina Monohidratada', path: '/imagenes/creatina-monohidratada.jpg' },
    { label: 'Pre-Workout Explosion', path: '/imagenes/pre-workout-explosion.jpg' },
    { label: 'Cinturón Levantamiento Cuero', path: '/imagenes/cinturon-levantamiento.jpg' },
    { label: 'Straps Heavy Algodón', path: '/imagenes/straps-algodon.jpg' },
    { label: 'Botella Shaker 1L', path: '/imagenes/botella-shaker.jpg' },
    { label: 'Rodilleras 7mm Neopreno', path: '/imagenes/rodilleras.jpg' },
    { label: 'Magnesio Líquido', path: '/imagenes/magnesio-liquido.jpg' },
    { label: 'Bandas de Resistencia', path: '/imagenes/bandas-resistencia.jpg' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAlerta({ tipo: 'danger', mensaje: 'La imagen supera los 2MB. Selecciona una más liviana.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoForm(prev => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrear = (e) => {
    e.preventDefault();
    if (!nuevoForm.nombre || !nuevoForm.precio || nuevoForm.stock === '') {
      setAlerta({ tipo: 'danger', mensaje: 'Completa todos los campos obligatorios.' });
      return;
    }

    const imagenFinal = tipoImagen === 'ninguna' ? '' : nuevoForm.imagen;

    const nuevo = {
      id: Date.now(),
      nombre: nuevoForm.nombre.trim(),
      categoria: nuevoForm.categoria,
      precio: Number(nuevoForm.precio),
      stock: Math.max(0, parseInt(nuevoForm.stock, 10)),
      imagen: imagenFinal,
      descripcion: nuevoForm.descripcion || 'Producto oficial FitStore Chile.'
    };

    onAddProduct(nuevo);
    setAlerta({ tipo: 'success', mensaje: `Producto "${nuevo.nombre}" creado exitosamente.` });
    setNuevoForm({
      nombre: '',
      categoria: 'Ropa Deportiva',
      precio: '',
      stock: '',
      imagen: '/imagenes/polera-oversize-gym.jpg',
      descripcion: ''
    });
    setTipoImagen('catalogo');

    setTimeout(() => {
      setActiveTab('lista');
      setAlerta(null);
    }, 1200);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio,
      stock: p.stock,
      imagen: p.imagen || '',
      descripcion: p.descripcion || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    if (!editForm.nombre || editForm.precio === '' || editForm.stock === '') {
      setAlerta({ tipo: 'danger', mensaje: 'El nombre, precio y stock son requeridos.' });
      return;
    }

    onUpdateProduct(id, {
      nombre: editForm.nombre.trim(),
      categoria: editForm.categoria,
      precio: Number(editForm.precio),
      stock: Math.max(0, parseInt(editForm.stock, 10)),
      imagen: editForm.imagen,
      descripcion: editForm.descripcion
    });
    setEditingId(null);
    setAlerta({ tipo: 'success', mensaje: 'Producto actualizado exitosamente.' });
    setTimeout(() => setAlerta(null), 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered className="admin-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center gap-2">
          <span className="fw-bold">Panel de Administración</span>
          <Badge bg="dark" className="text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>
            Control de Inventario
          </Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {alerta && <Alert variant={alerta.tipo} dismissible onClose={() => setAlerta(null)}>{alerta.mensaje}</Alert>}

        <div className="d-flex gap-2 mb-4 border-bottom pb-3">
          <Button
            variant={activeTab === 'lista' ? 'dark' : 'outline-secondary'}
            size="sm"
            onClick={() => setActiveTab('lista')}
            className="px-3"
          >
            Inventario & Stock ({productos.length})
          </Button>
          <Button
            variant={activeTab === 'nuevo' ? 'dark' : 'outline-secondary'}
            size="sm"
            onClick={() => setActiveTab('nuevo')}
            className="px-3"
          >
            + Agregar Nuevo Producto
          </Button>
        </div>

        {activeTab === 'lista' ? (
          <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <Table hover align="middle" className="admin-table">
              <thead className="table-light sticky-top">
                <tr>
                  <th style={{ width: '70px' }}>Foto</th>
                  <th>Nombre & Descripción</th>
                  <th>Categoría</th>
                  <th style={{ width: '130px' }}>Precio (CLP)</th>
                  <th style={{ width: '110px' }}>Stock</th>
                  <th className="text-end" style={{ width: '140px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id}>
                      <td>
                        {p.imagen ? (
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => { e.target.src = '/imagenes/polera-oversize-gym.jpg'; }}
                          />
                        ) : (
                          <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#e9ecef',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#6c757d',
                            textAlign: 'center'
                          }}>
                            Sin foto
                          </div>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            size="sm"
                            value={editForm.nombre}
                            onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                          />
                        ) : (
                          <div>
                            <div className="fw-semibold">{p.nombre}</div>
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '280px' }}>
                              {p.descripcion}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Form.Select
                            size="sm"
                            value={editForm.categoria}
                            onChange={(e) => setEditForm({ ...editForm, categoria: e.target.value })}
                          >
                            <option value="Ropa Deportiva">Ropa Deportiva</option>
                            <option value="Suplementos">Suplementos</option>
                            <option value="Accesorios">Accesorios</option>
                          </Form.Select>
                        ) : (
                          <span className="badge bg-light text-dark border">{p.categoria}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            type="number"
                            size="sm"
                            value={editForm.precio}
                            onChange={(e) => setEditForm({ ...editForm, precio: e.target.value })}
                          />
                        ) : (
                          <span className="fw-bold">${p.precio.toLocaleString('es-CL')}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <Form.Control
                            type="number"
                            size="sm"
                            min="0"
                            value={editForm.stock}
                            onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                          />
                        ) : (
                          <span className={`badge ${p.stock === 0 ? 'bg-danger' : p.stock <= 4 ? 'bg-warning text-dark' : 'bg-success'}`}>
                            {p.stock} uds.
                          </span>
                        )}
                      </td>
                      <td className="text-end">
                        {isEditing ? (
                          <div className="d-flex gap-1 justify-content-end">
                            <Button size="sm" variant="success" onClick={() => saveEdit(p.id)}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="outline-secondary" onClick={cancelEdit}>
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <div className="d-flex gap-1 justify-content-end">
                            <Button size="sm" variant="outline-dark" onClick={() => startEdit(p)}>
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => {
                                if (window.confirm(`¿Estás seguro de eliminar "${p.nombre}"?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                            >
                              Eliminar
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <Form onSubmit={handleCrear}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Nombre del Producto</Form.Label>
                  <Form.Control
                    placeholder="Ej: Calza Deportiva Compresión"
                    value={nuevoForm.nombre}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, nombre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Categoría</Form.Label>
                  <Form.Select
                    value={nuevoForm.categoria}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, categoria: e.target.value })}
                  >
                    <option value="Ropa Deportiva">Ropa Deportiva</option>
                    <option value="Suplementos">Suplementos</option>
                    <option value="Accesorios">Accesorios</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Precio Unitario ($ CLP)</Form.Label>
                  <Form.Control
                    type="number"
                    min="100"
                    placeholder="19990"
                    value={nuevoForm.precio}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, precio: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Stock Inicial en Bodega</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="15"
                    value={nuevoForm.stock}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, stock: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Descripción Técnica</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Breve detalle del material, gramaje o uso recomendado..."
                value={nuevoForm.descripcion}
                onChange={(e) => setNuevoForm({ ...nuevoForm, descripcion: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold d-block">Fotografía del Producto</Form.Label>
              
              <div className="d-flex gap-3 mb-3">
                <Form.Check
                  inline
                  type="radio"
                  id="img-cat"
                  label="Elegir del Catálogo Local"
                  checked={tipoImagen === 'catalogo'}
                  onChange={() => setTipoImagen('catalogo')}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="img-upload"
                  label="Subir desde mi PC"
                  checked={tipoImagen === 'subir'}
                  onChange={() => setTipoImagen('subir')}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="img-none"
                  label="Sin Imagen (Solo Nombre)"
                  checked={tipoImagen === 'ninguna'}
                  onChange={() => setTipoImagen('ninguna')}
                />
              </div>

              {tipoImagen === 'catalogo' && (
                <Form.Select
                  value={nuevoForm.imagen}
                  onChange={(e) => setNuevoForm({ ...nuevoForm, imagen: e.target.value })}
                >
                  {imagenesDisponibles.map(img => (
                    <option key={img.path} value={img.path}>{img.label}</option>
                  ))}
                </Form.Select>
              )}

              {tipoImagen === 'subir' && (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              )}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              <Button variant="outline-secondary" onClick={() => setActiveTab('lista')}>
                Volver a la lista
              </Button>
              <Button variant="dark" type="submit" className="px-4">
                Dar de Alta Producto
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminModal;
