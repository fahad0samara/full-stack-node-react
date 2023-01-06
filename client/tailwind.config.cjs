/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    backdropBlur: {
      'none': 'none',
      'b-1': 'blur(1px)',
      'b-2': 'blur(2px)',
      // Add more values here as needed
    },
    backdropSaturate: {
      'none': 'none',
      'sat-50': 'saturate(50%)',
      'sat-100': 'saturate(100%)',
      // Add more values here as needed
    },
  },
  variants: {},
  plugins: [],
}







