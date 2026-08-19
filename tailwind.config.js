/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#00203F',
          dark: '#001830',
          light: '#052A4F',
        },
        mint: {
          DEFAULT: '#ADEFD1',
          light: '#C5F4DE',
          dark: '#93E3BE',
        },
        coral: {
          DEFAULT: '#FF6B4A',
          hover: '#FF542E',
          light: '#FF856B',
        },
        offwhite: {
          DEFAULT: '#F4F4F4',
          card: '#FAFAFA',
          border: '#E8E8E8',
        }
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
