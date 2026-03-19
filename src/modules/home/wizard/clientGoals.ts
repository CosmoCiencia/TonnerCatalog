import { Droplets, Gem, PaintBucket, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ClientGoalKey = 'durabilidad' | 'economia' | 'premium' | 'antihumedad';

export interface ClientGoal {
  key: ClientGoalKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const clientGoals: ClientGoal[] = [
  {
    key: 'durabilidad',
    label: 'Durabilidad',
    description: 'Mayor resistencia.',
    icon: ShieldCheck,
  },
  {
    key: 'economia',
    label: 'Economía',
    description: 'Buen costo rendimiento.',
    icon: PaintBucket,
  },
  {
    key: 'premium',
    label: 'Acabado premium',
    description: 'Mayor presencia visual.',
    icon: Gem,
  },
  {
    key: 'antihumedad',
    label: 'Antihumedad',
    description: 'Protección contra humedad.',
    icon: Droplets,
  },
];
