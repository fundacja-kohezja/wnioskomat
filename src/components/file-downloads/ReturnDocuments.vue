<script setup>
import { useReturnDocumentsFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/returnDocuments'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const returnDocumentsFormStore = useReturnDocumentsFormStore()

const documents = [
    {
        label: 'return_documents',
        pdf: generate(returnDocumentsFormStore.answers, initPdf),
        docx: generate(returnDocumentsFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
