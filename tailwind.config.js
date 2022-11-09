/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
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
