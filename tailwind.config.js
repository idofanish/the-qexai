const { color } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  
 content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
      logoQE_Blue: '#0f006f', // QE font color name and hex code
      logoAI_GoldenYellow: '#ffbd59', // AI font color name and hex code
    },
     font: {
        sans: ['Calibri', '"Microsoft Sans Serif"', 'sans-serif'],
        color1: ['#0f006f'],
        color2: ['#ffbd59'],
      },

    },
  },
  plugins: [],
};
