<script setup>
import { useCopyUrgencyFormStore, useMainApplicationFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/copyUrgency'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const copyUrgencyFormStore = useCopyUrgencyFormStore()

const documents = [
    {
        label: 'copy_urgency',
        pdf: generate(mainApplicationFormStore.answers, copyUrgencyFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, copyUrgencyFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
