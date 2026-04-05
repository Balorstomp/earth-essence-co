/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EFE5D5', 'cream-light': '#F9F2E7', sand: '#D4B896',
        ink: '#1E1510', 'ink-light': '#3D2B1A', forest: '#3B1F0F',
        olive: '#8C6239', sage: '#C08B68', terra: '#9E4A28',
        teal: '#7A4030', ember: '#4A1A08', slate: '#9E8070',
        'sage-light': '#F0DDC0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
