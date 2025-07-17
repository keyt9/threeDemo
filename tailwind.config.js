/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        // 颜色自定义
        primary: '#fff',
        secondary: '#f5f5f5'
      },
      fontSize: {
        // 字体大小自定义
        basefontsize: '14px',
        h1fontsize: '22px'
      }
    }
  },
  plugins: []
}
