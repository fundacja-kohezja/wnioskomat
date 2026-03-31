<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import usePrefsStore from './stores/prefs'
import TheLangSwitch from './components/TheLangSwitch.vue'
import TheThemeSwitch from './components/TheThemeSwitch.vue'
import TheLocaleError from './components/TheLocaleError.vue'
import TheStartScreen from './components/TheStartScreen.vue'
import TheForm from './components/TheForm.vue'
import TheEnd from './components/TheEnd.vue'

const { isInitialLocaleLoading, isCurrentLocaleLoading } = storeToRefs(usePrefsStore())

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
            <div></div>
        </div>
        <main class="padding-x main-content" :class="{ loading: isCurrentLocaleLoading }">
            <TheLocaleError />

            <TheForm v-if="currentScreen === 'form'" @go-to-start="navigate('start')" @go-to-end="navigate('end')" />
            <TheEnd v-else-if="currentScreen === 'end'" />
            <TheStartScreen v-else @go-to-form="navigate('form')" />
        </main>
    </template>
</template>
