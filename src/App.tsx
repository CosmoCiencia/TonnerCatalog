import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

// Layout
import HeaderHero from './layout/HeaderHero';
import TopBar from './layout/TopBar';

// Catalog domain
import { getProducts } from './modules/catalog/services';
import type { Product } from './modules/catalog/types';
import type { TonnerLineKey } from './modules/catalog/tonnerLines';

// Catalog UI
import ProductCard from './modules/catalog/components/ProductCard';
import ProductModal from './modules/catalog/components/ProductModal';
import GuideModal from './modules/catalog/components/GuideModal';
import HomeScreen from './modules/home/HomeScreen';
import { DEFAULT_LOCATION, LOCATION_STORAGE_KEY } from './modules/onboarding/location';
import RoleScreen from './modules/onboarding/RoleScreen';
import { USER_TYPE_STORAGE_KEY, type UserType } from './modules/onboarding/userTypes';

// Distributors
import DistributorsPage from './modules/distributors/DistributorsPage';

// Purchase
import PurchasePage from './modules/purchase/PurchasePage';
import { buildInitialOrderItem, type CustomerData, type OrderItem } from './modules/purchase/types';

type View = 'role-select' | 'home' | 'catalog' | 'distributors' | 'purchase';

function App() {
  const [view, setView] = useState<View>('role-select');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [showGuideModal, setShowGuideModal] = useState(false);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    company: '',
    city: '',
    notes: '',
  });

  const [activeLine, setActiveLine] = useState<TonnerLineKey | 'all'>('all');

  // ================= PRODUCTS =================
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // ================= RESTORE USER TYPE =================
  useEffect(() => {
    const storedUserType = window.localStorage.getItem(USER_TYPE_STORAGE_KEY) as UserType | null;
    const storedLocation = window.localStorage.getItem(LOCATION_STORAGE_KEY);

    if (
      storedUserType === 'cliente' ||
      storedUserType === 'contratista' ||
      storedUserType === 'distribuidor'
    ) {
      setUserType(storedUserType);
    }

    if (storedLocation) {
      setSelectedLocation(storedLocation);
      setCustomerData((current) => ({
        ...current,
        city: current.city || storedLocation,
      }));
    }
  }, []);

  const safeProducts = products.filter((p): p is Product => Boolean(p));

  const filteredProducts =
    activeLine === 'all' ? safeProducts : safeProducts.filter((p) => p.line === activeLine);

  const primaryActionLabel =
    userType === 'cliente'
      ? 'Agregar'
      : userType === 'contratista'
        ? 'Agregar al pedido'
        : 'Agregar referencia';

  const renderActiveView = () => {
    if (view === 'role-select') {
      return (
        <RoleScreen
          onSelectUserType={(nextUserType, nextLocation) => {
            setUserType(nextUserType);
            setSelectedLocation(nextLocation);
            window.localStorage.setItem(USER_TYPE_STORAGE_KEY, nextUserType);
            window.localStorage.setItem(LOCATION_STORAGE_KEY, nextLocation);
            setCustomerData((current) => ({
              ...current,
              city: nextLocation,
            }));
            setView('home');
          }}
        />
      );
    }

    if (view === 'home') {
      return (
        <HomeScreen
          userType={userType ?? 'cliente'}
          selectedLocation={selectedLocation}
          onSelectLine={(line) => {
            setActiveLine(line);
            setView('catalog');
          }}
          onOpenCatalog={() => setView('catalog')}
          onOpenDistributors={() => setView('distributors')}
        />
      );
    }

    return (
      <>
        {view === 'catalog' && (
          <HeaderHero
            activeLine={activeLine}
            orderCount={orderItems.length}
            onChangeLine={setActiveLine}
            onOpenGuide={() => setShowGuideModal(true)}
            onOpenPurchase={() => setView('purchase')}
          />
        )}

        <TopBar
          onGoCatalog={() => setView('catalog')}
          onGoDistributors={() => setView('distributors')}
        />

        {view === 'catalog' && (
          <main className="mx-auto max-w-7xl px-4 py-8 pb-32 md:px-6 md:py-28 md:pb-28">
            <section className="rounded-[28px] bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:rounded-3xl md:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            </section>
          </main>
        )}

        {view === 'distributors' && <DistributorsPage selectedLocation={selectedLocation} />}

        {view === 'purchase' && (
          <PurchasePage
            userType={userType ?? 'cliente'}
            orderItems={orderItems}
            customerData={customerData}
            onBackToCatalog={() => setView('catalog')}
            onContinueShopping={() => setView('catalog')}
            onUpdateItem={(productId, updates) => {
              setOrderItems((current) =>
                current.map((item) =>
                  item.productId === productId ? { ...item, ...updates } : item,
                ),
              );
            }}
            onRemoveItem={(productId) => {
              setOrderItems((current) => current.filter((item) => item.productId !== productId));
            }}
            onUpdateCustomerData={(field, value) => {
              setCustomerData((current) => ({
                ...current,
                [field]: value,
              }));
            }}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-tonner-blue overflow-x-hidden">
      <div key={view} className="app-view-shell app-view-enter">
        {renderActiveView()}
      </div>

      {/* ================= FLOATING CTA ================= */}

      {view === 'catalog' && (
        <>
          {orderItems.length ? (
            <button
              onClick={() => setView('purchase')}
              className="
                fixed bottom-[7.25rem] left-4
                rounded-full bg-tonner-blue px-5 py-3
                text-sm font-semibold text-white shadow-2xl
                transition hover:bg-tonner-pink
                z-40
                md:bottom-6 md:left-6
              "
            >
              Pedido ({orderItems.length})
            </button>
          ) : null}

          <button
            onClick={() => setView('distributors')}
            className="
              fixed bottom-[7.25rem] right-4
              bg-tonner-orange
              hover:bg-tonner-pink
              text-white
              text-sm font-semibold
              py-3 px-5
              rounded-full
              shadow-2xl
              flex items-center gap-2
              z-40
              md:bottom-6 md:right-6
            "
          >
            <MapPin className="w-5 h-5" />
            Distribuidoras
          </button>
        </>
      )}

      {/* ================= PRODUCT MODAL ================= */}

      <ProductModal
        product={selectedProduct}
        userType={userType ?? 'cliente'}
        primaryActionLabel={primaryActionLabel}
        onAddToOrder={(product) => {
          setOrderItems((current) => {
            const existing = current.find((item) => item.productId === product.id);

            if (existing) {
              return current.map((item) =>
                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
              );
            }

            return [...current, buildInitialOrderItem(product)];
          });

          setSelectedProduct(null);
        }}
        onClose={() => setSelectedProduct(null)}
      />

      {/* ================= GUIDE MODAL ================= */}

      {showGuideModal && (
        <GuideModal
          onSelectLine={(line) => {
            setActiveLine(line);
            setShowGuideModal(false);
            setView('catalog');
          }}
          onClose={() => setShowGuideModal(false)}
        />
      )}
    </div>
  );
}

export default App;
