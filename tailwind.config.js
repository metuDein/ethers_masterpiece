/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      screens: {
        'widescreen': { 'raw': '(min-aspect-ratio : 3/2)' },
        'tallscreen': { 'raw': '(min-aspect-ratio : 1/2)' },

      },
    },
  },
  plugins: [],
}

