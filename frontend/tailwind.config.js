/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#000000',
        primary: '#373A3D',
        secondary: '#1B1F23',
      }
    },
  },
  plugins: [],
}

