<script setup>
import { useMainApplicationFormStore, useAddressChangeFormStore } from '../stores/subforms'
import generate from '../doc-generators/addressChange'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'

const mainApplicationFormStore = useMainApplicationFormStore()
const addressChangeFormStore = useAddressChangeFormStore()

const document = {
    label: 'address_change',
    pdf: generate(mainApplicationFormStore.answers, addressChangeFormStore.answers, initPdf),
    docx: generate(mainApplicationFormStore.answers, addressChangeFormStore.answers, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
</template>
