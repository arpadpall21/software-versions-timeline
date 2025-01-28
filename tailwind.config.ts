import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // light
        bgPri: '#fafaff',
        bgSec: 'lightgray',
        fgPri: '#23272f',
        fgSec: '#434958',
        borPri: 'lightgray',
        foc: '#4444bc',
        fgPop: '#4444bc',
        bgWarn: '#fca5a5',
        bgWarnHover: '#f87171',

        // dark
        bgPriD: '#191942',
        bgSecD: 'black',
        fgPriD: '#f6f7f9',
        fgSecD: '#6d7b8f',
        borPriD: 'black',
        focD: 'white',
        fgPopD: '#4c44bc',
        bgWarnD: '#fdba74',
        bgWarnHoverD: '#fb923c',
      },
      spacing: {
        mobPad: '12px',
        desckPad: '18px',
      },
      animation: {
        'fast-pop': 'fast-pop 200ms',
      },
      keyframes: {
        'fast-pop': {
          from: { 'font-weight': 'bold' },
          to: { 'font-weight': 'normal' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
