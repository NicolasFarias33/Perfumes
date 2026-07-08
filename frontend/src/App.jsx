import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logoEssenza from './assets/essenza-logo.jpg';

function Catalogo() {
  const whatsappContacto = "5493510000000";
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="min-vh-100">
      <header className="border-bottom py-3 mb-4" style={{ backgroundColor: 'var(--essenza-black)', borderColor: '#222' }}>
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
                  
                  <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ height: '240px', borderBottom: '1px solid #222' }}>
                    <span className="text-uppercase small tracking-widest" style={{ color: 'rgba(181,160,114,0.4)', fontSize: '0.7rem' }}>Fragancia {perfume.categoria}</span>
                  </div>

                  <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className={`badge rounded-pill fw-normal px-3 py-2 ${
                        perfume.categoria === 'Textil' ? 'bg-info bg-opacity-10 text-info' : 'bg-warning bg-opacity-10 text-warning'
                      }`}>
                        {perfume.categoria}
                      </span>
                    </div>

                    <h3 className="h5 card-title fw-bold mb-2">{perfume.nombre}</h3>
                    <p className="card-text text-muted small flex-grow-1 line-height-base fw-light">
                      {perfume.descripcion}
                    </p>

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-3">
                      <span className="fs-4 fw-bold" style={{ color: '#fff' }}>${perfume.precio.toLocaleString('es-AR')}</span>
                      <a 
                        href={urlWhatsapp} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-gold rounded-pill px-4 btn-sm tracking-wide text-uppercase fw-bold"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Consultar 💬
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-4 border-top text-muted small" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <p className="mb-0">&copy; {new Date().getFullYear()} Essenza - Fragancias de Autor.</p>
      </footer>
    </div>
  );
}

function PanelAdmin() {
  const [formData, setFormData] = useState({
    nombre: '', categoria: 'Textil', descripcion: '', precio: ''
  });

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
};


useEffect(() => {
  cargarProductos();
}, []);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, precio: parseFloat(formData.precio) })
    });

    if (response.ok) {
      alert('¡Perfume guardado!');
      setFormData({ nombre: '', categoria: 'Textil', descripcion: '', precio: '' });
      cargarProductos();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleDelete = async (id) => {
  if (window.confirm('¿Estás seguro de que querés eliminar este perfume del catálogo?')) {
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
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
              <h2 className="h4 mb-0 text-center" style={{ fontFamily: 'var(--font-titles)' }}>Nuevo Producto</h2>
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
                <div className="mb-4">
                  <label className="form-label small text-muted">Precio ($)</label>
                  <input type="number" className="form-control bg-dark text-white border-secondary" name="precio" value={formData.precio} onChange={handleChange} required min="0"/>
                </div>
                <button type="submit" className="btn btn-gold w-100 rounded-pill fw-bold">Guardar</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card border-0 shadow-lg h-100" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>
            <div className="card-header border-bottom py-3" style={{ borderColor: '#333 !important', backgroundColor: 'transparent' }}>
              <h2 className="h4 mb-0 text-center" style={{ fontFamily: 'var(--font-titles)' }}>Inventario Actual</h2>
            </div>
            <div className="card-body p-0 overflow-auto" style={{ maxHeight: '500px' }}>
              <table className="table table-dark table-hover mb-0">
                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <tr>
                    <th>Nombre</th>
                    <th>Cat</th>
                    <th>Precio</th>
                    <th className="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(p => (
                    <tr key={p.id}>
                      <td className="align-middle">{p.nombre}</td>
                      <td className="align-middle"><span className="badge bg-secondary">{p.categoria}</span></td>
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