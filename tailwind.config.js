/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B8C5B5',
        'primary-dark': '#A4B5A0',
        accent: '#A59989',
        'text-dark': '#2D2D2D',
        'text-light': '#999999',
        'bg-off': '#F8F8F7',
        'border-light': '#D9D9D9',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
