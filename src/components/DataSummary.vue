<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import SummaryItem from './SummaryItem.vue'
import useFormStore from '../stores/form'
import steps from '../steps'

const { t } = useI18n()

const { answers } = storeToRefs(useFormStore())

</script>

<template>
    <template v-for="(step, i) of steps">
        <h3 v-if="step.hasSummaryHeading !== false">{{ t('step_'+i+'_summary') }}</h3>
        <ul v-if="step.listInSummary">
            <li v-for="(q, j) of step.questions">
                <SummaryItem :label="t('q_'+i+'_'+j)" :question="q" :answer="answers[i]['a_'+j]" />
            </li>
        </ul>
        <template v-else>
            <div v-for="(q, j) of step.questions">{{ t('q_'+i+'_'+j) }} <b>{{ answers[i]['a_'+j] }}</b></div>
        </template>
    </template>
</template>
