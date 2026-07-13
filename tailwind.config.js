/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        // Map slate to navy colors so all text-slate-xxx and bg-slate-xxx automatically become navy
        slate: {
          50: '#070b13',     // Very dark navy background
          100: '#0d1222',
          200: '#1e293b',
          300: '#cbd5e1',    // silver-blue for body text
          400: '#94a3b8',
          500: '#cbd5e1',    // Soft silver-blue for muted text
          600: '#e2e8f0',    // Soft text color (old slate-600) -> now bright slate
          700: '#f1f5f9',    // Medium bright text (old slate-700) -> near white text
          800: '#ffffff',    // Bright headings (old slate-800) -> pure white
          900: '#ffffff',    // Main heading -> pure white
          950: '#020617',
        },
        // Map amber/yellow to gold colors so all text-amber-xxx, bg-amber-xxx automatically become gold
        amber: {
          50: '#fdf8ed',
          100: '#f9eccc',
          200: '#f2d794',
          300: '#e8bc5a',
          400: '#d4a44c',
          500: '#c4912e',
          600: '#d4a44c',
          700: '#d4a44c',    // gold accent
          800: '#b8862e',    // dark gold accent
          900: '#7a531f',
        },
        yellow: {
          50: '#fdf8ed',
          100: '#f9eccc',
          200: '#f2d794',
          300: '#e8bc5a',
          400: '#d4a44c',
          500: '#c4912e',
          600: '#b8862e',
          700: '#d4a44c',
          800: '#b8862e',
          900: '#7a531f',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3d56ab',
          600: '#2d4190',
          700: '#1e2d6d',
        },
        accent: {
          400: '#d4a44c',
          500: '#b8862e',
        },
        gold: {
          50: '#fdf8ed',
          100: '#f9eccc',
          200: '#f2d794',
          300: '#e8bc5a',
          400: '#d4a44c',
          500: '#c4912e',
          600: '#b8862e',
          700: '#96681e',
          800: '#7a531f',
          900: '#64441e',
        },
        navy: {
          50: '#eef2ff',
          100: '#d8dff5',
          200: '#b5bfea',
          300: '#8899d6',
          400: '#5b73c0',
          500: '#3d56ab',
          600: '#2d4190',
          700: '#1e2d6d',
          800: '#111827',
          900: '#0c1222',
          950: '#080d1a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
