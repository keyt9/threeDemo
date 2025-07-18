import { defineStore } from 'pinia'
export const useDictStore = defineStore('dictionary', () => {
  // 定义管理用户数据的state
  // 以对象的形式把state和action return出去
  return { }
}, {
  persist: true
}
)
