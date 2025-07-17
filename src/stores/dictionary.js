import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getByDictType, getALLdict } from '@/api/skuInfo/index.js'
import { showToast } from 'vant'
import { cookieStorage } from '@/utils/index.js'
export const useDictStore = defineStore('dictionary', () => {
  // 定义管理用户数据的state
  const dictList = ref({})
  const allDictList = ref([])
  // 定义获取接口数据的action函数
  async function getDictList(data) {
    const res = await getByDictType(data)
    if (res.data.code === 0) {
      dictList.value = res.data.data
    } else {
      showToast(res.data.msg)
    }
  }
  function $reset() {
    dictList.value = {}
    allDictList.value = []
  }
  async function ALLdict(data) {
    const res = await getALLdict(data)
    if (res.data.code === 0) {
      allDictList.value = res.data.data
    } else {
      showToast(res.data.msg)
    }
  }
  // 以对象的形式把state和action return出去
  return { allDictList, dictList, getDictList, ALLdict, $reset }
}, {
  persist: {
    storage: cookieStorage
  }
}
)
