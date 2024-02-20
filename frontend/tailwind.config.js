/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        protest: ["Protest Strike", "sans-serif"],
        kdam: ["Kdam Thmor Pro", "sans - serif"],
      },
    },
  },
  plugins: [],
};
