import React, { useState } from 'react';
import { Modal, Button, Form, Table, Badge, Row, Col, Alert } from 'react-bootstrap';

const AdminModal = ({ show, onHide, productos, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [activeTab, setActiveTab] = useState('lista'); // 'lista' | 'nuevo'
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', categoria: 'Ropa Deportiva', precio: '', stock: '', imagen: '', descripcion: '' });
  
  // Tipo de selección de imagen: 'subir' | 'catalogo' | 'url' | 'ninguna'
  const [tipoImagen, setTipoImagen] = useState('catalogo');

  // Formulario nuevo producto
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

  // Manejo de subida de archivo local
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAlerta({ tipo: 'danger', mensaje: 'La imagen seleccionada supera los 2MB. Por favor elige una imagen más liviana.' });
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
      setAlerta({ tipo: 'danger', mensaje: 'Por favor completa todos los campos requeridos.' });
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
    setAlerta({ tipo: 'success', mensaje: `¡Producto "${nuevo.nombre}" agregado con stock de ${nuevo.stock} unidades!` });
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

  const handleSaveEdit = (id) => {
    onUpdateProduct(id, {
      nombre: editForm.nombre,
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
          <span className="fw-bold">Panel de Administración — FitStore</span>
          <Badge bg="dark" className="text-uppercase" style={{ letterSpacing: '0.05em', fontSize: '0.7rem' }}>
            Control de Inventario & Catálogo
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
                            textAlign: 'center',
                            lineHeight: 1.1
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
                            <Button size="sm" variant="success" onClick={() => handleSaveEdit(p.id)}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="outline-secondary" onClick={() => setEditingId(null)}>
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
                                if (window.confirm(`¿Seguro que deseas eliminar "${p.nombre}"?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                            >
                              Quitar
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
          <Form onSubmit={handleCrear} className="p-2">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Nombre del Producto *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Ej. Straps de Cuero Pro Lifting"
                    value={nuevoForm.nombre}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, nombre: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Categoría *</Form.Label>
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

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Precio en CLP ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min="1000"
                    step="500"
                    placeholder="Ej. 19990"
                    value={nuevoForm.precio}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, precio: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Stock Inicial *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min="0"
                    placeholder="Ej. 15"
                    value={nuevoForm.stock}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, stock: e.target.value })}
                  />
                  <Form.Text className="text-muted">Unidades disponibles en inventario.</Form.Text>
                </Form.Group>
              </Col>

              {/* OPCIONES DE IMAGEN: SUBIR NUEVA / SELECCIONAR / DEJAR SIN IMAGEN */}
              <Col md={12}>
                <div className="p-3 bg-light rounded border mb-3">
                  <Form.Label className="fw-semibold small d-block mb-2">Fotografía del Producto</Form.Label>
                  
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <Button
                      type="button"
                      size="sm"
                      variant={tipoImagen === 'subir' ? 'dark' : 'outline-secondary'}
                      onClick={() => setTipoImagen('subir')}
                    >
                      Subir foto desde el equipo
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={tipoImagen === 'catalogo' ? 'dark' : 'outline-secondary'}
                      onClick={() => setTipoImagen('catalogo')}
                    >
                      Elegir del catálogo existente
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={tipoImagen === 'url' ? 'dark' : 'outline-secondary'}
                      onClick={() => setTipoImagen('url')}
                    >
                      Pegar enlace / URL web
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={tipoImagen === 'ninguna' ? 'dark' : 'outline-secondary'}
                      onClick={() => {
                        setTipoImagen('ninguna');
                        setNuevoForm(prev => ({ ...prev, imagen: '' }));
                      }}
                    >
                      Dejar sin imagen
                    </Button>
                  </div>

                  {tipoImagen === 'subir' && (
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted">Selecciona una imagen en formato JPG, PNG o WEBP:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </Form.Group>
                  )}

                  {tipoImagen === 'catalogo' && (
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted">Selecciona una de las imágenes disponibles en la tienda:</Form.Label>
                      <Form.Select
                        value={nuevoForm.imagen}
                        onChange={(e) => setNuevoForm({ ...nuevoForm, imagen: e.target.value })}
                      >
                        {imagenesDisponibles.map((img) => (
                          <option key={img.path} value={img.path}>{img.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}

                  {tipoImagen === 'url' && (
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted">Pega el link directo a la imagen:</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://ejemplo.com/foto-producto.jpg"
                        value={nuevoForm.imagen}
                        onChange={(e) => setNuevoForm({ ...nuevoForm, imagen: e.target.value })}
                      />
                    </Form.Group>
                  )}

                  {tipoImagen === 'ninguna' && (
                    <p className="small text-muted mb-0">
                      El producto se creará sin imagen. En el catálogo se desplegará con un diseño de ficha técnica sobrio.
                    </p>
                  )}

                  {/* Vista previa de la imagen */}
                  {tipoImagen !== 'ninguna' && nuevoForm.imagen && (
                    <div className="mt-3 d-flex align-items-center gap-3">
                      <span className="small text-muted">Vista previa:</span>
                      <img
                        src={nuevoForm.imagen}
                        alt="Previsualización"
                        style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#fff', borderRadius: '4px', border: '1px solid #ccc' }}
                        onError={(e) => { e.target.src = '/imagenes/polera-oversize-gym.jpg'; }}
                      />
                    </div>
                  )}
                </div>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Descripción Técnica del Producto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Describe los beneficios, material, composición o uso sugerido..."
                    value={nuevoForm.descripcion}
                    onChange={(e) => setNuevoForm({ ...nuevoForm, descripcion: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="outline-secondary" onClick={() => setActiveTab('lista')}>
                  Cancelar
                </Button>
                <Button variant="dark" type="submit" className="px-4">
                  Publicar Producto
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminModal;
