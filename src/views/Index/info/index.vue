<template>
  <div class="flex justify-center items-center h-full w-full">
    <div ref="threeContainer" class="w-full h-full" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Vue ref 用于获取DOM容器
const threeContainer = ref(null)

// Three.js 相关变量
let scene, camera, renderer, cube, controls

// 初始化Three.js场景
const initThreeJS = () => {
  // 获取容器尺寸
  const width = threeContainer.value.clientWidth
  const height = threeContainer.value.clientHeight

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x222222) // 设置背景色

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(5, 3, 5) // 调整到斜角位置，可以看到三个轴
  camera.lookAt(0, 0, 0) // 让相机看向原点

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // 将渲染器DOM元素添加到Vue组件的容器中
  threeContainer.value.appendChild(renderer.domElement)

  // 添加轨道控制器，允许鼠标控制相机
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // 启用阻尼效果
  controls.dampingFactor = 0.05 // 阻尼系数
  controls.enableZoom = true // 启用缩放
  controls.enableRotate = true // 启用旋转
  controls.enablePan = true // 启用平移

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)

  // 光源辅助观察
  const pointLight = new THREE.PointLight(0xffffff, 1, 100)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
  scene.add(pointLightHelper)

  // 添加方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10)
  scene.add(directionalLightHelper)

  // 添加坐标轴辅助器 (红色X轴，绿色Y轴，蓝色Z轴)
  const axesHelper = new THREE.AxesHelper(5) // 增加坐标轴长度为5，更容易看到
  scene.add(axesHelper)

  // 创建一个立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff // 设置材质颜色
    // transparent: true, // 开启透明
    // opacity: 0.5 // 设置透明度
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 开始渲染循环
  animate()
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)

  // 更新轨道控制器
  if (controls) {
    controls.update()
  }

  // 旋转立方体
  if (cube) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  // 渲染场景
  renderer.render(scene, camera)
}

// 处理窗口大小变化
const handleResize = () => {
  if (!threeContainer.value || !camera || !renderer) return

  const container = threeContainer.value
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 清理Three.js资源
const cleanup = () => {
  if (controls) {
    controls.dispose()
  }

  if (renderer) {
    const container = threeContainer.value
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
    renderer.dispose()
  }

  if (scene) {
    // 清理场景中的几何体和材质
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
}

onMounted(() => {
  nextTick(() => {
    initThreeJS()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cleanup()
})
</script>

<style scoped>
/* 确保容器占满父元素 */
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>
