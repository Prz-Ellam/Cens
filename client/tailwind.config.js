/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#332747', // Define your custom primary color
        secondary: '#0E0C1D',
        dark: '#242424',
        accent: '#2E2E2E',
        purple: '#4E3878',
        transparentGray: '#4D4E55' // Define your custom secondary color
      },
      customUtilities: {
        'min-w-48': {
          'min-width': '12rem'
        }
      }
    },
  },
  plugins: [],
}