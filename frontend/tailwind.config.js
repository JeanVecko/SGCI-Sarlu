/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#fbf7f0', 100: '#f4ead8', 500: '#b26b0b', 600: '#965607', 700: '#754206' },
        ink: '#1e2930',
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['DM Serif Display', 'serif'] },
    },
  },
  plugins: [],
}
