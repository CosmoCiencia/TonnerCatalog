import { Home, Factory, Car, TreePine, Layers, ShoppingCart } from 'lucide-react';

import { TonnerLineKey } from '../modules/catalog/tonnerLines';

interface HeaderHeroProps {
  activeLine: TonnerLineKey | 'all';
  orderCount?: number;
  onChangeLine: (line: TonnerLineKey | 'all') => void;
  onOpenGuide?: () => void;
  onOpenPurchase?: () => void;
}

export default function HeaderHero({
  activeLine,
  orderCount = 0,
  onChangeLine,
  onOpenGuide,
  onOpenPurchase,
}: HeaderHeroProps) {
  const iconClass = (active: boolean) =>
    `
      flex flex-col items-center gap-2
      cursor-pointer
      transition-all duration-300
      ${active ? 'text-white scale-110' : 'text-white/70 hover:text-white hover:scale-105'}
    `;

  const labelClass = 'text-xs font-semibold uppercase tracking-widest';

  return (
    <header
      className="
        relative
        overflow-hidden
        text-white
        bg-gradient-to-r
        from-tonner-blue
        via-tonner-pink
        to-tonner-orange
        pt-20
        pb-14
        md:pt-28
        md:pb-24
        text-center
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />

      {/* BOTÓN CARRITO */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 md:right-6 md:top-6">
        {orderCount > 0 ? (
          <button
            onClick={onOpenPurchase}
            className="rounded-full border border-white/25 bg-white/18 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/24"
          >
            Pedido {orderCount}
          </button>
        ) : null}

        <button
          onClick={onOpenPurchase}
          title="Ir a carrito"
          className="
            h-10 w-10
            rounded-full
            bg-white/15
            backdrop-blur-md
            border border-white/25
            flex items-center justify-center
            text-white/80
            transition-all duration-300
            hover:bg-white/25
            hover:text-white
            hover:scale-105
            hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
            md:h-11 md:w-11
          "
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {/* LOGO */}
        <div className="relative mb-8 flex justify-center md:mb-14">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="h-[140px] w-[260px] rounded-full bg-black/25 blur-3xl md:h-[200px] md:w-[360px]" />
          </div>

          <img
            src="/logo.png"
            alt="Pinturas Tonner"
            className="
              relative z-10
              h-[88px] md:h-[170px]
              w-auto select-none
            "
          />
        </div>

        {/* GUÍA DE COMPRA */}
        <div className="mb-8 flex justify-center md:mb-14">
          <button
            onClick={onOpenGuide}
            className="
              w-full max-w-2xl
              px-4 py-3.5
              rounded-2xl
              bg-white
              shadow-2xl
              flex items-center justify-between
              group
              transition
              md:px-6 md:py-4 md:rounded-full
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
            "
          >
            <span className="text-left text-[13px] text-gray-600 uppercase tracking-wide md:text-base">
              ¿Qué necesitas pintar?
            </span>
            <span className="text-tonner-blue text-sm font-semibold uppercase tracking-wide opacity-70 transition group-hover:opacity-100 md:text-base">
              Empezar →
            </span>
          </button>
        </div>

        {/* SELECTOR DE LÍNEAS — ICONOS */}
        <div className="-mx-1 flex gap-5 overflow-x-auto px-1 pb-2 md:mx-0 md:flex-wrap md:justify-center md:gap-10 md:overflow-visible md:px-0">
          <div onClick={() => onChangeLine('all')} className={iconClass(activeLine === 'all')}>
            <Layers className="w-9 h-9" />
            <span className={labelClass}>Todas</span>
          </div>

          <div
            onClick={() => onChangeLine('arquitectonica')}
            className={iconClass(activeLine === 'arquitectonica')}
          >
            <Home className="w-9 h-9" />
            <span className={labelClass}>Arquitectónica</span>
          </div>

          <div
            onClick={() => onChangeLine('industrial')}
            className={iconClass(activeLine === 'industrial')}
          >
            <Factory className="w-9 h-9" />
            <span className={labelClass}>Industrial</span>
          </div>

          <div
            onClick={() => onChangeLine('automotriz')}
            className={iconClass(activeLine === 'automotriz')}
          >
            <Car className="w-9 h-9" />
            <span className={labelClass}>Automotriz</span>
          </div>

          <div
            onClick={() => onChangeLine('maderas')}
            className={iconClass(activeLine === 'maderas')}
          >
            <TreePine className="w-9 h-9" />
            <span className={labelClass}>Maderas</span>
          </div>

        </div>
      </div>
    </header>
  );
}
