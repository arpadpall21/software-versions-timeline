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
        bgIntHover: '#ebebff',
        gridFg: '#434958',
        gridBg: '#f0f8ff',
        gridBor: 'lightgray',
        skelPri: '#f0f8ff',
        skelSec: '#4444bc',

        // dark
        bgPriD: '#191942',
        bgSecD: 'black',
        fgPriD: '#c5cede',
        fgSecD: '#6d7b8f',
        borPriD: 'black',
        focD: 'white',
        fgPopD: '#4c44bc',
        bgWarnD: '#fdba74',
        bgWarnHoverD: '#fb923c',
        bgIntHoverD: '#23235c',
        gridFgD: '#a0a0a0',
        gridBgD: '#0c2340',
        gridBorD: '#a0a0a0',
        skelPriD: '#0c2340',
        skelSecD: '#4c44bc',
      },
      spacing: {
        mobPad: '12px',
        deskPad: '18px',
        gridCellW: '100px',
      },
      animation: {
        'fast-pop': 'fast-pop 200ms',
        skeletonSwipe: 'skeletonSwipe 2000ms linear infinite',
      },
      keyframes: {
        'fast-pop': {
          from: { 'font-weight': 'bold' },
          to: { 'font-weight': 'normal' },
        },
        skeletonSwipe: {
          from: { left: '-200%' },
          to: { left: '100%' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
