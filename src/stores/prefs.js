import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import messages from '../locales/pl.json'

export default defineStore('prefs', () => {

    // theme
    const theme = ref(localStorage?.theme || 'auto')

    watch(theme, theme => {
        window.updateTheme(theme)
        if (!localStorage) return
        localStorage.theme = theme
    })

    // locale
    const { locale, setLocaleMessage } = useI18n()

    // bring all commented code back when there are translations

    // const selectedLang = ref(locale.value)
    // const localesStatus = reactive({})

    // const isInitialLocaleLoading = computed(() => messages.value[locale.value] && localesStatus[locale.value] === 'fetching')
    // const isCurrentLocaleLoading = computed(() => localesStatus[selectedLang.value] === 'fetching')

    // const importLocale = (lang) => {
    //     localesStatus[lang] = 'fetching'
    //     import(`../locales/${lang}.json`)
    //         .then(messages => {
    //             setLocaleMessage(lang, messages)
    //             localesStatus[lang] = 'ready'
    //             if (selectedLang.value === lang) {
    //                 locale.value = lang
    //             }
    //         })
    //         .catch(() => {
    //             localesStatus[lang] = 'error'
    //         })
    // }
    // importLocale(locale.value)

    // watch(selectedLang, lang => {
    //     if (localStorage) {
    //         localStorage.lang = lang
    //     }
    //     switch (localesStatus[lang]) {
    //         case 'ready':
    //             locale.value = lang
    //             break

    //         case 'fetching':
    //             break // do nothing, things will update when fetching finishes

    //         case 'error':
    //         case undefined:
    //             importLocale(lang)
    //     }
    // })

    // this global function updates lang attr on html tag and the <title>
    // watch(locale, lang => { window.updateLanguage(lang) })


    // temporary until there are translations to other langs than polish
    locale.value = 'pl'
    setLocaleMessage('pl', messages)

    return {
        theme, // localesStatus, selectedLang, // state
        // isInitialLocaleLoading, isCurrentLocaleLoading, // getters
        // importLocale, // actions
    }
})
