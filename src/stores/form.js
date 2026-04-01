import steps from '../steps'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

const createAnswerFields = q => ({
    ...q.subquestions ? { subanswers: q.subquestions.map(createAnswerFields) } : {},
    ...q.initialValue ? { answer: q.initialValue } : {},
})

export default defineStore('form', () => {

    const answers = reactive(
        steps.map(({ questions }) => questions.map(createAnswerFields))
    )

    return { answers }
})
