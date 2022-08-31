/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textShadow: {
        md: '2px 2px 4px rgb(0 0 0 / 45%);',
      },
      backgroundImage: {
        'gradient-to-b':
          'linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '50%': { opacity: 50 },
          '100%': { opacity: 100 },
        },
        fadeOut: {
          '0%': { opacity: 100 },
          '50%': { opacity: 50 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in',
        fadeOut: 'fadeOut 2s ease-out forwards',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}
