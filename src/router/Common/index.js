export default [
  // 首页
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/Index/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Index/info/index.vue')
      }
    ]
  }
]

