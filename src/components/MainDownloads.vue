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
import GeneratedDoc from './GeneratedDoc.vue'

const { t } = useI18n()
const { answers } = storeToRefs(useMainApplicationFormStore())

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

const attached = [t('s_10'), t('s_9')]

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
    <p class="downloads-info">Wydrukuj {{ documents.length > 1 ? 'oba poniższe dokumenty i podpisz je' : 'poniższy dokument i podpisz go' }} – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-for="document of documents" v-bind="document" />
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
