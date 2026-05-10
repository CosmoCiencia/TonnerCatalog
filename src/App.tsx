import { useEffect, useMemo, useState } from 'react';
import { Bell, MapPin, PaintBucket } from 'lucide-react';

import { getProducts } from './modules/catalog/services';
import type { Product } from './modules/catalog/types';
import type { TonnerLineKey } from './modules/catalog/tonnerLines';
import ProductCard from './modules/catalog/components/ProductCard';
import ProductModal from './modules/catalog/components/ProductModal';
import { distributors } from './modules/distributors/distributors.data';
import StoresMap from './modules/distributors/StoresMap';

type View = 'catalog' | 'stores' | 'favorites' | 'paint' | 'profile';
type StoresMode = 'map' | 'list';

const lineTabs: Array<{ label: string; value: TonnerLineKey }> = [
  { label: 'Arquitectónica', value: 'arquitectonica' },
  { label: 'Industrial', value: 'industrial' },
  { label: 'Automotriz', value: 'automotriz' },
  { label: 'Maderas', value: 'maderas' },
];

const navItems: Array<{ label: string; view: View; icon: string }> = [
  { label: 'Inicio', view: 'catalog', icon: '/icons/INICIO.png' },
  { label: 'Puntos', view: 'stores', icon: '/icons/TRABAJO.png' },
  { label: 'Favoritos', view: 'favorites', icon: '/icons/FAVORITOS.png' },
  { label: 'Pintar', view: 'paint', icon: '/icons/CALCULADORA.png' },
  { label: 'Perfil', view: 'profile', icon: '/icons/PERFIL.png' },
];

function App() {
  const [view, setView] = useState<View>('catalog');
  const [storesMode, setStoresMode] = useState<StoresMode>('map');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeLine, setActiveLine] = useState<TonnerLineKey>('arquitectonica');
  const [favoriteProductIds, setFavoriteProductIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.line === activeLine),
    [activeLine, products],
  );

  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteProductIds.has(product.id)),
    [favoriteProductIds, products],
  );

  const handleToggleFavorite = (product: Product) => {
    setFavoriteProductIds((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(product.id)) {
        nextFavorites.delete(product.id);
      } else {
        nextFavorites.add(product.id);
      }

      return nextFavorites;
    });
  };

  const handleSelectView = (nextView: View) => {
    setSelectedProduct(null);
    setView(nextView);
  };

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      return;
    }

    if (view !== 'catalog') {
      setView('catalog');
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const renderMainContent = () => {
    if (selectedProduct) {
      return (
        <ProductModal
          product={selectedProduct}
          userType="contratista"
          primaryActionLabel="Agregar"
          onAddToOrder={() => undefined}
          onClose={() => setSelectedProduct(null)}
        />
      );
    }

    if (view === 'profile') {
      return (
        <main className="catalog-profile">
          <section className="catalog-profile__hero">
            <div className="catalog-profile__avatar" />
            <strong>LOREM IPSUM</strong>
          </section>
          <button className="catalog-profile__link" type="button">
            Vincular Distribuidora
          </button>
          <h1>CONFIGURACIÓN</h1>
          {[
            'Mis Datos',
            'Preferencias',
            'Términos y Condiciones',
            'Mis Datos',
            'Atención al Cliente',
            'Términos y Condiciones',
          ].map((item, index) => (
            <button key={`${item}-${index}`} className="catalog-profile__option" type="button">
              {item}
            </button>
          ))}
        </main>
      );
    }

    if (view === 'stores') {
      return (
        <main className="catalog-stores">
          <nav className="catalog-stores__tabs" aria-label="Vista de puntos de venta">
            <button
              type="button"
              className={storesMode === 'map' ? 'is-active' : ''}
              onClick={() => setStoresMode('map')}
            >
              MAPA
            </button>
            <button
              type="button"
              className={storesMode === 'list' ? 'is-active' : ''}
              onClick={() => setStoresMode('list')}
            >
              LISTA
            </button>
          </nav>

          {storesMode === 'map' ? (
            <section className="catalog-map-view" aria-label="Mapa de puntos de venta">
              <StoresMap distributors={distributors} />
            </section>
          ) : (
            <section className="catalog-store-list" aria-label="Lista de puntos de venta">
              {distributors.map((distributor) => (
                <article key={distributor.id} className="catalog-store-card">
                  <div className="catalog-store-card__media" />
                  <div className="catalog-store-card__content">
                    <h2>{distributor.name}</h2>
                    <p>
                      {distributor.address} · {distributor.city}
                    </p>
                    <span>{distributor.email}</span>
                    <small>{distributor.phone}</small>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>
      );
    }

    if (view === 'paint') {
      return (
        <main className="catalog-empty-view">
          <PaintBucket className="catalog-empty-view__icon" />
          <h1>TonnerPaints</h1>
          <p>Abre el simulador para probar colores sobre una foto.</p>
          <a href="https://tonner-paint.vercel.app/" target="_blank" rel="noopener noreferrer">
            Abrir simulador
          </a>
        </main>
      );
    }

    return (
      <main className="catalog-home">
        {view === 'favorites' ? <h1 className="catalog-section-title">Favoritos</h1> : null}
        {view === 'catalog' ? (
          <>
            <section className="catalog-hero" aria-label="Destacados">
              <div className="catalog-hero__dots">
                <span />
                <span />
                <span />
                <span />
              </div>
            </section>

            <nav className="catalog-tabs" aria-label="Lineas">
              {lineTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={activeLine === tab.value ? 'is-active' : ''}
                  onClick={() => setActiveLine(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </>
        ) : null}

        {view === 'favorites' && favoriteProducts.length === 0 ? (
          <section className="catalog-empty-favorites">
            <h2>Sin favoritos</h2>
            <p>Marca productos con el corazón para consultarlos más rápido desde esta sección.</p>
          </section>
        ) : (
          <section className="catalog-grid">
            {(view === 'favorites' ? favoriteProducts : visibleProducts).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteProductIds.has(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onViewDetails={(nextProduct) => {
                  setSelectedProduct(nextProduct);
                  setView('catalog');
                }}
              />
            ))}
          </section>
        )}
      </main>
    );
  };

  return (
    <div className="catalog-app">
      <header className="catalog-top">
        <button type="button" className="catalog-top__back" aria-label="Regresar" onClick={handleBack}>
          <svg viewBox="0 0 64 40" aria-hidden="true">
            <path d="M4 20 25 5v11h28a7 7 0 0 1 0 14H25v11L4 20Z" />
          </svg>
        </button>
        <img src="/logo.png" alt="Pinturas Tonner" />
        <button type="button" className="catalog-top__bell" aria-label="Notificaciones">
          <Bell />
        </button>
      </header>

      {renderMainContent()}

      <nav className="catalog-bottom-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button
            key={item.view}
            type="button"
            className={!selectedProduct && view === item.view ? 'is-active' : ''}
            aria-label={item.label}
            onClick={() => handleSelectView(item.view)}
          >
            {item.view === 'stores' ? <MapPin /> : <img src={item.icon} alt="" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
