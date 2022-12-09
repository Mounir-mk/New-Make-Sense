/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      content: {
        "chevron-down": "url(./src/assets/chevron-down.svg)",
      },
      colors: {
        "blue-dianne": "#0C3944",
        "cerise-dark": "#9B084F",
      },
    },
  },
  plugins: [],
};
