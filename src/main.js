import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 添加全局样式重置
const style = document.createElement('style')
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    overflow: hidden;
  }
  
  #app {
    height: 100vh;
    width: 100vw;
  }
`
document.head.appendChild(style)

const app = createApp(App)
app.use(Antd)
app.mount('#app')
