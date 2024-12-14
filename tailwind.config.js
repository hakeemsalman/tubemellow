/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#00a4e4',
        secondary: '#005B7E'
      }
    },
  },
  plugins: [],
}

