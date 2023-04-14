/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#343434',
        'sidebar-bg': '#FFFFFF',
        'contact-card-bg': '#28282B',
      },
    },
  },
  plugins: [],
};
