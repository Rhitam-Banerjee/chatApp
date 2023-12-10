/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEF0F2",
        secondary: "#ECEBE4",
        tertiary: "#DADDD8",
        highlight: "#1C1C1C",
        highlight2: "#FE5F55",
        primary_transparent: "rgba(238, 240, 242, 1)",
        secondary_transparent: "rgba(236, 235, 228, 1)",
        tertiary_transparent: "rgba(218, 221, 216, 1)",
        highlight_transparent: "rgba(28, 28, 28, 0.5)",
        highlight2_transparent: "rgba(254, 95, 85, 0.5)",
      },
      screens: {
        xs: { max: "450px" },
        sm: { max: "640px" },
      },
    },
  },
  plugins: [],
};
