<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import AnswerInput from './AnswerInput.vue'

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
    formStore: {
        type: Object,
        required: true,
    },
})

const value = defineModel()

const { t } = useI18n()

const add = () => {
    if (!value.value) {
        value.value = [{}]
    } else {
        value.value.push({})
    }
}

const swap = (i, j) => {
    const first = value.value[i]
    const second = value.value[j]
    value.value[i] = second
    value.value[j] = first
}

onMounted(() => {
    if (!Array.isArray(value.value)) {
        value.value = []
    }
})

</script>

<template>
<div class="repeater" :class="{ 'has-nested-repeater': question.hasNestedRepeater }">
    <div v-if="question.label" class="repeater-label">{{ question.label }}</div>
    <template v-if="value">
        <div
            v-for="(items, i) of value"
            class="repeater-row"
        >
            <AnswerInput
                v-for="(field, j) of question.fields"
                class="repeater-subfield"
                :class="{ 'has-suffix-input': field.suffix }"
                :question="field"
                :step="step"
                :answer-number="answerNumber+'_'+j"
                :form-store="formStore"
                v-model="items[field.name]"
            />
            <div class="buttons-group">
                <button
                    type="button"
                    style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
                    v-if="value.length > 1"
                    :disabled="i === 0"
                    class="btn"
                    @click="swap(i, i-1)"
                    :aria-label="t('move_up')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" width="12" height="12">
                    <path d="m2 18.25 10-10 10 10" />
                    </svg>
                </button>
                <button
                    type="button"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
                    v-if="value.length > 1"
                    :disabled="i === value.length-1"
                    class="btn"
                    @click="swap(i, i+1)"
                    :aria-label="t('move_down')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" width="12" height="12">
                        <path d="m22 5.75-10 10-10-10" />
                    </svg>
                </button>
                <button
                    type="button"
                    class="btn btn-remove"
                    @click="value.splice(i, 1)"
                    :aria-label="t('remove_item')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                        <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </template>
    <button
        type="button"
        class="btn"
        @click="add"
    >
        {{ question.addLabel }}
    </button>
</div>
</template>
