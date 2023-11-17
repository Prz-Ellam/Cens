/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#332747',
        secondary: '#0E0C1D',
        dark: '#242424',
        accent: '#2E2E2E',
        purple: '#573b8a',
        'purple-800': '#573b8a',
        'purple-900': '#493271',
        transparentGray: '#4D4E55'
      }
    },
  },
  plugins: [],
}
