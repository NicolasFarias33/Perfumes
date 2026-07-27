import React from 'react';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const FragrancePicker = ({ selected, onChange, available = [], availableColors = {} }) => {
  const selectedSet = new Set(selected);

  const handleToggle = (fragrance) => {
    onChange(fragrance);
  };

  const getColorForFragrance = (fragrance) => {
    return availableColors[fragrance] || '#b5a072';
  };

  return (
    <div className="fragrance-picker">
      <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {available.map((fragrance) => {
          const color = getColorForFragrance(fragrance);
          const isSelected = selectedSet.has(fragrance);
          return (
            <button
              key={fragrance}
              type="button"
              onClick={() => handleToggle(fragrance)}
              className="btn rounded-pill px-3 py-2 fw-medium transition-all"
              style={{
                fontSize: '0.7rem',
                backgroundColor: isSelected ? color : hexToRgba(color, 0.15),
                color: isSelected ? '#000' : color,
                border: `1px solid ${color}`,
                boxShadow: isSelected ? `0 0 0 2px ${hexToRgba(color, 0.25)}` : 'none',
                textTransform: 'capitalize'
              }}
              aria-pressed={isSelected}
            >
              {fragrance}
            </button>
          );
        })}
      </div>
      
      {selected.length > 0 && (
        <div className="mt-2 d-flex flex-wrap gap-1">
          <span className="small text-muted">Seleccionados: </span>
          {selected.map((f) => (
            <span key={f} className="badge rounded-pill px-2 py-1" style={{ fontSize: '0.6rem', backgroundColor: getColorForFragrance(f), color: '#000', border: `1px solid ${getColorForFragrance(f)}` }}>
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FragrancePicker;