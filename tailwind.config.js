/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Dark Mode kann per Klasse gesteuert werden
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#30b9c9',
        secondary: '#4dd0e1',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} 