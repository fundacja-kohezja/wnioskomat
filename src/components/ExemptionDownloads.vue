<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useExemptionFormStore } from '../stores/subforms'
import generate from '../doc-generators/statementOfMeans'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'

const { t } = useI18n()
const { answers, anyInvalid, anyIncomplete } = storeToRefs(useExemptionFormStore())

const documents = [
    {
        label: 'statement_of_means',
        pdf: generate(answers.value, initPdf),
        docx: generate(answers.value, initDocx),
    }
]

</script>

<template>
    <div v-if="anyInvalid || anyIncomplete" class="box invalid-warning warning">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
            <title>{{ t('warning') }}</title>
            <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
        </svg>
        <span>
            {{ t('warning_generated_0') }}{{ anyInvalid && anyIncomplete ? t('warning_generated_1') : anyInvalid ? t('warning_generated_2') : t('warning_generated_3') }}{{ t('warning_generated_4') }}
        </span>
    </div>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <div v-for="({ label, pdf, docx }) of documents" class="generated-doc">
            <div class="doc-title">
                {{ t(label) }}
            </div>
            <!-- <button>Podgląd</button> -->
            <div class="buttons">
                <button v-if="pdf" @click="pdf(t(label))" class="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    {{ t('download_pdf') }}
                </button>
                <button v-if="docx" @click="docx(t(label))" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    {{ t('download_docx') }}
                </button>
            </div>
        </div>
    </div>
</template>
