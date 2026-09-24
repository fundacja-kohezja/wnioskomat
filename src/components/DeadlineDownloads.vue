<script setup>
import { useMainApplicationFormStore, useExtendDeadlineFormStore } from '../stores/subforms'
import generate from '../doc-generators/extendDeadline'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'
import { storeToRefs } from 'pinia'

const mainApplicationFormStore = useMainApplicationFormStore()
const { answers } = storeToRefs(useExtendDeadlineFormStore())

const document = {
    label: 'extend_deadline',
    pdf: generate(mainApplicationFormStore.answers, answers.value, initPdf),
    docx: generate(mainApplicationFormStore.answers, answers.value, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
    <template v-if="answers[0].extension_reason_has_proof">
        <p class="downloads-info">
            Dodatkowo przygotuj zadeklarowane dowody:
        </p>
        <ul>
            <li v-for="part of String(answers[0].extension_reason_proof).split('\n')">{{ part }}</li>
        </ul>
    </template>
</template>
