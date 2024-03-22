import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}'
	],
  prefix: "",
  theme: {
    fontSize: {
      sm: '11px',
      base: '16px',
      lg: '20px',
      xl: '22px',
      xxl: '40px',
    },
    colors: {
      primary: {
        500: '#DAD7FE',
        DEFAULT: '#4339F2',
      },
      secondary: {
        500: '#FFE5D3',
        DEFAULT: '#FF3A29',
      },
      info: {
        500: '#CCF8FE',
        DEFAULT: '#02A0FC',
      },
      success: {
        500: '#E2FBD7',
        DEFAULT: '#34B53A',
      },
      warning: {
        500: '#FFF5CC',
        DEFAULT: '#FFB200',
      },
      grey: {
        400: '#F8F8F8',
        500: '#E4E4E4',
        DEFAULT: '#B9B8B8',
      },
      white: '#FFFFFF',
      black: {
        400: '#717171',
        DEFAULT: '#272727',
      },
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config