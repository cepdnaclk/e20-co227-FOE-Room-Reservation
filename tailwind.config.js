/** @type {import('tailwindcss').Config} */
export default {
  content: ['.public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans'],
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        'red-80': '#ffdcdc',
        'border-1': '#B0EBB4',
        'border-2': '#E4B1F0',
        'border-3': '#ECCDFF',
        'color-1': '#BFF6C3',
        'color-2': '#F0D9FF',
        'color-3': '#ECF2FF',
        'color-maroon': '#973131',
        'color-maroon-1': '#810000',
        // 'color-3': '#F875AA',
      },
    },
  },
};
