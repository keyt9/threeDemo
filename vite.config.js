import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus 按需
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// gzip 压缩
import compression from 'vite-plugin-compression'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// svg 图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default defineConfig(({ command, mode }) => {
  const isDev = mode === 'development'
  const isProd = mode === 'production'
  const config = loadEnv(mode, './')
  return {
    base: '/',
    build: {
      sourcemap: (() => {
        // 开发环境 development
        if (isDev) {
          // dev 命令：开启 sourcemap
          if (command === 'serve') return true
          // build 命令：关闭 sourcemap
          if (command === 'build') return false
        }
        // 生产环境 production
        if (isProd) {
          // dev:pro 命令：开启 sourcemap
          if (command === 'serve') return true
          // build:pro 命令：关闭 sourcemap
          if (command === 'build') return false
        }
        // 默认开启
        return true
      })(),
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: true,
      // assetsInlineLimit: 0, // 这样所有图片都不会被转换为base64
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 将一些常用的框架打包在一起
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vue-vendor'
              }
              // 其他第三方库
              return 'vendors'
            }
          },
          entryFileNames: 'js/[name]-[hash].js', // 入口文件
          chunkFileNames: 'js/[name]-[hash].js', // 分包引入文件
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash][extname]'
            }
            const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico']
            if (assetInfo.name && imgExts.some(ext => assetInfo.name.endsWith(ext))) {
              return 'imgs/[name]-[hash][extname]'
            }
            const fontExts = ['.woff', '.woff2', '.ttf', '.otf', '.eot']
            if (assetInfo.name && fontExts.some(ext => assetInfo.name.endsWith(ext))) {
              return 'fonts/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          }
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger'],
      treeShaking: true,
      target: 'es2015',
      minify: true
    },
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        [config.VITE_BASE_URL]: {
          target: config.VITE_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${config.VITE_BASE_URL}`), '')
        },
        '/baidu': {
          target: 'https://api.map.baidu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/baidu`), '')
        }
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 将swiper相关的标签视为自定义元素 注册 swiper webcomponent
            isCustomElement: (tag) => tag.startsWith('swiper-')
          }
        }
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/images')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      }),
      // Gzip打包压缩
      compression({
        deleteOriginFile: false,
        keepResource: false,
        algorithm: 'gzip',
        threshold: 102400, // 100kb
        ext: 'gz',
        filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      }),
      // vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss";`
        }
      }
    }
  }
})
