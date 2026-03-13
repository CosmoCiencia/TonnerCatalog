import { Factory, Car, Home, TreePine, FileText, MapPin, Package, ShieldCheck } from 'lucide-react';
import type { HomeScreenProps } from './types';

const lineCards = [
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
] as const;

const frequentProducts = [
  { label: 'Vinilton', line: 'arquitectonica' },
  { label: 'Sellador Acrílico', line: 'arquitectonica' },
  { label: 'Permakill', line: 'arquitectonica' },
  { label: 'Esmalton', line: 'industrial' },
] as const;

export default function HomeContratista({
  selectedLocation,
  onSelectLine,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-5 text-center transition duration-300 sm:min-h-[148px] sm:p-6';

  return (
    <div className="home-screen home-screen-contratista flex min-h-screen flex-col items-center px-4 pb-8 pt-10 text-white sm:px-6 sm:pb-12 sm:pt-16">
      <div className="home-orb home-orb-primary" />
      <div className="home-orb home-orb-secondary" />
      <div className="home-orb home-orb-tertiary" />
      <div className="home-grid-overlay" />
      <div className="home-tech-lines" />

      <div className="home-panel home-panel-contratista home-fade-up rounded-[28px] px-4 pb-6 pt-8 sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-10 md:px-8">
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
            Modo Profesional
          </p>
          <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
            Selecciona la línea de trabajo
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
            Entra directo por línea y acelera la consulta de productos, presentaciones y ficha técnica.
          </p>
        </div>

        <div className="mb-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {lineCards.map((line, index) => {
              const Icon = line.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={line.label}
                  className={`${card} ${delayClass} ${line.accentClass}`}
                  onClick={() => onSelectLine(line.key)}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={32} className="sm:h-9 sm:w-9" />
                  </div>
                  <span className="relative z-10 text-sm font-semibold uppercase leading-tight tracking-wide sm:text-base">
                    {line.label}
                  </span>
                  <span className="relative z-10 text-[11px] normal-case leading-relaxed text-slate-500 sm:text-xs">
                    {line.hint}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="home-fade-up home-delay-3 rounded-[26px] border border-white/12 bg-slate-950/18 p-4 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-white/85" />
              <p className="text-sm font-semibold uppercase tracking-wide text-white">Panel de trabajo</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Productos frecuentes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {frequentProducts.map((product) => (
                  <button
                    key={product.label}
                    onClick={() => onSelectLine(product.line)}
                    className="rounded-full border border-white/16 bg-white/12 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/92 transition hover:bg-white/18"
                  >
                    {product.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-white/85" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Fichas técnicas</p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                      Revisa producto, presentación y características antes de agregar al pedido.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-white/85" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Compra de obra</p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-white/72">
                      Usa el pedido comercial para reunir varios productos y enviarlos a asesor.
                    </p>
                  </div>
                </div>
              </div>
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
            Ver todos los productos
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
            Ubicar distribuidoras
          </button>
        </div>
      </div>
    </div>
  );
}
