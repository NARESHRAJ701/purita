/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F6F3ED',
          secondary: '#EEE9DE',
          ivory: '#FAF8F2',
          card: '#FBF9F5',
        },
        botanical: {
          DEFAULT: '#25301F',
          dark: '#1A2315',
          forest: '#526B36',
          moss: '#71884D',
          muted: '#879875',
          light: '#E6EFE0',
        },
        sandal: {
          DEFAULT: '#A87945',
          light: '#C79A66',
          pale: '#F4ECE1',
        },
        turmeric: {
          DEFAULT: '#D8A91F',
          gold: '#C49A38',
          pale: '#FAF0D7',
        },
        aloe: {
          DEFAULT: '#5A8043',
          pale: '#E9F1E2',
        },
        charcoal: '#161714',
        subtleBorder: 'rgba(20, 20, 20, 0.12)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
      },
      maxWidth: {
        'site': '1440px',
      },
      borderRadius: {
        'brand': '28px',
        'brand-lg': '32px',
        'brand-sm': '20px',
      },
      boxShadow: {
        'botanical': '0 30px 80px rgba(0, 0, 0, 0.08)',
        'botanical-lg': '0 40px 100px rgba(0, 0, 0, 0.12)',
        'botanical-sm': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
