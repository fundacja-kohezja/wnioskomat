<script setup>
import { storeToRefs } from 'pinia'

import { useExtendDeadlineFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/extendDeadline'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const { answers } = storeToRefs(useExtendDeadlineFormStore())

const documents = [
    {
        label: 'extend_deadline',
        pdf: generate(answers.value, initPdf),
        docx: generate(answers.value, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents">
        <template v-if="answers[1].extension_reason_has_proof">
            <hr />
            <p class="docs-instruction">
                Dodatkowo przygotuj zadeklarowane dowody:
            </p>
            <ul>
                <li v-for="part of String(answers[1].extension_reason_proof).split('\n')">{{ part }}</li>
            </ul>
        </template>
    </FileDownloads>
</template>
