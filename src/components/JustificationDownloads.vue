<script setup>
import { useMainApplicationFormStore, useExemptionRejectionJustificationFormStore } from '../stores/subforms'
import generate from '../doc-generators/exemptionRejectionJustification'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const justificationFormStore = useExemptionRejectionJustificationFormStore()

const document = {
    label: 'justifiction_application',
    pdf: generate(mainApplicationFormStore.answers, justificationFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, justificationFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
