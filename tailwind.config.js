/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
