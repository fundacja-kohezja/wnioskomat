<script setup>
import { computed, provide, onMounted, ref, watchEffect, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useModal } from 'vue-final-modal'
import { useEventListener, useResizeObserver } from '@vueuse/core'

import {
    useExemptionFormStore,
    useMainApplicationFormStore,
    useRemoteTrialFormStore,
    useServiceProxyFormStore,
    useRescheduleTrialFormStore,
    useAddressChangeFormStore,
    useUrgencyFormStore,
    useExemptionRejectionJustificationFormStore,
    useReturnDocumentsFormStore,
    useExtendDeadlineFormStore,
    useRequestCopyFormStore,
    useCopyUrgencyFormStore,
    useRejectionJustificationFormStore,
    useCorrectionFormStore,
} from '../stores/subforms'
import useFormStore from '../stores/form'
import mainApplicationsFormData from '../forms/glownyWniosek.yml'
import exemptionFormData from '../forms/kosztyZwolnienie.yml'
import serviceProxyFormData from '../forms/posrednikDoreczen.yml'
import addressChangeFormData from '../forms/zmianaAdresu.yml'
import remoteTrialFormData from '../forms/rozprawaZdalna.yml'
import rescheduleTrialFormData from '../forms/zmianaTerminuRozprawy.yml'
import extendDeadlineFormData from '../forms/wydluzenieTerminu.yml'
import urgencyFormData from '../forms/przyspieszenieSprawy.yml'
import exemptionRejectionJustificationFormData from '../forms/uzasadnienieOddaleniaZwolnienia.yml'
import requestCopyFormData from '../forms/wydanieOdpisu.yml'
import returnDocumentsFormData from '../forms/zwrotDokumentow.yml'
import copyUrgencyFormData from '../forms/wyslanieDoUSC.yml'
import correctionFormData from '../forms/sprostowaniePostanowienia.yml'
import rejectionJustificationFormData from '../forms/uzasadnienieOddalenia.yml'
import StepStatuses from './StepStatuses.vue'
import FormFields from './FormFields.vue'
import FurtherSteps from './FurtherSteps.vue'
import ConfirmModal from './modals/ConfirmModal.vue'

const emit = defineEmits(['goToStart'])

const { t } = useI18n()

const mainApplicationFormStore = useMainApplicationFormStore()
const exemptionFormStore = useExemptionFormStore()
const serviceProxyFormStore = useServiceProxyFormStore()
const addressChangeFormStore = useAddressChangeFormStore()
const remoteTrialFormStore = useRemoteTrialFormStore()
const rescheduleTrialFormStore = useRescheduleTrialFormStore()
const extendDeadlineFormStore = useExtendDeadlineFormStore()
const urgencyFormStore = useUrgencyFormStore()
const exemptionRejectionJustificationFormStore = useExemptionRejectionJustificationFormStore()
const requestCopyFormStore = useRequestCopyFormStore()
const returnDocumentsFormStore = useReturnDocumentsFormStore()
const copyUrgencyFormStore = useCopyUrgencyFormStore()
const correctionFormStore = useCorrectionFormStore()
const rejectionJustificationFormStore = useRejectionJustificationFormStore()

