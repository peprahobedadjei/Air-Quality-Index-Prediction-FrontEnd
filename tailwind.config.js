/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alton: ['Alton Trial', 'sans-serif'],
      },
      colors:{
        brandPrimary: "#FF4310",
        brandSecondary: "#d82e0",
      },
    },
  },
  plugins: [],
};
