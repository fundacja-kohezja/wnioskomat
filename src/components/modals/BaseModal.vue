<script setup>
import { VueFinalModal } from 'vue-final-modal'

defineProps({
    title: String,
})

const emit = defineEmits(['close'])

</script>

<template>
    <VueFinalModal class="base-modal">
        <div class="modal-header">
            <h2 v-if="title">{{ title }}</h2>
            <button class="btn-link" @click="emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="24" height="24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2 22 22 2M2 2l20 20" />
                </svg>
            </button>
        </div>
        <slot></slot>
    </VueFinalModal>
</template>
