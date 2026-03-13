// src/modules/distributors/DistributorsPage.tsx

import { Building2, MapPin, Navigation, Phone } from 'lucide-react';
import { useMemo, useState } from 'react';

import DistributorsMap from './DistributorsMap';
import { distributors } from './distributors.data';
import type { Distributor } from './types';

interface DistributorsPageProps {
  selectedLocation: string;
}

export default function DistributorsPage({ selectedLocation }: DistributorsPageProps) {
  const [selected, setSelected] = useState<Distributor | null>(null);
  const [deptFocus, setDeptFocus] = useState<string | null>(null);

  const list = useMemo(() => distributors, []);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 md:pb-14 md:pt-8">
      {/* Header compacto, pro */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Distribuidoras Tonner</h1>
          <p className="text-white/70 text-sm md:text-base mt-1">
            Explora el mapa para encontrar tu punto de venta más cercano a {selectedLocation}.
            {deptFocus ? (
              <span className="mt-1 block text-white/90 md:ml-2 md:mt-0 md:inline">
                · Enfoque: <span className="font-semibold">{deptFocus}</span>
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 border border-white/15 text-white/80 px-4 py-2 rounded-full text-sm">
            {list.length} distribuidoras
          </div>
        </div>
      </div>

      {/* Lienzo pro: Mapa protagonista + panel flotante */}
      <div className="relative lg:min-h-[80vh]">
        {/* MAPA */}
        <DistributorsMap
          distributors={list}
          onSelect={(d) => setSelected(d)}
          selectedId={selected?.id ?? null}
          onDepartmentFocus={(name) => setDeptFocus(name)}
        />

        {/* PANEL FLOTANTE */}
        <aside
          className="
            mt-4
            w-full
            max-w-none
            rounded-3xl
            bg-white/92
            backdrop-blur
            border
            shadow-[0_25px_80px_rgba(15,23,42,0.22)]
            overflow-hidden
            lg:absolute
            lg:right-5
            lg:top-5
            lg:mt-0
            lg:w-[360px]
            lg:max-w-[92vw]
          "
        >
          <div className="border-b bg-gradient-to-r from-tonner-blue/10 to-tonner-orange/10 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow">
                <MapPin className="w-5 h-5 text-tonner-orange" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Información de contacto</h2>
                <p className="text-xs text-slate-500">
                  Selecciona un pin para ver la distribuidora
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {!selected ? (
              <div className="text-sm text-slate-600 leading-relaxed">
                <p className="mb-3">
                  Haz <span className="font-semibold">click en un pin</span> para ver:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Nombre / ciudad
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> Dirección
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> Teléfono
                  </li>
                </ul>

                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border text-xs text-slate-500">
                  Tip: click en un <b>departamento</b> para hacer zoom.
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-wide">
                  {selected.name}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-tonner-orange mt-[2px]" />
                    <div>
                      <div className="font-medium">{selected.city}</div>
                      <div className="text-slate-500">{selected.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-tonner-blue" />
                    <span className="text-slate-700">{selected.phone}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <a
                    href={`tel:${selected.phone.replace(/\s/g, '')}`}
                    className="
                      w-full
                      inline-flex items-center justify-center gap-2
                      bg-tonner-orange hover:bg-tonner-pink
                      text-white font-semibold
                      py-3 rounded-2xl
                      shadow
                      transition
                    "
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selected.address}, ${selected.city}, Colombia`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      w-full
                      inline-flex items-center justify-center gap-2
                      bg-slate-900 hover:bg-slate-800
                      text-white font-semibold
                      py-3 rounded-2xl
                      shadow
                      transition
                    "
                  >
                    <Navigation className="w-4 h-4" />
                    Abrir en Maps
                  </a>

                  <button
                    onClick={() => setSelected(null)}
                    className="text-sm text-slate-500 hover:text-slate-800 transition"
                  >
                    Quitar selección
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t bg-white/70 px-5 py-4 text-[11px] text-slate-400 sm:px-6">
            Mapa interactivo · Tonner Catalog · Distribuidoras v1
          </div>
        </aside>
      </div>
    </main>
  );
}
