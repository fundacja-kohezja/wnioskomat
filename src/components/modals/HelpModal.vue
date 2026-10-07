<script setup>
import { useI18n } from 'vue-i18n'
// import { storeToRefs } from 'pinia'

import BaseModal from './BaseModal.vue'
// import usePrefsStore from '../../stores/prefs'
import HelpPl from './help/HelpPl.md'
// import HelpEn from './help/HelpEn.md'
// import HelpUk from './help/HelpUk.md'

const { t } = useI18n()

// bring commented code back when there are translations
// const { selectedLang } = storeToRefs(usePrefsStore())

// load these dynamically?
// const helpContents = { pl: HelpPl, en: HelpEn, uk: HelpUk }

</script>

<template>
    <BaseModal :title="t('help')">
        <div class="modal-contents">
            <!-- <component :is="helpContents[selectedLang]" /> -->
            <HelpPl />
        </div>
    </BaseModal>
</template>
