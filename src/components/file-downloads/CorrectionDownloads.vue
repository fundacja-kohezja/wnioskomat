<script setup>
import { useMainApplicationFormStore, useCorrectionFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/correction'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const correctionFormStore = useCorrectionFormStore()

const documents = [
    {
        label: 'correction_request',
        pdf: generate(mainApplicationFormStore.answers, correctionFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, correctionFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
