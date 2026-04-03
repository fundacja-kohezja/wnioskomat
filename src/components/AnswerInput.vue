<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import useFormStore from '../stores/form'
import MonthPicker from './MonthPicker.vue'

const props = defineProps({
    question: {
        type: Object,
        required: true,
    },
    step: {
        type: Number,
        required: true,
    },
    answerNumber: {
        type: String,
        required: true,
    },
})

const value = defineModel()

const { answers } = storeToRefs(useFormStore())
const { t } = useI18n()

const labelId = computed(() => 'q_' + props.step + '_' + props.answerNumber.slice(2))

</script>

<template>
    <div v-if="question.hasHeading || question.hasSubheading">
        <h3 v-if="question.hasHeading" class="section-heading">{{ t(labelId+'_heading') }}</h3>
        <p v-if="question.hasSubheading" class="help-text">{{ t(labelId+'_subheading') }}</p>
    </div>
    <div
        v-show="!question.showIf || question.showIf(answers)"
        v-bind="$attrs"
    >
        <label
            v-if="question.type === 'checkbox'"
            class="checkbox"
        >
            <input
                v-if="question.isDisabled"
                type="checkbox"
                disabled
                :checked="question.initialValue"
            />
            <input
                v-else
                type="checkbox"
                v-model="value"
            />
            <span>{{ t(labelId) }}</span>
        </label>
        <label
            v-else-if="question.type === 'date'"
            class="text-input"
        >
            <span>{{ t(labelId) }}</span>
            <input type="date" v-model="value" />
        </label>
        <label
            v-else-if="question.type === 'text'"
            class="text-input"
        >
            <span>{{ t(labelId) }}</span>
            <span
                v-if="question.prefix"
                class="input-with-prefix"
            >
                <span>{{ question.prefix }}</span>
                <input type="text" v-model="value" />
            </span>
            <input
                v-else
                type="text"
                v-model="value"
                :list="question.datalist ? (labelId+'_datalist') : undefined"
                :placeholder="question.placeholder"
            />
        </label>
        <label
            v-else-if="question.type === 'textarea'"
            class="text-input"
        >
            <span>{{ t(labelId) }}</span>
            <textarea v-model="value" rows="4"></textarea>
        </label>
        <fieldset v-else-if="question.type === 'month'">
            <legend v-if="question.hasLabel !== false">{{ t(labelId) }}</legend>
            <MonthPicker v-model="value" />
        </fieldset>
        <fieldset v-else-if="question.type === 'radio' || question.type === 'radio_featured'">
            <legend v-if="question.hasLabel !== false">{{ t(labelId) }}</legend>
            <div class="radio-buttons" :class="{ featured: question.type === 'radio_featured' }">
                <label class="radio-button" v-for="option of question.options">
                    <input type="radio" v-model="value" :value="option" />
                    <span>{{ t(labelId+'_'+option) }}</span>
                </label>
            </div>
        </fieldset>
        <datalist v-if="question.datalist" :id="labelId+'_datalist'">
            <option v-for="item of question.datalist" :value="item"></option>
        </datalist>
        <p v-if="question.hasDescription" class="help-text">
            {{ t(labelId+'_desc') }}
            <a v-if="question.hasLinkInDescription" :href="t(labelId+'_desc_link')" target="_blank">
                {{ t(labelId+'_desc_link_text') }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                    <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                    <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                </svg>
            </a>
        </p>
        <template v-if="question.subquestions">
            <AnswerInput
                v-for="(subquestion, i) of question.subquestions"
                class="subquestion"
                :question="subquestion"
                :step="step"
                :answer-number="answerNumber+'_'+i"
                v-model="answers[step][answerNumber+'_'+i]"
            />
        </template>
    </div>
</template>
