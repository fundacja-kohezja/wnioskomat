<script setup>
import { useServiceProxyFormStore, useMainApplicationFormStore } from '../stores/subforms'
import generate from '../doc-generators/serviceProxy'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const serviceProxyFormStore = useServiceProxyFormStore()

const document = {
    label: 'serviceProxy',
    pdf: generate(mainApplicationFormStore.answers, initPdf, serviceProxyFormStore.answers),
    docx: generate(mainApplicationFormStore.answers, initDocx, serviceProxyFormStore.answers),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
