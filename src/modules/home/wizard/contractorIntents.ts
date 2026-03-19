import {
  Car,
  Factory,
  FileText,
  Gauge,
  Gem,
  HardHat,
  Home,
  ShieldCheck,
  Sparkles,
  TreePine,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TonnerLineKey } from '../../catalog/tonnerLines';

export type ContractorPriorityKey = 'rendimiento' | 'durabilidad' | 'secado' | 'premium';

export interface ContractorLine {
  key: TonnerLineKey;
  label: string;
  hint: string;
  icon: LucideIcon;
  accentClass: string;
}

export interface ContractorUseCase {
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface ContractorPriority {
  key: ContractorPriorityKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const contractorLines: ContractorLine[] = [
  {
    key: 'arquitectonica',
    label: 'Arquitectónica',
    hint: 'Vinilos, esmaltes y recubrimientos de obra.',
    icon: Home,
    accentClass: 'home-card-architectonica',
  },
  {
    key: 'industrial',
    label: 'Industrial',
    hint: 'Primers, tráfico y protección de superficie.',
    icon: Factory,
    accentClass: 'home-card-industrial',
  },
  {
    key: 'automotriz',
    label: 'Automotriz',
    hint: 'Repinte, fondos, masillas y acabados.',
    icon: Car,
    accentClass: 'home-card-automotriz',
  },
  {
    key: 'maderas',
    label: 'Maderas',
    hint: 'Selladores, lacas y tintes para carpintería.',
    icon: TreePine,
    accentClass: 'home-card-maderas',
  },
];

export const contractorLineUseCases: Record<TonnerLineKey, ContractorUseCase[]> = {
  arquitectonica: [
    { label: 'Muro interior', description: 'Obra residencial y comercial interior.', icon: Home },
    { label: 'Fachada', description: 'Exterior expuesto a intemperie.', icon: HardHat },
    { label: 'Zona húmeda', description: 'Baños, cocinas y áreas sensibles.', icon: ShieldCheck },
  ],
  industrial: [
    { label: 'Estructura metálica', description: 'Protección y acabado de piezas metálicas.', icon: Factory },
    { label: 'Piso / demarcación', description: 'Tráfico, canchas y señalización.', icon: Gauge },
    { label: 'Primer anticorrosivo', description: 'Base técnica para sistemas industriales.', icon: Wrench },
  ],
  automotriz: [
    { label: 'Acabado', description: 'Color y terminación final.', icon: Sparkles },
    { label: 'Fondo', description: 'Preparación de superficie.', icon: FileText },
    { label: 'Masilla', description: 'Relleno y corrección.', icon: Wrench },
  ],
  maderas: [
    { label: 'Sellado', description: 'Preparación antes del acabado.', icon: FileText },
    { label: 'Acabado brillante', description: 'Presentación final con brillo.', icon: Gem },
    { label: 'Acabado resistente', description: 'Mayor vida útil y dureza.', icon: ShieldCheck },
  ],
};

export const contractorPriorities: ContractorPriority[] = [
  {
    key: 'rendimiento',
    label: 'Rendimiento',
    description: 'Buena cobertura y productividad en obra.',
    icon: Gauge,
  },
  {
    key: 'durabilidad',
    label: 'Durabilidad',
    description: 'Mayor resistencia y permanencia del sistema.',
    icon: ShieldCheck,
  },
  {
    key: 'secado',
    label: 'Secado rápido',
    description: 'Menos tiempo de espera entre procesos.',
    icon: Sparkles,
  },
  {
    key: 'premium',
    label: 'Acabado premium',
    description: 'Resultado visual y técnico superior.',
    icon: Gem,
  },
];
