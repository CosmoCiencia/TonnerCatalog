import { Home, Factory, Car, TreePine, Building2, PackageSearch, ShoppingBag, MapPin } from 'lucide-react';
import type { HomeScreenProps } from './types';

const portfolioLines = [
  { key: 'arquitectonica', label: 'Arquitectónica', icon: Home, accentClass: 'home-card-architectonica' },
  { key: 'industrial', label: 'Industrial', icon: Factory, accentClass: 'home-card-industrial' },
  { key: 'automotriz', label: 'Automotriz', icon: Car, accentClass: 'home-card-automotriz' },
  { key: 'maderas', label: 'Maderas', icon: TreePine, accentClass: 'home-card-maderas' },
] as const;

export default function HomeDistribuidor({
  selectedLocation,
  onSelectLine,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-start justify-between gap-4 rounded-2xl px-4 py-5 text-left transition duration-300 sm:min-h-[148px] sm:p-6';

  return (
    <div className="home-screen home-screen-distribuidor flex min-h-screen flex-col items-center px-4 pb-8 pt-10 text-white sm:px-6 sm:pb-12 sm:pt-16">
      <div className="home-orb home-orb-primary" />
      <div className="home-orb home-orb-secondary" />
      <div className="home-orb home-orb-tertiary" />
      <div className="home-grid-overlay" />
      <div className="home-tech-lines" />

      <div className="home-panel home-panel-distribuidor home-fade-up rounded-[28px] px-4 pb-6 pt-8 sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-10 md:px-8">
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent sm:inset-x-8" />

        <img
          src="/logo.png"
          className="home-fade-up home-delay-1 mx-auto mb-8 h-20 drop-shadow-[0_12px_28px_rgba(0,0,0,0.28)] sm:mb-10 sm:h-28"
          alt="Pinturas Tonner"
        />

        <div className="home-fade-up home-delay-1 mb-8 text-center sm:mb-10">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/92 backdrop-blur-md">
              <MapPin className="h-4 w-4" />
              {selectedLocation}
            </span>
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
            Modo Distribuidor
          </p>
          <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
            Portafolio Tonner
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
            Explora líneas, prepara surtido y arma pedidos comerciales desde una vista de portafolio.
          </p>
        </div>

        <div className="home-fade-up home-delay-2 mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={onOpenCatalog}
            className="rounded-2xl border border-white/14 bg-white/10 p-4 text-left backdrop-blur-md transition hover:bg-white/16"
          >
            <div className="flex items-start gap-3">
              <PackageSearch className="mt-0.5 h-5 w-5 text-white/85" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">Buscar producto</p>
                <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                  Entra al catálogo completo para revisar referencias y presentaciones.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={onOpenCatalog}
            className="rounded-2xl border border-white/14 bg-white/10 p-4 text-left backdrop-blur-md transition hover:bg-white/16"
          >
            <div className="flex items-start gap-3">
              <ShoppingBag className="mt-0.5 h-5 w-5 text-white/85" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">Preparar pedido</p>
                <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                  Agrega referencias al pedido comercial y envíalas a asesor por WhatsApp.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={onOpenDistributors}
            className="rounded-2xl border border-white/14 bg-white/10 p-4 text-left backdrop-blur-md transition hover:bg-white/16"
          >
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-white/85" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">Red comercial</p>
                <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                  Consulta distribuidores y cobertura para cada zona.
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
          {portfolioLines.map((line, index) => {
            const Icon = line.icon;
            const delayClass = index < 2 ? 'home-delay-2' : 'home-delay-3';

            return (
              <button
                key={line.label}
                className={`${card} ${delayClass} ${line.accentClass} sm:flex-row sm:items-center`}
                onClick={() => onSelectLine(line.key)}
              >
                <div className="flex items-center gap-3">
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>
                  <span className="relative z-10 text-sm font-semibold uppercase leading-tight tracking-wide sm:text-base">
                    {line.label}
                  </span>
                </div>
                <div className="relative z-10 sm:ml-auto sm:max-w-sm">
                  <span className="text-[11px] normal-case leading-relaxed text-slate-500 sm:text-xs">
                    Ver referencias, presentaciones y portafolio de línea.
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="home-fade-up home-delay-3 mb-4 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 text-white/85" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Visión comercial</p>
              <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                Usa esta entrada para revisar surtido por línea y consolidar un pedido mayorista.
              </p>
            </div>
          </div>
        </div>

        <div className="home-fade-up home-delay-3 flex w-full flex-col gap-4">
          <button
            onClick={onOpenCatalog}
            className="
              home-cta-primary flex min-h-12 items-center justify-center gap-3 rounded-xl
              border border-white/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-white
              transition duration-300 hover:-translate-y-1 sm:text-base
              active:scale-[0.985]
            "
          >
            Ver portafolio completo
          </button>

          <button
            onClick={onOpenDistributors}
            className="
              flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/18
              bg-white/14 px-4 py-3.5 text-sm uppercase tracking-wide text-white/90
              shadow-[0_10px_26px_rgba(8,20,52,0.16)] backdrop-blur-md transition duration-300
              hover:-translate-y-1 hover:bg-white/18 hover:shadow-[0_20px_40px_rgba(8,20,52,0.22)]
              active:scale-[0.985] sm:text-base
            "
          >
            <MapPin size={18} />
            Ver distribuidores
          </button>
        </div>
      </div>
    </div>
  );
}
