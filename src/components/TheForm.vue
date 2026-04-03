<script setup>
import { useI18n } from 'vue-i18n'
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import useFormStore from '../stores/form'
import AnswerInput from './AnswerInput.vue'
import DataSummary from './DataSummary.vue'
import steps from '../steps'

const emit = defineEmits(['goToStart', 'goToEnd'])

const { t } = useI18n()

const { answers, stepStatuses } = storeToRefs(useFormStore())

const heading = ref()
const currentIndex = ref(0)
const currentStep = computed(() => steps[currentIndex.value])

watch(currentIndex, currentIndex => {
    if (currentIndex > steps.length) {
        emit('goToEnd')
        return
    }
    nextTick(() => heading.value.scrollIntoView({ block: 'nearest' }))
})

</script>

<template>
    <div class="cols-layout">
        <nav class="side-nav">
            <button class="nav-link" @click="emit('goToStart')">{{ t('start') }}</button>
            <ol>
                <li v-for="(_, index) of steps" :class="{ current: currentIndex === index }" :aria-current="currentIndex === index ? true : undefined">
                    <span class="step">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" :class="stepStatuses[index]">
                            <title>{{ t('step_'+stepStatuses[index]) }}</title>
                            <path v-if="stepStatuses[index] === 'completed'" fill="currentColor" fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                            <circle v-else cx="12" cy="12" r="10" fill="none" stroke-width="1.5" stroke="currentColor" />
                        </svg>
                        <button class="nav-link" @click="currentIndex = index">{{ t('step_'+index) }}</button>
                    </span>
                </li>
            </ol>
            <button @click="currentIndex = steps.length" :aria-current="currentIndex === steps.length ? true : undefined" :class="{ current: currentIndex === steps.length }" class="nav-link">{{ t('summary') }}</button>
        </nav>
        <div class="questions">
            <div class="step-title" ref="heading">
                <template v-if="currentIndex < steps.length">
                    <h2>{{ t('step_'+currentIndex) }}</h2>
                    <p v-if="currentStep.hasDescription" class="step-description">{{ t('step_'+currentIndex+'_desc') }}</p>
                </template>
                <h2 v-else>{{ t('summary') }}</h2>
            </div>
            <form v-if="currentIndex < steps.length">
                <AnswerInput
                    v-for="(q, i) of currentStep.questions"
                    v-model="answers[currentIndex]['a_'+i]"
                    :question="q"
                    :step="currentIndex"
                    :answer-number="'a_'+i"
                />
            </form>
            <DataSummary v-else />
            <nav class="prev-next">
                <button v-if="currentIndex > 0" class="btn-link prev" @click="currentIndex--">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    {{ t('prev') }}
                </button>
                <button class="btn-primary next" @click="currentIndex++">
                    {{ t(currentIndex === steps.length - 1 ? 'summary' : (currentIndex === steps.length ? 'generate' : 'next')) }}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </nav>
        </div>
    </div>
</template>
