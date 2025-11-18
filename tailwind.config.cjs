/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D4954',
          50: '#E6F0F2',
          100: '#CCE1E5',
          200: '#99C3CB',
          300: '#66A5B1',
          400: '#338797',
          500: '#0D4954',
          600: '#0A3A43',
          700: '#082C32',
          800: '#051D22',
          900: '#020F11',
          950: '#01090B',
        },
        secondary: {
          DEFAULT: '#f37124',
          50: '#FEF5F0',
          100: '#FDEBE1',
          200: '#FBD7C3',
          300: '#F9C3A5',
          400: '#F7AF87',
          500: '#f37124',
          600: '#C25A1D',
          700: '#924416',
          800: '#612D0E',
          900: '#311707',
        },
        accent: {
          DEFAULT: '#f5b21a',
          50: '#FEF9E7',
          100: '#FDF3CF',
          200: '#FBE79F',
          300: '#F9DB6F',
          400: '#F7CF3F',
          500: '#f5b21a',
          600: '#C48E15',
          700: '#936B10',
          800: '#62470A',
          900: '#312405',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-in both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'bounce-slow': 'bounce 2s infinite',
        'scroll': 'scroll 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '50%': { transform: 'translate(-50%, -50%) rotate(180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
          '100%': { opacity: '0', transform: 'translateX(-50%) translateY(20px)' },
        },
      },
    },
  },
  plugins: [],
}

