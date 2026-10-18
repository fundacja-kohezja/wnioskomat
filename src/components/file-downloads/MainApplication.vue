<script setup>
import { storeToRefs } from 'pinia'

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

</script>

<template>
    <FileDownloads :documents="documents">
        <p v-if="answers[0].is_underage" class="docs-instruction">
            Na końcu tego wniosku są potrzebne dwa podpisy – musi się podpisać także drugi rodzic.
        </p>
        <hr />
        <p class="docs-instruction">Dodatkowo przygotuj:</p>
        <ul class="docs-instruction-list">
            <li>Dowód uiszczenia opłaty sądowej</li>
            <li>Skrócony odpis aktu urodzenia</li>
            <li v-if="answers[1].psychologist">Opinię psychologa</li>
            <li v-if="answers[1].psychologist_sexologist">Opinię psychologa-seksuologa</li>
            <li v-if="!answers[1].psychologist && !answers[1].psychologist_sexologist">Opinię psychologa/psychologa-seksuologa</li>
            <li v-if="answers[1].psychiatrist">Zaświadczenie od psychiatry</li>
            <li v-if="answers[1].sexologist">Zaświadczenie od seksuologa</li>
            <li v-if="!answers[1].psychiatrist && !answers[1].sexologist">Zaświadczenie od psychiatry/seksuologa</li>
            <li v-if="answers[0].is_underage && answers[1].wpath_guidelines">
                Ramowe zalecenia panelu ekspertów
                <details>
                    <summary>Informacje i link do pobrania</summary>
                    <p>
                        Pobierz: <a href="/ramowe-zalecenia-nieletni/Ramowe-zalecenia-dotyczace-procesu-opieki-nad-zdrowiem-nastoletnich-osob-transplciowych-i-niebinarnych-2025.pdf" download="">Ramowe zalecenia dotyczące procesu opieki nad zdrowiem nastoletnich osób transpłciowych (T) i&nbsp;niebinarnych (NB) doświadczających dysforii płciowej — stanowisko panelu ekspertów</a>
                    </p>
                    <p>
                        Dokument jest dostępny na licencji <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>, <a href="https://doi.org/10.5603/ep.104289" target="_blank">źródło <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>
                    </p>
                </details>
            </li>
            <li v-if="!answers[0].is_underage && answers[1].pts_guidelines">
                Zalecenia Polskiego Towarzystwa Seksuologicznego
                <details>
                    <summary>Informacje i link do pobrania</summary>
                    <p>
                        Pobierz: <a href="/zalecenia-pts/Grabski_PsychiatrPolOnlineFirstNr187.pdf_____5f7ad3b021cb6.pdf" download>Zalecenia PTS dotyczące opieki nad zdrowiem dorosłych osób transpłciowych</a>
                    </p>
                    <p>
                        Dokument jest dostępny na licencji <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY 4.0 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>, <a href="https://doi.org/10.12740/PP/OnlineFirst/125785" target="_blank">źródło <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>
                    </p>
                </details>
            </li>
            <li v-if="answers[1].long_guidelines">
                Publikację „Postępowania w sprawach o uzgodnienie płci. Przewodnik”
                <details>
                    <summary>Informacje i link do pobrania</summary>
                    <p>
                        Pobierz: <a href="/przewodnik/Postepowania_w_sprawach_o_uzgodnienie_plci_Przewodnik_www.pdf" download>Postępowania w sprawach o uzgodnienie płci. Przewodnik</a>
                    </p>
                    <p>
                        Dokument jest dostępny na licencji <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC BY-SA 3.0 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>, <a href="https://bip.brpo.gov.pl/pl/content/postepowania-w-sprawach-o-uzgodnienie-plci-przewodnik" target="_blank">źródło <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path></svg></a>
                    </p>
                    <p>Koszty drukowania tego dokumentu można ograniczyć, drukując 4 strony tekstu na jednej stronie arkusza papieru dwustronnie.</p>
                </details>
            </li>
            <li v-if="answers[1].hrt_certificate">Zaświadczenie o wdrożeniu terapii hormonalnej</li>
            <li v-if="!answers[0].is_new_firstname && answers[1].name_change_confirmation">Decyzję o zmianie imienia</li>
            <li v-if="answers[1].proving_documents">{{ { A: 'Wydruk z portali społecznościowych', B: 'Identyfikator z miejsca pracy', C: 'Wydruk z portalu USOS', D: 'Wydruk ze szkoły' }[answers[1].proving_documents_type] || 'Dokumenty świadczące o funkcjonowaniu w otoczeniu jako osoba danej płci' }}</li>
        </ul>
        <hr />
        <div class="docs-instruction">
            <p>Wniosek z załącznikami można dostarczyć do sądu na dwa sposoby:</p>
            <details>
                <summary>Zanieść osobiście</summary>
                <p>
                    Dokumenty można zanieść bezpośrednio do sądu i złożyć na biurze podawczym. Miej ze sobą <b>dodatkową kserokopię wniosku</b>, na którym w sądzie przybita zostanie pieczątka potwierdzająca jego złożenie.
                </p>
                <p v-if="answers[2].court_address">
                    Adres sądu: {{ normalize(answers[2].court_address) }}{{ answers[2].court_zip_code || answers[2].court_city ? (', ' + normalize(answers[2].court_zip_code) + ' ' + normalize(answers[2].court_city)) : '' }}
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
                                {{ normalize(answers[2].chosen_court) || 'Sąd Rejonowy w ......................' }}<br/>Wydział Cywilny<br/>{{ normalize(answers[2].court_address) || '...................' }}<br/>{{ normalize(answers[2].court_zip_code) || '........' }} {{ normalize(answers[2].court_city) || '...................' }}
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
