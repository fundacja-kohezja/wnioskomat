<script setup>
import { isShown } from '../helpers/answers'
import { computed } from 'vue'


const props = defineProps({
    step: {
        type: Object,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    }
})

const title = computed(() => typeof props.step.title === 'string'
    ? props.step.title
    : Object.entries(props.step.title).find(([_, condition]) => !condition || isShown(condition, props.answers))[0]
)

</script>

<template>
    {{ title }}
</template>
