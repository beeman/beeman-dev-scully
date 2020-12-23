const colors = require("tailwindcss/colors");

module.exports = (isProd) => ({
  prefix: "",
  purge: {
    enabled: isProd,
    content: ["**/*.html", "**/*.ts"],
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
});
