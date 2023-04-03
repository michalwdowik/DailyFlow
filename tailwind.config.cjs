/* eslint-disable global-require */
module.exports = {
  // animation: {
  //   spin: "spin 1s ease-in-out",
  // },
  // keyframes: {
  //   spin: {
  //     "0%, 100%": {
  //       transform: "rotate(-30deg)",
  //     },
  //     "50%": {
  //       transform: "rotate(30deg)",
  //     },
  //   },
  // },
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
