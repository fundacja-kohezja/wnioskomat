<script setup>
import { VueFinalModal } from 'vue-final-modal'

defineProps({
    message: String,
    confirmLabel: String,
    cancelLabel: String,
})

const emit = defineEmits(['confirm', 'cancel'])

</script>

<template>
    <VueFinalModal class="base-modal">
        {{ message }}
        <div class="confirm-buttons">
            <button class="btn-primary" @click="emit('cancel')">
                {{ cancelLabel }}
            </button>
            <button class="btn" @click="emit('confirm')">
                {{ confirmLabel }}
            </button>
        </div>
    </VueFinalModal>
</template>
