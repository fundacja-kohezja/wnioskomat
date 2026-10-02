<script setup>
import { useAddressChangeFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/addressChange'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const addressChangeFormStore = useAddressChangeFormStore()

const documents = [
    {
        label: 'address_change',
        pdf: generate(addressChangeFormStore.answers, initPdf),
        docx: generate(addressChangeFormStore.answers, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents" />
</template>
