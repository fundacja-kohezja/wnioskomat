<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

import { useMainApplicationFormStore } from '../stores/subforms'
import generateMainDoc from '../doc-generators/mainApplication'
import generateDocForUnderage from '../doc-generators/underageApplication'
import generateProxyDoc from '../doc-generators/serviceProxy'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'

const { t } = useI18n()
const { answers, anyInvalid, anyIncomplete } = storeToRefs(useMainApplicationFormStore())

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

if (answers.value[2].has_proxy) {
    documents.push({
        label: 'service_proxy',
        pdf: generateProxyDoc(answers.value, initPdf),
        docx: generateProxyDoc(answers.value, initDocx),
    })
}

const normalize = text => (text || '').trim()

const attached = []

attached.push(t('s_9'))
if (!answers.value[0].is_exemption) attached.push(t('s_10'))

if (answers.value[1].psychologist) {
    attached.push([t('s_11'), t('s_12')].join(''))
}
if (answers.value[1].psychologist_sexologist) {
    attached.push([t('s_11'), t('s_13')].join(''))
}
if (!answers.value[1].psychologist && !answers.value[1].psychologist_sexologist) {
    attached.push([t('s_11'), '…'].join(''))
}

if (answers.value[1].psychiatrist) {
    attached.push([t('s_14'), t('s_15')].join(''))
}
if (answers.value[1].sexologist) {
    attached.push([t('s_14'), t('s_16')].join(''))
}
if (!answers.value[1].psychiatrist && !answers.value[1].sexologist) {
    attached.push([t('s_14'), '…'].join(''))
}

if(answers.value[1].hrt_certificate) attached.push(t('s_20'))
if(answers.value[1].pts_guidelines ) attached.push(t('s_21'))
if(answers.value[1].long_guidelines) attached.push(t('s_22'))

if (!answers.value[0].is_new_firstname && answers.value[1].name_change_confirmation) {
    attached.push(t('s_23'))
}
if (answers.value[1].proving_documents) {
    attached.push(answers.value[1].proving_documents_type ? { A: 'Wydruk z portali społecznościowych', B: 'Identyfikator z miejsca pracy', C: 'Wydruk z portalu USOS' }[answers.value[1].proving_documents_type] : t('s_24'))
}


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
    <p class="downloads-info">Wydrukuj {{ documents.length > 1 ? 'oba poniższe dokumenty i podpisz je' : 'poniższy dokument i podpisz go' }} – własnoręcznie i czytelnie</p>
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
    <p class="downloads-info">Dodatkowo przygotuj:</p>
    <ul>
        <li v-for="attachment of attached">{{ attachment }}</li>
    </ul>
    <div class="docs-instruction">
        <p>Gdy przygotujesz wszystkie dokumenty, możesz je dostarczyć do sądu na dwa sposoby:</p>
        <details>
            <summary>Zanieść osobiście</summary>
            <p>
                Dokumenty możesz zanieść bezpośrednio do sądu i złożyć na biurze podawczym. Miej ze sobą <b>dodatkową kserokopię wniosku</b>, na którym w sądzie przybita zostanie pieczątka potwierdzająca jego złożenie.
            </p>
            <p v-if="answers[2].chosen_court">
                Adres sądu: {{ courts[answers[2].chosen_court]?.address?.replace('\n', ', ') }}
            </p>
        </details>
        <details>
            <summary>Wysłać pocztą</summary>
            <ol>
                <li>
                    Zaadresuj kopertę poniższymi danymi: <br/>
                    <div class="address">
                        Nadawca: <br />
                        <span>{{ [answers[2].birth_name, answers[2].birth_surname].map(normalize).join(' ') }}</span> <br/>
                        <span>
                            {{ [answers[2].address_1, answers[2].address_2, (answers[2].zip_code || '........') + ' ' + (answers[2].city || '...................')]
                                .map(normalize)
                                .filter(x => x)
                                .join('\n')
                            }}
                        </span>
                    </div>
                    <div class="address">
                        Adresat: <br />
                        <span>{{ answers[2].chosen_court + '\nWydział Cywilny' }}</span> <br/>
                        <span>{{ courts[answers[2].chosen_court]?.address }}</span>
                    </div>
                </li>
                <li>Włóż wszystkie dokumenty do koperty</li>
                <li>Wyślij ją w dowolnym oddziale Poczty Polskiej jako list polecony</li>
                <li>Zachowaj podbite potwierdzenie nadania</li>
            </ol>
        </details>
    </div>
</template>
