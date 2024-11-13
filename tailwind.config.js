/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#A855F7',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      backgroundColor: {
        'memo': '#FFF9C4',
        'memo-dark': '#FFF176',
      }
    },
  },
  plugins: [],
}

