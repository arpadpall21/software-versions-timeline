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
        fgPop: '#4444bc',
        borPri: 'lightgray',
        foc: '#4444bc',

        // dark
        bgPriD: '#0e0e25',
        bgSecD: 'black',
        fgPriD: '#f6f7f9',
        fgSecD: '#6d7b8f',
        fgPopD: '#4c44bc',
        borPriD: 'black',
        focD: 'white',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
