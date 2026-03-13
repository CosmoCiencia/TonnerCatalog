import type { Product } from './types';

export const PRODUCTS: Product[] = [
  /* ======================================================
   ARQUITECTÓNICA
====================================================== */

  {
    id: 'esmalte-sintetico',
    name: 'Esmalte Sintético',
    line: 'arquitectonica',
    subline: 'Esmaltes',
    description: 'Esmalte alquídico de alta resistencia para exteriores e interiores.',
    uses: [
      'Puertas y ventanas metálicas',
      'Estructuras metálicas',
      'Superficies interiores y exteriores',
    ],
    attributes: [
      { id: 'resistencia', label: 'Alta resistencia', icon: '🛡️' },
      { id: 'durabilidad', label: 'Buena durabilidad', icon: '⏳' },
      { id: 'cobertura', label: 'Óptima cobertura', icon: '🎨' },
    ],
    tones: [
      { name: 'Blanco' },
      { name: 'Negro' },
      { name: 'Rojo' },
      { name: 'Azul' },
      { name: 'Verde' },
      { name: 'Amarillo' },
    ],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'viniltex-plus',
    name: 'Viniltex Plus',
    line: 'arquitectonica',
    subline: 'Vinílicos',
    description: 'Pintura vinílica premium para interiores con excelente acabado.',
    uses: ['Muros interiores', 'Cielos rasos', 'Áreas residenciales'],
    attributes: [
      { id: 'lavable', label: 'Lavable', icon: '💧' },
      { id: 'acabado', label: 'Buen acabado', icon: '✨' },
      { id: 'cobertura', label: 'Alta cobertura', icon: '🎨' },
    ],
    tones: [{ name: 'Blanco' }, { name: 'Marfil' }, { name: 'Gris' }, { name: 'Beige' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'impermax-elastico',
    name: 'Impermax Elástico',
    line: 'arquitectonica',
    subline: 'Impermeabilizantes',
    description: 'Impermeabilizante elastomérico de alta elongación.',
    uses: ['Cubiertas', 'Terrazas', 'Fachadas'],
    attributes: [
      { id: 'elasticidad', label: 'Alta elasticidad', icon: '🧲' },
      { id: 'impermeable', label: 'Impermeable', icon: '💦' },
      { id: 'durabilidad', label: 'Larga duración', icon: '⏳' },
    ],
    tones: [{ name: 'Blanco' }, { name: 'Gris' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'sellador-acrilico',
    name: 'Sellador Acrílico',
    line: 'arquitectonica',
    subline: 'Selladores',
    description: 'Sellador base agua para preparación de superficies.',
    uses: ['Muros nuevos', 'Reparaciones', 'Antes de pintar'],
    attributes: [
      { id: 'adherencia', label: 'Mejora adherencia', icon: '🔗' },
      { id: 'rendimiento', label: 'Buen rendimiento', icon: '📈' },
    ],
    tones: [{ name: 'Transparente' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  /* ======================================================
   INDUSTRIAL
====================================================== */

  {
    id: 'epoxico-industrial',
    name: 'Epóxico Industrial',
    line: 'industrial',
    subline: 'Epóxicos',
    description: 'Recubrimiento epóxico bicomponente para pisos industriales.',
    uses: ['Bodegas', 'Plantas industriales', 'Parqueaderos'],
    attributes: [
      { id: 'quimica', label: 'Resistencia química', icon: '🧪' },
      { id: 'abrasion', label: 'Alta resistencia a la abrasión', icon: '⚙️' },
    ],
    tones: [{ name: 'Gris' }, { name: 'Verde' }, { name: 'Azul' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'poliuretano-industrial',
    name: 'Poliuretano Industrial',
    line: 'industrial',
    subline: 'Poliuretanos',
    description: 'Acabado poliuretano de alto desempeño.',
    uses: ['Pisos', 'Superficies sometidas a tráfico'],
    attributes: [
      { id: 'flexibilidad', label: 'Alta flexibilidad', icon: '🔄' },
      { id: 'durabilidad', label: 'Alta durabilidad', icon: '⏳' },
    ],
    tones: [{ name: 'Gris' }, { name: 'Rojo' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'anticorrosivo',
    name: 'Anticorrosivo Industrial',
    line: 'industrial',
    subline: 'Protección',
    description: 'Protección anticorrosiva para estructuras metálicas.',
    uses: ['Estructuras', 'Tuberías', 'Ambientes agresivos'],
    attributes: [{ id: 'anticorrosion', label: 'Anticorrosión', icon: '🛡️' }],
    tones: [{ name: 'Rojo óxido' }, { name: 'Gris' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  {
    id: 'primer-epoxico',
    name: 'Primer Epóxico',
    line: 'industrial',
    subline: 'Primers',
    description: 'Imprimante epóxico para máxima adherencia.',
    uses: ['Preparación de superficies', 'Antes de epóxicos'],
    attributes: [{ id: 'adherencia', label: 'Alta adherencia', icon: '🔗' }],
    tones: [{ name: 'Gris' }],
    datasheet_url: '/pdfs/ficha-tecnica-demo.pdf',
  },

  /* ======================================================
   AUTOMOTRIZ
====================================================== */

  {
    id: 'automotiva',
    name: 'Automotiva',
    line: 'automotriz',
    subline: 'Nitro (Acabado)',
    description:
      'Pintura formulada con resina nitrocelulósica y pigmentos de alta calidad que proporcionan excelente brillo, adherencia y durabilidad.',
    uses: [
      'Repinte de automóviles',
      'Camiones',
      'Motocicletas',
      'Bicicletas',
      'Industria metalmecánica',
    ],
    attributes: [
      { id: 'acabado', label: 'Excelente acabado' },
      { id: 'durabilidad', label: 'Alta durabilidad' },
      { id: 'solidos', label: 'Alto contenido de sólidos' },
      { id: 'interior-exterior', label: 'Uso interior y exterior' },
      { id: 'adherencia', label: 'Alta adherencia' },
      { id: 'rendimiento', label: 'Alto rendimiento' },
      { id: 'retencion-color', label: 'Excelente retención del color' },
      { id: 'brillante', label: 'Acabado brillante' },
      { id: 'secado', label: 'Secado rápido' },
      { id: 'dilucion', label: 'Diluible con TH-100' },
    ],
    tones: [
      { name: 'Royal Marrón', code: 'LN-109' },
      { name: 'Green Gold Tonner', code: 'LN-116' },
      { name: 'Magenta', code: 'LN-160' },
      { name: 'Violeta Puro', code: 'LN-161' },
      { name: 'Aluminio fino brillante', code: 'LN-181' },
      { name: 'Aluminio medio brillante', code: 'LN-183' },
      { name: 'Amarillo oro', code: 'LN-189' },
    ],
    datasheet_url: '/pdfs/automotiva.pdf',
  },
];
