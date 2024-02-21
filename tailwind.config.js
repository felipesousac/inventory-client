/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "pallete-dark": "#12372A",
      "pallete-green": "#436850",
      "pallete-light-green": "#ADBC9F",
      "pallete-light": "#FBFADA",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
