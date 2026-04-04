import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import steps from '../steps'

const initAnswers = () => steps.map(() => ({}))

const validateAnswer = (q, i, id, answers) => {
    const subanswers = q.subquestions ? q.subquestions.flatMap((q, j) => validateAnswer(q, i, id+'_'+j, answers)) : []

    if (q.showIf && !q.showIf(answers)) {
        return subanswers
    }
    const answer = answers[i][id]
    if (!q.filled && q.type === 'checkbox' && answer === undefined) {
        return subanswers
    }
    const isFilled = q.filled || (q.type === 'checkbox' ? () => true : a => a)
    if (!isFilled(answer, answers)) {
        return ['unfilled', ...subanswers]
    }
    if (!q.valid || q.valid.every(validator => validator(answer))) {
        return ['valid', ...subanswers]
    }
    return ['invalid', ...subanswers]
}

export default defineStore('form', () => {
    // TODO versioning & migrations

    const answers = ref(initAnswers())

    const clearAnswers = () => {
        answers.value = initAnswers()
    }

    const answerStatuses = computed(() => steps.map(
        ({ questions }, i) => questions.flatMap(
            (q, j) => validateAnswer(q, i, 'a_'+j, answers.value)
        )
    ))

    const anyAnswers = computed(() => answerStatuses.value.some(
        statuses => statuses.some(status => status !== 'unfilled')
    ))

    return {
        answers, // state
        answerStatuses, anyAnswers, // getters
        clearAnswers, // actions
    }
}, {
    persist: {
        onPersistError: () => {
            // TODO this doesn't work for now, but it should when new version of PiniaPluginPersistedstate releases
        },
    }
})
