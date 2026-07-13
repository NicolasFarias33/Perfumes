import React, { useState, useEffect } from 'react';

const StickyBar = ({ whatsappContacto }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const mensajeWa = encodeURIComponent(`¡Hola Essenza! Quería hacerles una consulta general sobre los perfumes.`);
  const urlWhatsapp = `https://wa.me/${whatsappContacto}?text=${mensajeWa}`;

  return (
    <div 
      className="fixed-bottom p-3 shadow-lg d-flex justify-content-between align-items-center" 
      style={{ 
        backgroundColor: 'rgba(10, 10, 10, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(181,160,114,0.3)',
        animation: 'slideUp 0.4s ease-out',
        zIndex: 1050 
      }}
    >
      <div className="d-flex flex-column">
        <span className="text-uppercase fw-bold tracking-widest" style={{ color: '#B5A072', fontSize: '0.8rem' }}>
          Esencia Premium
        </span>
        <span className="text-white small">Asesoramiento personalizado</span>
      </div>
      
      <a 
        href={urlWhatsapp} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-gold rounded-pill px-4 fw-bold text-uppercase"
        style={{ fontSize: '0.8rem', padding: '10px 20px' }}
      >
        Contactar 💬
      </a>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default StickyBar;