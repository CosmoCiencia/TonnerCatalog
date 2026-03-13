// src/modules/distributors/distributors.data.ts

import { Distributor } from './types';

export const distributors: Distributor[] = [
  {
    id: 1,
    name: 'Distribuidora Bogotá',
    city: 'Bogotá',
    lat: 4.711,
    lng: -74.0721,
    address: 'Av. Ejemplo #123-45, Bogotá',
    phone: '+57 300 123 4567',
  },
  {
    id: 2,
    name: 'Distribuidora Medellín',
    city: 'Medellín',
    lat: 6.2442,
    lng: -75.5812,
    address: 'Calle Ejemplo #45-67, Medellín',
    phone: '+57 310 765 4321',
  },
  {
    id: 3,
    name: 'Distribuidora Barranquilla',
    city: 'Barranquilla',
    lat: 10.9685,
    lng: -74.7813,
    address: 'Cra Ejemplo #89-10, Barranquilla',
    phone: '+57 320 555 8899',
  },
];
