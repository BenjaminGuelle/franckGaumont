import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      xs: '0.9996rem',
      sm: '0.75rem',
      md: '0.875rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2.1875rem',
      '5xl': '3.875rem',
    },
    colors: {
      primary: '#000000',
      secondary: {
        100: '#D9484A',
        DEFAULT: '#BA181B',
        300: '#A31518',
        400: '#65160E',
      },
      accent: {
        DEFAULT: '#FFEA2C',
        200: '#DFCD27',
      },
      grey: {
        100: '#E5E9EE',
        DEFAULT: '#B9B8B8',
        300: '#C7C7C7',
        400: '#C1C1C1',
      },
      white: '#FFFFFF',
      blue: '#03091F',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'infinite-scroll': 'infinite-scroll 50s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config