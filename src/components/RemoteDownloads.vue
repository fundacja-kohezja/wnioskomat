<script setup>
import { useMainApplicationFormStore, useRemoteTrialFormStore } from '../stores/subforms'
import generate from '../doc-generators/remoteTrial'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const remoteTrialFormStore = useRemoteTrialFormStore()

const document = {
    label: 'remoteTrial',
    pdf: generate(mainApplicationFormStore.answers, remoteTrialFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, remoteTrialFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
