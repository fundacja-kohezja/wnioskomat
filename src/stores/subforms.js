import { defineStore } from 'pinia'

import mainApplication from '../forms/glownyWniosek.yml'
import exemption from '../forms/kosztyZwolnienie.yml'
import serviceProxy from '../forms/posrednikDoreczen.yml'
import remoteTrial from '../forms/rozprawaZdalna.yml'
import rescheduleTrial from '../forms/zmianaTerminuRozprawy.yml'
import wniosekOWydaniePisma from '../forms/wniosekOWydaniePisma.yml'
import useFormWithAnswers from '../composables/useFormWithAnswers'

const config = {
    persist: {
        omit: ['ignoreWarning'],
        onPersistError: () => {
            // TODO this doesn't work for now, but it should when new version of PiniaPluginPersistedstate releases
        },
        afterHydrate: (ctx) => {
            ctx.store.validate()
        }
    }
}

export const useMainApplicationFormStore = defineStore('mainApplicationForm', () => useFormWithAnswers(mainApplication), config)
export const useExemptionFormStore = defineStore('exemptionForm', () => useFormWithAnswers(exemption), config)
export const useServiceProxyFormStore = defineStore('serviceProxyForm', () => useFormWithAnswers(serviceProxy), config)
export const useRemoteTrialFormStore = defineStore('remoteTrialForm', () => useFormWithAnswers(remoteTrial), config)
export const useRescheduleTrialFormStore = defineStore('rescheduleTrialForm', () => useFormWithAnswers(rescheduleTrial), config)
export const useWniosekOWydaniePismaFormStore = defineStore('wniosekOWydaniePismaForm', () => useFormWithAnswers(wniosekOWydaniePisma), config)

export const subforms = [
    useMainApplicationFormStore,
    useExemptionFormStore,
    useServiceProxyFormStore,
    useRemoteTrialFormStore,
    useRescheduleTrialFormStore,
]
