import {
  Building2,
  Car,
  Factory,
  Gem,
  Home,
  PackageSearch,
  ShoppingBag,
  Sparkles,
  TreePine,
  TrendingUp,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TonnerLineKey } from '../../catalog/tonnerLines';

export type DistributorFocusKey = 'rotacion' | 'premium' | 'pedido' | 'cobertura';

export interface PortfolioLine {
  key: TonnerLineKey;
  label: string;
  icon: LucideIcon;
  accentClass: string;
}

export interface CommercialScenario {
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface DistributorFocus {
  key: DistributorFocusKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const portfolioLines: PortfolioLine[] = [
  { key: 'arquitectonica', label: 'Arquitectónica', icon: Home, accentClass: 'home-card-architectonica' },
  { key: 'industrial', label: 'Industrial', icon: Factory, accentClass: 'home-card-industrial' },
  { key: 'automotriz', label: 'Automotriz', icon: Car, accentClass: 'home-card-automotriz' },
  { key: 'maderas', label: 'Maderas', icon: TreePine, accentClass: 'home-card-maderas' },
];

export const portfolioScenarios: Record<TonnerLineKey, CommercialScenario[]> = {
  arquitectonica: [
    { label: 'Alta rotación', description: 'Productos de salida constante para mostrador.', icon: TrendingUp },
    { label: 'Portafolio premium', description: 'Referencias de mejor desempeño y valor.', icon: Gem },
    { label: 'Cobertura de obra', description: 'Surtido para clientes de construcción y remodelación.', icon: Truck },
  ],
  industrial: [
    { label: 'Metal y mantenimiento', description: 'Base para ferretería técnica y mantenimiento.', icon: Factory },
    { label: 'Demarcación y tráfico', description: 'Líneas de alto movimiento para señalización.', icon: TrendingUp },
    { label: 'Protección anticorrosiva', description: 'Sistema técnico para industria y metalmecánica.', icon: Truck },
  ],
  automotriz: [
    { label: 'Taller rápido', description: 'Referencias de salida para repinte diario.', icon: Sparkles },
    { label: 'Portafolio premium', description: 'Sistema de mayor valor y acabado superior.', icon: Gem },
    { label: 'Base + preparación', description: 'Productos de soporte para taller y latonería.', icon: ShoppingBag },
  ],
  maderas: [
    { label: 'Carpintería general', description: 'Surtido práctico para talleres y fabricantes.', icon: Building2 },
    { label: 'Acabado premium', description: 'Lacas y sistemas de mayor valor percibido.', icon: Gem },
    { label: 'Sellado y base', description: 'Referencias de arranque para producción.', icon: PackageSearch },
  ],
};

export const distributorFocuses: DistributorFocus[] = [
  {
    key: 'rotacion',
    label: 'Alta rotación',
    description: 'Sugerir referencias fáciles de mover en volumen.',
    icon: TrendingUp,
  },
  {
    key: 'premium',
    label: 'Mayor margen',
    description: 'Surtido orientado a productos de ticket superior.',
    icon: Gem,
  },
  {
    key: 'pedido',
    label: 'Pedido base',
    description: 'Una selección balanceada para abastecimiento inicial.',
    icon: ShoppingBag,
  },
  {
    key: 'cobertura',
    label: 'Cobertura regional',
    description: 'Portafolio amplio para atender más casos comerciales.',
    icon: Truck,
  },
];
