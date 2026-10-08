<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// import { storeToRefs } from 'pinia'

// import usePrefsStore from '../stores/prefs'
import FurtherStepsPl from './further-steps/FurtherStepsPl.md'
// import FurtherStepsEn from './further-steps/FurtherStepsEn.md'
// import FurtherStepsUk from './further-steps/FurtherStepsUk.md'

const { t } = useI18n()

// bring commented code back when there are translations
// const { selectedLang } = storeToRefs(usePrefsStore())

// load these dynamically?
// const furtherSteps = { pl: FurtherStepsPl, en: FurtherStepsEn, uk: FurtherStepsUk }

const heading = ref()
const content = ref()
const openness = inject('openness')
onMounted(() => {
    heading.value.scrollIntoView({ block: 'nearest' })
    content.value.querySelectorAll('details').forEach((el, i) => {
        el.open = openness[i]
    })
})

onBeforeUnmount(() => {
    content.value.querySelectorAll('details').forEach((el, i) => {
        openness[i] = el.open
    })
})

</script>

<template>
    <div class="further-steps-wrap">
        <h2 ref="heading">{{ t('further_steps') }}</h2>
        <div class="further-steps" ref="content">
            <!-- <component :is="furtherSteps[selectedLang]" /> -->
            <FurtherStepsPl />
        </div>
    </div>
</template>
