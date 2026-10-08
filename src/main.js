import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createVfm } from 'vue-final-modal'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import ToForm from './components/ToForm.vue'

createApp(App)
    .use(createI18n({
        legacy: false,
        locale: localStorage?.lang || 'pl',
    }))
    .use(createPinia()
        .use(piniaPluginPersistedstate)
    )
    .use(createVfm())
    .component('ToForm', ToForm)
    .mount('#app')
