<script setup>
import { storeToRefs } from 'pinia'
import usePrefsStore from '../stores/prefs'

const prefsStore = usePrefsStore()

const { importLocale, localesStatus } = prefsStore
const { selectedLang } = storeToRefs(prefsStore)

</script>

<template>
    <div v-if="localesStatus[selectedLang] === 'error'" lang="en" class="box warning">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>
        <p class="flex-wrap">
            There was an error fetching {{ selectedLang }} translation file
            <button @click="importLocale(selectedLang)" class="button">Try again</button>
        </p>
    </div>
</template>
