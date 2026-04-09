<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ModalsContainer, useModal } from 'vue-final-modal'

import usePrefsStore from './stores/prefs'
import useFormStore from './stores/form'
import TheLangSwitch from './components/TheLangSwitch.vue'
import TheThemeSwitch from './components/TheThemeSwitch.vue'
import TheLocaleError from './components/TheLocaleError.vue'
import TheStartScreen from './components/TheStartScreen.vue'
import TheForm from './components/TheForm.vue'
import TheEnd from './components/TheEnd.vue'
import HelpModal from './components/modals/HelpModal.vue'
import ExportModal from './components/modals/ExportModal.vue'
import ExitModal from './components/modals/ExitModal.vue'
import RestorationModal from './components/modals/RestorationModal.vue'

const { isInitialLocaleLoading, isCurrentLocaleLoading } = storeToRefs(usePrefsStore())
const { anyAnswers } = storeToRefs(useFormStore())

const { t } = useI18n()

/** @type import('vue').Ref< 'start' | 'form' | 'end' > */
const currentScreen = ref('start')

const navigate = function (screen) {
    currentScreen.value = screen
}

const { open: openHelp, close: closeHelp } = useModal({
    component: HelpModal,
    attrs: { onClose() { closeHelp() } },
})

const { open: openExport, close: closeExport } = useModal({
    component: ExportModal,
    attrs: { onClose() { closeExport() } },
})

const { open: openRestore, close: closeRestore } = useModal({
    component: RestorationModal,
    attrs: {
        onClose() {
            closeRestore()
        },
        onConfirm() {
            closeRestore()
            navigate('form')
        },
    },
})

const { open: openExit, close: closeExit } = useModal({
    component: ExitModal,
    attrs: { onClose() { closeExit() } },
})

</script>

<template>
    <div v-if="isInitialLocaleLoading" class="loading"></div>
    <template v-else>
        <div class="padding-x top-bar">
            <TheLangSwitch />
            <TheThemeSwitch />
            <div class="secondary-section">
                <div v-if="anyAnswers && currentScreen !== 'start'" class="compound-button fade-in">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                            <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                        </svg>
                        <span>{{ t('state_persisted') }}</span>
                    </div>
                    <button class="btn" @click="openExport">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                            <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 6.75a.75.75 0 0 1 1.5 0v2.546l.943-1.048a.75.75 0 0 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V8.75Z" clip-rule="evenodd" />
                        </svg>
                        <span>{{ t('export_sync') }}</span>
                    </button>
                </div>
                <button v-if="!anyAnswers && currentScreen === 'start'" class="btn" @click="openRestore">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                        <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 11.25a.75.75 0 0 0 1.5 0v-2.546l.943 1.048a.75.75 0 1 0 1.114-1.004l-2.25-2.5a.75.75 0 0 0-1.114 0l-2.25 2.5a.75.75 0 1 0 1.114 1.004l.943-1.048v2.546Z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ t('restore_progress') }}</span>
                </button>
                <hr />
                <button class="btn" @click="openHelp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ t('help') }}</span>
                </button>
                <button v-if="currentScreen !== 'start'" class="btn" @click="openExit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                        <path d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" />
                        <path d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" />
                    </svg>
                    <span>{{ t('exit') }}</span>
                </button>
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
