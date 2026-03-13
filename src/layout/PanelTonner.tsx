import {
  X,
  Layers,
  MapPin,
  Settings,
  Edit3,
  FileText,
  PlusCircle,
  Package,
  Grid,
  CheckCircle,
} from 'lucide-react';

interface PanelTonnerProps {
  open: boolean;
  onClose: () => void;
}

export default function PanelTonner({ open, onClose }: PanelTonnerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* PANEL */}
      <div className="relative w-full max-w-6xl mx-6 bg-white rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-tonner-blue">Panel Tonner</h2>
            <p className="text-sm text-gray-500">Control administrativo del catálogo digital</p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-10">
          {/* ================= ESTADO DEL SISTEMA ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-tonner-blue" />
                <span className="text-sm font-medium text-gray-700">Catálogo</span>
              </div>
              <p className="text-xs text-gray-500">Sistema activo</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-tonner-blue" />
                <span className="text-sm font-medium text-gray-700">Productos</span>
              </div>
              <p className="text-xs text-gray-500">128 registrados</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <Grid className="w-5 h-5 text-tonner-blue" />
                <span className="text-sm font-medium text-gray-700">Líneas</span>
              </div>
              <p className="text-xs text-gray-500">6 activas</p>
            </div>

            <div className="rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-tonner-orange" />
                <span className="text-sm font-medium text-gray-700">Distribución</span>
              </div>
              <p className="text-xs text-gray-500">Cobertura nacional</p>
            </div>
          </div>

          {/* ================= MÓDULOS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ===== CATÁLOGO ===== */}
            <div className="rounded-2xl border p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-5">
                <Layers className="w-6 h-6 text-tonner-blue" />
                <h3 className="text-lg font-semibold text-gray-800">Gestión de Catálogo</h3>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Administración de productos, líneas y contenido técnico del catálogo digital.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <Settings className="w-4 h-4" />
                  <span>Administrar estructura del catálogo</span>
                </div>

                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <Edit3 className="w-4 h-4" />
                  <span>Editar productos</span>
                </div>

                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <FileText className="w-4 h-4" />
                  <span>Gestionar fichas técnicas</span>
                </div>

                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <PlusCircle className="w-4 h-4" />
                  <span>Agregar nuevos productos</span>
                </div>
              </div>

              <div className="mt-6 text-xs font-semibold text-tonner-blue">
                Estado: Catálogo operativo
              </div>
            </div>

            {/* ===== DISTRIBUIDORAS ===== */}
            <div className="rounded-2xl border p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-5">
                <MapPin className="w-6 h-6 text-tonner-orange" />
                <h3 className="text-lg font-semibold text-gray-800">Red de Distribución</h3>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Control de distribuidoras, cobertura geográfica y red nacional.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>Mapa nacional de cobertura</span>
                </div>

                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <PlusCircle className="w-4 h-4" />
                  <span>Agregar distribuidora</span>
                </div>

                <div className="flex items-center gap-3 cursor-default text-gray-700">
                  <Edit3 className="w-4 h-4" />
                  <span>Editar red de distribución</span>
                </div>
              </div>

              <div className="mt-6 text-xs font-semibold text-tonner-orange">
                Cobertura nacional activa
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t text-right">
          <span className="text-xs text-gray-400">
            Catálogo Digital Tonner · Panel Administrativo v1
          </span>
        </div>
      </div>
    </div>
  );
}
