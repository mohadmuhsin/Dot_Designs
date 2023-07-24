/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'], // Update this array with the appropriate content sources
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
