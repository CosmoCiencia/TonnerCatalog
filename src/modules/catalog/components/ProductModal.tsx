import type { Product } from '../types';
import { TONNER_LINES } from '../tonnerLines';
import { X, Download } from 'lucide-react';
import type { UserType } from '../../onboarding/userTypes';

interface Props {
  product: Product | null;
  userType: UserType;
  primaryActionLabel: string;
  onAddToOrder: (product: Product) => void;
  onClose: () => void;
}

const visibleSections: Record<UserType, Array<'description' | 'segment' | 'uses' | 'presentations' | 'attributes' | 'tones'>> = {
  cliente: ['description', 'presentations'],
  contratista: ['description', 'uses', 'presentations', 'attributes'],
  distribuidor: ['segment', 'presentations', 'attributes', 'tones'],
};

export default function ProductModal({
  product,
  userType,
  primaryActionLabel,
  onAddToOrder,
  onClose,
}: Props) {
  if (!product) return null;

  const line = product.line ? TONNER_LINES[product.line] : null;
  const tones = (product.colors ?? product.tones ?? []) as Array<
    string | { name: string; code?: string; hex?: string }
  >;
  const attributes = product.characteristics?.length
    ? product.characteristics.map((label, index) => ({
        id: `characteristic-${index + 1}`,
        label,
      }))
    : (product.attributes ?? []);
  const productSubline = product.segment || product.subline;
  const productImage = product.image || product.image_url;
  const sections = visibleSections[userType];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center">
      <div
        className="
          relative
          h-[92vh] w-full
          overflow-y-auto
          rounded-t-[28px]
          overflow-hidden
          bg-white
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          md:h-auto md:max-w-5xl md:overflow-hidden md:rounded-2xl md:mx-6
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className={[
            'relative bg-gradient-to-r px-5 pb-6 pt-8 text-white md:px-8 md:pb-8 md:pt-10',
            line?.gradient ?? 'from-tonner-blue via-tonner-pink to-tonner-orange',
          ].join(' ')}
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="
              absolute right-4 top-4
              p-2 rounded-full
              bg-white/20 hover:bg-white/30
              transition
              md:right-5 md:top-5
            "
          >
            <X className="w-5 h-5" />
          </button>

          {/* Línea / Subline */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold opacity-95">
              {line?.label ?? product.category ?? 'Producto'}
            </span>
            {productSubline ? (
              <span className="text-xs uppercase tracking-widest opacity-80">
                • {productSubline}
              </span>
            ) : null}
          </div>

          {/* Nombre */}
          <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-[0.08em] md:text-3xl">
            {product.name}
          </h2>
        </div>

        {/* ================= BODY ================= */}
        <div className="grid grid-cols-1 gap-6 p-5 pb-8 md:grid-cols-2 md:gap-8 md:p-8">
          {/* Imagen */}
          <div
            className="
              flex items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-[rgba(29,86,194,0.08)]
              via-[rgba(161,24,141,0.06)]
              to-[rgba(255,125,0,0.08)]
              min-h-[240px]
              border border-[rgba(29,86,194,0.10)]
              md:min-h-[340px]
            "
          >
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="h-full w-full object-contain p-6"
              />
            ) : (
              <span className="text-sm uppercase tracking-widest text-tonner-blue/70 font-semibold">
                Imagen del producto
              </span>
            )}
          </div>

          {/* Información */}
          <div className="flex flex-col">
            {/* Descripción */}
            {sections.includes('description') ? (
              <>
                <h3 className="mb-3 text-lg font-semibold uppercase tracking-widest text-tonner-text">
                  Descripción del producto
                </h3>
                <p className="text-sm normal-case leading-relaxed text-tonner-mutedText">
                  {product.description || product.short_description || '—'}
                </p>
              </>
            ) : null}

            {/* Usos */}
            {sections.includes('uses') && product.uses?.length ? (
              <>
                <h4 className="mt-6 text-sm font-semibold text-tonner-text uppercase tracking-widest">
                  Usos principales
                </h4>

                <ul className="mt-3 space-y-2 text-sm normal-case text-tonner-mutedText">
                  {product.uses.map((u) => (
                    <li key={u}>• {u}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {/* Segmento */}
            {sections.includes('segment') && productSubline ? (
              <>
                <h4 className="mt-6 text-sm font-semibold text-tonner-text uppercase tracking-widest">
                  Segmento
                </h4>
                <p className="mt-3 text-sm normal-case text-tonner-mutedText">{productSubline}</p>
              </>
            ) : null}

            {/* Presentaciones */}
            {sections.includes('presentations') && product.presentations?.length ? (
              <>
                <h4 className="mt-6 text-sm font-semibold text-tonner-text uppercase tracking-widest">
                  Presentaciones
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.presentations.map((presentation) => (
                    <span
                      key={presentation}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-tonner-text"
                    >
                      {presentation}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {/* Atributos */}
            {sections.includes('attributes') && attributes.length ? (
              <>
                <h4 className="mt-6 text-sm font-semibold text-tonner-text uppercase tracking-widest">
                  Características
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {attributes.map((a) => (
                    <span
                      key={a.id}
                      className="
                        inline-flex items-center gap-2
                        px-3 py-1.5
                        rounded-full
                        text-[12px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-tonner-blue
                        bg-[rgba(29,86,194,0.08)]
                        border border-[rgba(29,86,194,0.14)]
                      "
                    >
                      {'icon' in a && a.icon ? <span className="text-[13px]">{a.icon}</span> : null}
                      {a.label}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {/* Tonos */}
            {sections.includes('tones') && tones.length ? (
              <>
                <h4 className="mt-6 text-sm font-semibold text-tonner-text uppercase tracking-widest">
                  Colores
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tones.map((t) => {
                    const isObj = typeof t === 'object' && t !== null;
                    const name = isObj ? t.name : t;
                    const code = isObj && 'code' in t ? t.code : undefined;
                    const hex = isObj ? t.hex : undefined;

                    return (
                      <span
                        key={name}
                        className="
                          inline-flex items-center gap-2
                          px-3 py-1.5
                          rounded-full
                          text-[12px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-tonner-text
                          bg-slate-50
                          border border-slate-200
                        "
                        title={name}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={hex ? { backgroundColor: hex } : undefined}
                        />
                        <span>{name}</span>
                        {code ? <span className="text-tonner-blue/80">({code})</span> : null}
                        {hex ? <span className="text-tonner-mutedText">{hex}</span> : null}
                      </span>
                    );
                  })}
                </div>
              </>
            ) : null}

            {/* Acción ficha técnica */}
            <div className="sticky bottom-0 mt-8 flex flex-col gap-3 border-t border-slate-200 bg-white/95 pt-4 backdrop-blur-sm md:static md:flex-row md:flex-wrap md:border-0 md:bg-transparent md:pt-0">
              <button
                onClick={() => onAddToOrder(product)}
                className="
                  inline-flex items-center justify-center gap-3
                  rounded-lg bg-tonner-orange px-6 py-3
                  font-semibold uppercase tracking-wide text-white
                  transition-colors hover:bg-tonner-pink
                "
              >
                {primaryActionLabel}
              </button>

              <a
                href={product.datasheet_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-3
                  rounded-lg bg-tonner-blue px-6 py-3
                  font-semibold uppercase tracking-wide text-white
                  transition-colors hover:bg-tonner-orange
                "
              >
                <Download className="w-5 h-5" />
                Descargar ficha técnica
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
