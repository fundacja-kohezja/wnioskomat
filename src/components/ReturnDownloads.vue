<script setup>
import { useMainApplicationFormStore, useReturnDocumentsFormStore } from '../stores/subforms'
import generate from '../doc-generators/returnDocuments'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const returnDocumentsFormStore = useReturnDocumentsFormStore()

const document = {
    label: 'return_documents',
    pdf: generate(mainApplicationFormStore.answers, returnDocumentsFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, returnDocumentsFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
