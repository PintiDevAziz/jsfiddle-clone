const { colors: defaultColors } = require('tailwindcss/colors')
const colors = {
  ...defaultColors,
  ...{
    textGray: '#8d8f91',
    themeRed: '#FF4F68',
  },
}
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
