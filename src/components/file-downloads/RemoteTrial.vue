<script setup>
import { useMainApplicationFormStore, useRemoteTrialFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/remoteTrial'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const remoteTrialFormStore = useRemoteTrialFormStore()

const documents = [
    {
        label: 'remoteTrial',
        pdf: generate(mainApplicationFormStore.answers, remoteTrialFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, remoteTrialFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
