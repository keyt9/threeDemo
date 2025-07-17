// 获取cookie
export function getCookie(name) {
  const arr = document.cookie.split('; ')
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].split('=')
    if (item[0] === name) return decodeURIComponent(item[1])
  }
  return ''
}
// 存放cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie =
    c_name +
    '=' +
    encodeURIComponent(value) +
    ';expires=' +
    exdate.toUTCString() +
    ';path=/;SameSite=Lax'
}
// 检查cookie
export function checkCookie(c_name) {
  const username = getCookie(c_name)
  if (username !== null && username !== '') {
    return true
  } else {
    return false
  }
}
// 清除cookie
export function clearCookie(name) {
  setCookie(name, '', -1)
}

export function parseUrlParams(url) {
  try {
    const urlObj = new URL(url)
    const params = {}
    const searchParams = new URLSearchParams(urlObj.search)

    // 遍历所有参数
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }

    return params
  } catch (error) {
    console.error('URL解析错误:', error)
    return {}
  }
}
