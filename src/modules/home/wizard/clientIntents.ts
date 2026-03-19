import {
  Bath,
  Car,
  DoorOpen,
  Factory,
  Home,
  PaintBucket,
  Sparkles,
  TreePine,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TonnerLineKey } from '../../catalog/tonnerLines';

export type ClientIntentKey = 'casa' | 'carro' | 'madera' | 'metal';

export interface ClientIntent {
  key: ClientIntentKey;
  label: string;
  hint: string;
  icon: LucideIcon;
  accentClass: string;
  line: TonnerLineKey;
  suboptions: Array<{
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
  }>;
}

export const clientIntents: ClientIntent[] = [
  {
    key: 'casa',
    label: 'Casa',
    hint: 'Muros, fachadas y zonas húmedas.',
    icon: Home,
    accentClass: 'home-card-architectonica',
    line: 'arquitectonica',
    suboptions: [
      {
        id: 'interior',
        label: 'Interior',
        description: 'Muros, techos y espacios residenciales.',
        icon: PaintBucket,
      },
      { id: 'exterior', label: 'Exterior', description: 'Fachadas y superficies expuestas.', icon: DoorOpen },
      { id: 'bano-cocina', label: 'Baño / Cocina', description: 'Áreas con humedad.', icon: Bath },
    ],
  },
  {
    key: 'carro',
    label: 'Carro',
    hint: 'Repinte y acabado automotriz.',
    icon: Car,
    accentClass: 'home-card-automotriz',
    line: 'automotriz',
    suboptions: [
      { id: 'acabado', label: 'Acabado', description: 'Brillo y terminación final.', icon: Sparkles },
      { id: 'fondo', label: 'Fondo', description: 'Preparación de superficie.', icon: PaintBucket },
      { id: 'masilla', label: 'Masilla', description: 'Corrección de imperfecciones.', icon: Wrench },
    ],
  },
  {
    key: 'madera',
    label: 'Madera',
    hint: 'Sellado y acabado de carpintería.',
    icon: TreePine,
    accentClass: 'home-card-maderas',
    line: 'maderas',
    suboptions: [
      { id: 'sellado', label: 'Sellado', description: 'Preparación antes del acabado.', icon: PaintBucket },
      { id: 'color', label: 'Color', description: 'Tintes y color.', icon: Sparkles },
      { id: 'acabado', label: 'Acabado', description: 'Barnices y lacas.', icon: DoorOpen },
    ],
  },
  {
    key: 'metal',
    label: 'Metal',
    hint: 'Protección industrial.',
    icon: Factory,
    accentClass: 'home-card-industrial',
    line: 'industrial',
    suboptions: [
      { id: 'rejas', label: 'Rejas', description: 'Protección decorativa.', icon: DoorOpen },
      { id: 'estructuras', label: 'Estructuras', description: 'Metalmecánica.', icon: Factory },
      { id: 'proteccion', label: 'Protección', description: 'Primers anticorrosivos.', icon: Wrench },
    ],
  },
];
