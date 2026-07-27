import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logoEssenza from './assets/essenza-logo.jpg';
import StickyBar from './components/StickyBar';
import SocialToast from './components/SocialToast';
import BenefitsGrid from './components/BenefitsGrid';
import VolumePill from './components/VolumePill';
import FragrancePills from './components/FragrancePills';
import CategoryPill from './components/CategoryPill';
import ContactPill from './components/ContactPill';
import FragrancePicker from './components/FragrancePicker';
import { getFragranceColor } from './data/fragrances';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Catalogo() {
  const whatsappContacto = "3515414073";
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/productos`)
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="min-vh-100">
      <header className="border-bottom py-3 mb-4" style={{ borderColor: '#222' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <img
            src={logoEssenza}
            alt="Logo Essenza"
            style={{ height: '65px', width: '65px', objectFit: 'cover', borderRadius: '18px' }}
          />
          <h1 className="m-0" style={{ fontFamily: 'var(--font-titles)', color: 'var(--essenza-gold)', fontSize: '2.2rem', letterSpacing: '1px' }}>
            Essenza
          </h1>
        </div>
      </header>

      <div className="container text-center mb-5">
        <p className="lead fw-light" style={{ color: '#aaa', letterSpacing: '0.5px', fontSize: '1.1rem' }}>
          El aroma es el vendedor invisible que fideliza al cliente.
        </p>
      </div>

      <main className="container pb-5">
        <h2 className="text-center text-uppercase fw-light tracking-widest mb-5" style={{ fontSize: '1.5rem', color: 'rgba(181,160,114,0.7)' }}>Nuestro Catálogo</h2>

        <div className="row g-4">
          {productos.map((perfume) => {
            const mensajeWa = encodeURIComponent(`¡Hola Essenza! Me interesa el perfume "${perfume.nombre}" (${perfume.categoria}). ¿Tenés stock disponible?`);
            const urlWhatsapp = `https://wa.me/${whatsappContacto}?text=${mensajeWa}`;

            return (
              <div key={perfume.id} className="col-11 col-sm-6 col-md-4 mx-auto">
                <div className="card h-100 border-0 rounded-3 overflow-hidden shadow card-gold-trim" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>

                  <div className="d-flex align-items-center justify-content-center" style={{ height: '240px', borderBottom: '1px solid #222', backgroundColor: '#000' }}>
                    {perfume.urlImagen ? (
                      <img
                        src={perfume.urlImagen}
                        alt={perfume.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="text-uppercase small tracking-widest" style={{ color: 'rgba(181,160,114,0.4)', fontSize: '0.7rem' }}>Sin imagen</span>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="card-title fw-bold mb-0">{perfume.nombre}</h3>
                      <CategoryPill categoria={perfume.categoria} />
                    </div>
                    <div className="d-flex justify-content-between align-items-start gap-3 flex-grow-1">
                      <p className="card-text text-muted small line-height-base fw-light mb-0">
                        {perfume.descripcion}
                      </p>
                      <VolumePill volumen={perfume.volumen} />
                    </div>

                    <FragrancePills fragancias={perfume.fragancias} />

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-3">
                      <span className="fs-4 fw-bold" style={{ color: '#fff' }}>
                        ${perfume.precio ? perfume.precio.toLocaleString('es-AR') : '0'}
                      </span>
                      <ContactPill href={urlWhatsapp}>
                        Consultar 💬
                      </ContactPill>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <StickyBar whatsappContacto={whatsappContacto} />
          <SocialToast />
        </div>
      </main>
      <BenefitsGrid />

      <footer className="text-center pt-4 border-top text-muted small" style={{ paddingBottom: '120px' }}>
        <p className="mb-0">essenza.cordoba@gmail.com</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} Essenza - Fragancias de Autor.</p>
      </footer>
    </div>
  );
}

function PanelAdmin() {
  const [formData, setFormData] = useState({
    nombre: '', categoria: 'Textil', descripcion: '', precio: '', volumen: '', fragancias: []
  });

  const [imagen, setImagen] = useState(null);
  const [productos, setProductos] = useState([]);
  const [fraganciasDisponibles, setFraganciasDisponibles] = useState([]);
  const [fraganciaNombre, setFraganciaNombre] = useState('');
  const [fraganciaColor, setFraganciaColor] = useState('#b5a072');
  const [fraganciaFeedback, setFraganciaFeedback] = useState(null);
  const [cargandoFragancias, setCargandoFragancias] = useState(true);

  const cargarProductos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/productos`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const cargarFragancias = async () => {
    try {
      setCargandoFragancias(true);
      const res = await fetch(`${API_URL}/api/fragancias`);
      if (res.ok) setFraganciasDisponibles(await res.json());
    } catch (e) {
      console.error('Error al cargar fragancias:', e);
    } finally {
      setCargandoFragancias(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarFragancias();
  }, []);

  const handleAddFragancia = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/fragancias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: fraganciaNombre, color: fraganciaColor })
      });
      if (response.ok) {
        const nuevaFragancia = await response.json();
        setFraganciasDisponibles(prev => [...prev, nuevaFragancia]);
        setFraganciaNombre('');
        setFraganciaColor('#b5a072');
        setFraganciaFeedback({ type: 'success', message: 'Fragancia agregada correctamente' });
        setTimeout(() => setFraganciaFeedback(null), 3000);
      }
    } catch (error) {
      console.error('Error al agregar fragancia:', error);
    }
  };

  const handleDeleteFragancia = async (id) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta fragancia?')) {
      try {
        const response = await fetch(`${API_URL}/api/fragancias/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setFraganciasDisponibles(prev => prev.filter(f => f.id !== id));
        }
      } catch (error) {
        console.error('Error al eliminar fragancia:', error);
      }
    }
  };

  const todasLasFragancias = fraganciasDisponibles.map(f => f.nombre);

  const coloresCombinados = {};
  fraganciasDisponibles.forEach(f => { coloresCombinados[f.nombre] = f.color; });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'fragancias') {
      return;
    }
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFragranceToggle = (fragrance) => {
    setFormData(prev => ({
      ...prev,
      fragancias: prev.fragancias.includes(fragrance)
        ? prev.fragancias.filter(f => f !== fragrance)
        : [...prev.fragancias, fragrance]
    }));
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('categoria', formData.categoria);
    data.append('descripcion', formData.descripcion);
    data.append('precio', formData.precio);
    data.append('volumen', formData.volumen);
    data.append('fragancias', formData.fragancias.join(', '));
    if (imagen) {
      data.append('imagen', imagen);
    }

    try {
      const response = await fetch(`${API_URL}/api/productos`, {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        alert('¡Perfume guardado con imagen en la nube!');
        setFormData({ nombre: '', categoria: 'Textil', descripcion: '', precio: '', volumen: '', fragancias: [] });
        setImagen(null);
        document.getElementById('imagenInput').value = '';
        cargarProductos();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este perfume del catálogo?')) {
      try {
        const response = await fetch(`${API_URL}/api/productos/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          cargarProductos();
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: 'var(--essenza-black)', color: 'var(--essenza-gold)' }}>
      <div className="container">
        <div className="row justify-content-center g-4">

          <div className="col-md-5">
            <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>
              <div className="card-header border-bottom py-3" style={{ borderColor: '#333 !important', backgroundColor: 'transparent' }}>
                <h2 className="h4 mb-0 text-center" style={{ fontFamily: 'var(--font-titles)', color: 'var(--essenza-text)'}}>Nuevo Producto</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Nombre</label>
                    <input type="text" className="form-control bg-dark text-white border-secondary" name="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Categoría</label>
                    <select className="form-select bg-dark text-white border-secondary" name="categoria" value={formData.categoria} onChange={handleChange}>
                      <option value="Textil">Textil</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Descripción</label>
                    <textarea className="form-control bg-dark text-white border-secondary" name="descripcion" rows="2" value={formData.descripcion} onChange={handleChange} required ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Precio ($)</label>
                    <input type="number" className="form-control bg-dark text-white border-secondary" name="precio" value={formData.precio} onChange={handleChange} required min="0" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Volumen (ml)</label>
                    <input type="number" className="form-control bg-dark text-white border-secondary" name="volumen" value={formData.volumen} onChange={handleChange} placeholder="100" min="1" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Fragancias / Notas</label>
                    <FragrancePicker
                      selected={formData.fragancias}
                      onChange={handleFragranceToggle}
                      available={todasLasFragancias}
                      availableColors={coloresCombinados}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small text-muted">Foto del Perfume</label>
                    <input id="imagenInput" type="file" className="form-control bg-dark text-white border-secondary" accept="image/*" onChange={handleFileChange} required />
                  </div>
                  <button type="submit" className="btn btn-gold w-100 rounded-pill fw-bold">Guardar y Subir</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>
              <div className="card-header border-bottom py-3" style={{ borderColor: '#333 !important', backgroundColor: 'transparent' }}>
                <h2 className="h4 mb-0 text-center" style={{ fontFamily: 'var(--font-titles)', color: 'var(--essenza-text)' }}>Inventario Actual</h2>
              </div>
              <div className="card-body p-0 overflow-auto" style={{ maxHeight: '500px' }}>
                <table className="table table-dark table-hover mb-0">
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                      <th>Foto</th>
                      <th>Nombre</th>
                      <th>Cat</th>
                      <th>Precio</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(p => (
                      <tr key={p.id}>
                        <td className="align-middle">
                          {p.urlImagen ? (
                            <img
                              src={p.urlImagen}
                              alt={p.nombre}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <span className="badge bg-secondary">Sin foto</span>
                          )}
                        </td>
                        <td className="align-middle">{p.nombre}</td>
                        <td className="align-middle"><span className="badge bg-dark">{p.categoria}</span></td>
                        <td className="align-middle">${p.precio}</td>
                        <td className="text-center align-middle">
                          <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-outline-danger rounded-pill px-3">
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card border-0 shadow-lg" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>
              <div className="card-header border-bottom py-3" style={{ borderColor: '#333 !important', backgroundColor: 'transparent' }}>
                <h2 className="h4 mb-0 text-center" style={{ fontFamily: 'var(--font-titles)', color: 'var(--essenza-text)' }}>Gestionar Fragancias</h2>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-5">
                    <form onSubmit={handleAddFragancia}>
                      <div className="mb-3">
                        <label className="form-label small text-muted">Nombre</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          value={fraganciaNombre}
                          onChange={(e) => setFraganciaNombre(e.target.value)}
                          required
                          placeholder="Ej: Amaderado"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small text-muted">Color</label>
                        <div className="d-flex align-items-center gap-3">
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={fraganciaColor}
                            onChange={(e) => setFraganciaColor(e.target.value)}
                            style={{ width: '50px', height: '38px', cursor: 'pointer' }}
                          />
                          <span className="small text-muted">{fraganciaColor}</span>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-gold w-100 rounded-pill fw-bold">
                        Agregar Fragancia
                      </button>
                      {fraganciaFeedback && (
                        <div className={`mt-2 small text-${fraganciaFeedback.type === 'success' ? 'success' : 'danger'}`}>
                          {fraganciaFeedback.message}
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="col-md-7">
                    {cargandoFragancias ? (
                      <div className="text-center py-4 text-muted">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status" />
                        <span className="ms-2 small">Cargando fragancias...</span>
                      </div>
                    ) : fraganciasDisponibles.length === 0 ? (
                      <p className="text-muted text-center py-4 mb-0">No hay fragancias aún</p>
                    ) : (
                      <div className="d-flex flex-column gap-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {fraganciasDisponibles.map((f) => (
                          <div
                            key={f.id}
                            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  backgroundColor: f.color,
                                  border: '1px solid rgba(255,255,255,0.15)'
                                }}
                              />
                              <span className="small text-white">{f.nombre}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteFragancia(f.id)}
                              className="btn btn-sm btn-outline-danger rounded-pill px-2 py-0"
                              style={{ fontSize: '0.65rem' }}
                            >
                              Borrar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
