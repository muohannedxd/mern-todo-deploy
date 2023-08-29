/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      'sm': { min: "267px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        redClair: "#F55A5A",
        add: "#1A3163",
        close: "#C32643"
      },
    },
  },
  plugins: [],
};