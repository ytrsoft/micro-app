import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, initGlobalState, start } from 'qiankun'

createApp(App).mount('#app')

const sendMessage = (msg: string) => {
  console.log('子应用的消息', msg)
}

const globalState = initGlobalState({ token: '', version: '1.0' })

globalState.onGlobalStateChange((newState) => {
  console.log('数据更新', newState)
})

setTimeout(() => globalState.setGlobalState({ token: 'AFERIFHEIWRFHIWFHE' }), 3000)

registerMicroApps([
  {
    name: 'subapp1',
    entry: '//localhost:8001', 
    container: '#subapp-container',
    activeRule: '/subapp1',
    props: {
      globalState,
      nickname: 'Iceman',
      sendMessage
    }
  }
])

start()
