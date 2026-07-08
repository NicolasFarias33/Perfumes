import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logoEssenza from './assets/essenza-logo.jpg'; 

const perfumesTemporales = [
  { 
    id: 1, 
    nombre: "Brisa de Algodón", 
    categoria: "Textil", 
    descripcion: "Fragancia suave y persistente, ideal para sábanas. Notas limpias con destellos florales.", 
    precio: 4500 
  },
  { 
    id: 2, 
    nombre: "Vainilla & Coco Supreme", 
    categoria: "Textil", 
    descripcion: "Un aroma dulce, cálido y reconfortante para tus ambientes.", 
    precio: 4500 
  },
  { 
    id: 3, 
    nombre: "Ambar Noir (Inspiración)", 
    categoria: "Personal", 
    descripcion: "Eau de Parfum intenso. Notas de fondo amaderadas y especiadas.", 
    precio: 12000 
  }
];

function Catalogo() {
  const whatsappContacto = "3515414073"; 

  return (
    <div className="min-vh-100">
      <header className="border-bottom py-3 mb-4" style={{ backgroundColor: 'var(--essenza-black)', borderColor: '#222' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <img 
              src={logoEssenza} 
              alt="Logo Essenza" 
              style={{ 
                height: '65px', 
                width: '65px', 
                objectFit: 'cover',
                borderRadius: '20px' 
              }} 
          />
          <h1 className="m-0" style={{ 
            fontFamily: 'var(--font-titles)', 
            color: 'var(--essenza-gold)',
            fontSize: '2.3rem',
            letterSpacing: '1px'
          }}>
            Essenza
          </h1>
        </div>
      </header>
      <div className="container text-center mb-5">
        <p className="lead fw-light" style={{ color: '#aaa', letterSpacing: '0.5px', fontSize: '1.8rem',fontFamily: 'var(--font-titles)' }}>
          El aroma es el vendedor invisible que fideliza al cliente.
        </p>
      </div>

      <main className="container pb-5">
        <h2 className="text-center text-uppercase fw-light tracking-widest mb-5" style={{ fontSize: '1.5rem', color: 'rgba(181,160,114,0.7)' }}>Nuestro Catálogo</h2>
        
        <div className="row g-4">
          {perfumesTemporales.map((perfume) => {
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
  return (
    <div className="container py-5">
      <div className="card border-0 shadow p-5 text-center" style={{ backgroundColor: 'var(--essenza-card-bg)' }}>
        <h2 className="fw-normal">Panel de Administración - Essenza</h2>
        <p className="text-muted"></p>
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