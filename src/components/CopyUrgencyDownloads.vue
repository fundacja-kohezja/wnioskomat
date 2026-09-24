<script setup>
import { useCopyUrgencyFormStore, useMainApplicationFormStore } from '../stores/subforms'
import generate from '../doc-generators/copyUrgency'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const copyUrgencyFormStore = useCopyUrgencyFormStore()

const document = {
    label: 'copy_urgency',
    pdf: generate(mainApplicationFormStore.answers, copyUrgencyFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, copyUrgencyFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
