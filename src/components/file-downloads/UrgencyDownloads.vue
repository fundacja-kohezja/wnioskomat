<script setup>
import { useMainApplicationFormStore, useUrgencyFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/urgency'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const urgencyFormStore = useUrgencyFormStore()

const documents = [
    {
        label: 'urgency_application',
        pdf: generate(mainApplicationFormStore.answers, urgencyFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, urgencyFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
