import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Datos harcodeados temporales para ir probando el diseño
const perfumesTemporales = [
  { id: 1, nombre: "Lavanda Fresh", tipo: "Ropa", precio: 4500 },
  { id: 2, nombre: "One Million (Imitación)", tipo: "Personal", precio: 12000 },
  { id: 3, nombre: "Brisa Cítrica", tipo: "Ropa", precio: 4500 }
];

function Catalogo() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Essenza</h1>
      <p>Bienvenido a nuestra pagina</p>
      
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {perfumesTemporales.map((perfume) => (
          <div key={perfume.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{perfume.nombre}</h3>
            <p>Tipo: {perfume.tipo}</p>
            <p>Precio: ${perfume.precio}</p>
            <button>Consultar por WhatsApp</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelAdmin() {
  return <h2></h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: El catálogo que ven los clientes */}
        <Route path="/" element={<Catalogo />} />
        
        {/* Ruta oculta: Tu panel de administración */}
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;