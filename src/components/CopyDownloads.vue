<script setup>
import { useMainApplicationFormStore, useRequestCopyFormStore } from '../stores/subforms'
import generate from '../doc-generators/requestCopy'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const requestCopyFormStore = useRequestCopyFormStore()

const document = {
    label: 'request_copy',
    pdf: generate(mainApplicationFormStore.answers, requestCopyFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, requestCopyFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
    <p class="docs-instruction">
        Dodatkowo przygotuj dowód wniesienia 20 zł opłaty kancelaryjnej.<br />Numer konta znajdziesz na stronie sądu.
    </p>
</template>
