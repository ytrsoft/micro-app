import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('subapp1', { useDevMode: true })
  ],
  server: {
    port: 8001
  },
  base: '/subapp1'
})
