<script setup>
import { storeToRefs } from 'pinia'

import { useRejectionJustificationFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/rejectionJustification'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const { answers } = storeToRefs(useRejectionJustificationFormStore())

const documents = [
    {
        label: 'justifiction_application',
        pdf: generate(answers.value, initPdf),
        docx: generate(answers.value, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents">
        <p v-if="!answers[1].is_exempted" class="docs-instruction">
            Dodatkowo przygotuj dowód wniesienia 100 zł opłaty sądowej.
        </p>
    </FileDownloads>
</template>
