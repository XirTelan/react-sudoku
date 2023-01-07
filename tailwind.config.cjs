/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mySurface: "#121212",
        myPrimary: "#BB86FC",
        myPrimaryVariant: "#3700B3",
        mySecondary: "#03DAC6",
        myError: "#CF6679",
      },
    },
  },
  plugins: [],
};
