import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const app = createApp(App)

app.use(createI18n({ legacy: false, locale: localStorage.lang || 'pl' }))
app.use(createPinia())

app.mount('#app')
