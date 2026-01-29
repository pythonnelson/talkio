/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1877F2",
          light: "#468CF2",
          dark: "#0E51B0",
          soft: "#6AA7F7",
        },
        surface: {
          DEFAULT: "#1A1A1D",
          light: "#2D2D30",
          dark: "#0D0D0F",
          card: "#242428",
        },
        foreground: "#FFFFFF",
        "muted-foreground": "#A0A0A5",
        "subtle-foreground": "#6B6B70",
      },
    },
  },
  plugins: [],
};
