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

    const exportAnswers = (filename) => {
        const link = document.createElement('a')
        const file = new Blob([JSON.stringify(answers.value)], {
            type: "application/json",
        })
        link.href = URL.createObjectURL(file)
        link.download = filename + '.json'
        link.click()
        link.href = URL.revokeObjectURL(file)
    }

    return {
        answers, // state
        answerStatuses, anyAnswers, // getters
        clearAnswers, exportAnswers, // actions
    }
}, {
    persist: {
        // TODO data needs to be validated upon hydration as user can put anything in localStorage
        onPersistError: () => {
            // TODO this doesn't work for now, but it should when new version of PiniaPluginPersistedstate releases
        },
    }
})
