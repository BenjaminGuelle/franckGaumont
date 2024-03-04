import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}'
	],
  prefix: "",
  theme: {
    colors: {
      primary: {
        50: '#ebf3f9',
        100: '#d8e6f3',
        200: '#b0cee8',
        300: '#89b5dc',
        400: '#629dd0',
        500: '#3b84c4',
        DEFAULT: '#2f6a9d',
        700: '#234f76',
        800: '#17354f',
        900: '#0c1a27',
        950: '#060d14',
      },
      secondary: {
        50: '#fbeaea',
        100: '#f7d4d4',
        200: '#efa9a9',
        300: '#e77e7e',
        400: '#de5454',
        500: '#d62929',
        DEFAULT: '#ab2121',
        700: '#811818',
        800: '#561010',
        900: '#2b0808',
        950: '#150404',
      },
      accent: {
        50: '#f2f2f2',
        100: '#e6e5e5',
        200: '#cdcbcb',
        300: '#b3b2b2',
        400: '#9a9898',
        500: '#817e7e',
        DEFAULT: '#676565',
        700: '#4d4c4c',
        800: '#343232',
        900: '#1a1919',
        950: '#0d0d0d',
      },
      grey: {
        DEFAULT: '#B9B8B8',
      },
      white: '#F5F7F5',
      black: '#210302',
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config