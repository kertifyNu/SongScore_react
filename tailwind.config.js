module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan your React files
    "./public/index.html", // Optional, if you use HTML
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        franie: ['"YourCustomFont"', "sans-serif"], // if used in className
      },
    },
  },
  plugins: [],
};
