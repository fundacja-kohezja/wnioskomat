<script setup>
import { useI18n } from 'vue-i18n'
import { nextTick, ref } from 'vue'

import BaseModal from './BaseModal.vue'
import useFormStore from '../../stores/form'

const { t } = useI18n()

const { anyAnswers, exportAnswers, clearAnswers } = useFormStore()

const exited = ref(false)
const storageLength = ref(localStorage?.length)

const eraseData = () => {
    clearAnswers()
    nextTick(() => {
        localStorage.clear()
        storageLength.value = -1
    })
}

const quit = () => {
    window.close()
    exited.value = true
}

</script>

<template>
    <BaseModal :title="t('exiting')">
        <div class="modal-contents">
            <template v-if="anyAnswers">
                <p>{{ t('exiting_desc') }}</p>
                <p>{{ t('exiting_desc_2') }}</p>
                <button class="btn-primary" @click="exportAnswers(t('backup_filename'))">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    {{ t('download_backup') }}
                </button>
            </template>
            <h3 v-if="storageLength !== 0">{{ t('clearing_data') }}</h3>
            <p v-if="storageLength === -1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                </svg>
                Usunięto wszystkie dane Wnioskomatu z pamięci przeglądarki.
            </p>
            <template v-else-if="storageLength">
                <p>{{ t('clearing_data_desc') }}</p>
                <button class="btn-destructive" @click="eraseData">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                    </svg>
                    {{ t('clear_data') }}
                </button>
            </template>
            <p v-else>
                W pamięci przeglądarki nie ma obecnie zapisanych żadnych danych z Wnioskomatu.
            </p>
            <h3 v-if="storageLength !== 0 && storageLength !== undefined">{{ t('all_done') }}</h3>
            <p v-if="exited">
                {{ t('may_quit') }}
            </p>
            <button v-else class="btn" @click="quit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                    <path d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" />
                    <path d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" />
                </svg>
                {{ t('finish_quit') }}
            </button>
        </div>
    </BaseModal>
</template>
