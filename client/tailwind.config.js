/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        /* 'primary': '#00598e',
        'secondary': '#0bb3a8', */
        'primary': '#0E588F',
        'primaryHover': '#0a3c62',
        'secondary': '#08A39F',
        'background': '#FCFAF9',
        'accent': '#5FB49C',
        'text': '#07020D',
        'muted': '#F1EFEF'
      },
      fontFamily: {
        lato: ['Lato'],
        poppins: ['Poppins'],
        bebas: ['Bebas Neue']
      }
    },
  },
  plugins: [
    flowbite.plugin(),  // Flowbite plugin (esto es con ESM en vez de require)
  ],
}
