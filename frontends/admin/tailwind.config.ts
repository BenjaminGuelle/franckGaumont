import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: {
      primary: {
        50: '#f1f4f1',
        100: '#e2e9e3',
        200: '#c6d2c8',
        300: '#a9bcac',
        400: '#8da591',
        500: '#708f75',
        DEFAULT: '#5a725e',
        700: '#435646',
        800: '#2d392f',
        900: '#161d17',
        950: '#0b0e0c',
      },
      secondary: {
        50: '#f1f3f4',
        100: '#e2e7e9',
        200: '#c6ced2',
        DEFAULT: '#a9b6bc',
        400: '#8d9ea5',
        500: '#70868f',
        600: '#5a6b72',
        700: '#435056',
        800: '#2d3539',
        900: '#161b1d',
        950: '#0b0d0e',
      },
      accent: {
        50: '#f1f2f4',
        100: '#e2e5e9',
        200: '#c6cad2',
        300: '#a9b0bc',
        400: '#8d96a5',
        DEFAULT: '#707b8f',
        600: '#5a6372',
        700: '#434a56',
        800: '#2d3139',
        900: '#16191d',
        950: '#0b0c0e',
      },
      grey: {
        DEFAULT: '#B9B8B8',
      },
      white: '#F5F7F5',
      black: '#101511',
      red: {
        100: '#28110b',
        200: '#502316',
        300: '#783421',
        DEFAULT: '#a0452c',
        500: '#c85637',
        600: '#d3785f',
        700: '#de9a87',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;