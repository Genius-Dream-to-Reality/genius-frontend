/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/**/*.{html}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#3B1E54",
        purple: "#9B7EBD",
        "primary-purple": "#D4BEE4",
        "light-purple": "#EEEEEE",
      },
      container: {
        center: true,
        padding: {
          DEFALUT: "1rem",
          "2xl": "3rem",
          xl: "2rem",
          lg: "1.5rem",
          md: "1.25rem",
          sm: "1rem",
          xs: "1rem",
        },
      },

      width: {
        "sb-wid": "240px",
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};
