export function isWeixinBrowser() {
  return /micromessenger/i.test(navigator.userAgent)
}
/**
 * 清除对象中的空值（null、undefined、空字符串、空数组、空对象）
 * @param {Object} obj - 需要处理的对象
 * @returns {Object} 处理后的对象
 */
export function deteleEmetyVal(obj) {
  if (!obj || typeof obj !== 'object') return obj
  const result = {}
  for (const key in obj) {
    const value = obj[key]
    // 跳过空值
    if (value === null || value === undefined || value === '') continue
    // 处理数组
    if (Array.isArray(value)) {
      if (value.length > 0) {
        result[key] = value
      }
      continue
    }
    // 处理对象
    if (typeof value === 'object') {
      const cleanedObj = deteleEmetyVal(value)
      if (Object.keys(cleanedObj).length > 0) {
        result[key] = cleanedObj
      }
      continue
    }
    // 其他值直接保留
    result[key] = value
  }
  return result
}
/**
 * 获取浏览器环境信息
 * @returns {Object} 浏览器环境信息对象
 */
export function getBrowserInfo() {
  const u = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()

  return {
    // 内核检测
    trident: u.indexOf('trident') > -1, // IE内核
    presto: u.indexOf('presto') > -1, // opera内核
    webKit: u.indexOf('applewebkit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1, // 火狐内核

    // 设备检测
    ismobile: !!u.match(/applewebkit.*mobile.*/) || 'ontouchstart' in window, // 移动终端
    isIos: /ipad|iphone|ipod/.test(u) || (platform === 'macintel' && navigator.maxTouchPoints > 1), // ios终端
    isAndroid: u.indexOf('android') > -1 || u.indexOf('adr') > -1, // android终端
    isIPhone: u.indexOf('iphone') > -1, // 是否为iPhone
    isIPad: u.indexOf('ipad') > -1 || (platform === 'macintel' && navigator.maxTouchPoints > 1), // 是否iPad

    // 应用环境检测
    isWebApp: u.indexOf('safari') === -1, // 是否web应用
    isWeixin: u.indexOf('micromessenger') > -1, // 是否微信
    isQq: u.match(/\sqq/i) === ' qq', // 是否QQ
    isFlutter: u.indexOf('flutter') > -1, // 是否Flutter WebView

    // 系统信息
    islanguage: (navigator.browserLanguage || navigator.language).toLowerCase(), // 浏览器语言
    isplatform: platform, // 平台信息
    isuserAgent: u, // 完整的 userAgent

    // 版本信息
    iosVersion: (() => {
      const match = u.match(/os (\d+)_/)
      return match ? parseInt(match[1], 10) : null
    })(),
    androidVersion: (() => {
      const match = u.match(/android (\d+)/)
      return match ? parseInt(match[1], 10) : null
    })()
  }
}

export function formatDate(date) {
  const Y = date.getFullYear()
  const M = String(date.getMonth() + 1).padStart(2, '0')
  const D = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${Y}-${M}-${D} ${h}:${m}`
}

export function formatTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  // 获取月份，补零
  const month = String(date.getMonth() + 1).padStart(2, '0')
  // 获取日期，补零
  const day = String(date.getDate()).padStart(2, '0')
  // 获取小时，补零
  const hours = String(date.getHours()).padStart(2, '0')
  // 获取分钟，补零
  const minutes = String(date.getMinutes()).padStart(2, '0')
  // 获取星期
  const weekDay = weekDays[date.getDay()]
  return `${month}/${day} ${weekDay} ${hours}:${minutes}`
}
/**
 * 格式化日期为出发时间格式
 * @param {string} dateStr - 日期字符串，格式如：2025-06-19 17:50
 * @returns {string} 格式化后的字符串，格式如：6月19日 17:50 出发
 */
export function formatDepartureTime(dateStr) {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return ''

    // 获取月份（不补零）
    const month = date.getMonth() + 1
    // 获取日期（不补零）
    const day = date.getDate()
    // 获取小时（补零）
    const hours = String(date.getHours()).padStart(2, '0')
    // 获取分钟（补零）
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${month}月${day}日 ${hours}:${minutes} 出发`
  } catch (error) {
    console.error('日期格式化错误:', error)
    return ''
  }
}
/**
 * 判断多个 adcode 是否属于同省/同市
 * @param {Array<string|number>} adcodeList
 */
