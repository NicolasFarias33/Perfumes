const FRAGRANCE_COLORS = {
  'Cítrico': '#f5c542',
  'Floral': '#e879f9',
  'Amaderado': '#a3b18a',
  'Oriental': '#d47c4a',
  'Fresco': '#4ade80',
  'Especiado': '#fb923c',
  'Verde': '#6ee7b7',
  'Frutal': '#fda4af',
  'Almizcle': '#c4b5fd',
  'Ámbar': '#fbbf24',
  'Vainilla': '#fef3c7',
  'Sándalo': '#d6a76e',
  'Bergamota': '#86efac',
  'Pachulí': '#9f6767',
  'Rosa': '#f472b6',
  'Jazmín': '#fdf2c9',
  'Lavanda': '#c4b5fd',
  'Cedro': '#8b7355',
  'Vetiver': '#5f6f52',
  'Haba Tonka': '#d4a574',
  'Oud': '#4a3728'
};

const LOOKUP = Object.fromEntries(
  Object.entries(FRAGRANCE_COLORS).map(([k, v]) => [k.toLowerCase(), v])
);

export function getFragranceColor(fragrance) {
  return LOOKUP[fragrance.toLowerCase()] || '#b5a072';
}
