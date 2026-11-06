import './assets/main.css'
// 两种布局完全独立：只改其中一个文件不会影响另一个
import './styles/layout/portrait.less'
import './styles/layout/wide.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
