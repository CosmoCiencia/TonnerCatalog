// src/modules/catalog/tonnerLines.ts

/* =========================================
   Tipos
========================================= */

export type TonnerLineKey = 'arquitectonica' | 'industrial' | 'automotriz' | 'maderas';

export interface TonnerLine {
  key: TonnerLineKey;
  label: string;
  description: string;
  gradient: string;
}

/* =========================================
   Líneas oficiales Tonner
========================================= */

export const TONNER_LINES: Record<TonnerLineKey, TonnerLine> = {
  arquitectonica: {
    key: 'arquitectonica',
    label: 'Arquitectónica',
    description: 'Soluciones para vivienda, comercio y obra tradicional.',
    gradient: 'from-tonner-blue via-indigo-600 to-tonner-blue',
  },

  industrial: {
    key: 'industrial',
    label: 'Industrial',
    description: 'Recubrimientos de alto desempeño para ambientes exigentes.',
    gradient: 'from-tonner-blue via-slate-700 to-tonner-orange',
  },

  automotriz: {
    key: 'automotriz',
    label: 'Automotriz',
    description: 'Acabados automotrices de alta precisión y calidad.',
    gradient: 'from-tonner-blue via-red-600 to-tonner-blue',
  },

  maderas: {
    key: 'maderas',
    label: 'Maderas',
    description: 'Protección y acabado para superficies en madera.',
    gradient: 'from-amber-700 via-orange-500 to-tonner-blue',
  },

};
