import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: { primary: '#131314', secondary: '#1a1a1b', tertiary: '#242425' },
        foreground: { primary: '#faf9f0', secondary: '#b5b3a8', tertiary: '#787670' },
        accent: { DEFAULT: '#10B981', hover: '#059669', light: '#34D399', dark: '#047857' },
        border: {
          subtle: 'rgba(250, 249, 240, 0.1)',
          DEFAULT: 'rgba(250, 249, 240, 0.15)',
          emphasis: 'rgba(250, 249, 240, 0.25)',
        },
      },
      fontFamily: { sans: ['var(--font-inter)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};

export default config;
