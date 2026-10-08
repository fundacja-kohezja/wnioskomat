<script setup>
import { inject } from 'vue'

defineProps({
    form: {
        type: String,
        required: true,
    },
    step: {
        type: Number,
        default: 0,
    },
})

const changeForm = inject('changeForm')

</script>

<template>
    <button @click="changeForm(form, step)" class="btn-link">
        <slot></slot>
    </button>
</template>
