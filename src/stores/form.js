import { computed } from 'vue'
import { defineStore } from 'pinia'

import { subforms } from './subforms'

export default defineStore('form', () => {

    const formStores = subforms.map(useStore => useStore())

    const anyAnswers = computed(() => formStores.some(store => store.anyAnswers))

    const clearAnswers = () => {
        formStores.forEach(store => {
            store.clearAnswers()
        })
    }

    const exportAnswers = (filename) => {
        const answers = {}
        formStores.forEach(store => {
            answers[store.$id] = store.answers
        })
        const link = document.createElement('a')
        const file = new Blob([JSON.stringify(answers)], {
            type: "application/json",
        })
        link.href = URL.createObjectURL(file)
        link.download = filename + '.json'
        link.click()
        URL.revokeObjectURL(file)
    }

    return {
        anyAnswers, // getter
        clearAnswers, exportAnswers, // actions
    }
})
