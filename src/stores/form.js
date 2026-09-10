import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import steps from '../steps.yaml'
import { isShown } from '../helpers/misc'
import validators from '../helpers/validation'

const initAnswers = () => steps.map(() => ({}))

const validateAnswer = (q, i, answers, parent) => {
    const parentForSubanswers = q.name
    const subanswers = q.subquestions ? q.subquestions.flatMap(q => validateAnswer(q, i, answers, parentForSubanswers)) : []

    if (q.showIf && !isShown(q.showIf, answers, i, parent)) {
        return subanswers
    }
    const answer = answers[i][q.name]
    if (!q.filledIfAny && q.type === 'checkbox' && answer === undefined) {
        return subanswers
    }
    const isFilled = q.filledIfAny
        ? (_, answers) => q.filledIfAny.some(answerName => answers[i][answerName])
        : (q.type === 'checkbox' ? () => true : q.type === 'month' ? (([month, year] = []) => month && year) : a => a)
    if (!isFilled(answer, answers)) {
        return ['unfilled', ...subanswers]
    }
    if (!q.validation || validators[q.validation].every(validator => validator(answer, answers))) {
        return ['valid', ...subanswers]
    }
    return ['invalid', ...subanswers]
}

export default defineStore('form', () => {

    const answers = ref(initAnswers())

    const clearAnswers = () => {
        answers.value = initAnswers()
    }

    const answerStatuses = computed(() => steps.map(
        ({ questions }, i) => questions.flatMap(
            q => validateAnswer(q, i, answers.value)
        )
    ))

    const anyAnswers = computed(() => answerStatuses.value.some(
        statuses => statuses.some(status => status !== 'unfilled')
    ))

    const anyInvalid = computed(() => answerStatuses.value
        .filter((_, i) => !steps[i].showIf || isShown(steps[i].showIf, answers.value))
        .some(statuses => statuses.some(status => status === 'invalid'))
    )

    const anyIncomplete = computed(() => answerStatuses.value
        .filter((_, i) => !steps[i].showIf || isShown(steps[i].showIf, answers.value))
        .some(statuses => statuses.some(status => status === 'unfilled'))
    )


    const exportAnswers = (filename) => {
        const link = document.createElement('a')
        const file = new Blob([JSON.stringify(answers.value)], {
            type: "application/json",
        })
        link.href = URL.createObjectURL(file)
        link.download = filename + '.json'
        link.click()
        URL.revokeObjectURL(file)
    }

    return {
        answers, // state
        answerStatuses, anyAnswers, anyInvalid, anyIncomplete, // getters
        clearAnswers, exportAnswers, // actions
    }
}, {
    persist: {
        onPersistError: () => {
            // TODO this doesn't work for now, but it should when new version of PiniaPluginPersistedstate releases
        },
        afterHydrate: (ctx) => {
            // TODO data needs to be validated upon hydration as user can put anything in localStorage
            // this is the stub of the validation, but it certainly will need to be expanded
            steps.forEach((_, i) => {
                if (!ctx.store.answers[i]) {
                    ctx.store.answers[i] = {}
                }
            })
        }
    }
})
