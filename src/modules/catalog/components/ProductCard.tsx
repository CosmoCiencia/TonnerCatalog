import type { Product } from '../types';
import { TONNER_LINES } from '../tonnerLines';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const line = product.line ? TONNER_LINES[product.line] : null;
  const productImage = product.image || product.image_url;
  const productSubline = product.segment || product.subline;

  return (
    <article
      onClick={() => onViewDetails?.(product)}
      className="
        relative
        overflow-hidden
        flex flex-col
        cursor-pointer

        rounded-tonner
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_14px_36px_rgba(29,86,194,0.22)]

        bg-gradient-to-b
        from-white
        to-[rgba(29,86,194,0.05)]

        shadow-[0_10px_28px_rgba(29,86,194,0.18)]
      "
    >
      {/* Gesto superior — depende de la LÍNEA */}
      <div
        className={[
          'absolute top-0 left-0 right-0 h-2 bg-gradient-to-r',
          line?.gradient ?? 'from-tonner-blue via-tonner-pink to-tonner-orange',
        ].join(' ')}
      />

      {/* ZONA DE IMAGEN */}
      <div
        className="
          relative
          h-36
          flex items-center justify-center
          mt-2

          bg-gradient-to-br
          from-[rgba(29,86,194,0.08)]
          via-[rgba(161,24,141,0.06)]
          to-[rgba(29,86,194,0.10)]
          md:h-44
          rounded-t-tonner
        "
      >
        {productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        ) : (
          <span
            className="
              text-xs
              uppercase
              tracking-widest
              text-tonner-blue/70
              font-semibold
            "
          >
            Imagen del producto
          </span>
        )}
      </div>

      {/* CONTENIDO (LIMPIO) */}
      <div className="flex flex-col p-4 pt-4 md:p-6 md:pt-5">
        {/* Línea oficial + sublínea */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-widest
              text-tonner-blue
            "
          >
            {line?.label ?? product.category}
          </span>

          {productSubline ? (
            <span className="text-[11px] uppercase tracking-widest text-tonner-mutedText">
              • {productSubline}
            </span>
          ) : null}
        </div>

        {/* Nombre */}
        <h3 className="text-lg font-bold uppercase leading-snug tracking-[0.08em] text-tonner-text md:text-xl">
          {product.name}
        </h3>

        {/* Descripción corta */}
        {product.short_description ? (
          <p className="mt-2 text-sm normal-case leading-relaxed text-tonner-mutedText line-clamp-2">
            {product.short_description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
