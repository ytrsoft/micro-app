import { createApp, App as VueApp, nextTick } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow, QiankunProps } from 'vite-plugin-qiankun/es/helper'

let app: VueApp | null = null

const render = (container?: HTMLElement) => {
  app = createApp(App)
  const mountPoint = container ? container.querySelector('#app') : document.querySelector('#app')
  if (mountPoint) {
    app.mount(mountPoint)
  }
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderWithQiankun({
    bootstrap() {
      console.log('[qiankun] 子应用启动')
    },
    mount(props: QiankunProps) {
      console.log('[qiankun] 子应用挂载', props)
      render(props.container)
      console.log('[qiankun] 父应用的昵称', props.nickname)
      nextTick(() => {
        props.sendMessage('你好')
      })
      props.globalState.onGlobalStateChange((state: any) => {
        console.log('父应用更新:', state)
      })
    },
    unmount(props: QiankunProps) {
      console.log('[qiankun] 子应用卸载', props)
      if (app) {
        app.unmount()
        app = null
      }
    },
    update(props: QiankunProps) {
      console.log('[qiankun] 子应用更新', props)
    }
  })
} else {
  console.log('[独立模式] 以独立模式运行')
  render()
}

export default app
