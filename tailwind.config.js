/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: '#D4AF37',
        truss: '#FF6B35',
        wella: '#8B4513',
        brae: '#1E88E5',
        sebastian: '#000000',
        cadiveu: '#9C27B0',
        mini: '#FF9800',
        whatsapp: '#25D366',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}