import type { TonnerLineKey } from '../../catalog/tonnerLines';
import type { ClientGoalKey } from './clientGoals';
import type { ClientIntentKey } from './clientIntents';
import type { ContractorPriorityKey } from './contractorIntents';
import type { DistributorFocusKey } from './distributorIntents';

export interface ClientRecommendationRule {
  intent: ClientIntentKey;
  suboption: string;
  goals: Partial<Record<ClientGoalKey, string[]>>;
  fallback: string[];
}

export interface ContractorRecommendationRule {
  line: TonnerLineKey;
  useCase: string;
  priorities: Partial<Record<ContractorPriorityKey, string[]>>;
  fallback: string[];
}

export interface DistributorRecommendationRule {
  line: TonnerLineKey;
  scenario: string;
  focus: Partial<Record<DistributorFocusKey, string[]>>;
  fallback: string[];
}

export const clientRecommendationRules: ClientRecommendationRule[] = [
  {
    intent: 'casa',
    suboption: 'interior',
    goals: {
      economia: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'vinilton', 'banos-y-cocinas'],
      durabilidad: ['tonertex', 'vinilton', 'ultrarmor'],
      antihumedad: ['banos-y-cocinas', 'permakill', 'tonertex'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    intent: 'casa',
    suboption: 'exterior',
    goals: {
      economia: ['vinilton', 'ultrarmor', 'tonertex'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
      durabilidad: ['ultrarmor', 'permakill', 'tonertex'],
      antihumedad: ['permakill', 'ultrarmor', 'banos-y-cocinas'],
    },
    fallback: ['ultrarmor', 'permakill', 'tonertex'],
  },
  {
    intent: 'casa',
    suboption: 'bano-cocina',
    goals: {
      economia: ['banos-y-cocinas', 'vinilton', 'tonertex'],
      premium: ['banos-y-cocinas', 'tonertex', 'ultrarmor'],
      durabilidad: ['banos-y-cocinas', 'permakill', 'tonertex'],
      antihumedad: ['banos-y-cocinas', 'permakill', 'ultrarmor'],
    },
    fallback: ['banos-y-cocinas', 'permakill', 'tonertex'],
  },
  {
    intent: 'carro',
    suboption: 'acabado',
    goals: {
      economia: ['automotiva-industrial', 'automotiva', 'poliuretano'],
      premium: ['poliuretano', 'automotiva', 'automotiva-industrial'],
      durabilidad: ['poliuretano', 'automotiva-industrial', 'automotiva'],
      antihumedad: ['automotiva-industrial', 'poliuretano', 'fondo-poliuretano-2k'],
    },
    fallback: ['automotiva', 'automotiva-industrial', 'poliuretano'],
  },
  {
    intent: 'carro',
    suboption: 'fondo',
    goals: {
      economia: ['fondo-nitro-industrial', 'fondo-nitro', 'masilla-industrial-nitro'],
      premium: ['fondo-poliuretano-2k', 'fondo-nitro', 'poliuretano'],
      durabilidad: ['fondo-poliuretano-2k', 'fondo-nitro-industrial', 'fondo-nitro'],
      antihumedad: ['fondo-poliuretano-2k', 'primer-epoxico', 'wash-primer'],
    },
    fallback: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
  },
  {
    intent: 'carro',
    suboption: 'masilla',
    goals: {
      economia: ['masilla-industrial-nitro', 'masilla-nitro', 'fondo-nitro-industrial'],
      premium: ['masilla-nitro', 'pasta-para-pulir', 'fondo-poliuretano-2k'],
      durabilidad: ['masilla-nitro', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      antihumedad: ['masilla-nitro', 'fondo-poliuretano-2k', 'primer-epoxico'],
    },
    fallback: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    intent: 'madera',
    suboption: 'sellado',
    goals: {
      economia: ['LM-730', 'LC-735', 'PU-740'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
      durabilidad: ['LC-735', 'PU-740', 'LC-750'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
  },
  {
    intent: 'madera',
    suboption: 'color',
    goals: {
      economia: ['LC-759', 'LM-700', 'LM-730'],
      premium: ['LC-750', 'LC-759', 'PU-740'],
      durabilidad: ['LC-750', 'PU-740', 'LC-759'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LC-750', 'LC-759', 'PU-740'],
  },
  {
    intent: 'madera',
    suboption: 'acabado',
    goals: {
      economia: ['LM-700', 'LM-770', 'LM-730'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
      durabilidad: ['PU-740', 'LC-750', 'LM-700'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LM-700', 'PU-740', 'LC-750'],
  },
  {
    intent: 'metal',
    suboption: 'rejas',
    goals: {
      economia: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      premium: ['esmalton-3en1', 'epoxico', 'secado-flash'],
      durabilidad: ['esmalton-3en1', 'epoxico', 'primer-epoxico'],
      antihumedad: ['primer-epoxico', 'wash-primer', 'epoxico'],
    },
    fallback: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
  },
  {
    intent: 'metal',
    suboption: 'estructuras',
    goals: {
      economia: ['secado-flash', 'primer-epoxico', 'esmalton-3en1'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      durabilidad: ['epoxico', 'primer-epoxico', 'wash-primer'],
      antihumedad: ['wash-primer', 'primer-epoxico', 'epoxico'],
    },
    fallback: ['epoxico', 'primer-epoxico', 'wash-primer'],
  },
  {
    intent: 'metal',
    suboption: 'proteccion',
    goals: {
      economia: ['secado-flash', 'primer-epoxico', 'wash-primer'],
      premium: ['primer-epoxico', 'epoxico', 'wash-primer'],
      durabilidad: ['primer-epoxico', 'epoxico', 'wash-primer'],
      antihumedad: ['wash-primer', 'primer-epoxico', 'epoxico'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
];

export const contractorRecommendationRules: ContractorRecommendationRule[] = [
  {
    line: 'arquitectonica',
    useCase: 'Muro interior',
    priorities: {
      rendimiento: ['vinilton', 'tonerama', 'tonertex'],
      durabilidad: ['tonertex', 'vinilton', 'banos-y-cocinas'],
      secado: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'banos-y-cocinas', 'vinilton'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    line: 'arquitectonica',
    useCase: 'Fachada',
    priorities: {
      rendimiento: ['vinilton', 'ultrarmor', 'tonertex'],
      durabilidad: ['ultrarmor', 'permakill', 'tonertex'],
      secado: ['ultrarmor', 'vinilton', 'tonertex'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
    },
    fallback: ['ultrarmor', 'tonertex', 'permakill'],
  },
  {
    line: 'arquitectonica',
    useCase: 'Zona húmeda',
    priorities: {
      rendimiento: ['banos-y-cocinas', 'vinilton', 'tonertex'],
      durabilidad: ['banos-y-cocinas', 'permakill', 'ultrarmor'],
      secado: ['banos-y-cocinas', 'tonertex', 'vinilton'],
      premium: ['banos-y-cocinas', 'ultrarmor', 'tonertex'],
    },
    fallback: ['banos-y-cocinas', 'permakill', 'tonertex'],
  },
  {
    line: 'industrial',
    useCase: 'Estructura metálica',
    priorities: {
      rendimiento: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      durabilidad: ['epoxico', 'primer-epoxico', 'wash-primer'],
      secado: ['secado-flash', 'primer-epoxico', 'esmalton-3en1'],
      premium: ['epoxico', 'esmalton-3en1', 'primer-epoxico'],
    },
    fallback: ['epoxico', 'primer-epoxico', 'wash-primer'],
  },
  {
    line: 'industrial',
    useCase: 'Piso / demarcación',
    priorities: {
      rendimiento: ['trafico-pesado', 'secado-flash', 'epoxico'],
      durabilidad: ['trafico-pesado', 'epoxico', 'primer-epoxico'],
      secado: ['trafico-pesado', 'secado-flash', 'primer-epoxico'],
      premium: ['epoxico', 'trafico-pesado', 'wash-primer'],
    },
    fallback: ['trafico-pesado', 'epoxico', 'secado-flash'],
  },
  {
    line: 'industrial',
    useCase: 'Primer anticorrosivo',
    priorities: {
      rendimiento: ['primer-epoxico', 'wash-primer', 'secado-flash'],
      durabilidad: ['wash-primer', 'primer-epoxico', 'epoxico'],
      secado: ['wash-primer', 'primer-epoxico', 'secado-flash'],
      premium: ['primer-epoxico', 'epoxico', 'wash-primer'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
  {
    line: 'automotriz',
    useCase: 'Acabado',
    priorities: {
      rendimiento: ['automotiva-industrial', 'automotiva', 'poliuretano'],
      durabilidad: ['poliuretano', 'automotiva-industrial', 'automotiva'],
      secado: ['automotiva', 'automotiva-industrial', 'poliuretano'],
      premium: ['poliuretano', 'automotiva', 'automotiva-industrial'],
    },
    fallback: ['automotiva', 'automotiva-industrial', 'poliuretano'],
  },
  {
    line: 'automotriz',
    useCase: 'Fondo',
    priorities: {
      rendimiento: ['fondo-nitro-industrial', 'fondo-nitro', 'fondo-poliuretano-2k'],
      durabilidad: ['fondo-poliuretano-2k', 'fondo-nitro-industrial', 'fondo-nitro'],
      secado: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
      premium: ['fondo-poliuretano-2k', 'fondo-nitro', 'poliuretano'],
    },
    fallback: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
  },
  {
    line: 'automotriz',
    useCase: 'Masilla',
    priorities: {
      rendimiento: ['masilla-industrial-nitro', 'masilla-nitro', 'pasta-para-pulir'],
      durabilidad: ['masilla-nitro', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      secado: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
      premium: ['masilla-nitro', 'pasta-para-pulir', 'fondo-poliuretano-2k'],
    },
    fallback: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    line: 'maderas',
    useCase: 'Sellado',
    priorities: {
      rendimiento: ['LM-730', 'LC-735', 'PU-740'],
      durabilidad: ['LC-735', 'PU-740', 'LC-750'],
      secado: ['LM-730', 'LC-735', 'LC-750'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
  },
  {
    line: 'maderas',
    useCase: 'Acabado brillante',
    priorities: {
      rendimiento: ['LM-700', 'LC-759', 'LC-750'],
      durabilidad: ['PU-740', 'LC-750', 'LM-700'],
      secado: ['LM-700', 'LC-750', 'LC-759'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
    },
    fallback: ['LM-700', 'LC-750', 'PU-740'],
  },
  {
    line: 'maderas',
    useCase: 'Acabado resistente',
    priorities: {
      rendimiento: ['LC-759', 'PU-740', 'LM-700'],
      durabilidad: ['PU-740', 'LC-750', 'LC-759'],
      secado: ['LC-750', 'LM-700', 'LC-759'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
    },
    fallback: ['PU-740', 'LC-750', 'LC-759'],
  },
];

export const distributorRecommendationRules: DistributorRecommendationRule[] = [
  {
    line: 'arquitectonica',
    scenario: 'Alta rotación',
    focus: {
      rotacion: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
      pedido: ['vinilton', 'tonertex', 'banos-y-cocinas'],
      cobertura: ['vinilton', 'tonertex', 'permakill'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    line: 'arquitectonica',
    scenario: 'Portafolio premium',
    focus: {
      rotacion: ['tonertex', 'vinilton', 'ultrarmor'],
      premium: ['ultrarmor', 'tonertex', 'banos-y-cocinas'],
      pedido: ['tonertex', 'ultrarmor', 'permakill'],
      cobertura: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
    },
    fallback: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
  },
  {
    line: 'arquitectonica',
    scenario: 'Cobertura de obra',
    focus: {
      rotacion: ['vinilton', 'tonertex', 'permakill'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
      pedido: ['vinilton', 'tonertex', 'banos-y-cocinas'],
      cobertura: ['vinilton', 'tonertex', 'permakill'],
    },
    fallback: ['vinilton', 'tonertex', 'permakill'],
  },
  {
    line: 'industrial',
    scenario: 'Metal y mantenimiento',
    focus: {
      rotacion: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      pedido: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      cobertura: ['epoxico', 'secado-flash', 'wash-primer'],
    },
    fallback: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
  },
  {
    line: 'industrial',
    scenario: 'Demarcación y tráfico',
    focus: {
      rotacion: ['trafico-pesado', 'secado-flash', 'epoxico'],
      premium: ['epoxico', 'trafico-pesado', 'primer-epoxico'],
      pedido: ['trafico-pesado', 'secado-flash', 'primer-epoxico'],
      cobertura: ['trafico-pesado', 'epoxico', 'wash-primer'],
    },
    fallback: ['trafico-pesado', 'secado-flash', 'epoxico'],
  },
  {
    line: 'industrial',
    scenario: 'Protección anticorrosiva',
    focus: {
      rotacion: ['primer-epoxico', 'wash-primer', 'secado-flash'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      pedido: ['primer-epoxico', 'wash-primer', 'epoxico'],
      cobertura: ['primer-epoxico', 'wash-primer', 'epoxico'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
  {
    line: 'automotriz',
    scenario: 'Taller rápido',
    focus: {
      rotacion: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
      premium: ['automotiva', 'poliuretano', 'fondo-poliuretano-2k'],
      pedido: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
      cobertura: ['automotiva-industrial', 'fondo-nitro-industrial', 'pasta-para-pulir'],
    },
    fallback: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
  },
  {
    line: 'automotriz',
    scenario: 'Portafolio premium',
    focus: {
      rotacion: ['automotiva', 'poliuretano', 'fondo-poliuretano-2k'],
      premium: ['poliuretano', 'automotiva', 'fondo-poliuretano-2k'],
      pedido: ['automotiva', 'poliuretano', 'fondo-nitro'],
      cobertura: ['automotiva', 'poliuretano', 'masilla-nitro'],
    },
    fallback: ['poliuretano', 'automotiva', 'fondo-poliuretano-2k'],
  },
  {
    line: 'automotriz',
    scenario: 'Base + preparación',
    focus: {
      rotacion: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'pasta-para-pulir'],
      premium: ['fondo-poliuretano-2k', 'masilla-nitro', 'poliuretano'],
      pedido: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      cobertura: ['fondo-nitro', 'masilla-nitro', 'pasta-para-pulir'],
    },
    fallback: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    line: 'maderas',
    scenario: 'Carpintería general',
    focus: {
      rotacion: ['LM-700', 'LM-730', 'LC-735'],
      premium: ['LC-750', 'PU-740', 'LC-759'],
      pedido: ['LM-700', 'LM-730', 'LC-735'],
      cobertura: ['LM-700', 'LC-750', 'PU-740'],
    },
    fallback: ['LM-700', 'LM-730', 'LC-735'],
  },
  {
    line: 'maderas',
    scenario: 'Acabado premium',
    focus: {
      rotacion: ['LC-750', 'LC-759', 'PU-740'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
      pedido: ['LC-750', 'LC-759', 'LM-700'],
      cobertura: ['PU-740', 'LC-750', 'LM-730'],
    },
    fallback: ['PU-740', 'LC-750', 'LC-759'],
  },
  {
    line: 'maderas',
    scenario: 'Sellado y base',
    focus: {
      rotacion: ['LM-730', 'LC-735', 'PU-740'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
      pedido: ['LM-730', 'LC-735', 'LM-700'],
      cobertura: ['LM-730', 'LC-735', 'PU-740'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
  },
];
