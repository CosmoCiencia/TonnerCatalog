import { useMemo, useState } from 'react';
import { ArrowLeft, Building2, Car, Factory, Gem, Home, MapPin, PackageSearch, ShoppingBag, Sparkles, TreePine, TrendingUp, Truck } from 'lucide-react';
import { PRODUCTS } from '../catalog/products';
import { TONNER_LINES, type TonnerLineKey } from '../catalog/tonnerLines';
import type { Product } from '../catalog/types';
import type { HomeScreenProps } from './types';

type DistributorFocusKey = 'rotacion' | 'premium' | 'pedido' | 'cobertura';

interface PortfolioLine {
  key: TonnerLineKey;
  label: string;
  icon: typeof Home;
  accentClass: string;
}

interface CommercialScenario {
  label: string;
  description: string;
  icon: typeof Home;
}

interface DistributorFocus {
  key: DistributorFocusKey;
  label: string;
  description: string;
  icon: typeof Home;
}

interface DistributorRule {
  line: TonnerLineKey;
  scenario: string;
  focus: Partial<Record<DistributorFocusKey, string[]>>;
  fallback: string[];
}

const portfolioLines: PortfolioLine[] = [
  { key: 'arquitectonica', label: 'Arquitectónica', icon: Home, accentClass: 'home-card-architectonica' },
  { key: 'industrial', label: 'Industrial', icon: Factory, accentClass: 'home-card-industrial' },
  { key: 'automotriz', label: 'Automotriz', icon: Car, accentClass: 'home-card-automotriz' },
  { key: 'maderas', label: 'Maderas', icon: TreePine, accentClass: 'home-card-maderas' },
];

const portfolioScenarios: Record<TonnerLineKey, CommercialScenario[]> = {
  arquitectonica: [
    { label: 'Alta rotación', description: 'Productos de salida constante para mostrador.', icon: TrendingUp },
    { label: 'Portafolio premium', description: 'Referencias de mejor desempeño y valor.', icon: Gem },
    { label: 'Cobertura de obra', description: 'Surtido para clientes de construcción y remodelación.', icon: Truck },
  ],
  industrial: [
    { label: 'Metal y mantenimiento', description: 'Base para ferretería técnica y mantenimiento.', icon: Factory },
    { label: 'Demarcación y tráfico', description: 'Líneas de alto movimiento para señalización.', icon: TrendingUp },
    { label: 'Protección anticorrosiva', description: 'Sistema técnico para industria y metalmecánica.', icon: Truck },
  ],
  automotriz: [
    { label: 'Taller rápido', description: 'Referencias de salida para repinte diario.', icon: Sparkles },
    { label: 'Portafolio premium', description: 'Sistema de mayor valor y acabado superior.', icon: Gem },
    { label: 'Base + preparación', description: 'Productos de soporte para taller y latonería.', icon: ShoppingBag },
  ],
  maderas: [
    { label: 'Carpintería general', description: 'Surtido práctico para talleres y fabricantes.', icon: Building2 },
    { label: 'Acabado premium', description: 'Lacas y sistemas de mayor valor percibido.', icon: Gem },
    { label: 'Sellado y base', description: 'Referencias de arranque para producción.', icon: PackageSearch },
  ],
};

const distributorFocuses: DistributorFocus[] = [
  {
    key: 'rotacion',
    label: 'Alta rotación',
    description: 'Sugerir referencias fáciles de mover en volumen.',
    icon: TrendingUp,
  },
  {
    key: 'premium',
    label: 'Mayor margen',
    description: 'Surtido orientado a productos de ticket superior.',
    icon: Gem,
  },
  {
    key: 'pedido',
    label: 'Pedido base',
    description: 'Una selección balanceada para abastecimiento inicial.',
    icon: ShoppingBag,
  },
  {
    key: 'cobertura',
    label: 'Cobertura regional',
    description: 'Portafolio amplio para atender más casos comerciales.',
    icon: Truck,
  },
];

