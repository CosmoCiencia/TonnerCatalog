import { BookOpen, MapPin } from 'lucide-react';

interface TopBarProps {
  onGoCatalog?: () => void;
  onGoDistributors?: () => void;
}

export default function TopBar({ onGoCatalog, onGoDistributors }: TopBarProps) {
  return (
    <div className="relative z-30">
      <nav
        className="
          hidden md:block
          bg-white
          rounded-b-[28px]
          shadow-[0_12px_32px_rgba(15,23,42,0.08)]
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-16
            flex
            items-center
            justify-center
            uppercase
          "
        >
          <div
            className="
              flex
              items-center
              gap-16
              text-[15px]
              font-medium
              tracking-wide
              text-slate-700
            "
          >
            {/* CATÁLOGO */}
            <button
              onClick={onGoCatalog}
              className="
                relative
                transition-all
                duration-300
                hover:text-tonner-blue
                hover:-translate-y-[1px]
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-tonner-blue
                after:rounded-full
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              Catálogo
            </button>

            {/* DISTRIBUIDORAS */}
            <button
              onClick={onGoDistributors}
              className="
                relative
                transition-all
                duration-300
                hover:text-tonner-blue
                hover:-translate-y-[1px]
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-tonner-blue
                after:rounded-full
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              Distribuidoras
            </button>

            {/* BROCHURE (fase 2) */}
            <button
              className="
                relative
                opacity-70
                cursor-default
              "
            >
              Brochure
            </button>

            {/* SOPORTE (fase 2) */}
            <button
              className="
                relative
                opacity-70
                cursor-default
              "
            >
              Soporte
            </button>
          </div>
        </div>
      </nav>

      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3
          shadow-[0_-12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md
          md:hidden
        "
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <button
            onClick={onGoCatalog}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-700"
          >
            <BookOpen className="h-5 w-5 text-tonner-blue" />
            Catálogo
          </button>

          <button
            onClick={onGoDistributors}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-700"
          >
            <MapPin className="h-5 w-5 text-tonner-orange" />
            Distribuidoras
          </button>
        </div>
      </nav>
    </div>
  );
}
