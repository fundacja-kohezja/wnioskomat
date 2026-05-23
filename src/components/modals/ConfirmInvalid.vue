<script setup>
import { useI18n } from 'vue-i18n'

import ConfirmModal from './ConfirmModal.vue'

const { t } = useI18n()

</script>

<template>
    <ConfirmModal content-class="confirm-modal">
        <div class="validation-message message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                <title>{{ t('warning') }}</title>
                <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
            </svg>
            <p>{{ t('some_invalid') }}</p>
        </div>
        <p>{{ t('some_invalid_0') }}<strong>{{ t('some_invalid_1') }}</strong>{{ t('some_invalid_2') }}</p>
    </ConfirmModal>
</template>
