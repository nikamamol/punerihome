/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your brand colors
        brand: {
          black: '#0a0a0a',
          'black-light': '#1a1a1a',
          gold: '#FFD700',
          'gold-light': '#FFE55C',
          'gold-dark': '#B8860B',
          silver: '#C0C0C0',
          'silver-light': '#E8E8E8',
          'silver-dark': '#A9A9A9',
          yellow: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B', // Primary brand yellow
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFE55C 50%, #B8860B 100%)',
        'gradient-silver': 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A9A9A9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      }
    },
  },
  plugins: [],
}