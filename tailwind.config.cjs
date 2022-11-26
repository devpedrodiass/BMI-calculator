/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        opacityChange: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-10%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        slideUp: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-10%)',
          },
        },
        slideDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        opacityChange: 'opacityChange .4s ease-in-out',
        slideLeft: 'slideLeft 0.8s ease-in-out',
        slideDown: 'slideDown 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
}
