<script setup>
import { useServiceProxyFormStore, useMainApplicationFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/serviceProxy'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const serviceProxyFormStore = useServiceProxyFormStore()

const documents = [
    {
        label: 'serviceProxy',
        pdf: generate(mainApplicationFormStore.answers, initPdf, serviceProxyFormStore.answers),
        docx: generate(mainApplicationFormStore.answers, initDocx, serviceProxyFormStore.answers),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
