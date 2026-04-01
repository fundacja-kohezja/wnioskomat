<script setup>
defineProps(['label', 'question', 'answer'])

</script>

<template>
    <template v-if="question.type === 'checkbox'">
        <span v-if="answer">{{ label }}</span>
        <del v-else>{{ label }}</del>
    </template>
    <span v-else>{{ label }} <b>{{ answer }}</b></span>
</template>
