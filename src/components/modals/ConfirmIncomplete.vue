<script setup>
import { useI18n } from 'vue-i18n'

import ConfirmModal from './ConfirmModal.vue'

const { t } = useI18n()

</script>

<template>
    <ConfirmModal content-class="confirm-modal">
        <div class="message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                <title>{{ t('warning') }}</title>
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
            </svg>
            <p>{{ t('some_incomplete') }}</p>
        </div>
        <p>{{ t('some_incomplete_0') }}<strong>{{ t('some_incomplete_1') }}</strong>{{ t('some_incomplete_2') }}</p>
    </ConfirmModal>
</template>
