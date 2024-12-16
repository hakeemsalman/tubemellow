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
      },
      backgroundImage: {
        'radial-pri-sec': 'radial-gradient(circle, rgba(0,104,255,1) 0%, rgba(0,0,255,1) 51%, rgba(12,3,166,1) 100%)',
        'reverse-radial-pri-sec': 'radial-gradient(circle, rgba(12,3,166,1) 0%, rgba(0,0,255,1) 51%, rgba(0,104,255,1) 100%)',
      },
    },
  },
  plugins: [],
}

