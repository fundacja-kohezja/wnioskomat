<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useModal } from 'vue-final-modal'

import useFormStore from '../stores/form'
import StartOverModal from './modals/StartOverModal.vue'

const emit = defineEmits(['goToForm'])

const { t } = useI18n()

const formStore = useFormStore()
const { clearAnswers } = formStore
const { anyAnswers } = storeToRefs(formStore)

const { open, close } = useModal({
    component: StartOverModal,
    attrs: {
        onClose() {
            close()
        },
        onConfirm() {
            clearAnswers()
            emit('goToForm')
        },
    },
})

const startOver = () => {
    open()
}

</script>

<template>
    <div class="introduction">
        <h1>{{ t('title') }}</h1>

        <p>
            {{ t('intro') }}
        </p>

        <div class="intro-btns">
            <button class="btn-primary" @click="emit('goToForm')">
                {{ t(anyAnswers ? 'resume' : 'begin') }}&ensp;
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="24" height="24">
                    <path d="M13.5 4.5 21 12 13.5 19.5M21 12H3" />
                </svg>
            </button>
            <button v-if="anyAnswers" class="btn-secondary" @click="startOver">
                {{ t('start_over') }}
            </button>
        </div>

        <div class="box warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <title>{{ t('warning') }}</title>
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
            <p>
                {{ t('intro_info') }}
            </p>
        </div>
</div>
</template>
