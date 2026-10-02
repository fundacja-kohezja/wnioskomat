<script setup>
import { storeToRefs } from 'pinia'

import { useMainApplicationFormStore, useRejectionJustificationFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/rejectionJustification'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const { answers } = storeToRefs(useRejectionJustificationFormStore())

const documents = [
    {
        label: 'justifiction_application',
        pdf: generate(mainApplicationFormStore.answers, answers.value, initPdf),
        docx: generate(mainApplicationFormStore.answers, answers.value, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents">
        <p v-if="!answers[0].is_exempted" class="docs-instruction">
            Dodatkowo przygotuj dowód wniesienia 100 zł opłaty sądowej.
        </p>
    </FileDownloads>
</template>
