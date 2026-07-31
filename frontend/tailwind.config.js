/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0f172a',
        'primary-blue': '#3b82f6',
        'primary-blue-hover': '#2563eb',
        'primary-gray': '#f8fafc',
        'border-gray': '#e2e8f0',
        'text-main': '#1e293b',
        'text-light': '#64748b'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
