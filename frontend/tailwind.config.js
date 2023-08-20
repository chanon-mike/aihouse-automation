/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3F72AF',
          secondary: '#DBE2EF',
          accent: '#67e8f9',
          neutral: '#112D4E',
          'base-100': '#F9F7F7',
          info: '#67e8f9',
          success: '#86efac',
          warning: '#fde047',
          error: '#f04777',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
