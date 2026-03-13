import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bath,
  Car,
  DoorOpen,
  Droplets,
  Factory,
  Gem,
  Home,
  MapPin,
  PaintBucket,
  ShieldCheck,
  Sparkles,
  TreePine,
  Wrench,
} from 'lucide-react';
import { PRODUCTS } from '../catalog/products';
import { TONNER_LINES, type TonnerLineKey } from '../catalog/tonnerLines';
import type { Product } from '../catalog/types';
import type { HomeScreenProps } from './types';

type ClientIntentKey = 'casa' | 'carro' | 'madera' | 'metal';
type ClientGoalKey = 'durabilidad' | 'economia' | 'premium' | 'antihumedad';

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

interface ClientGoal {
  key: ClientGoalKey;
  label: string;
  description: string;
  icon: typeof Home;
}

interface RecommendationRule {
  intent: ClientIntentKey;
  suboption: string;
  goals: Partial<Record<ClientGoalKey, string[]>>;
  fallback: string[];
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

const clientGoals: ClientGoal[] = [
  {
    key: 'durabilidad',
    label: 'Durabilidad',
    description: 'Mayor resistencia y vida útil del recubrimiento.',
    icon: ShieldCheck,
  },
  {
    key: 'economia',
    label: 'Economía',
    description: 'Buena relación costo-rendimiento para avanzar rápido.',
    icon: PaintBucket,
  },
  {
    key: 'premium',
    label: 'Acabado premium',
    description: 'Mayor presencia visual, brillo o acabado superior.',
    icon: Gem,
  },
  {
    key: 'antihumedad',
    label: 'Antihumedad',
    description: 'Protección extra contra humedad, filtración o vapor.',
    icon: Droplets,
  },
];

const recommendationRules: RecommendationRule[] = [
  {
    intent: 'casa',
    suboption: 'Interior',
    goals: {
      economia: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'vinilton', 'banos-y-cocinas'],
      durabilidad: ['tonertex', 'vinilton', 'ultrarmor'],
      antihumedad: ['banos-y-cocinas', 'permakill', 'tonertex'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    intent: 'casa',
    suboption: 'Exterior',
    goals: {
      economia: ['vinilton', 'ultrarmor', 'tonertex'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
      durabilidad: ['ultrarmor', 'permakill', 'tonertex'],
      antihumedad: ['permakill', 'ultrarmor', 'banos-y-cocinas'],
    },
    fallback: ['ultrarmor', 'permakill', 'tonertex'],
  },
  {
    intent: 'casa',
    suboption: 'Baño / Cocina',
    goals: {
      economia: ['banos-y-cocinas', 'vinilton', 'tonertex'],
      premium: ['banos-y-cocinas', 'tonertex', 'ultrarmor'],
      durabilidad: ['banos-y-cocinas', 'permakill', 'tonertex'],
      antihumedad: ['banos-y-cocinas', 'permakill', 'ultrarmor'],
    },
    fallback: ['banos-y-cocinas', 'permakill', 'tonertex'],
  },
  {
    intent: 'carro',
    suboption: 'Acabado',
    goals: {
      economia: ['automotiva-industrial', 'automotiva', 'poliuretano'],
      premium: ['poliuretano', 'automotiva', 'automotiva-industrial'],
      durabilidad: ['poliuretano', 'automotiva-industrial', 'automotiva'],
      antihumedad: ['automotiva-industrial', 'poliuretano', 'fondo-poliuretano-2k'],
    },
    fallback: ['automotiva', 'automotiva-industrial', 'poliuretano'],
  },
  {
    intent: 'carro',
    suboption: 'Fondo',
    goals: {
      economia: ['fondo-nitro-industrial', 'fondo-nitro', 'masilla-industrial-nitro'],
      premium: ['fondo-poliuretano-2k', 'fondo-nitro', 'poliuretano'],
      durabilidad: ['fondo-poliuretano-2k', 'fondo-nitro-industrial', 'fondo-nitro'],
      antihumedad: ['fondo-poliuretano-2k', 'primer-epoxico', 'wash-primer'],
    },
    fallback: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
  },
  {
    intent: 'carro',
    suboption: 'Masilla',
    goals: {
      economia: ['masilla-industrial-nitro', 'masilla-nitro', 'fondo-nitro-industrial'],
      premium: ['masilla-nitro', 'pasta-para-pulir', 'fondo-poliuretano-2k'],
      durabilidad: ['masilla-nitro', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      antihumedad: ['masilla-nitro', 'fondo-poliuretano-2k', 'primer-epoxico'],
    },
    fallback: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    intent: 'madera',
    suboption: 'Sellado',
    goals: {
      economia: ['LM-730', 'LC-735', 'PU-740'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
      durabilidad: ['LC-735', 'PU-740', 'LC-750'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
  },
  {
    intent: 'madera',
    suboption: 'Color',
    goals: {
      economia: ['LC-759', 'LM-700', 'LM-730'],
      premium: ['LC-750', 'LC-759', 'PU-740'],
      durabilidad: ['LC-750', 'PU-740', 'LC-759'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LC-750', 'LC-759', 'PU-740'],
  },
  {
    intent: 'madera',
    suboption: 'Acabado',
    goals: {
      economia: ['LM-700', 'LM-770', 'LM-730'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
      durabilidad: ['PU-740', 'LC-750', 'LM-700'],
      antihumedad: ['PU-740', 'LC-735', 'LC-750'],
    },
    fallback: ['LM-700', 'PU-740', 'LC-750'],
  },
  {
    intent: 'metal',
    suboption: 'Rejas',
    goals: {
      economia: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      premium: ['esmalton-3en1', 'epoxico', 'secado-flash'],
      durabilidad: ['esmalton-3en1', 'epoxico', 'primer-epoxico'],
      antihumedad: ['primer-epoxico', 'wash-primer', 'epoxico'],
    },
    fallback: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
  },
  {
    intent: 'metal',
    suboption: 'Estructuras',
    goals: {
      economia: ['secado-flash', 'primer-epoxico', 'esmalton-3en1'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      durabilidad: ['epoxico', 'primer-epoxico', 'wash-primer'],
      antihumedad: ['wash-primer', 'primer-epoxico', 'epoxico'],
    },
    fallback: ['epoxico', 'primer-epoxico', 'wash-primer'],
  },
  {
    intent: 'metal',
    suboption: 'Protección',
    goals: {
      economia: ['secado-flash', 'primer-epoxico', 'wash-primer'],
      premium: ['primer-epoxico', 'epoxico', 'wash-primer'],
      durabilidad: ['primer-epoxico', 'epoxico', 'wash-primer'],
      antihumedad: ['wash-primer', 'primer-epoxico', 'epoxico'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
];

function findProductsByIds(productIds: string[], line: TonnerLineKey): Product[] {
  const selected: Product[] = [];

  for (const productId of productIds) {
    const product = PRODUCTS.find(
      (item) =>
        item &&
        item.id === productId &&
        item.line === line &&
        !selected.some((entry) => entry.id === item.id),
    );
    if (product) {
      selected.push(product);
    }
  }

  if (selected.length < 3) {
    for (const product of PRODUCTS) {
      if (!product || product.line !== line || selected.some((entry) => entry.id === product.id)) {
        continue;
      }

      selected.push(product);
      if (selected.length === 3) {
        break;
      }
    }
  }

  return selected.slice(0, 3);
}

export default function HomeCliente({
  selectedLocation,
  onSelectLine,
  onRecommendProduct,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const [selectedIntent, setSelectedIntent] = useState<ClientIntent | null>(null);
  const [selectedSuboption, setSelectedSuboption] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<ClientGoalKey | null>(null);

  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-5 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:min-h-[148px] sm:p-6';

  const currentOptions = selectedIntent?.suboptions ?? [];
  const lineMeta = selectedIntent ? TONNER_LINES[selectedIntent.line] : null;

  const recommendedProducts = useMemo(() => {
    if (!selectedIntent || !selectedSuboption || !selectedGoal) {
      return [];
    }

    const rule = recommendationRules.find(
      (item) => item.intent === selectedIntent.key && item.suboption === selectedSuboption,
    );

    if (!rule) {
      return findProductsByIds([], selectedIntent.line);
    }

    return findProductsByIds(rule.goals[selectedGoal] ?? rule.fallback, selectedIntent.line);
  }, [selectedGoal, selectedIntent, selectedSuboption]);

  const currentStep = !selectedIntent ? '1 de 3' : !selectedSuboption ? '2 de 3' : '3 de 3';

  const resetFlow = () => {
    setSelectedIntent(null);
    setSelectedSuboption(null);
    setSelectedGoal(null);
  };

  const stepBack = () => {
    if (selectedGoal) {
      setSelectedGoal(null);
      return;
    }

    if (selectedSuboption) {
      setSelectedSuboption(null);
      return;
    }

    setSelectedIntent(null);
  };

  const handleSelectIntent = (intent: ClientIntent) => {
    setSelectedIntent(intent);
    setSelectedSuboption(null);
    setSelectedGoal(null);
  };

  const handleSelectSuboption = (suboption: string) => {
    setSelectedSuboption(suboption);
    setSelectedGoal(null);
  };

  const handleRecommendNow = () => {
    setSelectedGoal('premium');
  };

  return (
    <div className="home-screen home-screen-cliente flex min-h-screen flex-col items-center px-4 pb-8 pt-10 text-white sm:px-6 sm:pb-12 sm:pt-16">
      <div className="home-orb home-orb-primary" />
      <div className="home-orb home-orb-secondary" />
      <div className="home-orb home-orb-tertiary" />
      <div className="home-grid-overlay" />

      <div className="home-panel home-panel-cliente home-fade-up rounded-[28px] px-4 pb-6 pt-8 sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-10 md:px-8">
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
            Paso {currentStep}
          </p>

          {selectedIntent ? (
            <>
              <button
                onClick={stepBack}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/92 transition hover:bg-white/16"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>

              {!selectedSuboption ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Qué parte de {selectedIntent.label.toLowerCase()} vas a pintar?
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm normal-case leading-relaxed text-white/75">
                    Elige una ruta rápida y te llevamos a una recomendación más precisa.
                  </p>
                </>
              ) : !selectedGoal ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Qué tipo de resultado buscas?
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm normal-case leading-relaxed text-white/75">
                    Ya sabemos que quieres pintar {selectedSuboption.toLowerCase()}. Ahora afinemos
                    la recomendación.
                  </p>
                </>
              ) : recommendedProducts.length ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    Productos recomendados
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm normal-case leading-relaxed text-white/75">
                    Seleccionamos 3 referencias de {lineMeta?.label ?? 'Tonner'} según tu proyecto,
                    subcategoría y objetivo.
                  </p>
                </>
              ) : null}
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

        {!selectedIntent ? (
          <div className="mb-8 grid w-full grid-cols-2 gap-3 sm:mb-10 sm:gap-4 md:gap-5">
            {clientIntents.map((option, index) => {
              const Icon = option.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={option.label}
                  className={`${card} ${delayClass} ${option.accentClass}`}
                  onClick={() => handleSelectIntent(option)}
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
        ) : !selectedSuboption ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
            {currentOptions.map((option, index) => {
              const Icon = option.icon;
              const delayClass =
                index === 0 ? 'home-delay-1' : index === 1 ? 'home-delay-2' : 'home-delay-3';

              return (
                <button
                  key={option.label}
                  className={`home-card ${selectedIntent.accentClass} ${delayClass} home-fade-up flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:px-5`}
                  onClick={() => handleSelectSuboption(option.label)}
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

            <button
              onClick={handleRecommendNow}
              className="home-fade-up home-delay-3 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-dashed border-white/28 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/16"
            >
              Recomendarme un producto
            </button>
          </div>
        ) : !selectedGoal ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4">
            {clientGoals.map((goal, index) => {
              const Icon = goal.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={goal.key}
                  onClick={() => setSelectedGoal(goal.key)}
                  className={`home-card ${selectedIntent.accentClass} ${delayClass} home-fade-up flex min-h-[140px] flex-col items-start gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97]`}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {goal.label}
                    </p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {goal.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : recommendedProducts.length ? (
          <div className="mb-8 sm:mb-10">
            <article className="overflow-hidden rounded-[28px] border border-white/18 bg-white text-slate-900 shadow-[0_24px_64px_rgba(8,20,52,0.24)]">
              <div
                className={`bg-gradient-to-r px-5 py-4 text-white sm:px-6 ${lineMeta?.gradient ?? 'from-tonner-blue via-indigo-600 to-tonner-blue'}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                  {lineMeta?.label ?? 'Tonner'}
                </p>
                <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.08em] sm:text-2xl">
                  3 productos para comparar
                </h3>
              </div>

              <div className="grid gap-5 p-5 sm:p-6">
                <div className="grid gap-4">
                  {recommendedProducts.map((product, index) => (
                    <article
                      key={product.id}
                      className="grid items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[108px_1fr_auto]"
                    >
                      <div className="flex h-24 items-center justify-center rounded-2xl bg-white p-3">
                        {product.image || product.image_url ? (
                          <img
                            src={product.image || product.image_url}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Tonner
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tonner-blue/80">
                          Opción {index + 1} · {product.segment || product.subline || 'Producto recomendado'}
                        </p>
                        <h4 className="mt-2 text-base font-bold uppercase tracking-[0.06em] text-slate-900">
                          {product.name}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {product.description}
                        </p>

                        {product.uses?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {product.uses.slice(0, 3).map((use) => (
                              <span
                                key={use}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600"
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <button
                        onClick={() => onRecommendProduct(product)}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-tonner-blue px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-tonner-orange sm:min-w-[150px]"
                      >
                        Ver producto
                      </button>
                    </article>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => onSelectLine(selectedIntent.line)}
                    className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
                  >
                    Ver catálogo completo
                  </button>

                  <button
                    onClick={onOpenDistributors}
                    className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
                  >
                    Ver distribuidoras
                  </button>
                </div>

                <button
                  onClick={resetFlow}
                  className="text-sm font-semibold uppercase tracking-wide text-tonner-blue transition hover:text-tonner-orange"
                >
                  Hacer otra recomendación
                </button>
              </div>
            </article>
          </div>
        ) : null}

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
