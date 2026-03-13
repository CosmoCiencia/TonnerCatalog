import { MessageCircle, Minus, Plus } from 'lucide-react';
import { TONNER_ADVISOR_WHATSAPP } from '../../config/contact';
import type { UserType } from '../onboarding/userTypes';
import type { CustomerData, OrderItem } from './types';

interface PurchasePageProps {
  userType: UserType;
  orderItems: OrderItem[];
  customerData: CustomerData;
  onBackToCatalog?: () => void;
  onContinueShopping: () => void;
  onUpdateItem: (productId: string, updates: Partial<OrderItem>) => void;
  onRemoveItem: (productId: string) => void;
  onUpdateCustomerData: (field: keyof CustomerData, value: string) => void;
}

const roleCopy: Record<UserType, { eyebrow: string; title: string; cta: string }> = {
  cliente: {
    eyebrow: 'Pedido Tonner',
    title: 'Solicita tu pedido con asesor',
    cta: 'Enviar pedido por WhatsApp',
  },
  contratista: {
    eyebrow: 'Pedido Profesional',
    title: 'Prepara tu pedido de trabajo',
    cta: 'Enviar pedido por WhatsApp',
  },
  distribuidor: {
    eyebrow: 'Cotización Comercial',
    title: 'Prepara tu pedido mayorista',
    cta: 'Solicitar cotización por WhatsApp',
  },
};

function buildWhatsAppMessage(
  orderItems: OrderItem[],
  userType: UserType,
  customerData: CustomerData,
): string {
  let message = 'Hola, quiero solicitar una cotización de productos Tonner.\n\n';
  message += `Perfil: ${userType}\n\nProductos solicitados:\n\n`;

  orderItems.forEach((item) => {
    message += `• ${item.name} — ${item.presentation} — Cantidad: ${item.quantity}\n`;
  });

  message += '\n\nDatos del cliente:\n\n';
  message += `Nombre: ${customerData.name || '—'}`;
  message += `\nEmpresa: ${customerData.company || '—'}`;
  message += `\nCiudad: ${customerData.city || '—'}`;
  message += `\nObservaciones: ${customerData.notes || '—'}`;

  return encodeURIComponent(message);
}

export default function PurchasePage({
  userType,
  orderItems,
  customerData,
  onBackToCatalog,
  onContinueShopping,
  onUpdateItem,
  onRemoveItem,
  onUpdateCustomerData,
}: PurchasePageProps) {
  const copy = roleCopy[userType];
  const totalReferences = orderItems.length;
  const totalUnits = orderItems.reduce((total, item) => total + item.quantity, 0);
  const requiredFields: Array<keyof CustomerData> =
    userType === 'distribuidor' ? ['name', 'company', 'city'] : ['name', 'city'];
  const missingFields = requiredFields.filter((field) => !customerData[field].trim());
  const canSubmitOrder = orderItems.length > 0 && missingFields.length === 0;
  const whatsappUrl = `https://wa.me/${TONNER_ADVISOR_WHATSAPP}?text=${buildWhatsAppMessage(orderItems, userType, customerData)}`;
  const advisorUrl = `https://wa.me/${TONNER_ADVISOR_WHATSAPP}?text=Hola%2C%20quiero%20hablar%20con%20un%20asesor%20comercial%20de%20Tonner.`;
  const validationMessage = !orderItems.length
    ? 'Agrega al menos un producto para preparar el pedido.'
    : missingFields.length
      ? `Completa ${missingFields
          .map((field) =>
            field === 'name'
              ? 'nombre'
              : field === 'company'
                ? 'empresa'
                : field === 'city'
                  ? 'ciudad'
                  : field,
          )
          .join(', ')} para enviar el pedido.`
      : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 pb-28 md:px-6 md:py-16 md:pb-16">
      <section className="rounded-[28px] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:rounded-3xl md:p-10">
        <header className="mb-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={onBackToCatalog}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
            >
              ← Regresar al catálogo
            </button>

            <button
              onClick={onContinueShopping}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-tonner-blue/20 bg-tonner-blue/5 px-4 py-2 text-sm font-semibold text-tonner-blue transition hover:bg-tonner-blue/10 sm:w-auto"
            >
              + Seguir agregando productos
            </button>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-tonner-blue/80">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
          <p className="mt-2 text-slate-600">
            Ajusta cantidades, completa tus datos y envía el pedido a un asesor comercial.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {orderItems.length ? (
              orderItems.map((item) => (
                <article
                  key={item.productId}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-900">
                        {item.name}
                      </h2>
                      {item.line ? (
                        <p className="mt-1 text-xs uppercase tracking-widest text-tonner-blue/80">
                          {item.line}
                        </p>
                      ) : null}
                      <button
                        onClick={() => onRemoveItem(item.productId)}
                        className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-red-600"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700">
                      Presentación
                      <select
                        value={item.presentation}
                        onChange={(event) =>
                          onUpdateItem(item.productId, { presentation: event.target.value })
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-tonner-blue"
                      >
                        {item.presentations.map((presentation) => (
                          <option key={presentation} value={presentation}>
                            {presentation}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="text-sm font-medium text-slate-700">
                      Cantidad
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() =>
                            onUpdateItem(item.productId, {
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="rounded-full border border-slate-200 bg-white p-2 transition hover:bg-slate-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-10 text-center text-lg font-semibold text-slate-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            onUpdateItem(item.productId, {
                              quantity: item.quantity + 1,
                            })
                          }
                          className="rounded-full border border-slate-200 bg-white p-2 transition hover:bg-slate-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                Aún no has agregado productos al pedido.
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-900">
              Datos del pedido
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Referencias
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{totalReferences}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Unidades
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{totalUnits}</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Nombre
                <input
                  value={customerData.name}
                  onChange={(event) => onUpdateCustomerData('name', event.target.value)}
                  aria-invalid={missingFields.includes('name')}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-tonner-blue"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Empresa
                <input
                  value={customerData.company}
                  onChange={(event) => onUpdateCustomerData('company', event.target.value)}
                  aria-invalid={missingFields.includes('company')}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-tonner-blue"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Ciudad
                <input
                  value={customerData.city}
                  onChange={(event) => onUpdateCustomerData('city', event.target.value)}
                  aria-invalid={missingFields.includes('city')}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-tonner-blue"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Observaciones
                <textarea
                  value={customerData.notes}
                  onChange={(event) => onUpdateCustomerData('notes', event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-tonner-blue"
                />
              </label>
            </div>

            {validationMessage ? (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {validationMessage}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Pedido listo para enviar a asesor comercial.
              </div>
            )}

            <a
              href={canSubmitOrder ? whatsappUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide transition',
                canSubmitOrder
                  ? 'bg-[#25D366] text-white hover:bg-[#1fba57]'
                  : 'cursor-not-allowed bg-slate-200 text-slate-500',
              ].join(' ')}
              aria-disabled={!canSubmitOrder}
            >
              <MessageCircle className="h-5 w-5" />
              {copy.cta}
            </a>

            <a
              href={advisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-tonner-blue/18 bg-tonner-blue/6 px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-tonner-blue transition hover:bg-tonner-blue/10"
            >
              Hablar con un asesor
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
