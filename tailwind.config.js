/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'brand': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#7C4A2D', // Updated primary brand color
          700: '#603B2B', // Updated darker shade
          800: '#4A2E21',
          900: '#2A1A13',
        },
        'accent': {
          50: '#F5F0E3',  // Warm parchment
          100: '#E6D5B8',
          200: '#D6BA8C',
          300: '#C69F61',
          400: '#B68435',
          500: '#96690A',
          600: '#785308',
          700: '#5A3E06',
          800: '#3C2904',
          900: '#1E1402',
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};