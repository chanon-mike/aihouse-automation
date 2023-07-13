/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F9F7F7',
        secondary: '#DBE2EF',
        primary: '#3F72AF',
        dark: '#112D4E',
      },
    },
  },
  plugins: [],
};
