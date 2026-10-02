<script setup>
import { useExemptionFormStore } from '@/stores/subforms'
import generateStatementOfMeans from '@/doc-generators/statementOfMeans'
import generateExemption from '@/doc-generators/exemption'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const exemptionFormStore = useExemptionFormStore()

const documents = [
    {
        label: 'exemption_application',
        pdf: generateExemption(exemptionFormStore.answers, initPdf),
        docx: generateExemption(exemptionFormStore.answers, initDocx),
    },
    {
        label: 'statement_of_means',
        pdf: generateStatementOfMeans(exemptionFormStore.answers, initPdf),
        docx: generateStatementOfMeans(exemptionFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
