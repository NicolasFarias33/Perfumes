import React from 'react';

const BenefitsGrid = () => {
  const benefits = [
    {
      title: "Larga Duración",
      desc: "Fijación extrema que te acompaña durante todo el día sin desvanecerse.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      title: "Esencias Importadas",
      desc: "Elaborados con materias primas de la más alta calidad a nivel internacional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      )
    },
    {
      title: "Cruelty Free",
      desc: "Fórmulas 100% libres de crueldad animal. Respeto en cada gota.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
        </svg>
      )
    },
    {
      title: "Envío Seguro",
      desc: "Empaquetado premium para que tu perfume llegue impecable a tus manos.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    }
  ];

  return (
    <section className="py-5 mt-4" style={{ backgroundColor: 'var(--essenza-black)', borderTop: '1px solid rgba(181,160,114,0.15)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-uppercase fw-light tracking-widest mb-3" style={{ fontSize: '1.8rem', color: 'var(--essenza-gold)' }}>
            ¿Por qué elegir Essenza?
          </h2>
          <p className="fw-light mx-auto" style={{ color: '#aaa', maxWidth: '600px', fontSize: '1rem' }}>
            Cada fragancia es una obra de arte diseñada para resaltar tu identidad, combinando sofisticación y rendimiento.
          </p>
        </div>

        <div className="row g-4">
          {benefits.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="benefit-card h-100 d-flex flex-column align-items-center text-center p-4">
                
                <div 
                  className="icon-circle mb-4 d-flex justify-content-center align-items-center"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    border: '1px solid rgba(181,160,114,0.3)',
                    color: 'var(--essenza-gold)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '35px', height: '35px' }}>
                    {item.icon}
                  </div>
                </div>

                <h3 className="h6 fw-bold mb-2 text-white">{item.title}</h3>
                <p className="fw-light small" style={{ color: '#888', lineHeight: '1.6' }}>
                  {item.desc}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .benefit-card:hover .icon-circle {
            transform: translateY(-8px) scale(1.05);
            background-color: rgba(181,160,114,0.1);
            border-color: var(--essenza-gold);
            box-shadow: 0 10px 20px rgba(181,160,114,0.15);
          }
        `}
      </style>
    </section>
  );
};

export default BenefitsGrid;