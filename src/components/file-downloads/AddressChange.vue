<script setup>
import { useMainApplicationFormStore, useAddressChangeFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/addressChange'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const addressChangeFormStore = useAddressChangeFormStore()

const documents = [
    {
        label: 'address_change',
        pdf: generate(mainApplicationFormStore.answers, addressChangeFormStore.answers, initPdf),
        docx: generate(mainApplicationFormStore.answers, addressChangeFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
