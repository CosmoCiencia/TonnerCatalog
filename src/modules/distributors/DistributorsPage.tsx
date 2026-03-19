import { Building2, MapPin, Navigation, Phone, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

import DistributorsMap from './DistributorsMap';
import { distributors } from './distributors.data';
import type { Distributor } from './types';

interface DistributorsPageProps {
  selectedLocation: string;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

export default function DistributorsPage({ selectedLocation }: DistributorsPageProps) {
  const [selected, setSelected] = useState<Distributor | null>(null);
  const [deptFocus, setDeptFocus] = useState<string | null>(null);

  const list = useMemo(() => distributors, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),linear-gradient(155deg,#0b2a67_0%,#1244a3_42%,#1d56c2_72%,#7b2b93_118%)] px-4 pb-28 pt-6 text-white sm:px-6 md:pb-14 md:pt-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.55),transparent_92%)]" />
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

      <section className="relative mx-auto max-w-7xl">
        <div className="mb-6 rounded-[30px] border border-white/15 bg-white/[0.09] px-5 py-5 shadow-[0_30px_90px_rgba(4,16,44,0.28)] backdrop-blur-2xl sm:px-6 md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Red nacional Tonner
              </div>

              <h1 className="text-2xl font-semibold tracking-[0.04em] text-white md:text-3xl">
                Distribuidoras Tonner
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
                Ubica tu punto de venta más cercano desde{' '}
                <span className="font-semibold text-white">{selectedLocation}</span>
                {deptFocus && (
                  <span className="block pt-1 text-white/92 md:inline md:pl-2">
                    · Departamento activo: <span className="font-semibold">{deptFocus}</span>
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/82">
                {list.length} distribuidoras
              </div>
              <div className="rounded-full border border-white/15 bg-gradient-to-r from-white/12 to-orange-500/20 px-4 py-2 text-sm font-medium text-white/82">
                Cobertura nacional
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[34px] border border-white/15 bg-white/[0.08] p-3 shadow-[0_30px_90px_rgba(4,16,44,0.3)] backdrop-blur-2xl lg:min-h-[80vh] lg:p-4">
          <div className="mb-4 flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.06] px-4 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
                Mapa interactivo
              </p>
              <p className="mt-1 text-sm text-white/78">
                Toca un pin o un departamento para enfocar la red comercial.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-2 text-right text-xs text-white/60 sm:block">
              <div>Pins naranjas = distribuidoras</div>
              <div>Área activa = enfoque regional</div>
            </div>
          </div>

          <DistributorsMap
            distributors={list}
            onSelect={(d) => setSelected(d)}
            selectedId={selected?.id ?? null}
            onDepartmentFocus={(name) => setDeptFocus(name)}
          />

          <aside className="mt-4 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/88 text-white shadow-[0_25px_80px_rgba(15,23,42,0.34)] backdrop-blur-2xl lg:absolute lg:right-7 lg:top-24 lg:mt-0 lg:w-[370px]">
            <div className="border-b border-white/10 bg-[linear-gradient(90deg,rgba(255,125,0,0.22),rgba(29,86,194,0.18))] px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <MapPin className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Información de contacto</h2>
                  <p className="text-xs text-white/62">Detalle del punto seleccionado</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {!selected ? (
                <div className="text-sm text-white/78">
                  <p className="mb-4 font-semibold text-white">Haz click en un pin para ver:</p>
                  <div className="space-y-3">
                    <InfoRow
                      icon={<Building2 className="h-3.5 w-3.5 text-white/45" />}
                      label="Distribuidora"
                      value="Nombre comercial y ciudad"
                    />
                    <InfoRow
                      icon={<MapPin className="h-3.5 w-3.5 text-white/45" />}
                      label="Ubicación"
                      value="Dirección física y zona"
                    />
                    <InfoRow
                      icon={<Phone className="h-3.5 w-3.5 text-white/45" />}
                      label="Contacto"
                      value="Llamada directa al punto"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 rounded-[26px] border border-white/10 bg-white/[0.06] p-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Punto activo
                    </p>
                    <h3 className="text-lg font-bold uppercase text-white">{selected.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <InfoRow
                      icon={<MapPin className="h-3.5 w-3.5 text-orange-400" />}
                      label="Ciudad"
                      value={<span className="font-semibold">{selected.city}</span>}
                    />
                    <InfoRow
                      icon={<Building2 className="h-3.5 w-3.5 text-blue-300" />}
                      label="Dirección"
                      value={<span className="text-white/78">{selected.address}</span>}
                    />
                    <InfoRow
                      icon={<Phone className="h-3.5 w-3.5 text-blue-300" />}
                      label="Teléfono"
                      value={<span>{selected.phone || 'N/A'}</span>}
                    />
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={`tel:${selected.phone?.toString().replace(/\s/g, '')}`}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3 font-bold text-white shadow-[0_18px_44px_rgba(227,6,19,0.22)] transition hover:bg-orange-700"
                    >
                      <Phone className="h-4 w-4" /> Llamar ahora
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selected.name} ${selected.address} ${selected.city}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-white/14"
                    >
                      <Navigation className="h-4 w-4" /> Ver en Google Maps
                    </a>

                    <button
                      onClick={() => setSelected(null)}
                      className="w-full text-xs text-white/55 transition hover:text-white/82"
                    >
                      Cerrar detalle
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
