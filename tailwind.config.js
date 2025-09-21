/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210 10% 95%)',
        foreground: 'hsl(210 15% 30%)',
        primary: 'hsl(142 60% 45%)',
        accent: 'hsl(200 80% 55%)',
        surface: 'hsl(0 0% 100%)',
        muted: 'hsl(210 10% 85%)',
        border: 'hsl(210 10% 85%)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 15%, 30%, 0.08)',
        'modal': '0 16px 48px hsla(210, 15%, 30%, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
