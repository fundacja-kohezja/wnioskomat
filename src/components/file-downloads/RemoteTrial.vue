<script setup>
import { useRemoteTrialFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/remoteTrial'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const remoteTrialFormStore = useRemoteTrialFormStore()

const documents = [
    {
        label: 'remoteTrial',
        pdf: generate(remoteTrialFormStore.answers, initPdf),
        docx: generate(remoteTrialFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
