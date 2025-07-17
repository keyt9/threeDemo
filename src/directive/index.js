// 节流插件
export const throttlePlugin = {
  install(app) {
    app.directive('throttle', {
      mounted(el, binding) {
        const { throttleTime = 1000 } = binding.value || {}
        let timer
        let disable = false
        el.addEventListener(
          'click',
          (event) => {
            if (timer) {
              clearTimeout(timer)
            }
            if (!disable) {
              disable = true
            } else {
              event && event.stopImmediatePropagation()
            }
            timer = setTimeout(() => {
              timer = null
              disable = false
            }, throttleTime)
          },
          true
        )
      }
    })
  }
}
