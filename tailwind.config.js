/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    color: {
      yellow:'rgb(255,249,237)',
      pink:'rgb(255,228,228)',
      red:'rgb(255,164,164)',
    },
    fontFamily:{
      'rubik': ['Rubik Mono One', 'monospace'],
      'prompt': ['Prompt', 'sans-serif'],
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
  },
  plugins: [],
};
