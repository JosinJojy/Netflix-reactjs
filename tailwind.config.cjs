/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '2200px',
    },
    extend: {
      padding:{
        '85vh': '85vh',
        '50vh': '50vh',
      },
      spacing:{
        '40rem': "40rem",
        '45rem': "45rem",
        '55rem': "55rem",
        '63rem': "63rem",
        '70rem': "70rem",
        
      },
      width:{
        '96%' :"96%",
      },
      background:{
        'avengers': "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)),url()",
        'fadeBottom': "linear-gradient(180deg,hsl(0deg 0% 0% / 0%),#000000a2,hsl(0deg 0% 7%));",
        'fadeBlack': "background: linear-gradient(1turn,hsl(0deg 0% 0% / 60%),hsl(0deg 0% 0% / 0%) 65%);",
        'fadeRed' : "linear-gradient(90deg, hsl(0deg 77% 42% / 44%) 0%, hsl(0deg 59% 46% / 51%) 35%, hsl(220deg 26% 44% / 0%) 100%) "
      },
      color:{
        'black': "#010511",
        'transparenWhite': "#33333380",
        'transparentBlack': "#000000bf"
      },
      margin:{
        '-6%': "-6%",
        '50%': "50%",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-textshadow'),
  ],
}
