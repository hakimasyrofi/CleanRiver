/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
    		'green': '#008379',
        'green-900': '#01a094'
    	},
      backgroundImage: {
        'hero-pattern': "url('https://www.nowbali.co.id/wp-content/uploads/2020/07/Sungai-Watch-Ayung-River-by-Make-a-Change-World-1.jpg')",
      }
    },
  },
  plugins: [],
}