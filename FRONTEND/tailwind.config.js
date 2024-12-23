/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFCE1A",
        secondary: "#0D0842",
        background: "#F3F3F3",
        favourite: "#FF5841", 
        offerColor: "#e42b26",
        // Dark mode colors
        "dark-bg": "#121212", // Dark background for dark mode
        "dark-card": "#1f1f1f", // Dark card background color
        "dark-text": "#e0e0e0", // Light text for dark mode
        'dark-book-card': 'rgb(17, 23, 29)'
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
        headings: ["Conv_Cambria Italic"],
      },
    },
  },
  darkMode: "class", // Enables dark mode based on a class (will be toggled via theme provider)
  plugins: [],
};
