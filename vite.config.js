import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'


// https://vitejs.dev/config/
export default ({mode})=>defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
      
    }),
    ElementPlus(),
  ],
  resolve:{
    alias:{
      '~':path.resolve(__dirname,'./'),
      '@':path.resolve(__dirname,'src')
    },
    extensions:['.vue','.js','.jsx','.json']

  },
  base:'./',//mode=='development'?'./':(mode=='beta'?'//s.baidu.com/beta/xxx':'//s.baidu.com/release/xxx')
  server:{
    proxy:{
      '/api':{
        target:'http://backend-api-02.newbee.ltd/manage-api/v1',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  },
  css:{
    preprocessorOptions: {
      scss:{
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
})