const forms = {
    mainApplication: {
        data: mainApplicationsFormData,
        store: mainApplicationFormStore,
        hasSummary: true,
    },
    exemption: {
        data: exemptionFormData,
        store: exemptionFormStore,
        hasSummary: false,
    },
    serviceProxy: {
        data: serviceProxyFormData,
        store: serviceProxyFormStore,
        hasSummary: false,
    },
    addressChange: {
        data: addressChangeFormData,
        store: addressChangeFormStore,
        hasSummary: false,
    },
    remoteTrial: {
        data: remoteTrialFormData,
        store: remoteTrialFormStore,
        hasSummary: false,
    },
    rescheduleTrial: {
        data: rescheduleTrialFormData,
        store: rescheduleTrialFormStore,
        hasSummary: false,
    },
    extendDeadline: {
        data: extendDeadlineFormData,
        store: extendDeadlineFormStore,
        hasSummary: false,
    },
    urgency: {
        data: urgencyFormData,
        store: urgencyFormStore,
        hasSummary: false,
    },
    exemptionRejectionJustification: {
        data: exemptionRejectionJustificationFormData,
        store: exemptionRejectionJustificationFormStore,
        hasSummary: false,
    },
    requestCopy: {
        data: requestCopyFormData,
        store: requestCopyFormStore,
        hasSummary: false,
    },
    returnDocuments: {
        data: returnDocumentsFormData,
        store: returnDocumentsFormStore,
        hasSummary: false,
    },
    copyUrgency: {
        data: copyUrgencyFormData,
        store: copyUrgencyFormStore,
        hasSummary: false,
    },
    correction: {
        data: correctionFormData,
        store: correctionFormStore,
        hasSummary: false,
    },
    rejectionJustification: {
        data: rejectionJustificationFormData,
        store: rejectionJustificationFormStore,
        hasSummary: false,
    },
}

const groups = {
    ongoing: [
        'exemption',
        'serviceProxy',
        'addressChange',
        'remoteTrial',
        'rescheduleTrial',
        'extendDeadline',
        'urgency',
        'exemptionRejectionJustification',
    ],
    finishing: [
        'requestCopy',
        'returnDocuments',
        'copyUrgency',
        'correction',
        'rejectionJustification',
    ],
}
const groupMap = {}
for (const group in groups) {
    groups[group].forEach(form => {
        groupMap[form] = group
    })
}

const mainApplicationNavContainer = ref()
const sideNav = ref()
const groupContainers = ref({})
const docNavContainers = ref({})

const { currentForm, currentStep } = storeToRefs(useFormStore())

const autofillStatus = computed(() => {
    if (!forms[currentForm.value]) return
    const populate = forms[currentForm.value].data[currentStep.value]?.populate
    if (!populate) return

    let areEmptyFieldsAvailableForAutofill = false
    let areFilledFieldsAvailableForAutofill = false
    for (const step of forms[populate.source].store.answers) {
        for (const field of populate.fields) {
            if (!step[field]) continue
            const valueInCurrentForm = forms[currentForm.value].store.answers[currentStep.value][field]
            if (!valueInCurrentForm) {
                areEmptyFieldsAvailableForAutofill = true
            } else if (valueInCurrentForm !== step[field]) {
                areFilledFieldsAvailableForAutofill = true
            }
        }
    }
    if (areEmptyFieldsAvailableForAutofill && areFilledFieldsAvailableForAutofill) return 'replaceSome'
    if (areEmptyFieldsAvailableForAutofill) return 'fill'
    if (areFilledFieldsAvailableForAutofill) return 'replace'
})

const populateCurrentForm = (onlyEmptyFields = false) => {
    const populate = forms[currentForm.value].data[currentStep.value].populate
    const currentAnswers = forms[currentForm.value].store.answers[currentStep.value]
    for (const answers of forms[populate.source].store.answers) {
        for (const field of populate.fields) {
            if (answers[field] && (!onlyEmptyFields || !currentAnswers[field])) {
                currentAnswers[field] = answers[field]
            }
        }
    }
}

const { open: openConfirmation, close } = useModal({
    component: ConfirmModal,
    attrs: {
        message: computed(() => autofillStatus.value === 'replaceSome' ? 'Wypełnić tylko puste pola, czy wszystkie, zastępując to co już jest wpisane?' : ('W obecnym formularzu są już wpisane dane. Czy chcesz je zastąpić ' + forms[currentForm.value].data[currentStep.value].populate.label + '?')),
        cancelLabel: computed(() => autofillStatus.value === 'replaceSome' ? 'Wypełnij puste' : 'Nie zastępuj'),
        confirmLabel: computed(() => autofillStatus.value === 'replaceSome' ? 'Wypełnij wszystkie i zastąp' : ('Zastąp ' + forms[currentForm.value].data[currentStep.value].populate.label)),
        onCancel() {
            if (autofillStatus.value === 'replaceSome') {
                populateCurrentForm(true)
            }
            close()
        },
        onConfirm() {
            populateCurrentForm()
            close()
        },
    },
})

