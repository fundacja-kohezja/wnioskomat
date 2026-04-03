<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import useFormStore from '../stores/form'
import generateDoc from '../helpers/generateDoc'

const emit = defineEmits(['goToForm'])

const { t } = useI18n()
const { answers } = storeToRefs(useFormStore())

const doc = generateDoc(answers.value)

</script>

<template>
    <div class="cols-layout">
        <div class="side-pane">
            <h2>Gotowe! Oto Twój wniosek</h2>
            <div class="generated-doc">
                <div class="doc-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Wniosek o sprostowanie aktu urodzenia
                </div>
                <!-- <button>Podgląd</button> -->
                <button @click="doc.save('wniosek.pdf')" class="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    {{ t('download_pdf') }}
                </button>
            </div>
            <nav class="prev-next">
                <button @click="emit('goToForm')" class="btn-link prev">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Wróć do edycji
                </button>
            </nav>
        </div>
        <div class="questions">
            <!-- <h3>Co dalej?</h3>
            <p>Sekcja w przygotowaniu</p> -->
        </div>
    </div>
</template>
