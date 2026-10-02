<script setup>
import { useMainApplicationFormStore, useRequestCopyFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/requestCopy'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const requestCopyFormStore = useRequestCopyFormStore()

const documents = [
    {
        label: 'request_copy',
        pdf: generate(mainApplicationFormStore.answers, requestCopyFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, requestCopyFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" >
        <p class="docs-instruction">
            Dodatkowo przygotuj dowód wniesienia 20 zł opłaty kancelaryjnej.<br />Numer konta znajdziesz na stronie sądu.
        </p>
    </FileDownloads>
</template>
