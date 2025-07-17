import axios from 'axios'
import { isWeixinMiniProgramWebView } from './index'
// 百度地图定位工具函数
export const getCurrentCity = () => {
  return new Promise((resolve, reject) => {
    // 检查是否已经加载百度地图API
    if (!window.BMap && !isWeixinMiniProgramWebView()) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = ``
      document.head.appendChild(script)
    }

    // 定义回调函数
    window.initBMap = () => {
      // // 先尝试使用浏览器原生定位
      useBaiduLocation()
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     (position) => {
      //       const point = new window.BMap.Point(position.coords.longitude, position.coords.latitude)
      //       const myGeo = new window.BMap.Geocoder()
      //       myGeo.getLocation(point, (res) => {
      //         if (res) {
      //           resolve({
      //             city: res.addressComponents.city,
      //             district: res.addressComponents.district,
      //             province: res.addressComponents.province
      //           })
      //         } else {
      //           // 如果原生定位失败，尝试使用百度定位
      //           // useBaiduLocation()
      //         }
      //       })
      //     },
      //     // 如果原生定位失败，尝试使用百度定位
      //     (error) => {
      //       console.log(error, 'error')
      //       if (!isWeixinMiniProgramWebView()) {
      //         useBaiduLocation()
      //       } else {
      //         resolve({
      //           city: '深圳市',
      //           district: '南山区',
      //           province: '广东省'
      //         })
      //       }
      //     },
      //     {
      //       enableHighAccuracy: true,
      //       timeout: 5000,
      //       maximumAge: 0
      //     }
      //   )
      // } else {
      //   // 如果浏览器不支持原生定位，使用百度定位
      //   useBaiduLocation()
      // }
    }

    // 使用百度定位的辅助函数
    function useBaiduLocation() {
      const geolocation = new window.BMap.Geolocation()
      geolocation.enableHighAccuracy = true
      geolocation.timeout = 5000
      geolocation.maximumAge = 0
      geolocation.getCurrentPosition((result) => {
        if (geolocation.getStatus() === window.BMAP_STATUS_SUCCESS) {
          const myGeo = new window.BMap.Geocoder()
          myGeo.getLocation(result.point, (res) => {
            if (res) {
              resolve({
                city: res.addressComponents.city,
                district: res.addressComponents.district,
                province: res.addressComponents.province,
                currentSelect: [res.addressComponents.province, res.addressComponents.city],
                islocation: true
              })
            } else {
              // 如果获取城市信息失败，返回默认城市
              console.warn('获取城市信息失败，使用默认城市：深圳市')
              resolve({
                city: '深圳市',
                district: '南山区',
                province: '广东省',
                currentSelect: ['广东省', '深圳市'],
                islocation: true
              })
            }
          })
        } else {
          const status = geolocation.getStatus()
          let errorMsg = '定位失败'
          switch (status) {
            case window.BMAP_STATUS_PERMISSION_DENIED:
              errorMsg = '定位权限被拒绝'
              break
            case window.BMAP_STATUS_TIMEOUT:
              errorMsg = '定位超时'
              break
            case window.BMAP_STATUS_NETWORK_ERROR:
              errorMsg = '网络错误'
              break
            case window.BMAP_STATUS_UNKNOWN_ERROR:
              errorMsg = '未知错误'
              break
          }
          console.warn(`${errorMsg}，使用默认城市：深圳市`)
          // 定位失败时返回默认城市，而不是reject
          resolve({
            city: '深圳市',
            district: '南山区',
            province: '广东省',
            currentSelect: ['广东省', '深圳市'],
            islocation: true
          })
        }
      })
    }

    // 如果百度地图API加载失败，也返回默认城市
    const timeout = setTimeout(() => {
      console.warn('百度地图API加载超时，使用默认城市：深圳市')
      resolve({
        city: '深圳市',
        district: '南山区',
        province: '广东省',
        currentSelect: ['广东省', '深圳市'],
        islocation: true
      })
    }, 10000) // 10秒超时

    // 清理超时定时器
    const originalResolve = resolve
    resolve = (data) => {
      clearTimeout(timeout)
      originalResolve(data)
    }
  })
}

// 地址提示功能（使用百度 Place Suggestion API）
export const getAddressSuggestions = async (keyword, city = '深圳市') => {
  const ak = ''
  const url = `/baidu/place/v2/suggestion?query=${keyword}&region=${city}&city_limit=true&output=json&ak=${ak}`
  try {
    const res = await axios.get(url)
    const data = res.data
    if (data.status === 0 && Array.isArray(data.result)) {
      return data.result.map(item => ({
        title: item.name,
        address: item.address,
        city: item.city,
        district: item.district || '',
        point: item.location,
        Adcode: item.adcode
      }))
    } else {
      return []
    }
  } catch (e) {
    console.error('地址联想接口调用失败', e)
    return []
  }
}
export const getTimeDistance = async (origin, destination, waypoints) => {
  const ak = ''
  const url = `/baidu/direction/v2/driving?origin=${origin}&destination=${destination}&ak=${ak}&waypoints=${waypoints}`
  try {
    const res = await axios.get(url)
    const data = res.data
    return data
    // if (data.status === 0 && Array.isArray(data.result)) {
    //   return data.result.map(item => ({
    //     title: item.name,
    //     address: item.address,
    //     city: item.city,
    //     district: item.district || '',
    //     point: item.location
    //   }))
    // } else {
    //   return []
    // }
  } catch (e) {
    console.error('地址联想接口调用失败', e)
    return []
  }
}
