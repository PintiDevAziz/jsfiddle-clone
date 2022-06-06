const { colors: defaultColors } = require('tailwindcss/colors')
const colors = {
  ...defaultColors,
  ...{
    textGray: '#8d8f91',
    themeRed: '#FF4F68',
    baseBg: '#1F2227',
    baseBgDarker: '#1A1D21',
    themeBlue: '#2e71ff',
    borderGray: '#2C2F34',
    themeYellow: '#F3CA63',
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
