/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['animate-spin', 'hidden', 'md:flex', 'md:hidden'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#0CECDD',
          yellow: '#F5FF00',
          pink: '#FF6FD8',
          purple: '#BD00FF',
        },
      },
    },
  },
  plugins: [],
};
