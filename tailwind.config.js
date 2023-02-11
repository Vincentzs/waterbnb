/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/*.{html,js},",
    "./src/css/*.{html,js},",
    "./src/js/*.{html,js},",
    "./src/search_results/**/*.{html,js}",
    "./src/reservation_details/**/*.{html,js}",
  ],
  theme: {
    screens: {
      mobile: "0px",
      desktop: "600px",
    },
    extend: {
      colors: {
        oceanBlue: "#009dc4",
      },
      display: ["group-focus"],
    },
  },
  plugins: [],
};
