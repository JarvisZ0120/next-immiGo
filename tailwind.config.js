/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maple: {
          DEFAULT: "#d80621",
          deep: "#b1051a",
          soft: "#fff0f2",
        },
        boreal: {
          DEFAULT: "#0d9488",
          soft: "#ecfdf8",
        },
        apple: {
          blue: "#0071e3",
          "blue-hover": "#0077ed",
          gray: {
            50: "#f5f5f7",
            100: "#e8e8ed",
            200: "#d2d2d7",
            400: "#86868b",
            500: "#6e6e73",
            900: "#1d1d1f",
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        apple:
          "0 2px 16px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "apple-lg":
          "0 12px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        maple:
          "0 10px 40px -12px rgba(216, 6, 33, 0.35), 0 4px 14px -6px rgba(13, 148, 136, 0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
