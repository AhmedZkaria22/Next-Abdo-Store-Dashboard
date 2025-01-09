/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors:{
        asd_primary: '#3454d1',
        asd_white: '#fff',
        asd_black: '#283c50',
      },
      backgroundImage:{
        asd_black_prev_arrow: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%283c50'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")`,
        asd_black_next_arrow: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%283c50'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")`
      },
      backgroundSize:{
        asd_75: '75%'
      },
      width:{
        asd_calc_100P_72px: 'calc(100% - 72px)'
      },
      maxWidth:{
        asd_calc_50P_0_5rem: 'calc(50% - 0.5rem)',
        asd_calc_100P_72px: 'calc(100% - 72px)'
      }
    },
  },
  plugins: [],
}

