import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineStore('prefs', () => {

    // theme
    const theme = ref(localStorage.theme || 'auto')

    watch(theme, theme => {
        window.updateTheme(theme)
        localStorage.theme = theme
    })

    // locale
    const { locale, setLocaleMessage, messages } = useI18n()

    const selectedLang = ref(locale.value)
    const localesStatus = reactive({})

    const isInitialLocaleLoading = computed(() => messages.value[locale.value] && localesStatus[locale.value] === 'fetching')
    const isCurrentLocaleLoading = computed(() => localesStatus[selectedLang.value] === 'fetching')

    const importLocale = (lang) => {
        localesStatus[lang] = 'fetching'
        import(`../locales/${lang}.json`)
            .then(messages => {
                setLocaleMessage(lang, messages)
                localesStatus[lang] = 'ready'
                if (selectedLang.value === lang) {
                    locale.value = lang
                }
            })
            .catch(() => {
                localesStatus[lang] = 'error'
            })
    }
    importLocale(locale.value)

    watch(selectedLang, lang => {
        localStorage.lang = lang
        switch (localesStatus[lang]) {
            case 'ready':
                locale.value = lang
                break

            case 'fetching':
                break // do nothing, things will update when fetching finishes

            case 'error':
            case undefined:
                importLocale(lang)
        }
    })

    watch(locale, lang => { window.updateLanguage(lang) })

    return {
        theme, localesStatus, selectedLang, // state
        isInitialLocaleLoading, isCurrentLocaleLoading, // getters
        importLocale, // actions
    }
})
