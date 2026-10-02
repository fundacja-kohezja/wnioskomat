<script setup>
import { storeToRefs } from 'pinia'

import { useMainApplicationFormStore, useExtendDeadlineFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/extendDeadline'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const { answers } = storeToRefs(useExtendDeadlineFormStore())

const documents = [
    {
        label: 'extend_deadline',
        pdf: generate(mainApplicationFormStore.answers, answers.value, initPdf),
        docx: generate(mainApplicationFormStore.answers, answers.value, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents">
        <template v-if="answers[0].extension_reason_has_proof">
            <hr />
            <p class="docs-instruction">
                Dodatkowo przygotuj zadeklarowane dowody:
            </p>
            <ul>
                <li v-for="part of String(answers[0].extension_reason_proof).split('\n')">{{ part }}</li>
            </ul>
        </template>
    </FileDownloads>
</template>
