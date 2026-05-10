import { ChevronLeft, ChevronRight, Flame, PaintBucket, Paintbrush, Sun, Waves } from 'lucide-react';
import type { UserType } from '../../onboarding/userTypes';
import type { Product, ProductTone } from '../types';

interface Props {
  product: Product | null;
  userType: UserType;
  primaryActionLabel: string;
  onAddToOrder: (product: Product) => void;
  onClose: () => void;
}

const featureIcons = [Sun, Paintbrush, PaintBucket, Waves, Flame];

function readableTextColor(hex?: string) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return '#2d59c7';

  const value = hex.slice(1);
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance > 150 ? '#1f3b76' : '#ffffff';
}

function normalizeColors(product: Product): ProductTone[] {
  const colors = product.colors?.length ? product.colors : (product.tones ?? []);

  return colors.filter((color) => color.name || color.code || color.hex);
}

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  const productImage = product.image || product.image_url;
  const description = product.description || product.short_description || '';
  const colors = normalizeColors(product);
  const presentations = product.presentations ?? [];
  const characteristics = product.characteristics?.length
    ? product.characteristics
    : product.attributes?.map((attribute) => attribute.label) ?? [];

  return (
    <main className="catalog-detail">
      <section className="catalog-detail__hero">
        <button type="button" onClick={onClose} aria-label="Volver">
          <ChevronLeft />
        </button>
        {productImage ? <img src={productImage} alt={product.name} /> : null}
      </section>

      <section className="catalog-detail__body">
        <h1>{product.name}</h1>
        <p>{description}</p>

        <h2>Usos Recomendados</h2>
        <p>{product.uses?.join(' ') || description}</p>

        {presentations.length ? (
          <>
            <h2>PRESENTACIONES</h2>
            <div className="catalog-detail__presentations">
              {presentations.map((presentation) => (
                <span key={presentation}>{presentation}</span>
              ))}
            </div>
          </>
        ) : null}

        <h2>CARACTERÍSTICAS</h2>
        <div className="catalog-detail__features">
          <ChevronLeft className="catalog-detail__chevron" />
          {featureIcons.map((Icon, index) => (
            <div key={index} className="catalog-detail__feature">
              <span>
                <Icon />
              </span>
              <small>
                {characteristics[index] ||
                  ['Acabado mate', 'Alto Cubrimiento', 'Alto Rendimiento', 'Bajo Salpique', 'Bajo VOC'][index]}
              </small>
            </div>
          ))}
          <ChevronRight className="catalog-detail__chevron" />
        </div>

        <h2>COLORES</h2>
        {colors.length ? (
          <div className="catalog-detail__colors">
            {colors.map((tone, index) => {
              const color = tone.hex || '#f8fafc';
              const textColor = readableTextColor(tone.hex);

              return (
                <button
                  key={`${tone.code || tone.name}-${index}`}
                  type="button"
                  title={`${tone.code ? `${tone.code} · ` : ''}${tone.name}`}
                  style={{ backgroundColor: color, color: textColor }}
                >
                  <span>{tone.code || tone.name}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="catalog-detail__empty">Este producto no tiene colores registrados.</p>
        )}
      </section>
    </main>
  );
}
