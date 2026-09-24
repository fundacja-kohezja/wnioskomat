<script setup>
import { useMainApplicationFormStore, useRejectionJustificationFormStore } from '../stores/subforms'
import generate from '../doc-generators/rejectionJustification'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'
import { storeToRefs } from 'pinia'

const mainApplicationFormStore = useMainApplicationFormStore()
const { answers } = storeToRefs(useRejectionJustificationFormStore())

const document = {
    label: 'justifiction_application',
    pdf: generate(mainApplicationFormStore.answers, answers.value, initPdf),
    docx: generate(mainApplicationFormStore.answers, answers.value, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
    <p v-if="!answers[0].is_exempted" class="docs-instruction">
        Dodatkowo przygotuj dowód wniesienia 100 zł opłaty sądowej.
    </p>
</template>
