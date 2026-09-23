import { defineStore } from 'pinia'

import mainApplication from '../forms/glownyWniosek.yml'
import exemption from '../forms/kosztyZwolnienie.yml'
import serviceProxy from '../forms/posrednikDoreczen.yml'
import addressChange from '../forms/zmianaAdresu.yml'
import remoteTrial from '../forms/rozprawaZdalna.yml'
import rescheduleTrial from '../forms/zmianaTerminuRozprawy.yml'
import urgency from '../forms/przyspieszenieSprawy.yml'
import exemptionRejectionJustification from '../forms/uzasadnienieOddaleniaZwolnienia.yml'
import returnDocuments from '../forms/zwrotDokumentow.yml'
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
export const useAddressChangeFormStore = defineStore('addressChangeForm', () => useFormWithAnswers(addressChange), config)
export const useRemoteTrialFormStore = defineStore('remoteTrialForm', () => useFormWithAnswers(remoteTrial), config)
export const useRescheduleTrialFormStore = defineStore('rescheduleTrialForm', () => useFormWithAnswers(rescheduleTrial), config)
export const useUrgencyFormStore = defineStore('urgencyForm', () => useFormWithAnswers(urgency), config)
export const useExemptionRejectionJustificationFormStore = defineStore('exemptionRejectionJustificationForm', () => useFormWithAnswers(exemptionRejectionJustification), config)
export const useReturnDocumentsFormStore = defineStore('returnDocumentsForm', () => useFormWithAnswers(returnDocuments), config)

export const subforms = [
    useMainApplicationFormStore,
    useExemptionFormStore,
    useServiceProxyFormStore,
    useAddressChangeFormStore,
    useRemoteTrialFormStore,
    useRescheduleTrialFormStore,
    useUrgencyFormStore,
    useExemptionRejectionJustificationFormStore,
    useReturnDocumentsFormStore
]
