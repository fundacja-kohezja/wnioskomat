<script setup>
defineProps({
    answers: {
        type: Array,
        required: true,
    },
})

</script>

<template>
    <pre style="white-space: pre-wrap">
        {{ answers }}
    </pre>
</template>
