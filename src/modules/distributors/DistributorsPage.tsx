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
    <main className="max-w-7xl mx-auto px-6 pt-8 pb-14">
      {/* Header compacto, pro */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Distribuidoras Tonner</h1>
          <p className="text-white/70 text-sm md:text-base mt-1">
            Explora el mapa para encontrar tu punto de venta más cercano a {selectedLocation}.
            {deptFocus ? (
              <span className="ml-2 text-white/90">
                · Enfoque: <span className="font-semibold">{deptFocus}</span>
              </span>
            ) : null}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="bg-white/10 border border-white/15 text-white/80 px-4 py-2 rounded-full text-sm">
            {list.length} distribuidoras
          </div>
        </div>
      </div>

      {/* Lienzo pro: Mapa protagonista + panel flotante */}
      <div className="relative">
        {/* MAPA */}
        <DistributorsMap
          distributors={list}
          onSelect={(d) => setSelected(d)}
          onDepartmentFocus={(name) => setDeptFocus(name)}
        />

        {/* PANEL FLOTANTE */}
        <aside
          className="
            absolute
            right-5 top-5
            w-[360px]
            max-w-[92vw]
            rounded-3xl
            bg-white/92
            backdrop-blur
            border
            shadow-[0_25px_80px_rgba(15,23,42,0.22)]
            overflow-hidden
          "
        >
          <div className="px-6 py-5 border-b bg-gradient-to-r from-tonner-blue/10 to-tonner-orange/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white shadow flex items-center justify-center">
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

          <div className="p-6">
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

          <div className="px-6 py-4 border-t text-[11px] text-slate-400 bg-white/70">
            Mapa interactivo · Tonner Catalog · Distribuidoras v1
          </div>
        </aside>
      </div>
    </main>
  );
}
