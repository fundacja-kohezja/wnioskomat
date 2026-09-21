import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { subforms } from './subforms'

export default defineStore('form', () => {

    const formStores = subforms.map(useStore => useStore())

    /** @type import('vue').Ref< 'mainApplication' | 'exemption' | 'serviceProxy' | 'furtherSteps' > */
    const currentForm = ref('mainApplication')
    const currentStep = ref(0)

    const anyAnswers = computed(() => formStores.some(store => store.anyAnswers))

    const clearAnswers = () => {
        formStores.forEach(store => {
            store.clearAnswers()
        })
        currentForm.value = 'mainApplication'
        currentStep.value = 0

        // TODO wipe whole local storage, check if something else needs cleaning up not to leave any trace of visit
    }

    const exportAnswers = (filename) => {
        const data = {}
        formStores.forEach(store => {
            data[store.$id] = store.answers
        })
        data.currentForm = currentForm.value
        data.currentStep = currentStep.value
        const link = document.createElement('a')
        const file = new Blob([JSON.stringify(data)], {
            type: "application/json",
        })
        link.href = URL.createObjectURL(file)
        link.download = filename + '.json'
        link.click()
        URL.revokeObjectURL(file)
    }

    return {
        currentForm, currentStep, // state
        anyAnswers, // getter
        clearAnswers, exportAnswers, // actions
    }
}, { persist: true })
