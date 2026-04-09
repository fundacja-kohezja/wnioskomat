<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import BaseModal from './BaseModal.vue'
import usePrefsStore from '../../stores/prefs'
import HelpPl from './help/HelpPl.vue'
import HelpEn from './help/HelpEn.vue'
import HelpUk from './help/HelpUk.vue'

const { t } = useI18n()

const { selectedLang } = storeToRefs(usePrefsStore())

// TODO load these dynamically?
const helpContents = { pl: HelpPl, en: HelpEn, uk: HelpUk }

</script>

<template>
    <BaseModal :title="t('help')">
        <div class="modal-contents">
            <component :is="helpContents[selectedLang]" />
        </div>
    </BaseModal>
</template>
