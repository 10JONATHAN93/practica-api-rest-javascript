/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        yellow: 'var(--yellow)',
        green: {
          500: 'var(--green)',
          ...require('tailwindcss/colors').green
        },
        aqua: 'var(--aqua)',
        lightBlue: 'var(--lightBlue)',
        darkBlue: 'var(--darkBlue)',
        red: {
          500:'var(--red)',
          ...require('tailwindcss/colors').red
        },
      },
      fontFamily: {
        'roboto': ['roboto', 'sans-serif'],
        'dosis': ['Dosis', 'sans-serif'],
        'red-hat': ['"Red Hat Display"', 'sans-serif'],

      },
      animation: {
        'loading-skeleton': 'pulse 1.5s ease-in-out infinite', // Definir la animación
      },
      keyframes: {
        pulse: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

