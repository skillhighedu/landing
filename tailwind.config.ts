// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['PixelDigivolve', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // if you use dark mode
  plugins: [],
};

export default config;
