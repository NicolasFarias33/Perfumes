import React from 'react';
import VolumePill from './VolumePill';
import FragrancePills from './FragrancePills';

const InfoPill = ({ volumen, fragancias, layout = 'inline' }) => {
  if (!volumen && (!fragancias || fragancias.trim() === '')) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }} className="d-flex" role="list" aria-label="Información del perfume">
      {volumen && <VolumePill volumen={volumen} />}
      {fragancias && <FragrancePills fragancias={fragancias} layout={layout} />}
    </div>
  );
};

export default InfoPill;