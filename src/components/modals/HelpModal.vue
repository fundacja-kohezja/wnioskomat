<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import BaseModal from './BaseModal.vue'
import usePrefsStore from '../../stores/prefs'
import pl from '../../locales/help/pl.html?raw'
import en from '../../locales/help/en.html?raw'
import uk from '../../locales/help/uk.html?raw'

const { t } = useI18n()

const { selectedLang } = storeToRefs(usePrefsStore())

const helpContents = { pl, en, uk }

</script>

<template>
    <BaseModal :title="t('help')">
        <div v-html="helpContents[selectedLang]" class="modal-contents"></div>
    </BaseModal>
</template>
