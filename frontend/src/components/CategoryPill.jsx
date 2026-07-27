import React from 'react';

const CategoryPill = ({ categoria }) => {
  if (!categoria) return null;

  const isTextil = categoria === 'Textil';
  const bgColor = isTextil ? 'rgba(181, 160, 114, 0.08)' : 'rgba(255, 255, 255, 0.06)';
  const borderColor = isTextil ? 'rgba(181, 160, 114, 0.35)' : 'rgba(255, 255, 255, 0.15)';
  const textColor = isTextil ? 'rgba(181, 160, 114, 0.85)' : 'rgba(255, 255, 255, 0.5)';

  const style = {
    backgroundColor: bgColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.6px',
    textTransform: 'uppercase'
  };

  return (
    <span className="badge rounded-pill px-3 py-1" style={style}>
      {categoria}
    </span>
  );
};

export default CategoryPill;