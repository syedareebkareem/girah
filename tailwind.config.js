/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF3E7',
        'cream-dark': '#F3E8D7',
        ink: '#2B2118',
        rust: '#C4592E',
        'rust-dark': '#A8471F',
        pine: '#3A5A40',
        'pine-dark': '#2C4531',
        mustard: '#E3A857',
        blush: '#E8B4B8',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
