/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-theme-header': "#e00404"
      },
      fontFamily: {
        "manrope": ['Manrope', 'sans-serif'],
        "space-grotesk": ['Space Grotesk', 'sans-serif']
      }
    }
  },
  plugins: [],
}

