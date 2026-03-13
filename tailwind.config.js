/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* ==================================================
       * TIPOGRAFÍA TONNER
       * ================================================== */
      fontFamily: {
        // Marca / títulos / headers
        display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],

        // Texto funcional / UI / fichas técnicas
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
      },

      /* ==================================================
       * COLORES TONNER — SISTEMA REAL
       * ================================================== */
      colors: {
        tonner: {
          /* --- Colores de marca (manual) --- */
          blue: '#1D56C2', // Azul Tonner (DOMINANTE)
          orange: '#FF7D00', // Acento
          red: '#E30613', // Estados / alertas
          pink: '#A1188D', // Acento secundario

          /* --- Escenario (NO neutro genérico) --- */
          bg: '#1D56C2', // Fondo principal de la app
          bgMuted: '#163F8E', // Variación profunda para secciones
          bgSoft: '#EEF2FF', // Apoyo muy puntual

          /* --- Superficies --- */
          surface: '#FFFFFF', // Cards / panels
          surfaceMuted: '#F8FAFF', // Sub-panels

          /* --- Texto --- */
          textOnBlue: '#FFFFFF', // Texto sobre fondo Tonner
          text: '#0F172A', // Texto principal sobre blanco
          mutedText: '#64748B', // Texto secundario

          /* --- UI --- */
          border: '#CBD5E1',
        },
      },

      /* ==================================================
       * GRADIENTES TONNER (IDENTIDAD, NO DECORACIÓN)
       * ================================================== */
      backgroundImage: {
        // Uso: headers, hero, bloques principales
        'tonner-brand': 'linear-gradient(90deg, #1D56C2 0%, #FF7D00 100%)',

        // Uso: fondos de sección sobre azul
        'tonner-brand-soft':
          'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)',
      },

      /* ==================================================
       * FORMA / PESO VISUAL (INDUSTRIAL)
       * ================================================== */
      borderRadius: {
        tonner: '12px',
        'tonner-sm': '8px',
      },

      boxShadow: {
        tonner: '0 10px 30px rgba(15,23,42,0.15)',
        'tonner-sm': '0 4px 14px rgba(15,23,42,0.12)',
      },
    },
  },
  plugins: [],
};
