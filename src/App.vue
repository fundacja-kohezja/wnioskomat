<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ModalsContainer } from 'vue-final-modal'

import usePrefsStore from './stores/prefs'
import useFormStore from './stores/form'
import TheLangSwitch from './components/TheLangSwitch.vue'
import TheThemeSwitch from './components/TheThemeSwitch.vue'
import TheLocaleError from './components/TheLocaleError.vue'
import TheStartScreen from './components/TheStartScreen.vue'
import TheForm from './components/TheForm.vue'
import TheEnd from './components/TheEnd.vue'

const { isInitialLocaleLoading, isCurrentLocaleLoading } = storeToRefs(usePrefsStore())
const { anyAnswers } = storeToRefs(useFormStore())

const { t } = useI18n()

/** @type import('vue').Ref< 'start' | 'form' | 'end' > */
const currentScreen = ref('start')

const navigate = function (screen) {
    currentScreen.value = screen
}

</script>

<template>
    <div v-if="isInitialLocaleLoading" class="loading"></div>
    <template v-else>
        <div class="padding-x top-bar">
            <TheLangSwitch />
            <TheThemeSwitch />
            <div class="secondary-section">
                <div v-if="anyAnswers" class="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                        <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                    </svg>
                    <span>{{ t('state_persisted') }}</span>
                </div>
            </div>
        </div>
        <main class="padding-x main-content" :class="{ loading: isCurrentLocaleLoading }">
            <TheLocaleError />

            <TheForm v-if="currentScreen === 'form'" @go-to-start="navigate('start')" @go-to-end="navigate('end')" />
            <TheEnd v-else-if="currentScreen === 'end'" @go-to-form="navigate('form')" />
            <TheStartScreen v-else @go-to-form="navigate('form')" />
        </main>
        <ModalsContainer />
    </template>
</template>