const changeStep = (form, step) => {
    currentForm.value = form
    currentStep.value = step
    history.pushState({ ...history.state, form: currentForm.value, step: currentStep.value }, '')
}

const closeAllNav = () => {
    mainApplicationNavContainer.value.open = false
    Object.values(groupContainers.value).forEach(el => el.open = false)
    Object.values(docNavContainers.value).forEach(el => el.open = false)
}

const revealCurrentNavItem = () => {
    if (currentForm.value !== 'mainApplication' && currentForm.value !== 'furtherSteps') {
        groupContainers.value[groupMap[currentForm.value]].open = true
        docNavContainers.value[currentForm.value].open = true
    } else {
        mainApplicationNavContainer.value.open = true
    }
}

useEventListener('popstate', event => {
    if (!event.state) return
    const { form, step } = event.state
    currentForm.value = form
    currentStep.value = step
    closeAllNav()
    revealCurrentNavItem()
})

watchEffect(() => {
    if (!forms[currentForm.value] && currentForm.value !== 'furtherSteps') currentForm.value = 'mainApplication'
    if (!(currentStep.value >= 0) || !Number.isInteger(+currentStep.value)) currentStep.value = 0
})

provide('changeForm', (form, step = 0) => {
    changeStep(form, step)
    closeAllNav()
    revealCurrentNavItem()
})
provide('openness', [])

history.replaceState({ ...history.state, form: currentForm.value, step: currentStep.value }, '')

const adjustSideNav = () => {
    if (sideNav.value.getBoundingClientRect().height > window.innerHeight - 60) {
        sideNav.value.style.position = 'static'
    } else {
        sideNav.value.style.position = 'sticky'
    }
}

onMounted(() => {
    revealCurrentNavItem()
    nextTick(adjustSideNav)
})

useEventListener('resize', adjustSideNav)
useResizeObserver(sideNav, adjustSideNav)

</script>

<template>
    <div class="cols-layout">
        <nav class="side-nav" ref="sideNav">
            <details ref="mainApplicationNavContainer">
                <summary class="main"><h2>{{ t('mainApplication') }}</h2></summary>
                <StepStatuses
                    :steps="forms.mainApplication.data"
                    :formStore="forms.mainApplication.store"
                    :currentIndex="'mainApplication' === currentForm ? currentStep : undefined"
                    hasSummary
                    @changeCurrentIndex="changeStep('mainApplication', $event)"
                />
            </details>
            <button class="nav-link" @click="changeStep('furtherSteps', 0)" :aria-current="currentForm === 'furtherSteps' ? true : undefined" :class="{ current: currentForm === 'furtherSteps' }">
                {{ t('further_steps') }}
            </button>
            <details v-for="(group, title) in groups" :ref="el => groupContainers[title] = el">
                <summary><h2>{{ t(title) }}</h2></summary>
                <details v-for="form of group" :ref="el => docNavContainers[form] = el">
                    <summary><h3>{{ t(form) }}</h3></summary>
                    <StepStatuses
                        :steps="forms[form].data"
                        :formStore="forms[form].store"
                        :currentIndex="form === currentForm ? currentStep : undefined"
                        @changeCurrentIndex="changeStep(form, $event)"
                    />
                </details>
            </details>
        </nav>
        <FurtherSteps v-if="currentForm === 'furtherSteps'" />
        <FormFields
            v-else
            :key="currentForm"
            :formName="currentForm"
            :steps="forms[currentForm].data"
            :formStore="forms[currentForm].store"
            :hasSummary="forms[currentForm].hasSummary"
            :populationAvailability="autofillStatus"
            :currentIndex="currentStep"
            @changeCurrentIndex="currentStep = $event"
            @decrementIndex="currentStep--"
            @incrementIndex="currentStep++"
            @populate="() => { autofillStatus === 'fill' ? populateCurrentForm() : openConfirmation() }"
        />
    </div>
</template>
