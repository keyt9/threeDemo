import { createRouter, createWebHistory } from 'vue-router'
import RouterModule from '@/router/Modules/index.js' // 引入业务逻辑模块
import RouterCommon from '@/router/Common/index.js' // 引入通用模块

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...RouterCommon,
    ...RouterModule
  ]
})
export default router
