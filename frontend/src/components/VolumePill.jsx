import React from 'react';

const VolumePill = ({ volumen }) => {
  if (!volumen && volumen !== 0) return null;

  const displayVolumen = /^\d+$/.test(String(volumen)) ? `${volumen}ml` : volumen;

  const style = {
    backgroundColor: 'var(--essenza-gold)',
    color: 'var(--essenza-black)',
    border: '1px solid var(--essenza-gold)',
    fontSize: '0.5rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    alignSelf: 'flex-start'
  };

  return (
    <span className="badge rounded-md px-2 py-1" style={style}>
      {displayVolumen}
    </span>
  );
};

export default VolumePill;
