/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat Alternates", "sans-serif"],
        primary: ["Cormorant Garamond", "serif"],
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            backgroundColor: "linear-gradient(to right, #8b69b9, #0033A0)", // Purple-Royal gradient
          },
          '50%': {
            backgroundColor: "linear-gradient(to right, #0033A0, #001f3d)", // Dark Blue gradient
          },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
      colors: {
        background: "linear-gradient(to right, #8b69b9, #001f3d)", // Purple-Royal to Dark Blue gradient
        primary: "#000000",
        secondary: "#ffffff", 
        tertiary: "#120230", 
      },
    },
  },
  plugins: [],
};
