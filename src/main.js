import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { createVfm } from 'vue-final-modal'

createApp(App)
    .use(createI18n({
        legacy: false,
        locale: localStorage?.lang || 'pl',
    }))
    .use(createPinia()
        .use(piniaPluginPersistedstate)
    )
    .use(createVfm())
    .mount('#app')
