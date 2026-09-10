<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import FurtherStepsPl from './further-steps/FurtherStepsPl.vue'
import FurtherStepsEn from './further-steps/FurtherStepsEn.vue'
import FurtherStepsUk from './further-steps/FurtherStepsUk.vue'
import useFormStore from '../stores/form'
import usePrefsStore from '../stores/prefs'
import generateMainDoc from '../doc-generators/mainApplication'
import generateDocForUnderage from '../doc-generators/underageApplication'
import generateProxyDoc from '../doc-generators/serviceProxy'
import generateStatement from '../doc-generators/statementOfMeans'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'

const emit = defineEmits(['goToForm'])

const { t } = useI18n()
const { answers, anyInvalid, anyIncomplete } = storeToRefs(useFormStore())
const { selectedLang } = storeToRefs(usePrefsStore())

const documents = []
if (answers.value[0].is_underage) {
    documents.push({
        label: 'main_application',
        pdf: generateDocForUnderage(answers.value, initPdf),
        docx: generateDocForUnderage(answers.value, initDocx),
    })
} else {
    documents.push({
        label: 'main_application',
        pdf: generateMainDoc(answers.value, initPdf),
        docx: generateMainDoc(answers.value, initDocx),
    })
}

if (answers.value[4].has_proxy) {
    documents.push({
        label: 'service_proxy',
        pdf: generateProxyDoc(answers.value, initPdf),
        docx: generateProxyDoc(answers.value, initDocx),
    })
}

if (answers.value[0].is_exemption) {
    documents.push({
        label: 'statement_of_means',
        pdf: generateStatement(answers.value),
    })
}

// TODO load these dynamically?
const furtherSteps = { pl: FurtherStepsPl, en: FurtherStepsEn, uk: FurtherStepsUk }

</script>

<template>
    <div class="cols-layout">
        <div class="side-pane">
            <h2>{{ t('documents_ready') }}</h2>
            <div v-if="anyInvalid || anyIncomplete" class="invalid-warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                    <title>{{ t('warning') }}</title>
                    <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
                <span>
                    {{ t('warning_generated_0') }}{{ anyInvalid && anyIncomplete ? t('warning_generated_1') : anyInvalid ? t('warning_generated_2') : t('warning_generated_3') }}{{ t('warning_generated_4') }}
                </span>
            </div>
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
            <nav class="prev-next">
                <button @click="emit('goToForm')" class="btn-link prev">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    {{ t('back_to_edit') }}
                </button>
            </nav>
        </div>
        <div class="further-steps-wrap">
            <h3>{{ t('further_steps') }}</h3>
            <component :is="furtherSteps[selectedLang]" />
        </div>
    </div>
</template>
