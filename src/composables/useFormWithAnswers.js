import { computed, ref, watch } from 'vue'
import { checkForAnyFilled, checkForAnyWithStatus, getAnswerStatuses } from '../helpers/answers'

export default (steps) => {
    const initAnswers = () => steps.map(() => ({}))

    const answers = ref(initAnswers())

    const clearAnswers = () => {
        answers.value = initAnswers()
    }

    const answerStatuses = computed(() => getAnswerStatuses(steps, answers.value))

    const anyAnswers = computed(() => checkForAnyFilled(answerStatuses.value))
    const anyInvalid = computed(() => checkForAnyWithStatus(answerStatuses.value, answers.value, steps, 'invalid'))
    const anyIncomplete = computed(() => checkForAnyWithStatus(answerStatuses.value, answers.value, steps, 'unfilled'))

    const ignoreWarning = ref(false)
    watch([anyInvalid, anyIncomplete], () => {
        ignoreWarning.value = false
    })

    return {
        answers, ignoreWarning,
        answerStatuses, anyAnswers, anyInvalid, anyIncomplete,
        clearAnswers,
    }
}