const distributorRules: DistributorRule[] = [
  {
    line: 'arquitectonica',
    scenario: 'Alta rotación',
    focus: {
      rotacion: ['vinilton', 'tonerama', 'tonertex'],
      premium: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
      pedido: ['vinilton', 'tonertex', 'banos-y-cocinas'],
      cobertura: ['vinilton', 'tonertex', 'permakill'],
    },
    fallback: ['vinilton', 'tonertex', 'tonerama'],
  },
  {
    line: 'arquitectonica',
    scenario: 'Portafolio premium',
    focus: {
      rotacion: ['tonertex', 'vinilton', 'ultrarmor'],
      premium: ['ultrarmor', 'tonertex', 'banos-y-cocinas'],
      pedido: ['tonertex', 'ultrarmor', 'permakill'],
      cobertura: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
    },
    fallback: ['tonertex', 'ultrarmor', 'banos-y-cocinas'],
  },
  {
    line: 'arquitectonica',
    scenario: 'Cobertura de obra',
    focus: {
      rotacion: ['vinilton', 'tonertex', 'permakill'],
      premium: ['ultrarmor', 'tonertex', 'permakill'],
      pedido: ['vinilton', 'tonertex', 'banos-y-cocinas'],
      cobertura: ['vinilton', 'tonertex', 'permakill'],
    },
    fallback: ['vinilton', 'tonertex', 'permakill'],
  },
  {
    line: 'industrial',
    scenario: 'Metal y mantenimiento',
    focus: {
      rotacion: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      pedido: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
      cobertura: ['epoxico', 'secado-flash', 'wash-primer'],
    },
    fallback: ['secado-flash', 'esmalton-3en1', 'primer-epoxico'],
  },
  {
    line: 'industrial',
    scenario: 'Demarcación y tráfico',
    focus: {
      rotacion: ['trafico-pesado', 'secado-flash', 'epoxico'],
      premium: ['epoxico', 'trafico-pesado', 'primer-epoxico'],
      pedido: ['trafico-pesado', 'secado-flash', 'primer-epoxico'],
      cobertura: ['trafico-pesado', 'epoxico', 'wash-primer'],
    },
    fallback: ['trafico-pesado', 'secado-flash', 'epoxico'],
  },
  {
    line: 'industrial',
    scenario: 'Protección anticorrosiva',
    focus: {
      rotacion: ['primer-epoxico', 'wash-primer', 'secado-flash'],
      premium: ['epoxico', 'primer-epoxico', 'wash-primer'],
      pedido: ['primer-epoxico', 'wash-primer', 'epoxico'],
      cobertura: ['primer-epoxico', 'wash-primer', 'epoxico'],
    },
    fallback: ['primer-epoxico', 'wash-primer', 'epoxico'],
  },
  {
    line: 'automotriz',
    scenario: 'Taller rápido',
    focus: {
      rotacion: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
      premium: ['automotiva', 'poliuretano', 'fondo-poliuretano-2k'],
      pedido: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
      cobertura: ['automotiva-industrial', 'fondo-nitro-industrial', 'pasta-para-pulir'],
    },
    fallback: ['automotiva-industrial', 'fondo-nitro-industrial', 'masilla-industrial-nitro'],
  },
  {
    line: 'automotriz',
    scenario: 'Portafolio premium',
    focus: {
      rotacion: ['automotiva', 'poliuretano', 'fondo-poliuretano-2k'],
      premium: ['poliuretano', 'automotiva', 'fondo-poliuretano-2k'],
      pedido: ['automotiva', 'poliuretano', 'fondo-nitro'],
      cobertura: ['automotiva', 'poliuretano', 'masilla-nitro'],
    },
    fallback: ['poliuretano', 'automotiva', 'fondo-poliuretano-2k'],
  },
  {
    line: 'automotriz',
    scenario: 'Base + preparación',
    focus: {
      rotacion: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'pasta-para-pulir'],
      premium: ['fondo-poliuretano-2k', 'masilla-nitro', 'poliuretano'],
      pedido: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'fondo-poliuretano-2k'],
      cobertura: ['fondo-nitro', 'masilla-nitro', 'pasta-para-pulir'],
    },
    fallback: ['fondo-nitro-industrial', 'masilla-industrial-nitro', 'pasta-para-pulir'],
  },
  {
    line: 'maderas',
    scenario: 'Carpintería general',
    focus: {
      rotacion: ['LM-700', 'LM-730', 'LC-735'],
      premium: ['LC-750', 'PU-740', 'LC-759'],
      pedido: ['LM-700', 'LM-730', 'LC-735'],
      cobertura: ['LM-700', 'LC-750', 'PU-740'],
    },
    fallback: ['LM-700', 'LM-730', 'LC-735'],
  },
  {
    line: 'maderas',
    scenario: 'Acabado premium',
    focus: {
      rotacion: ['LC-750', 'LC-759', 'PU-740'],
      premium: ['PU-740', 'LC-750', 'LC-759'],
      pedido: ['LC-750', 'LC-759', 'LM-700'],
      cobertura: ['PU-740', 'LC-750', 'LM-730'],
    },
    fallback: ['PU-740', 'LC-750', 'LC-759'],
  },
  {
    line: 'maderas',
    scenario: 'Sellado y base',
    focus: {
      rotacion: ['LM-730', 'LC-735', 'PU-740'],
      premium: ['LC-735', 'PU-740', 'LC-750'],
      pedido: ['LM-730', 'LC-735', 'LM-700'],
      cobertura: ['LM-730', 'LC-735', 'PU-740'],
    },
    fallback: ['LM-730', 'LC-735', 'PU-740'],
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

export default function HomeDistribuidor({
  selectedLocation,
  onSelectLine,
  onRecommendProduct,
  onOpenCatalog,
  onOpenDistributors,
}: HomeScreenProps) {
  const [selectedLine, setSelectedLine] = useState<PortfolioLine | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<DistributorFocusKey | null>(null);

  const card =
    'home-card home-fade-up flex min-h-[132px] flex-col items-start justify-between gap-4 rounded-2xl px-4 py-5 text-left transition duration-300 sm:min-h-[148px] sm:p-6';

  const currentScenarios = selectedLine ? portfolioScenarios[selectedLine.key] : [];
  const lineMeta = selectedLine ? TONNER_LINES[selectedLine.key] : null;

  const recommendedProducts = useMemo(() => {
    if (!selectedLine || !selectedScenario || !selectedFocus) {
      return [];
    }

    const rule = distributorRules.find(
      (item) => item.line === selectedLine.key && item.scenario === selectedScenario,
    );

    if (!rule) {
      return findProductsByIds([], selectedLine.key);
    }

    return findProductsByIds(rule.focus[selectedFocus] ?? rule.fallback, selectedLine.key);
  }, [selectedLine, selectedScenario, selectedFocus]);

  const currentStep = !selectedLine ? '1 de 3' : !selectedScenario ? '2 de 3' : '3 de 3';

  const stepBack = () => {
    if (selectedFocus) {
      setSelectedFocus(null);
      return;
    }

    if (selectedScenario) {
      setSelectedScenario(null);
      return;
    }

    setSelectedLine(null);
  };

  const resetFlow = () => {
    setSelectedLine(null);
    setSelectedScenario(null);
    setSelectedFocus(null);
  };

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

              {!selectedScenario ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Qué tipo de negocio quieres atender?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Define el escenario comercial para sugerir un surtido más útil para tu punto de venta.
                  </p>
                </>
              ) : !selectedFocus ? (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    ¿Qué buscas en el surtido?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Podemos priorizar rotación, margen, pedido base o cobertura comercial.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                    Surtido sugerido
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                    Estas 3 referencias están pensadas para una lógica más comercial y mayorista.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.12em] md:text-2xl">
                Portafolio Tonner
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm normal-case leading-relaxed text-white/75">
                Explora líneas, prepara surtido y arma pedidos comerciales desde una vista de portafolio.
              </p>
            </>
          )}
        </div>

        {!selectedLine ? (
          <>
            <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
              {portfolioLines.map((line, index) => {
                const Icon = line.icon;
                const delayClass = index < 2 ? 'home-delay-2' : 'home-delay-3';

                return (
                  <button
                    key={line.label}
                    className={`${card} ${delayClass} ${line.accentClass} sm:flex-row sm:items-center`}
                    onClick={() => {
                      setSelectedLine(line);
                      setSelectedScenario(null);
                      setSelectedFocus(null);
                    }}
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
          </>
        ) : !selectedScenario ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:gap-4">
            {currentScenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              const delayClass =
                index === 0 ? 'home-delay-1' : index === 1 ? 'home-delay-2' : 'home-delay-3';

              return (
                <button
                  key={scenario.label}
                  className={`home-card ${selectedLine.accentClass} ${delayClass} home-fade-up flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] sm:px-5`}
                  onClick={() => setSelectedScenario(scenario.label)}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {scenario.label}
                    </p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {scenario.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : !selectedFocus ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4">
            {distributorFocuses.map((focus, index) => {
              const Icon = focus.icon;
              const delayClass = index < 2 ? 'home-delay-1' : 'home-delay-2';

              return (
                <button
                  key={focus.key}
                  onClick={() => setSelectedFocus(focus.key)}
                  className={`home-card ${selectedLine.accentClass} ${delayClass} home-fade-up flex min-h-[140px] flex-col items-start gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97]`}
                >
                  <div className="home-card-icon relative z-10">
                    <Icon size={28} className="sm:h-8 sm:w-8" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-950 sm:text-base">
                      {focus.label}
                    </p>
                    <p className="mt-1 text-sm normal-case leading-relaxed text-slate-600">
                      {focus.description}
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
                  3 productos para surtido
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
                        Opción {index + 1} · {product.segment || product.subline || 'Surtido comercial'}
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
                    Ver portafolio completo
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
