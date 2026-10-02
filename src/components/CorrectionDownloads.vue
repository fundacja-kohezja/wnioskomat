<script setup>
import { useMainApplicationFormStore, useCorrectionFormStore } from '../stores/subforms'
import generate from '../doc-generators/correction'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const correctionFormStore = useCorrectionFormStore()

const document = {
    label: 'correction_request',
    pdf: generate(mainApplicationFormStore.answers, correctionFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, correctionFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
