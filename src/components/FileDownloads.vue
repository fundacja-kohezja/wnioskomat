<script setup>
import { computed } from 'vue'

import GeneratedDoc from './GeneratedDoc.vue'

const props = defineProps({
    documents: {
        type: Array,
        default: () => [],
    },
})

</script>

<template>
    <div class="generated-docs">
        <GeneratedDoc v-for="document of documents" v-bind="document" />
    </div>
    <p class="downloads-info">Po pobraniu {{ documents.length > 1 ? 'dokumentów przeczytaj je' : 'dokumentu przeczytaj go' }} dokładnie, by upewnić się, że wszystko się zgadza!</p>
    <p class="docs-instruction">Następnie wydrukuj i podpisz {{ documents.length > 1 ? 'każdy z nich' : 'go' }} – własnoręcznie i czytelnie.</p>
    <slot></slot>
    <hr />
</template>
