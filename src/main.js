// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import router from './router/index.js'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersistedstate)

createApp(App).use(router).use(pinia).mount('#app')
