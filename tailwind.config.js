/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'system-ui', 'sans-serif'],
        // 'sans': ['Open Sans', 'system-ui', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      keyframes: {
        indeterminateProgress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        indeterminateProgress: 'indeterminateProgress 1.5s infinite linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      display: ['print'],
    },
  },
}
