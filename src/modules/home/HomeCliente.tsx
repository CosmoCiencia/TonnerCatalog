import { useState } from 'react';
import {
  ArrowLeft,
  Bath,
  Car,
  DoorOpen,
  Factory,
  Home,
  MapPin,
  PaintBucket,
  Sparkles,
  TreePine,
  Wrench,
} from 'lucide-react';
import type { TonnerLineKey } from '../catalog/tonnerLines';
import type { HomeScreenProps } from './types';

type ClientIntentKey = 'casa' | 'carro' | 'madera' | 'metal';

interface ClientIntent {
  key: ClientIntentKey;
  label: string;
  hint: string;
  icon: typeof Home;
  accentClass: string;
  line: TonnerLineKey;
  suboptions: Array<{
    label: string;
    description: string;
    icon: typeof Home;
  }>;
}

const clientIntents: ClientIntent[] = [
  {
    key: 'casa',
    label: 'Casa',
    hint: 'Muros, fachadas y zonas húmedas.',
    icon: Home,
    accentClass: 'home-card-architectonica',
    line: 'arquitectonica',
    suboptions: [
      {
        label: 'Interior',
        description: 'Muros, techos y espacios residenciales.',
        icon: PaintBucket,
      },
      { label: 'Exterior', description: 'Fachadas y superficies expuestas.', icon: DoorOpen },
      { label: 'Baño / Cocina', description: 'Áreas con humedad, vapor y grasa.', icon: Bath },
    ],
  },
  {
    key: 'carro',
    label: 'Carro',
    hint: 'Repinte, fondo y acabado automotriz.',
    icon: Car,
    accentClass: 'home-card-automotriz',
    line: 'automotriz',
    suboptions: [
      { label: 'Acabado', description: 'Brillo, color y terminación final.', icon: Sparkles },
      { label: 'Fondo', description: 'Base para preparar superficie.', icon: PaintBucket },
      { label: 'Masilla', description: 'Corrección de imperfecciones.', icon: Wrench },
    ],
  },
  {
    key: 'madera',
    label: 'Madera',
    hint: 'Sellado, color y acabado de carpintería.',
    icon: TreePine,
    accentClass: 'home-card-maderas',
    line: 'maderas',
    suboptions: [
      { label: 'Sellado', description: 'Preparación antes del acabado final.', icon: PaintBucket },
      { label: 'Color', description: 'Tintes y acabados para tono visible.', icon: Sparkles },
      { label: 'Acabado', description: 'Lacas, barnices y protección.', icon: DoorOpen },
    ],
  },
  {
    key: 'metal',
    label: 'Metal',
    hint: 'Rejas, estructuras y protección industrial.',
    icon: Factory,
    accentClass: 'home-card-industrial',
    line: 'industrial',
    suboptions: [
      { label: 'Rejas', description: 'Protección y acabado decorativo.', icon: DoorOpen },
      { label: 'Estructuras', description: 'Piezas de trabajo y metalmecánica.', icon: Factory },
      { label: 'Protección', description: 'Primers y anticorrosivos.', icon: Wrench },
    ],
  },
];

export default function HomeCliente({
  selectedLocation,
  onSelectLine,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const [selectedIntent, setSelectedIntent] = useState<ClientIntent | null>(null);

  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-5 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:min-h-[148px] sm:p-6';

  const currentOptions = selectedIntent?.suboptions ?? [];

  return (
    <div className="home-screen home-screen-cliente flex min-h-screen flex-col items-center px-4 pb-8 pt-10 text-white sm:px-6 sm:pb-12 sm:pt-16">
      {/* background */}
      <div className="home-orb home-orb-primary" />
      <div className="home-orb home-orb-secondary" />
      <div className="home-orb home-orb-tertiary" />
      <div className="home-grid-overlay" />

      <div className="home-panel home-panel-cliente home-fade-up rounded-[28px] px-4 pb-6 pt-8 sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-10 md:px-8">
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent sm:inset-x-8" />

        {/* logo */}
        <img
          src="/logo.png"
          className="home-fade-up home-delay-1 mx-auto mb-8 h-20 drop-shadow-[0_12px_28px_rgba(0,0,0,0.28)] sm:mb-10 sm:h-28"
          alt="Pinturas Tonner"
        />

        {/* title */}
        <div className="home-fade-up home-delay-1 mb-8 text-center sm:mb-10">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white/92 backdrop-blur-md">
              <MapPin className="h-4 w-4" />
              {selectedLocation}
            </span>
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
            Modo Cliente
          </p>

          {selectedIntent ? (
            <>
              <button
                onClick={() => setSelectedIntent(null)}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/92 transition hover:bg-white/16"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>

              <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                ¿Qué parte de {selectedIntent.label.toLowerCase()} vas a pintar?
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm normal-case leading-relaxed text-white/75">
                Elige una ruta rápida y te llevamos al catálogo de la línea adecuada.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                ¿Qué necesitas pintar?
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm normal-case leading-relaxed text-white/75">
                Entra por tipo de proyecto y encuentra una ruta simple para elegir producto.
              </p>
            </>
          )}
        </div>

        {/* first step */}
        {!selectedIntent ? (
          <div className="mb-8 grid w-full grid-cols-2 gap-3 sm:mb-10 sm:gap-4 md:gap-5">
            {clientIntents.map((option, index) => {
              const Icon = option.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={option.label}
                  className={`${card} ${delayClass} ${option.accentClass}`}
                  onClick={() => setSelectedIntent(option)}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={32} className="sm:h-9 sm:w-9" />
                  </div>

                  <span className="relative z-10 text-sm font-semibold uppercase leading-tight tracking-wide sm:text-base">
                    {option.label}
                  </span>

                  <span className="relative z-10 text-[11px] normal-case leading-relaxed text-slate-500 sm:text-xs">
                    {option.hint}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
            {currentOptions.map((option, index) => {
              const Icon = option.icon;
              const delayClass =
                index === 0 ? 'home-delay-1' : index === 1 ? 'home-delay-2' : 'home-delay-3';

              return (
                <button
                  key={option.label}
                  className={`home-card ${selectedIntent.accentClass} ${delayClass} home-fade-up flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:px-5`}
                  onClick={() => onSelectLine(selectedIntent.line)}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {option.label}
                    </p>

                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* actions */}
        <div className="home-fade-up home-delay-3 flex w-full flex-col gap-4">
          <button
            onClick={onOpenCatalog}
            className="
              home-cta-primary flex min-h-12 items-center justify-center gap-3 rounded-xl
              border border-white/15 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-white
              transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
              active:scale-[0.97] sm:text-base
            "
          >
            Explorar catálogo
          </button>

          <button
            onClick={onOpenDistributors}
            className="
              flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/18
              bg-white/14 px-4 py-3.5 text-sm uppercase tracking-wide text-white/90
              shadow-[0_10px_26px_rgba(8,20,52,0.16)] backdrop-blur-md transition duration-300
              hover:-translate-y-1 hover:bg-white/18 hover:shadow-[0_20px_40px_rgba(8,20,52,0.22)]
              active:scale-[0.97] sm:text-base
            "
          >
            <MapPin size={18} />
            Ver distribuidoras
          </button>
        </div>
      </div>
    </div>
  );
}
