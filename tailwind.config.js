/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        mist: "#f5f7fb",
        brand: {
          teal: "#0f766e",
          blue: "#2563eb",
        },
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.11)",
        lift: "0 16px 32px rgba(37, 99, 235, 0.20)",
      },
    },
  },
  plugins: [],
};
