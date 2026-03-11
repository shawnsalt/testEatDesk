import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "@/style/reset.scss"
import "@/style/index.scss"
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(createPinia())
app.use(router)

app.mount('#app')