/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: "#fff",
        orange: "#fbbc05",
        darkgoldenrod: "#c78a00",
        midnightblue: "#212177",
     
        lightgray: "#cfd5d6",

        dimgray: "#5d5d5d",
        goldenrod: "#fdc75b",
        skyblue: "rgba(87, 204, 224, 0.47)",
        salmon: "#ff7c7c",
        mediumslateblue: "#5d5fef",
        lightseagreen: "#37b6c1",
        plum: "#c29fe9",
        whitesmoke: "#eee",
    },
    rotate: {
      '30': '30deg',
    },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};