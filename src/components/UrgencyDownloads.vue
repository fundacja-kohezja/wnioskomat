<script setup>
import { useMainApplicationFormStore, useUrgencyFormStore } from '../stores/subforms'
import generate from '../doc-generators/urgency'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const urgencyFormStore = useUrgencyFormStore()

const document = {
    label: 'urgency_application',
    pdf: generate(mainApplicationFormStore.answers, urgencyFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, urgencyFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
