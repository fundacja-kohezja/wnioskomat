<script setup>
import { useCopyUrgencyFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/copyUrgency'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const copyUrgencyFormStore = useCopyUrgencyFormStore()

const documents = [
    {
        label: 'copy_urgency',
        pdf: generate(copyUrgencyFormStore.answers, initPdf),
        docx: generate(copyUrgencyFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
