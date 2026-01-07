/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fresh-green": "#10b981",
        "fresh-dark": "#064e3b",
        "fresh-light": "#d1fae5",
      },
      fontFamily: {
        fresh: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
