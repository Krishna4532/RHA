import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'background-soft': '#FAFAF8',
        foreground: '#111111',
        'foreground-soft': '#555555',
        accent: '#F58220',
        'accent-hover': '#D96A00',
        border: '#EAEAEA',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px -24px rgba(17,17,17,0.16)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
