import { Home, Factory, Car, TreePine, Layers, Search, ShoppingCart } from 'lucide-react';

import { TonnerLineKey } from '../modules/catalog/tonnerLines';

interface HeaderHeroProps {
  activeLine: TonnerLineKey | 'all';
  orderCount?: number;
  onChangeLine: (line: TonnerLineKey | 'all') => void;
  onOpenPurchase?: () => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export default function HeaderHero({
  activeLine,
  orderCount = 0,
  onChangeLine,
  onOpenPurchase,
  searchQuery,
  onSearchQueryChange,
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

        {/* EXPLORACIÓN Y BÚSQUEDA */}
        <div className="mb-8 flex justify-center md:mb-14">
          <div className="w-full max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 md:text-xs">
              Explora línea de productos Tonner
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Descubre la línea ideal para tu proyecto
            </h1>

            <div className="mt-5 flex justify-center">
              <label
                className="
                  flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/70
                  bg-white/95 px-4 py-3 text-left shadow-[0_20px_50px_rgba(15,23,42,0.22)]
                  backdrop-blur-md transition hover:bg-white md:rounded-full md:px-5 md:py-4
                "
              >
                <Search className="h-4 w-4 shrink-0 text-slate-400 md:h-5 md:w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                  placeholder="Buscar producto, línea o referencia"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 md:text-base"
                />
              </label>
            </div>
          </div>
        </div>

        {/* SELECTOR DE LÍNEAS */}
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
