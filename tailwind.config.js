/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0faf8",
          100: "#d0f0ea",
          200: "#a2e1d6",
          300: "#6dcac0",
          400: "#3eada4",
          500: "#2D7D6F",
          600: "#246259",
          700: "#1c4c45",
          800: "#143832",
          900: "#0d2620",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#F59E0B",
          600: "#d97706",
        },
        cream: "#FDF8F0",
        "warm-gray": "#6B6560",
      },
      fontFamily: {
        display: ["Merriweather", "Georgia", "serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(45, 125, 111, 0.12)",
        "warm-lg": "0 8px 40px rgba(45, 125, 111, 0.18)",
        card: "0 2px 16px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
