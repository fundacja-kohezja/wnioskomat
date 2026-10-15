<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import AnswerInput from './AnswerInput.vue'
import DataSummary from './DataSummary.vue'
import { isShown } from '../helpers/answers'
import DownloadsStep from './DownloadsStep.vue'

const props = defineProps({
    formName: {
        type: String,
        required: true,
    },
    steps: {
        type: Array,
        default: () => [],
    },
    formStore: {
        type: Object,
        required: true,
    },
    currentIndex: {
        type: Number,
    },
    hasSummary: Boolean,
    populationAvailability: String,
})

const emit = defineEmits(['decrementIndex', 'incrementIndex', 'populate'])

const { t } = useI18n()

const { answers } = storeToRefs(props.formStore)
const heading = ref()

const currentStep = computed(() => props.steps[props.currentIndex])
const isLastStep = computed(() => (props.hasSummary && props.currentIndex > props.steps.length) || (!props.hasSummary && props.currentIndex === props.steps.length))

onMounted(() => heading.value.scrollIntoView({ block: 'nearest' }))
watch(() => props.currentIndex, () => {
    nextTick(() => heading.value.scrollIntoView({ block: 'nearest' }))
})

const prevStep = () => {
    let index = props.currentIndex
    emit('decrementIndex')
    index--
    while (props.steps[index]?.showIf && !isShown(props.steps[index].showIf, answers.value)) {
        emit('decrementIndex')
        index--
    }
}

const nextStep = () => {
    let index = props.currentIndex
    emit('incrementIndex')
    index++
    while (props.steps[index]?.showIf && !isShown(props.steps[index].showIf, answers.value)) {
        emit('incrementIndex')
        index++
    }
}

</script>

<template>
    <main :class="isLastStep ? 'downloads' : 'questions'">
        <div class="step-title" ref="heading">
            <template v-if="currentIndex < steps.length">
                <h1>{{ currentStep.title }}</h1>
                <button
                    v-if="populationAvailability"
                    class="btn"
                    @click="emit('populate')"
                >
                    {{ t('fill') }} {{ currentStep.populate.label }}{{ populationAvailability === 'fill' ? '' : '…' }}
                </button>
                <p v-if="currentStep.description" class="step-description">{{ currentStep.description }}</p>
            </template>
            <h1 v-else-if="hasSummary && currentIndex === steps.length">{{ t('summary') }}</h1>
        </div>
        <form v-if="currentIndex < steps.length">
            <AnswerInput
                v-for="(q, i) of currentStep.questions"
                v-model="answers[currentIndex][q.name]"
                :question="q"
                :step="currentIndex"
                :answer-number="'a_'+i"
                :form-store="formStore"
            />
        </form>
        <DataSummary v-else-if="hasSummary && currentIndex === steps.length" />
        <DownloadsStep v-else :name="formName" :store="formStore" />
        <nav class="prev-next" :aria-label="t('prev_next')">
            <button v-if="currentIndex > 0" class="btn-link prev" @click="prevStep">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                    <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                {{ isLastStep ? t('prev_step') : t('prev') }}
            </button>
            <button v-if="!isLastStep" class="btn-primary next" @click="nextStep">
                {{ t('next_step') }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                    <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </nav>
    </main>
</template>
