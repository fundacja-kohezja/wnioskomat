<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import useFormStore from '../stores/form'
import { isShown } from '../helpers/misc'
import validators from '../helpers/validation'
import datasets from '../helpers/datasets'
import MonthPicker from './MonthPicker.vue'
import RepeaterField from './RepeaterField.vue'

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

const validationError = computed(() => {
    if (!value.value) return

    const validation = props.question.validation
    if (!validation) return

    for (const i in validators[validation]) {
        if (!validators[validation][i](value.value, answers.value)) {
            return t('validation_'+validation+'_'+i)
        }
    }
})

</script>

<template>
    <div v-if="question.heading || question.subheading">
        <h3 v-if="question.heading" class="section-heading">{{ question.heading }}</h3>
        <p v-if="question.subheading" class="help-text">{{ question.subheading }}</p>
    </div>
    <div
        v-show="!question.showIf || isShown(question.showIf, answers, step, answerNumber)"
        v-bind="$attrs"
        :class="{ 'has-validation-error': validationError }"
    >
        <RepeaterField
            v-if="question.type === 'repeater'"
            :question="question"
            :step="step"
            :answer-number="answerNumber"
            v-model="value"
        />
        <label
            v-else-if="question.type === 'checkbox'"
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
            <span>{{ question.label }}</span>
        </label>
        <label
            v-else-if="question.type === 'date'"
            class="text-input"
        >
            <span>{{ question.label }}</span>
            <input type="date" v-model="value" />
        </label>
        <label
            v-else-if="question.type === undefined"
            class="text-input"
        >
            <span v-if="question.label">{{ question.label }}</span>
            <span
                v-if="question.prefix"
                class="input-with-prefix"
            >
                <span>{{ question.prefix }}</span>
                <input type="text" v-model="value" />
            </span>
            <span
                v-else-if="question.suffix"
                class="input-with-suffix"
            >
                <input type="text" v-model="value" />
                <span>{{ question.suffix }}</span>
            </span>
            <input
                v-else
                type="text"
                v-model.lazy.trim="value"
                :list="question.datalist ? ('q_'+step+'_'+answerNumber+'_datalist') : undefined"
                :placeholder="question.placeholder"
            />
        </label>
        <label
            v-else-if="question.type === 'textarea'"
            class="text-input"
        >
            <span v-if="question.label">{{ question.label }}</span>
            <textarea v-model.lazy="value" rows="4"></textarea>
        </label>
        <fieldset v-else-if="question.type === 'month'">
            <legend v-if="question.label">{{ question.label }}</legend>
            <MonthPicker v-model="value" />
        </fieldset>
        <fieldset v-else-if="question.type === 'radio' || question.type === 'radio_featured'">
            <legend v-if="question.label">{{ question.label }}</legend>
            <div class="radio-buttons" :class="{ featured: question.type === 'radio_featured' }">
                <label class="radio-button" v-for="(optionLabel, option) in question.options">
                    <input type="radio" v-model="value" :value="option" />
                    <span>{{ optionLabel }}</span>
                </label>
            </div>
        </fieldset>
        <datalist v-if="question.datalist" :id="'q_'+step+'_'+answerNumber+'_datalist'">
            <option v-for="item of datasets[question.datalist]" :value="item"></option>
        </datalist>
        <div v-if="validationError" class="validation-message">{{ validationError }}</div>
        <p v-if="question.description" class="help-text">
            {{ question.description }}
            <a v-if="question.descLink" :href="question.descLink" target="_blank">
                {{ question.descLinkText }}
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
    <details v-if="question.extraInfo">
        <summary>{{ question.extraInfo.title }}</summary>
        <p v-for="paragraph of question.extraInfo.content">
            {{ paragraph }}
        </p>
    </details>
</template>
