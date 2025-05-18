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
        bgLoadErr: '#fecaca',
        fgPri: '#23272f',
        fgSec: '#434958',
        borPri: 'lightgray',
        foc: '#4444bc',
        gridFg: '#434958',
        gridBg: '#f0f8ff',
        gridBor: 'lightgray',
        skelPri: '#f0f8ff',
        skelSec: '#4444bc',
        btnFg: '#4444bc',
        btnBg: '#fafaff',
        btnBgHov: '#ebebff',
        btnFgPop: '#c5cede',
        btnBgPop: '#4444bc',
        btnBgHovPop: '#353594',
        btnFgWarn: 'white',
        btnBgWarn: '#ff5c5c',
        btnBgHovWarn: '#e05151',

        // dark
        bgPriD: '#191942',
        bgSecD: 'black',
        bgLoadErrD: '#450a0a',
        fgPriD: '#c5cede',
        fgSecD: '#6d7b8f',
        borPriD: 'black',
        focD: 'white',
        gridFgD: '#a0a0a0',
        gridBgD: '#0c2340',
        gridBorD: '#a0a0a0',
        skelPriD: '#0c2340',
        skelSecD: '#4c44bc',
        btnFgD: '#4c44bc',
        btnBgD: '#191942',
        btnBgHovD: '#23235c',
        btnFgPopD: '#c5cede',
        btnBgPopD: '#4c44bc',
        btnBgHovPopD: '#39338c',
        btnFgWarnD: '#b0b0b0',
        btnBgWarnD: '#851919',
        btnBgHovWarnD: '#5c1111',
      },
      spacing: {
        mobPad: '12px',
        deskPad: '18px',
        gridCellW: '70px',
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
