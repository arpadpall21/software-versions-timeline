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
        '+lt-bg': '#FAFAFF',
        '+lt-fg-pri': '#23272f',
        '+lt-fg-sec': '#434958',
        '+lt-fg-pop': '#4444bc',

        // dark
        '+dk-bg': '#0e0e25',
        '+dk-fg-pri': '#f6f7f9',
        '+dk-fg-sec': '#6d7b8f',
        '+dk-fg-pop': '#4c44bc',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
