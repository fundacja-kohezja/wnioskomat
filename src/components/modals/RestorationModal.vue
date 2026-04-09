<script setup>
import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import BaseModal from './BaseModal.vue'
import useFormStore from '@/stores/form'
import steps from '../../steps'

const emit = defineEmits(['confirm'])

const { t } = useI18n()

const { answers } = storeToRefs(useFormStore())

const loading = ref(false)
const ready = ref(false)
const fileInput = ref()

const report = (msg) => {
    fileInput.value.setCustomValidity(msg)
    fileInput.value.reportValidity()
}

const reader = new FileReader

reader.onloadend = () => {
    loading.value = false
    fileInput.value.value = ''
}

reader.onload = () => {
    let parsedResult

    try {
        parsedResult = JSON.parse(reader.result)
    } catch (e) {
        report(t('wrong_format'))
        return
    }

    // TODO expand validation
    if (!Array.isArray(parsedResult) || parsedResult.length < steps.length) {
        report(t('malformed'))
        return
    }
    if (!parsedResult.every(el => el instanceof Object && !Array.isArray(el))) {
        report(t('malformed'))
        return
    }
    answers.value = parsedResult
    ready.value = true
}

reader.onerror = () => {
    report(t('upload_failed'))
}

const uploadFile = ({ target }) => {
    const file = target.files[0]
    if (!file) return

    fileInput.value.setCustomValidity('')
    loading.value = true

    reader.readAsText(file)
}

onUnmounted(() => {
    reader.abort()
})

</script>

<template>
    <BaseModal :title="t('restoration')">
        <div v-if="ready" class="message">
            <p class="success-message">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg><br/>
                <span>{{ t('progress_restored') }}</span>
            </p>
            <button class="btn" @click="emit('confirm')">
                {{ t('resume') }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="18" height="18">
                    <path d="M13.5 4.5 21 12 13.5 19.5M21 12H3" />
                </svg>
            </button>
        </div>
        <div v-else class="modal-contents" :class="{ loading }">
            <p>{{ t('restoration_desc') }}</p>
            <h3>{{ t('from_file') }}</h3>
            <div class="file-input-container">
                <input ref="fileInput" class="file-input" type="file" @change="uploadFile" />
                <span aria-hidden="true" class="file-input-help-text">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                        {{ t('drop_here') }} <span class="part">{{ t('from_disk') }}</span>
                    </span>
                </span>
            </div>
        </div>
    </BaseModal>
</template>
