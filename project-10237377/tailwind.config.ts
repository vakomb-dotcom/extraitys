/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Cormorant Garamond', 'Georgia', 'serif'],
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          noir: {
            darkest: '#080808',
            deep: '#0D0D0D',
            soft: '#141414',
            card: '#1C1C1C',
          },
          ivory: {
            light: '#FCFAF7',
            base: '#F8F5F0',
            warm: '#F0EBE3',
            dark: '#E8E2D8',
          },
          champagne: {
            DEFAULT: '#C4A44A',
            light: '#D4BA6A',
            pale: '#E8D8A0',
            soft: '#F0E6C8',
          },
          burgundy: {
            DEFAULT: '#8C1C28',
            deep: '#6B1520',
            muted: '#7A1822',
            light: '#A82838',
            soft: '#C44050',
          },
          taupe: {
            DEFAULT: '#C4B5A8',
            light: '#D8CEC6',
            dark: '#A89888',
          },
        },
        borderRadius: {
          'card': '1rem',
          'btn': '9999px',
        },
        transitionDuration: {
          '400': '400ms',
          '600': '600ms',
          '800': '800ms',
          '1200': '1200ms',
        },
        fontSize: {
          'display': ['clamp(40px, 6vw, 96px)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
          'display-mobile': ['clamp(32px, 10vw, 56px)', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
        },
      },
    },
    plugins: [],
  }