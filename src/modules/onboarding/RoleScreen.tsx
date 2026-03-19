import { useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Home,
  HardHat,
  MapPin,
  Search,
  Store,
  Loader2,
} from 'lucide-react';
import { DEFAULT_LOCATION, LOCATION_STORAGE_KEY } from './location';
import type { UserType } from './userTypes';

const USER_TYPE_STORAGE_KEY = 'TONNER_USER_TYPE';

interface Props {
  onSelectUserType: (userType: UserType, location: string) => void;
}

const roles: Array<{
  key: UserType;
  label: string;
  description: string;
  icon: typeof Home;
  iconBg: string;
  cardAccent: string;
  arrowClass: string;
}> = [
  {
    key: 'cliente',
    label: 'Cliente',
    description: 'Hogar, mantenimiento y proyectos personales.',
    icon: Home,
    iconBg: 'bg-rose-50 text-rose-600',
    cardAccent: 'before:bg-rose-500',
    arrowClass: 'group-hover:text-rose-600',
  },
  {
    key: 'contratista',
    label: 'Contratista',
    description: 'Aplicación profesional y decisiones técnicas.',
    icon: HardHat,
    iconBg: 'bg-amber-50 text-amber-600',
    cardAccent: 'before:bg-amber-500',
    arrowClass: 'group-hover:text-amber-600',
  },
  {
    key: 'distribuidor',
    label: 'Distribuidor',
    description: 'Portafolio completo y pedidos comerciales.',
    icon: Store,
    iconBg: 'bg-emerald-50 text-emerald-600',
    cardAccent: 'before:bg-emerald-500',
    arrowClass: 'group-hover:text-emerald-600',
  },
];

const locationOptions = [
  'Bogota, Colombia',
  'Medellin, Colombia',
  'Cali, Colombia',
  'Barranquilla, Colombia',
  'Bucaramanga, Colombia',
  'Cartagena, Colombia',
  'Pereira, Colombia',
  'Manizales, Colombia',
  'Ibague, Colombia',
  'Villavicencio, Colombia',
];

export default function RoleScreen({ onSelectUserType }: Props) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const storedLocation = window.localStorage.getItem(LOCATION_STORAGE_KEY);

    if (storedLocation) {
      setSelectedLocation(storedLocation);
      setIsLoadingLocation(false);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data: { city?: string; country_name?: string }) => {
        if (!data.city) return;

        const detectedLocation = `${data.city}, ${data.country_name ?? 'Colombia'}`;

        setSelectedLocation(detectedLocation);

        window.localStorage.setItem(LOCATION_STORAGE_KEY, detectedLocation);
      })
      .catch(() => {})
      .finally(() => setIsLoadingLocation(false));
  }, []);

  const filteredLocations = locationOptions.filter((location) =>
    location.toLowerCase().includes(locationQuery.trim().toLowerCase())
  );

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);

    window.localStorage.setItem(LOCATION_STORAGE_KEY, location);

    setLocationQuery('');
    setIsLocationOpen(false);
  };

  const handleSelectRole = (role: UserType) => {
    window.localStorage.setItem(USER_TYPE_STORAGE_KEY, role);

    onSelectUserType(role, selectedLocation);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-800 to-blue-950 px-4 pb-8 pt-10 font-sans sm:px-6 sm:pb-12 sm:pt-16">
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-400/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[32rem]">
        <div className="rounded-[28px] border border-white/20 bg-white/10 px-4 pb-6 pt-8 backdrop-blur-2xl shadow-2xl sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-10 md:px-8">
          <div className="mb-8 flex justify-center">
            <img src="/logo.png" alt="Pinturas Tonner" className="h-16 object-contain sm:h-20" />
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              ¿Cómo vas a usar Tonner?
            </h1>

            <p className="mt-2 text-sm text-blue-100/80">
              Personalizamos tu catálogo según tu perfil
            </p>
          </div>

          <div className="relative mb-8 flex flex-col items-center" ref={dropdownRef}>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-200/70">Ubicación actual:</span>

              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
              >
                {isLoadingLocation ? (
                  <Loader2 size={14} className="animate-spin text-blue-300" />
                ) : (
                  <MapPin size={14} className="text-blue-300" />
                )}

                <span className="font-medium text-white">{selectedLocation}</span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${isLocationOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {isLocationOpen && (
              <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-blue-950/95 shadow-xl backdrop-blur-xl">
                <div className="border-b border-white/10 p-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm">
                    <Search size={16} className="text-blue-300/70" />

                    <input
                      type="text"
                      value={locationQuery}
                      onChange={(event) => setLocationQuery(event.target.value)}
                      placeholder="Buscar ciudad..."
                      className="w-full bg-transparent outline-none placeholder:text-blue-200/50"
                    />
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto p-2">
                  {filteredLocations.length ? (
                    filteredLocations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => handleSelectLocation(location)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          location === selectedLocation
                            ? 'bg-blue-500/30 text-white'
                            : 'text-blue-100/80 hover:bg-white/10'
                        }`}
                      >
                        <MapPin size={16} />
                        {location}
                      </button>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-blue-200/50">
                      No se encontraron ciudades
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <button
                  key={role.key}
                  onClick={() => handleSelectRole(role.key)}
                  className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50/90 p-4 text-left shadow-[0_14px_36px_rgba(15,23,42,0.16)] ring-1 ring-white/70 transition duration-300 before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${role.cardAccent} hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.22)] active:scale-[0.985]`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_rgba(15,23,42,0.08)] ${role.iconBg}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1.5 text-base font-semibold tracking-tight text-slate-900">
                      {role.label}
                    </h3>

                    <p className="text-xs leading-relaxed text-slate-600">{role.description}</p>
                  </div>

                  <ArrowRight
                    size={18}
                    className={`shrink-0 text-slate-400 transition duration-300 group-hover:translate-x-1 ${role.arrowClass}`}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/60 sm:mt-10">
            <span>Arquitectónica</span>
            <span className="h-1 w-1 rounded-full bg-blue-300/40"></span>
            <span>Industrial</span>
            <span className="h-1 w-1 rounded-full bg-blue-300/40"></span>
            <span>Automotriz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
