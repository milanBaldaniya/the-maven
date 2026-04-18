  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#0F3D2E',
            dark: '#07201A',
            light: '#1A5C44',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#E8C84A',
            muted: '#B8952E',
          },
          bg: {
            dark: '#060D08',
            card: '#0C2B1F',
            card2: '#0F3020',
          },
          foreground: {
            DEFAULT: '#F5F0E8',
            muted: '#B8A98C',
          },
        },
        fontFamily: {
          display: ['Fraunces', 'serif'],
          sans: ['DM Sans', 'sans-serif'],
        },
        borderRadius: {
          '4xl': '2rem',
          '5xl': '2.5rem',
          '6xl': '3rem',
        },
        animation: {
          'blob-float': 'blobFloat 12s ease-in-out infinite',
          'blob-float-2': 'blobFloat2 15s ease-in-out infinite',
          'shimmer': 'shimmer 3s ease-in-out infinite',
          'float-badge': 'floatBadge 4s ease-in-out infinite',
          'gold-pulse': 'goldPulse 3s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  };