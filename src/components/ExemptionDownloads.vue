<script setup>
import { useExemptionFormStore, useMainApplicationFormStore } from '../stores/subforms'
import generateStatementOfMeans from '../doc-generators/statementOfMeans'
import generateExemption from '../doc-generators/exemption'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const exemptionFormStore = useExemptionFormStore()

const documents = [
    {
        label: 'exemption_application',
        pdf: generateExemption(mainApplicationFormStore.answers, exemptionFormStore.answers, initPdf),
        docx: generateExemption(mainApplicationFormStore.answers, exemptionFormStore.answers, initDocx),
    },
    {
        label: 'statement_of_means',
        pdf: generateStatementOfMeans(mainApplicationFormStore.answers, exemptionFormStore.answers, initPdf),
        docx: generateStatementOfMeans(mainApplicationFormStore.answers, exemptionFormStore.answers, initDocx),
    },
]

</script>

<template>
    <p class="downloads-info">Wydrukuj oba poniższe dokumenty i podpisz je – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-for="document of documents" v-bind="document" />
    </div>
</template>
