/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1b2e4b"
      },
      fontFamily: {
        font1: ["Merriweather", "serif"]
      }
    },
  },
  plugins: [],
}
