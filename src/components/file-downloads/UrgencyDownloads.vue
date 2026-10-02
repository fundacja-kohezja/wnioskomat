<script setup>
import { useUrgencyFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/urgency'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const urgencyFormStore = useUrgencyFormStore()

const documents = [
    {
        label: 'urgency_application',
        pdf: generate(urgencyFormStore.answers, initPdf),
        docx: generate(urgencyFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
