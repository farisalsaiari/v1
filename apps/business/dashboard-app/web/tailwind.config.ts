export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../../packages/ui-shared/**/*.{js,ts,jsx,tsx}',
    './index.html',
    '!./node_modules/**/*'
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        "fade-slide": {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        "fade-slide": 'fade-slide 0.4s ease-out forwards',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        'opacity-transform': 'opacity, transform',
      },
    },
  },
  plugins: [],
};
