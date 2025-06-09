/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        TopBar: '#1E1F26',
        LeftBar: '#1A2232',
        MainBody: '#0C1525',
        primary: '#4a6bff',
        secondary: '#f8f9fa',
      }
    },
  },
  plugins: [],
}

