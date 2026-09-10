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
                    class="btn"
                    @click="value.splice(i, 1)"
                    :aria-label="t('remove_item')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" width="12" height="12">
                        <path d="M2 22 22 2M2 2l20 20" />
                    </svg>
                </button>
            </div>
        </div>
    </template>
    <button
        type="button"
        :class="question.hasNestedRepeater ? 'btn-secondary' : 'btn'"
        @click="add"
    >
        {{ question.addLabel }}
    </button>
</div>
</template>
