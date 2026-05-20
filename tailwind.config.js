/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black:   '#0A0A0A',
          carbon:  '#2B2B2B',
          mid:     '#6E6E6E',
          light:   '#CFCFCF',
          offwhite:'#F5F5F5',
          silver:  '#C0C0C0',
          chrome1: '#8A8A8A',
          chrome2: '#EFEFEF',
          white:   '#ffffff',
        },
      },
      fontFamily: {
        cinzel:  ['var(--font-cinzel)', 'serif'],
        fraktur: ['var(--font-fraktur)', 'cursive'],
        sofia:   ['var(--font-sofia)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.3em',
        widest4: '0.4em',
      },
    },
  },
  plugins: [],
};
