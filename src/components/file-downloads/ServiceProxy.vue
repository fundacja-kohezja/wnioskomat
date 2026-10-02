<script setup>
import { useServiceProxyFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/serviceProxy'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const serviceProxyFormStore = useServiceProxyFormStore()

const documents = [
    {
        label: 'serviceProxy',
        pdf: generate(serviceProxyFormStore.answers, initPdf, true),
        docx: generate(serviceProxyFormStore.answers, initDocx, true),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
