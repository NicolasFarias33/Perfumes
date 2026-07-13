import React, { useState, useEffect } from 'react';

const SocialToast = () => {
  const [toastData, setToastData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const buyers = [
    { name: "Nicolas", city: "Córdoba" },
    { name: "Facundo", city: "Buenos Aires" },
    { name: "Leandro", city: "Rosario" },
    { name: "Juan", city: "Mendoza" },
    { name: "Martin", city: "Villa Allende" },
    { name: "Tomas", city: "Carlos Paz" }
  ];
  const times = ["hace 2 min", "hace 5 min", "hace 12 min", "hace 18 min", "hace 24 min"];

  useEffect(() => {
    let hideTimer;
    let nextToastTimer;

    const showNextToast = () => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      
      setToastData({ ...randomBuyer, time: randomTime });
      setIsVisible(true);

      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 4500);
    };

    const initialTimer = setTimeout(() => {
      showNextToast();
      nextToastTimer = setInterval(showNextToast, 15000);
    }, 6000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(nextToastTimer);
    };
  }, []);

  if (!toastData) return null;

  return (
    <div 
      className="position-fixed" 
      style={{ 
        bottom: '80px',
        left: '20px', 
        zIndex: 1060,
        maxWidth: '320px',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(150%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none'
      }}
    >
      <div className="bg-white rounded-4 shadow-lg p-3 d-flex align-items-center border" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
        
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #111, #333)', color: '#B5A072' }}
        >
          <span className="fw-bold fs-5">{toastData.name.charAt(0)}</span>
        </div>

        <div className="ms-3 d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="fw-bold text-dark text-truncate" style={{ fontSize: '0.85rem' }}>
            {toastData.name} de {toastData.city}
          </span>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            Compró una fragancia
          </span>
          
          <div className="d-flex align-items-center mt-1">
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{toastData.time}</span>
            <span className="ms-2 d-flex align-items-center fw-bold" style={{ color: '#16a34a', fontSize: '0.7rem' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" className="me-1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Compra verificada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialToast;