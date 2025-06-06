/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3B3B3B",
        secondary: "#E3E3E3",
        brown: {
          dark: "#744E15",
          mid: "#FFE9B1",
          light: "#FFF5DC",
        },
        yellow: "#FFB906",
      },
    },
  },
  plugins: [],
};
