<script setup>
import { useI18n } from 'vue-i18n'

import GeneratedDoc from './GeneratedDoc.vue'

const props = defineProps({
    documents: {
        type: Array,
        default: () => [],
    },
})

const { t } = useI18n()

</script>

<template>
    <div class="generated-docs">
        <GeneratedDoc v-for="document of documents" v-bind="document" />
    </div>
    <p class="downloads-info">{{ t(documents.length > 1 ? 'downloads_info_0_multiple' : 'downloads_info_0_single') }}</p>
    <p class="docs-instruction">{{ t(documents.length > 1 ? 'downloads_info_1_multiple' : 'downloads_info_1_single') }}</p>
    <slot></slot>
    <hr />
</template>
