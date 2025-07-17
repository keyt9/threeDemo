<template>
  <RouterView />
</template>

<script setup>
import { useDictStore } from '@/stores/dictionary.js'
import { useCityDictionaryStore } from '@/stores/citydictionary.js'
const cityDictionaryStore = useCityDictionaryStore()
const dictStore = useDictStore()
// 地区字典
cityDictionaryStore.getDictList({ m_IN_level: [1, 2], extFieldNames: 'parentId' })
// 所有字典
dictStore.ALLdict()
</script>

<style lang="scss">
.Bmap_cpyCtrl,
.anchorBL {
  display: none;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: auto;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);

}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  // font-family: "普惠字体";
  // font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
  // font-family: "SimHei", "PingFang SC", "WenQuanYi Micro Hei", sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100%;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
}

html {
  height: 100%;
  overflow-y: scroll;
  // font-family: "SimHei", "PingFang SC", "WenQuanYi Micro Hei", sans-serif;
}
.vc-switch {
  bottom: 50px;
}
</style>
