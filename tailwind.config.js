/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          ".btn-color-1": {
            "background-color": "#579DF4",
            "border-color": "#579DF4",
            color: "#f8f8ff",
          },
          ".btn-color-1:hover": {
            "background-color": "#1F73DA",
            "border-color": "#1F73DA",
            color: "#f8f8ff",
          },
          ".btn-color-2": {
            "background-color": "#E5429E",
            "border-color": "#E5429E",
            color: "#f8f8ff",
          },
          ".btn-color-2:hover": {
            "background-color": "#B72477",
            "border-color": "#B72477",
            color: "#f8f8ff",
          },
          ".btn-color-3": {
            "background-color": "#82BF20",
            "border-color": "#82BF20",
            color: "#f8f8ff",
          },
          ".btn-color-3:hover": {
            "background-color": "#699621",
            "border-color": "#699621",
            color: "#f8f8ff",
          },
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          ".btn-color-1": {
            "background-color": "#226CC8",
            "border-color": "#226CC8",
            color: "#f8f8ff",
          },
          ".btn-color-1:hover": {
            "background-color": "#2078E3",
            "border-color": "#2078E3",
            color: "#f8f8ff",
          },
          ".btn-color-2": {
            "background-color": "#EF1A84",
            "border-color": "#EF1A84",
            color: "#f8f8ff",
          },
          ".btn-color-2:hover": {
            "background-color": "#F6459E",
            "border-color": "#F6459E",
            color: "#f8f8ff",
          },
          ".btn-color-3": {
            "background-color": "#34B534",
            "border-color": "#34B534",
            color: "#f8f8ff",
          },
          ".btn-color-3:hover": {
            "background-color": "#34C634",
            "border-color": "#35CE35",
            color: "#f8f8ff",
          },
        },
      },
    ],
  },
};
