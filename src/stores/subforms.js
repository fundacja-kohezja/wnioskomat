import { defineStore } from 'pinia'

import mainApplication from '../forms/glownyWniosek.yml'
import expemtion from '../forms/kosztyZwolnienie.yml'
import serviceProxy from '../forms/posrednikDoreczen.yml'
import wniosekOWydaniePisma from '../forms/wniosekOWydaniePisma.yml'
import useFormWithAnswers from '../composables/useFormWithAnswers'

const config = {
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
}

export const useMainApplicationFormStore = defineStore('mainApplicationForm', () => useFormWithAnswers(mainApplication), config)
export const useExemptionFormStore = defineStore('exemptionForm', () => useFormWithAnswers(expemtion), config)
export const useServiceProxyFormStore = defineStore('serviceProxyForm', () => useFormWithAnswers(serviceProxy), config)
export const useWniosekOWydaniePismaFormStore = defineStore('wniosekOWydaniePismaForm', () => useFormWithAnswers(wniosekOWydaniePisma), config)

export const subforms = [
    useMainApplicationFormStore,
    useExemptionFormStore,
    useServiceProxyFormStore,
]
