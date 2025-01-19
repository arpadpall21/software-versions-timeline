import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // light
        'bg-lt': 'white',
        'fg-lt-pr': 'darkgray',
        'fg-lt-sec': 'lightgray',

        // dark
        'bg-dk': 'black',
        'fg-dk-pr': 'green',
        'fg-dk-sec': 'forestgreen',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
} satisfies Config;
