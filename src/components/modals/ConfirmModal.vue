<script setup>
import { VueFinalModal } from 'vue-final-modal'

defineProps({
    confirmLabel: String,
    cancelLabel: String,
})

const emit = defineEmits(['confirm', 'cancel'])

</script>

<template>
    <VueFinalModal class="base-modal">
        <slot></slot>
        <div class="confirm-buttons">
            <button class="btn-primary" @click="emit('cancel')">
                {{ cancelLabel }}
            </button>
            <button class="btn" @click="emit('confirm')">
                {{ confirmLabel }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                    <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    </VueFinalModal>
</template>
