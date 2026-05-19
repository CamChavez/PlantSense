/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plant: {
          bg:             '#EFF7EA',
          card:           '#FFFFFF',
          primary:        '#9ECC99',
          'primary-dark': '#6AAD64',
          dark:           '#495D3D',
          light:          '#C7E7C4',
          mid:            '#6B8760',
          muted:          '#A1B799',
          peach:          '#FFD3BC',
          mint:           '#C9EDD6',
          yellow:         '#FFE281',
          pink:           '#FCD5DC',
          blue:           '#B6DAE9',
          lavender:       '#D7C7E9',
          'alert-red':    '#F8A0A0',
          'alert-green':  '#9ECC99',
          'alert-yellow': '#FFE281',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(73,93,61,0.10)',
        nav:  '0 -4px 16px rgba(73,93,61,0.08)',
        btn:  '0 8px 20px rgba(110,180,100,0.30)',
      },
    },
  },
  plugins: [],
}
