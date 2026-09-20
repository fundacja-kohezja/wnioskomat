<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import usePrefsStore from '../stores/prefs'
import FurtherStepsPl from './further-steps/FurtherStepsPl.vue'
import FurtherStepsEn from './further-steps/FurtherStepsEn.vue'
import FurtherStepsUk from './further-steps/FurtherStepsUk.vue'

const { t } = useI18n()
const { selectedLang } = storeToRefs(usePrefsStore())

// TODO load these dynamically?
const furtherSteps = { pl: FurtherStepsPl, en: FurtherStepsEn, uk: FurtherStepsUk }

const heading = ref()
onMounted(() => {
    heading.value.scrollIntoView({ block: 'nearest' })
})

</script>

<template>
    <div class="further-steps-wrap">
        <h2 ref="heading">{{ t('further_steps') }}</h2>
        <component :is="furtherSteps[selectedLang]" />
    </div>
</template>
