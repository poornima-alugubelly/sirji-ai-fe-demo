import type { Config } from 'tailwindcss';

const themeColors = {
  white01: '#C8C8C8',
  white02: '#AAA',
  grayBgLight: '#262625',
  grayBg: '#2F2F2F',
  grayBgDark: '#242424',
  grayBgBlack: '#1E1E1E',
  primary: '#49F627',
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: themeColors,
    },
  },
  plugins: [],
};
export default config;
