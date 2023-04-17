/* eslint-disable global-require */
module.exports = {

  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("daisyui")],
};
