import { X } from 'lucide-react';
import { TONNER_LINES, TonnerLineKey } from '../tonnerLines';

interface GuideModalProps {
  onSelectLine: (line: TonnerLineKey) => void;
  onClose: () => void;
}

export default function GuideModal({ onSelectLine, onClose }: GuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
          relative
          w-full max-w-3xl
          mx-6
          rounded-3xl
          bg-white
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          p-10
        "
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="
            absolute top-5 right-5
            p-2 rounded-full
            bg-gray-100 hover:bg-gray-200
            transition
          "
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Título */}
        <h2 className="mb-4 text-center text-3xl font-bold uppercase tracking-[0.08em] text-tonner-text">
          ¿Dónde vas a aplicar la pintura?
        </h2>

        {/* Subtítulo */}
        <p className="mb-10 text-center text-tonner-mutedText normal-case">
          Selecciona el tipo de aplicación para mostrar los productos adecuados.
        </p>

        {/* Opciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.values(TONNER_LINES).map((line) => (
            <button
              key={line.key}
              onClick={() => {
                onSelectLine(line.key);
                onClose();
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                p-6
                text-left
                border
                border-gray-200
                hover:border-tonner-blue
                shadow-sm
                hover:shadow-[0_12px_30px_rgba(29,86,194,0.18)]
                transition
              "
            >
              {/* Gradiente de línea */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r ${line.gradient}`}
              />

              {/* Contenido */}
              <div className="relative z-10">
                <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-tonner-text group-hover:text-white">
                  {line.label}
                </h3>
                <p className="text-sm normal-case text-tonner-mutedText group-hover:text-white/90">
                  {line.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
