/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: '1fr 1fr 1fr',
      },
      gridTemplateRows: {
        main: 'min-content auto',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
