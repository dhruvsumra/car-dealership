/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fffae1',
          200: '#fff4c3',
          300: '#ffea95',
          400: '#ffd956',
          500: '#f5c227',
          600: '#d4af37',
          700: '#b8860b',
          800: '#946714',
          900: '#795116',
          950: '#462c08',
        },
        obsidian: {
          950: '#07080b',
          900: '#0c0e14',
          850: '#11141d',
          800: '#171a26',
          700: '#232738',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Cinzel', 'serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5d77f 0%, #d4af37 50%, #8a670e 100%)',
        'gold-metallic': 'linear-gradient(180deg, #ffe89e 0%, #d4af37 50%, #997818 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15) 0%, rgba(7, 8, 11, 1) 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
