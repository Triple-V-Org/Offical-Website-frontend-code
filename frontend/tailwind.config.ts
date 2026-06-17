import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Figwork brand palette (Branding Guidelines V2)
        orange: '#974315',
        'orange-hover': '#ad4d18',
        paper: '#efebe5',
        teal: '#778a90',
        mauve: '#8d6571',
        slate: '#2d3437',
        steel: '#4d5b6a',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
