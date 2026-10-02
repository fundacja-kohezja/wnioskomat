<script setup>
import { useMainApplicationFormStore, useExemptionRejectionJustificationFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/exemptionRejectionJustification'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const justificationFormStore = useExemptionRejectionJustificationFormStore()

const documents = [
    {
        label: 'justifiction_application',
        pdf: generate(mainApplicationFormStore.answers, justificationFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, justificationFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
