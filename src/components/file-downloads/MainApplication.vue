<script setup>
import { storeToRefs } from 'pinia'

// TODO load it asynchronously?
import { courts } from '@/helpers/datasets'

import { useMainApplicationFormStore } from '@/stores/subforms'
import generateMainDoc from '@/doc-generators/mainApplication'
import generateDocForUnderage from '@/doc-generators/underageApplication'
import generateProxyDoc from '@/doc-generators/serviceProxy'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

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

const attached = ['Dowód uiszczenia opłaty sądowej', 'Skrócony odpis aktu urodzenia']

if (answers.value[1].psychologist) {
    attached.push(['Opinię ', 'psychologa'].join(''))
}
if (answers.value[1].psychologist_sexologist) {
    attached.push(['Opinię ', 'psychologa-seksuologa'].join(''))
}
if (!answers.value[1].psychologist && !answers.value[1].psychologist_sexologist) {
    attached.push(['Opinię ', '…'].join(''))
}

if (answers.value[1].psychiatrist) {
    attached.push(['Zaświadczenie od ', 'psychiatry'].join(''))
}
if (answers.value[1].sexologist) {
    attached.push(['Zaświadczenie od ', 'seksuologa'].join(''))
}
if (!answers.value[1].psychiatrist && !answers.value[1].sexologist) {
    attached.push(['Zaświadczenie od ', '…'].join(''))
}

if(answers.value[1].hrt_certificate) attached.push('Zaświadczenie o wdrożeniu terapii hormonalnej')
if (answers.value[0].is_underage) {
    if(answers.value[1].wpath_guidelines) attached.push('Ramowe zalecenia panelu ekspertów')
} else {
    if(answers.value[1].pts_guidelines) attached.push('Zalecenia Polskiego Towarzystwa Seksuologicznego')
}
if(answers.value[1].long_guidelines) attached.push('Publikację „Postępowania w sprawach o uzgodnienie płci. Przewodnik”')

if (!answers.value[0].is_new_firstname && answers.value[1].name_change_confirmation) {
    attached.push('Decyzję o zmianie imienia')
}
if (answers.value[1].proving_documents) {
    attached.push(answers.value[1].proving_documents_type ? { A: 'Wydruk z portali społecznościowych', B: 'Identyfikator z miejsca pracy', C: 'Wydruk z portalu USOS', D: 'Wydruk ze szkoły' }[answers.value[1].proving_documents_type] : 'Dokumenty świadczące o funkcjonowaniu w otoczeniu jako osoba danej płci: …')
}


</script>

<template>
    <FileDownloads :documents="documents">
        <p v-if="answers[0].is_underage" class="docs-instruction">
            Na końcu tego wniosku są potrzebne dwa podpisy – musi się podpisać także drugi rodzic.
        </p>
        <hr />
        <p class="docs-instruction">Dodatkowo przygotuj:</p>
        <ul>
            <li v-for="attachment of attached">{{ attachment }}</li>
        </ul>
        <hr />
        <template v-if="answers[0].is_underage">
            <p class="docs-instruction">
                Wniosek można złożyć:
            </p>
            <ul>
                <li>wysyłając dokumenty listem poleconym</li>
                <li>dostarczając dokumenty do sądu osobiście i składając je na biurze podawczym – trzeba mieć wtedy ze sobą <b>dodatkową kserokopię wniosku</b>, na którym w sądzie przybita zostanie pieczątka potwierdzająca jego złożenie.</li>
            </ul>
        </template>
        <div class="docs-instruction" v-else>
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
                            <span>
                                {{ [answers[2].birth_name, answers[2].birth_surname].map(normalize).join(' ') }}<br />{{ [answers[2].address_1, answers[2].address_2, (answers[2].zip_code || '........') + ' ' + (answers[2].city || '...................')]
                                    .map(normalize)
                                    .filter(x => x)
                                    .join('\n')
                                }}
                            </span>
                        </div>
                        <div class="address">
                            Adresat: <br />
                            <span>
                                {{ answers[2].chosen_court + '\nWydział Cywilny' }}<br/>{{ courts[answers[2].chosen_court]?.address }}
                            </span>
                        </div>
                    </li>
                    <li>Włóż wszystkie dokumenty do koperty</li>
                    <li>Wyślij ją w dowolnym oddziale Poczty Polskiej jako list polecony</li>
                    <li>Zachowaj podbite potwierdzenie nadania</li>
                </ol>
            </details>
        </div>
    </FileDownloads>
</template>
