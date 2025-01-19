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
        '+lt-bg-pri': '#fafaff',
        '+lt-bg-sec': 'lightgray',
        '+lt-fg-pri': '#23272f',
        '+lt-fg-sec': '#434958',
        '+lt-fg-pop': '#4444bc',
        '+lt-b-pri': 'lightgray',

        // dark
        '+dk-bg-pri': '#0e0e25',
        '+dk-bg-sec': 'black',
        '+dk-fg-pri': '#f6f7f9',
        '+dk-fg-sec': '#6d7b8f',
        '+dk-fg-pop': '#4c44bc',
        '+dk-b-pri': 'black',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
