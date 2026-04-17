<script setup>
defineProps(['content'])

</script>

<template>
    <template v-if="Array.isArray(content)">
        <template v-for="(part, i) of content">
            <b v-if="i % 2">{{ part }}</b>
            <span v-else>{{ part }}</span>
        </template>
    </template>
    <template v-else>{{ content }}</template>
</template>
