import React from 'react';
import { getFragranceColor } from '../data/fragrances';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const getFragrancePillStyle = (color) => ({
  backgroundColor: hexToRgba(color, 0.15),
  color: hexToRgba(color, 0.9),
  border: `1px solid ${hexToRgba(color, 0.5)}`,
  fontSize: '0.65rem',
  fontWeight: 400,
  letterSpacing: '0.3px',
  textTransform: 'capitalize'
});

const FragrancePills = ({ fragancias, layout = 'inline' }) => {
  const fraganciasArray = fragancias
    ? fragancias.split(',').map(f => f.trim()).filter(f => f.length > 0)
    : [];

  if (fraganciasArray.length === 0) return null;

  const isStacked = layout === 'stacked';
  const rowStyle = {
    display: 'flex',
    flexWrap: isStacked ? 'nowrap' : 'wrap',
    gap: '0.375rem',
    alignItems: 'center',
    paddingTop: '8px'
  };

  return (
    <div style={rowStyle} role="list" aria-label="Fragancias">
      {fraganciasArray.map((fragancia, index) => {
        const color = getFragranceColor(fragancia);
        return (
          <span
            key={index}
            role="listitem"
            className="badge rounded-pill px-2 py-1"
            style={getFragrancePillStyle(color)}
          >
            {fragancia}
          </span>
        );
      })}
    </div>
  );
};

export default FragrancePills;