export function checkAdcodeList(adcodeList) {
  if (!Array.isArray(adcodeList) || adcodeList.length === 0) return
  const adcodes = adcodeList.map(code => String(code))
  const provinceSet = new Set(adcodes.map(code => code.slice(0, 2)))
  if (provinceSet.size === 1) {
    // 都在同一个省
    const citySet = new Set(adcodes.map(code => code.slice(0, 4)))
    if (citySet.size === 1) {
      // 都在同一个市
      return 'sameCity'
    } else {
      // 不在同一个市
      return 'notSameCity'
    }
  } else {
    // 有不在同一个省的
    return 'notSameProvince'
  }
}
// cookie pinia存储
export const cookieStorage = {
  getItem(key) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)')
    )
    try {
      // 增加 JSON.parse
      return matches ? JSON.parse(decodeURIComponent(matches[1])) : null
    } catch (e) {
      console.error('Cookie parse error:', e)
      return null
    }
  },
  setItem(key, value) {
    // 增加 JSON.stringify
    const stringValue = JSON.stringify(value)
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}; path=/; max-age=31536000`
  },
  removeItem(key) {
    document.cookie = `${encodeURIComponent(key)}=; path=/; max-age=0`
  }
}

/**
 * 智能数组去重方法
 * @param {Array} arr - 需要去重的数组
 * @returns {Array} 去重后的数组
 */
/**
 * 智能数组去重方法
 * @param {Array} arr - 需要去重的数组
 * @returns {Array} 去重后的数组
 */
export function uniqueArray(arr) {
  if (!Array.isArray(arr)) return arr

  // 判断数组的第一个非空元素类型
  const firstItem = arr.find(item => item !== null && item !== undefined)

  // 如果是基本类型数组或空数组，直接用Set去重
  if (!firstItem || typeof firstItem !== 'object') {
    return [...new Set(arr)]
  }

  // 如果是对象数组，自动查找可用于去重的键
  // 优先使用 id、_id、uid 等常用唯一标识
  const possibleKeys = ['id', '_id', 'uid', 'key', 'code']
  const key = possibleKeys.find(k => Object.prototype.hasOwnProperty.call(firstItem, k))

  // 如果没找到合适的键，则使用对象的所有值组合作为唯一标识
  if (!key) {
    const seen = new Set()
    return arr.filter(item => {
      if (!item || typeof item !== 'object') return true
      const values = JSON.stringify(item)
      if (seen.has(values)) {
        return false
      }
      seen.add(values)
      return true
    })
  }

  // 使用找到的键进行去重
  const seen = new Map()
  return arr.filter(item => {
    if (!item || typeof item !== 'object') return true
    const val = item[key]
    if (seen.has(val)) {
      return false
    }
    seen.set(val, true)
    return true
  })
}

/**
 * @description: 从 'YYYY-MM-DD HH:mm:ss' 格式的字符串中提取日期部分 'YYYY-MM-DD'
 * @param {string} dateTimeString - 完整的日期时间字符串
 * @returns {string} - 只包含日期的字符串
 */
export function shortTime(dateTimeString) {
  if (!dateTimeString || typeof dateTimeString !== 'string') {
    return ''
  }
  return dateTimeString.split(' ')[0]
}

export function shortmoreTime(value) {
  if (!value) {
    return ''
  }

  let date
  // 检查输入是数字时间戳、字符串时间戳还是日期字符串
  if (typeof value === 'number' || (typeof value === 'string' && /^\d+$/.test(value))) {
    date = new Date(Number(value))
  } else if (typeof value === 'string') {
    // 兼容iOS，将 YYYY-MM-DD 的格式转换为 YYYY/MM/DD
    date = new Date(value.replace(/-/g, '/'))
  } else {
    // 尝试直接作为Date对象处理
    date = new Date(value)
  }

  // 检查Date对象是否有效
  if (isNaN(date.getTime())) {
    return '' // 如果无法解析，返回空字符串
  }

  const Y = date.getFullYear()
  const M = String(date.getMonth() + 1).padStart(2, '0')
  const D = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')

  return `${Y}-${M}-${D} ${h}:${m}`
}

/**
 * 判断两个时间是否不在同一天
 * @param {string|number|Date} time1
 * @param {string|number|Date} time2
 * @returns {boolean} 不在同一天返回true，在同一天返回false
 */
export function isNotSameDay(time1, time2) {
  if (!time1 || !time2) return true
  let date1, date2
  if (typeof time1 === 'number' || (typeof time1 === 'string' && /^\d+$/.test(time1))) {
    date1 = new Date(Number(time1))
  } else if (typeof time1 === 'string') {
    date1 = new Date(time1.replace(/-/g, '/'))
  } else {
    date1 = new Date(time1)
  }
  if (typeof time2 === 'number' || (typeof time2 === 'string' && /^\d+$/.test(time2))) {
    date2 = new Date(Number(time2))
  } else if (typeof time2 === 'string') {
    date2 = new Date(time2.replace(/-/g, '/'))
  } else {
    date2 = new Date(time2)
  }
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return true
  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  )
}

/**
 * 判断传入的时间是否在当前时间之前
 * @param {string|number|Date} time
 * @returns {boolean} 在当前时间之前返回true，否则返回false
 */
export function isBeforeNow(time) {
  if (!time) return false
  let date
  if (typeof time === 'number' || (typeof time === 'string' && /^\d+$/.test(time))) {
    date = new Date(Number(time))
  } else if (typeof time === 'string') {
    date = new Date(time.replace(/-/g, '/'))
  } else {
    date = new Date(time)
  }
  if (isNaN(date.getTime())) return false
  return date.getTime() < Date.now()
}
/**
 * 验证第二个时间是否有效（不早于当前时间，且不早于第一个时间参数）
 * @param {string|number|Date} startTime - 开始时间，可以是时间戳、日期字符串或Date对象
 * @param {string|number|Date} endTime - 结束时间，可以是时间戳、日期字符串或Date对象
 * @returns {boolean} - 如果endTime有效（晚于当前时间且不早于startTime）返回true，否则返回false
 */
export function isValidFutureTime(startTime, endTime) {
  // console.log('原始输入:', startTime, endTime)

  // 处理输入参数
  const parseTime = (time) => {
    if (!time) return null
    let date

    try {
      if (typeof time === 'number' || (typeof time === 'string' && /^\d+$/.test(time))) {
        // 处理时间戳
        date = new Date(Number(time))
      } else if (typeof time === 'string') {
        // 处理日期字符串
        let normalizedTime = time

        // 补全秒部分（如果缺失）
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(time)) {
          normalizedTime += ':00'
        }

        // 尝试解析
        date = new Date(normalizedTime)

        // 如果 ISO 格式解析失败，尝试替换破折号
        if (isNaN(date.getTime())) {
          date = new Date(normalizedTime.replace(/-/g, '/'))
        }
      } else if (time instanceof Date) {
        // 直接使用 Date 对象
        date = time
      } else {
        return null
      }

      // 检查解析结果
      if (isNaN(date.getTime())) {
        console.error('无效时间格式:', time)
        return null
      }

      // console.log(`解析时间 "${time}" -> "${date.toISOString()}" (本地时间: ${date.toLocaleString()})`)
      return date
    } catch (error) {
      console.error('时间解析错误:', error)
      return null
    }
  }

  const startDate = parseTime(startTime)
  const endDate = parseTime(endTime)

  // 检查时间格式是否有效
  if (!startDate || !endDate) {
    // console.log('开始时间或结束时间无效')
    return false
  }

  // 核心逻辑：比较 endTime 是否晚于 startTime
  const isValid = endDate.getTime() > startDate.getTime()
  // console.log(`时间比较结果: ${isValid ? 'endTime > startTime' : 'endTime <= startTime'}`)

  return isValid
}
/**
 * 超过120分钟转为小时，保留整数，否则返回原分钟数
 * @param {number} minutes
 * @returns {string|number} 例如 130 => '2小时'，90 => '90分钟'
 */
export function formatMinutesToHour(minutes) {
  if (typeof minutes !== 'number' || isNaN(minutes)) return ''
  if (minutes > 120) {
    return `<span style="color: #FF0000">${Math.floor(minutes / 60)}</span>小时`
  }
  return `<span style="color: #FF0000">${minutes}</span>分钟`
}
/**
 * 检测是否在微信小程序WebView环境
 * 只在小程序WebView下返回true，微信浏览器等其他环境返回false
 * @returns {boolean}
 */
export function isWeixinMiniProgramWebView() {
  // 1. 微信小程序WebView会注入 window.__wxjs_environment === 'miniprogram'
  if (typeof window !== 'undefined' && window.__wxjs_environment === 'miniprogram') {
    return true
  }
  // 2. 微信小程序新版webview环境会注入 wx.miniProgram
  // eslint-disable-next-line no-undef
  if (typeof window !== 'undefined' && typeof wx !== 'undefined' && wx.miniProgram) {
    return true
  }
  // 3. userAgent 里有 'miniprogram'（部分安卓小程序webview会有）
  if (typeof navigator !== 'undefined' && /miniprogram/i.test(navigator.userAgent)) {
    return true
  }
  // 其他情况（包括微信浏览器）都为false
  return false
}
