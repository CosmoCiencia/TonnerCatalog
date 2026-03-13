import { useState } from 'react';
import HeaderHero from './HeaderHero';
import TopBar from './TopBar';
import type { TonnerLineKey } from '../modules/catalog/tonnerLines';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeLine, setActiveLine] = useState<TonnerLineKey | 'all'>('all');

  return (
    <>
      {/* HERO */}
      <HeaderHero activeLine={activeLine} onChangeLine={setActiveLine} />

      {/* FRANJA BLANCA ESTRUCTURAL */}
      <div className="relative z-30 bg-white">
        <TopBar />
        <div className="h-4 bg-white rounded-b-[28px]" />
      </div>

      {/* RESTO DE LA APP */}
      <div className="min-h-screen bg-tonner-blue overflow-x-hidden">
        <main className="relative z-10">{children}</main>
      </div>
    </>
  );
}
