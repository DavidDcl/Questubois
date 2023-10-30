/* @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        woodcolor: "#28201A",
        hopgreenbtn: "#88AD4F",
        blondbeercolor: "#F2B705",
        whitebeercolor: "#FFD440",
        amberbeercolor: "#BA3404",
        neutralgrey: "#D9D9D9",
        almostwhite: "#F4EFE1",
        almostblack: "#2C2C2C",
      },
      fontFamily: {
        text: ["Poppins", "sans-serif"],
        title: ["Lilita One", "sans-serif"],
      },
      width: {
        50: "64vw",
        30: "30vw",
      },
      height: {
        666: "35rem",
      },
      top: {
        17: "17rem",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "waving-beer": "wave 2s linear infinite",
      },
    },
  },
  plugins: [],
};
