<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { computedWithControl } from '@vueuse/core'

import { isShown } from '../helpers/answers'

const props = defineProps({
    steps: {
        type: Array,
        default: () => [],
    },
    formStore: {
        type: Object,
        required: true,
    },
    currentIndex: Number,
    hasSummary: Boolean,
})

const emit = defineEmits(['changeCurrentIndex'])

const { t } = useI18n()

const { answers, answerStatuses } = storeToRefs(props.formStore)

const allSteps = computed(() => props.hasSummary ? [
    ...props.steps,
     {
         title: t('summary'),
     },
] : props.steps)

const currentStep = computed(() => props.steps[props.currentIndex])
const downloadsIndex = computed(() => props.hasSummary ? props.steps.length + 1 : props.steps.length)
const statuses = computedWithControl(currentStep, () => {
    const statuses = answerStatuses.value.map(statuses => {
        if (statuses.includes('invalid')) return 'invalid'
        if (statuses.every(status => status === 'valid')) return 'completed'
        if (statuses.every(status => status === 'unfilled')) return 'empty'
        return 'partial'
    })
    if (props.hasSummary) {
        statuses.push(statuses.every((s, i) => (props.steps[i].showIf && !isShown(props.steps[i].showIf, answers.value)) || s === 'completed') ? 'completed' : 'empty')
    }
    return statuses
})
watch(() => answerStatuses.value[props.currentIndex], () => {
    if (statuses.value[props.currentIndex] === 'empty') return
    statuses.trigger() // TODO this makes them not update when modal clears answer data
})

</script>

<template>
    <ol>
        <template v-for="(step, index) of allSteps">
            <li v-if="!step.showIf || isShown(step.showIf, answers)" :class="{ current: currentIndex === index }" :aria-current="currentIndex === index ? true : undefined">
                <span class="step">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" :class="statuses[index]">
                        <title>{{ t('step_'+statuses[index]) }}</title>
                        <path v-if="statuses[index] === 'completed'" fill="currentColor" fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        <circle v-else cx="12" cy="12" r="10" fill="none" stroke-width="1.5" stroke="currentColor" />
                        <line v-if="statuses[index] === 'partial'" stroke-linecap="round" x1="9" y1="12" x2="15" y2="12" stroke-width="1.5" class="dash" />
                        <path v-if="statuses[index] === 'invalid'" fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.25m0 3.5h.008v.008H12v-.008Z" stroke-width="2" class="exclamation" />
                    </svg>
                    <button class="nav-link" @click="emit('changeCurrentIndex', index)">{{ step.title }}</button>
                </span>
            </li>
        </template>
    </ol>
    <span class="step final">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" :class="{ current: currentIndex === downloadsIndex }">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
        <button @click="emit('changeCurrentIndex', downloadsIndex)" :aria-current="currentIndex === downloadsIndex ? true : undefined" :class="{ current: currentIndex === downloadsIndex }" class="nav-link">
            {{ t('downloads') }}
        </button>
    </span>
</template>
