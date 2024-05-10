/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      spacing: {
        'calc-screen-88': 'calc(100vw - 256px)',
      },
    },
    extend: {
      colors:{
        "primary": "#F9A826",
        "secondary": "#E6E6E6",
        "primary-dark": "#FFA006",
        "secondary-dark": "#cdcdcd",
      }
    }
  },
  plugins: [],
}