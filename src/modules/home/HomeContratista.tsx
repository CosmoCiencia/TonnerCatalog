import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Car,
  Factory,
  FileText,
  Gauge,
  Gem,
  HardHat,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  TreePine,
  Wrench,
} from 'lucide-react';
import { PRODUCTS } from '../catalog/products';
import { TONNER_LINES, type TonnerLineKey } from '../catalog/tonnerLines';
import type { Product } from '../catalog/types';
import type { HomeScreenProps } from './types';

type ContractorPriorityKey = 'rendimiento' | 'durabilidad' | 'secado' | 'premium';

interface ContractorLine {
  key: TonnerLineKey;
  label: string;
  hint: string;
  icon: typeof Home;
  accentClass: string;
}

interface ContractorUseCase {
  label: string;
  description: string;
  icon: typeof Home;
}

interface ContractorPriority {
  key: ContractorPriorityKey;
  label: string;
  description: string;
  icon: typeof Home;
}

interface ContractorRule {
  line: TonnerLineKey;
  useCase: string;
  priorities: Partial<Record<ContractorPriorityKey, string[]>>;
  fallback: string[];
}

const contractorLines: ContractorLine[] = [
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
];

const lineUseCases: Record<TonnerLineKey, ContractorUseCase[]> = {
  arquitectonica: [
    { label: 'Muro interior', description: 'Obra residencial y comercial interior.', icon: Home },
    { label: 'Fachada', description: 'Exterior expuesto a intemperie.', icon: HardHat },
    { label: 'Zona húmeda', description: 'Baños, cocinas y áreas sensibles.', icon: ShieldCheck },
  ],
  industrial: [
    { label: 'Estructura metálica', description: 'Protección y acabado de piezas metálicas.', icon: Factory },
    { label: 'Piso / demarcación', description: 'Tráfico, canchas y señalización.', icon: Gauge },
    { label: 'Primer anticorrosivo', description: 'Base técnica para sistemas industriales.', icon: Wrench },
  ],
  automotriz: [
    { label: 'Acabado', description: 'Color y terminación final.', icon: Sparkles },
    { label: 'Fondo', description: 'Preparación de superficie.', icon: Package },
    { label: 'Masilla', description: 'Relleno y corrección.', icon: Wrench },
  ],
  maderas: [
    { label: 'Sellado', description: 'Preparación antes del acabado.', icon: FileText },
    { label: 'Acabado brillante', description: 'Presentación final con brillo.', icon: Gem },
    { label: 'Acabado resistente', description: 'Mayor vida útil y dureza.', icon: ShieldCheck },
  ],
};

const contractorPriorities: ContractorPriority[] = [
  {
    key: 'rendimiento',
    label: 'Rendimiento',
    description: 'Buena cobertura y productividad en obra.',
    icon: Gauge,
  },
  {
    key: 'durabilidad',
    label: 'Durabilidad',
    description: 'Mayor resistencia y permanencia del sistema.',
    icon: ShieldCheck,
  },
  {
    key: 'secado',
    label: 'Secado rápido',
    description: 'Menos tiempo de espera entre procesos.',
    icon: Sparkles,
  },
  {
    key: 'premium',
    label: 'Acabado premium',
    description: 'Resultado visual y técnico superior.',
    icon: Gem,
  },
];

