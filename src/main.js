import './assets/css/main.css' // tailwindcss
import './assets/css/reset.css' // 初始化
import 'virtual:svg-icons-register' // svg图标
import './styles/animations.scss' // 动画效果
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { throttlePlugin } from '@/directive/index.js'
import 'swiper/element/bundle' // swiper webcomponent导入
// 注册 swiper 的自定义元素 web components
import { register } from 'swiper/element/bundle'
register()
// import { preventDuplication } from '@/util/instruction.js'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(throttlePlugin)
app.mount('#app')
