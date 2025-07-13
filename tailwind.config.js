/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using cooler white tones with slight blue hints for the gradient
        "gradient-1-start": "oklch(0.94 0.03 250)",  // Light cool bluish white
        "gradient-1-end": "oklch(0.99 0.01 240)",    // Almost pure white with cool tone
        // We'll leave the other gradients in case we need them later
        "gradient-2-start": "oklch(0.62 0.3 229)",
        "gradient-2-end": "oklch(0.73 0.24 269)",
        "gradient-3-start": "oklch(0.69 0.28 179)",
        "gradient-3-end": "oklch(0.62 0.3 211)",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "gradient-text": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-background-1": {
          "0%, 16.667%, 100%": {
            opacity: "1",
          },
          "33.333%, 83.333%": {
            opacity: "0.8",
          },
        },
        "gradient-foreground-1": {
          "0%, 16.667%, 100%": {
            opacity: "1",
          },
          "33.333%, 83.333%": {
            opacity: "0.8",
          },
        },
        "gradient-background-2": {
          "0%, 16.667%, 66.667%, 100%": {
            opacity: "0",
          },
          "33.333%, 50%": {
            opacity: "1",
          },
        },
        "gradient-foreground-2": {
          "0%, 16.667%, 66.667%, 100%": {
            opacity: "0",
          },
          "33.333%, 50%": {
            opacity: "1",
          },
        },
        "gradient-background-3": {
          "0%, 50%, 100%": {
            opacity: "0",
          },
          "66.667%, 83.333%": {
            opacity: "1",
          },
        },
        "gradient-foreground-3": {
          "0%, 50%, 100%": {
            opacity: "0",
          },
          "66.667%, 83.333%": {
            opacity: "1",
          },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "gradient-text": "gradient-text 3s ease infinite",
        "gradient-background-1": "gradient-background-1 5s infinite",
        "gradient-foreground-1": "gradient-foreground-1 5s infinite",
        "gradient-background-2": "gradient-background-2 5s infinite",
        "gradient-foreground-2": "gradient-foreground-2 5s infinite",
        "gradient-background-3": "gradient-background-3 5s infinite",
        "gradient-foreground-3": "gradient-foreground-3 5s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}; 