const contractorRules: ContractorRule[] = [
  {
    line: 'arquitectonica',
    useCase: 'Muro interior',
    priorities: {
      rendimiento: ['vinilton', 'tonerama', 'tonertex'],
      durabilidad: ['tonertex', 'vinilton', 'banos-y-cocinas'],
      secado: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'banos-y-cocinas', 'vinilton'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    line: 'arquitectonica',
    useCase: 'Fachada',
    priorities: {
      rendimiento: ['vinilton', 'ultrarmor', 'tonertex'],
      durabilidad: ['ultrarmor', 'permakill', 'tonertex'],
      secado: ['ultrarmor', 'vinilton', 'tonertex'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
    },
    fallback: ['ultrarmor', 'tonertex', 'permakill'],
  },
  {
    line: 'arquitectonica',
    useCase: 'Zona húmeda',
    priorities: {
      rendimiento: ['banos-y-cocinas', 'vinilton', 'tonertex'],
      durabilidad: ['banos-y-cocinas', 'permakill', 'ultrarmor'],
      secado: ['banos-y-cocinas', 'tonertex', 'vinilton'],
      premium: ['banos-y-cocinas', 'ultrarmor', 'tonertex'],
    },
    fallback: ['banos-y-cocinas', 'permakill', 'tonertex'],
  },
  {
    line: 'industrial',
    useCase: 'Estructura metálica',
    priorities: {
      rendimiento: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      durabilidad: ['epoxico', 'primer-epoxico', 'wash-primer'],
      secado: ['secado-flash', 'primer-epoxico', 'esmalton-3en1'],
      premium: ['epoxico', 'esmalton-3en1', 'primer-epoxico'],
    },
    fallback: ['epoxico', 'primer-epoxico', 'wash-primer'],
  },
  {
    line: 'industrial',
    useCase: 'Piso / demarcación',
    priorities: {
      rendimiento: ['trafico-pesado', 'secado-flash', 'epoxico'],
      durabilidad: ['trafico-pesado', 'epoxico', 'primer-epoxico'],
      secado: ['trafico-pesado', 'secado-flash', 'primer-epoxico'],
      premium: ['epoxico', 'trafico-pesado', 'wash-primer'],
    },
    fallback: ['trafico-pesado', 'epoxico', 'secado-flash'],
  },
  {
    line: 'industrial',
    useCase: 'Primer anticorrosivo',
    priorities: {
      rendimiento: ['primer-epoxico', 'wash-primer', 'secado-flash'],
      durabilidad: ['wash-primer', 'primer-epoxico', 'epoxico'],
      secado: ['wash-primer', 'primer-epoxico', 'secado-flash'],
      premium: ['primer-epoxico', 'epoxico', 'wash-primer'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
  {
    line: 'automotriz',
    useCase: 'Acabado',
    priorities: {
      rendimiento: ['automotiva-industrial', 'automotiva', 'poliuretano'],
      durabilidad: ['poliuretano', 'automotiva-industrial', 'automotiva'],
      secado: ['automotiva', 'automotiva-industrial', 'poliuretano'],
      premium: ['poliuretano', 'automotiva', 'automotiva-industrial'],
    },
    fallback: ['automotiva', 'automotiva-industrial', 'poliuretano'],
  },
  {
    line: 'automotriz',
    useCase: 'Fondo',
    priorities: {
      rendimiento: ['fondo-nitro-industrial', 'fondo-nitro', 'fondo-poliuretano-2k'],
      durabilidad: ['fondo-poliuretano-2k', 'fondo-nitro-industrial', 'fondo-nitro'],
      secado: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
      premium: ['fondo-poliuretano-2k', 'fondo-nitro', 'poliuretano'],
    },
    fallback: ['fondo-nitro', 'fondo-nitro-industrial', 'fondo-poliuretano-2k'],
  },
  {
    line: 'automotriz',
    useCase: 'Masilla',
    priorities: {
      rendimiento: ['masilla-industrial-nitro', 'masilla-nitro', 'pasta-para-pulir'],
      durabilidad: ['masilla-nitro', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      secado: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
      premium: ['masilla-nitro', 'pasta-para-pulir', 'fondo-poliuretano-2k'],
    },
    fallback: ['masilla-nitro', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    line: 'maderas',
    useCase: 'Sellado',
    priorities: {
      rendimiento: ['LM-730', 'LC-735', 'PU-740'],
      durabilidad: ['LC-735', 'PU-740', 'LC-750'],
      secado: ['LM-730', 'LC-735', 'LC-750'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
  },
  {
    line: 'maderas',
    useCase: 'Acabado brillante',
    priorities: {
      rendimiento: ['LM-700', 'LC-759', 'LC-750'],
      durabilidad: ['PU-740', 'LC-750', 'LM-700'],
      secado: ['LM-700', 'LC-750', 'LC-759'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
    },
    fallback: ['LM-700', 'LC-750', 'PU-740'],
  },
  {
    line: 'maderas',
    useCase: 'Acabado resistente',
    priorities: {
      rendimiento: ['LC-759', 'PU-740', 'LM-700'],
      durabilidad: ['PU-740', 'LC-750', 'LC-759'],
      secado: ['LC-750', 'LM-700', 'LC-759'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
    },
    fallback: ['PU-740', 'LC-750', 'LC-759'],
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

export default function HomeContratista({
  selectedLocation,
  onSelectLine,
  onRecommendProduct,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const [selectedLine, setSelectedLine] = useState<ContractorLine | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<ContractorPriorityKey | null>(null);

  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-5 text-center transition duration-300 sm:min-h-[148px] sm:p-6';

  const currentUseCases = selectedLine ? lineUseCases[selectedLine.key] : [];
  const lineMeta = selectedLine ? TONNER_LINES[selectedLine.key] : null;

  const recommendedProducts = useMemo(() => {
    if (!selectedLine || !selectedUseCase || !selectedPriority) {
      return [];
    }

    const rule = contractorRules.find(
      (item) => item.line === selectedLine.key && item.useCase === selectedUseCase,
    );

    if (!rule) {
      return findProductsByIds([], selectedLine.key);
    }

    return findProductsByIds(rule.priorities[selectedPriority] ?? rule.fallback, selectedLine.key);
  }, [selectedLine, selectedUseCase, selectedPriority]);

  const currentStep = !selectedLine ? '1 de 3' : !selectedUseCase ? '2 de 3' : '3 de 3';

  const stepBack = () => {
    if (selectedPriority) {
      setSelectedPriority(null);
      return;
    }

    if (selectedUseCase) {
      setSelectedUseCase(null);
      return;
    }

    setSelectedLine(null);
  };

  const resetFlow = () => {
    setSelectedLine(null);
    setSelectedUseCase(null);
    setSelectedPriority(null);
  };

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
            Paso {currentStep}
          </p>

          {selectedLine ? (
            <>
              <button
                onClick={stepBack}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/92 transition hover:bg-white/16"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>

              {!selectedUseCase ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Cuál es el frente de trabajo?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Afinemos la recomendación según el tipo de aplicación dentro de {lineMeta?.label}.
                  </p>
                </>
              ) : !selectedPriority ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Qué prioridad tienes en obra?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Selecciona si buscas rendimiento, durabilidad, secado o una terminación premium.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    Recomendación de obra
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Estas 3 referencias encajan mejor con tu frente de trabajo y prioridad técnica.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                Selecciona la línea de trabajo
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                Entra por línea y acelera la consulta de productos, presentaciones y ficha técnica.
              </p>
            </>
          )}
        </div>

        {!selectedLine ? (
          <div className="mb-8 grid w-full grid-cols-2 gap-3 sm:mb-10 sm:gap-4 md:gap-5">
            {contractorLines.map((line, index) => {
              const Icon = line.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={line.label}
                  className={`${card} ${delayClass} ${line.accentClass}`}
                  onClick={() => {
                    setSelectedLine(line);
                    setSelectedUseCase(null);
                    setSelectedPriority(null);
                  }}
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
        ) : !selectedUseCase ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
            {currentUseCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const delayClass =
                index === 0 ? 'home-delay-1' : index === 1 ? 'home-delay-2' : 'home-delay-3';

              return (
                <button
                  key={useCase.label}
                  className={`home-card ${selectedLine.accentClass} ${delayClass} home-fade-up flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:px-5`}
                  onClick={() => setSelectedUseCase(useCase.label)}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {useCase.label}
                    </p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {useCase.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : !selectedPriority ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4">
            {contractorPriorities.map((priority, index) => {
              const Icon = priority.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={priority.key}
                  onClick={() => setSelectedPriority(priority.key)}
                  className={`home-card ${selectedLine.accentClass} ${delayClass} home-fade-up flex min-h-[140px] flex-col items-start gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97]`}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {priority.label}
                    </p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {priority.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-8 sm:mb-10">
            <article className="overflow-hidden rounded-[28px] border border-white/14 bg-white text-slate-900 shadow-[0_24px_64px_rgba(8,20,52,0.24)]">
              <div className={`bg-gradient-to-r px-5 py-4 text-white sm:px-6 ${lineMeta?.gradient ?? 'from-tonner-blue via-indigo-600 to-tonner-blue'}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                  {lineMeta?.label ?? 'Tonner'}
                </p>
                <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.08em] sm:text-2xl">
                  3 productos recomendados
                </h3>
              </div>

              <div className="grid gap-4 p-5 sm:p-6">
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
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tonner-blue/80">
                        Opción {index + 1} · {product.segment || product.subline || 'Sistema recomendado'}
                      </p>
                      <h4 className="mt-2 text-base font-bold uppercase tracking-[0.06em] text-slate-900">
                        {product.name}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
                    </div>
                    <button
                      onClick={() => onRecommendProduct(product)}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-tonner-blue px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-tonner-orange sm:min-w-[150px]"
                    >
                      Ver producto
                    </button>
                  </article>
                ))}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => onSelectLine(selectedLine.key)}
                    className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
                  >
                    Ver línea completa
                  </button>
                  <button
                    onClick={resetFlow}
                    className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-slate-700 transition duration-300 hover:-translate-y-1 hover:bg-slate-100"
                  >
                    Hacer otra selección
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

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
