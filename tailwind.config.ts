// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
 content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // adjust based on project
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
        pixel: ['PixelDigivolve', 'sans-serif'],
      },
      
    },
  },
  darkMode: 'class', // if you use dark mode
  plugins: [require("@tailwindcss/typography")],
};

export default config;
