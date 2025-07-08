/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Pastikan path ini benar
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Jika pakai App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "bg-primary": "#000000",
        "bg-secondary": "#0c0d14",
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.7)",
        accent: "#3399FF",
      },
      animation: {
        "star-move": "star-move 200s linear infinite",
        "star-move-fast": "star-move 100s linear infinite",
        "bounce-custom": "bounce-custom 2s ease-in-out infinite",
      },
      keyframes: {
        "star-move": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100vh)" },
        },
        "bounce-custom": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
