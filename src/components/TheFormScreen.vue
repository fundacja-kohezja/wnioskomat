<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useExemptionFormStore, useMainApplicationFormStore, useServiceProxyFormStore, useWniosekOWydaniePismaFormStore } from '../stores/subforms'
import useFormStore from '../stores/form'
import mainApplicationsFormData from '../forms/glownyWniosek.yml'
import exemptionFormData from '../forms/kosztyZwolnienie.yml'
import serviceProxyFormData from '../forms/posrednikDoreczen.yml'
import wniosekOWydaniePismaFormData from '../forms/wniosekOWydaniePisma.yml'
import StepStatuses from './StepStatuses.vue'
import FormFields from './FormFields.vue'
import FurtherSteps from './FurtherSteps.vue'

const emit = defineEmits(['goToStart'])

const { t } = useI18n()

const mainApplicationFormStore = useMainApplicationFormStore()
const exemptionFormStore = useExemptionFormStore()
const serviceProxyFormStore = useServiceProxyFormStore()
const wniosekOWydaniePismaFormStore = useWniosekOWydaniePismaFormStore()

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
    wniosekOWydaniePisma: {
        data: wniosekOWydaniePismaFormData,
        store: wniosekOWydaniePismaFormStore,
        hasSummary: false,
    },
}

const groups = {
    ongoing: [
        'exemption',
        'serviceProxy',
    ],
    finishing: [
        'wniosekOWydaniePisma'
    ],
}

const mainApplicationNavContainer = ref()
const extraDocsNavContainer = ref()
const docNavContainers = ref({})

const { currentForm, currentStep } = storeToRefs(useFormStore())

const changeStep = (form, step) => {
    currentForm.value = form
    currentStep.value = step
}

watchEffect(() => {
    if (!forms[currentForm.value] && currentForm.value !== 'furtherSteps') currentForm.value = 'mainApplication'
    if (!(currentStep.value >= 0) || !Number.isInteger(+currentStep.value)) currentStep.value = 0
})

onMounted(() => {
    if (currentForm.value !== 'mainApplication' && currentForm.value !== 'furtherSteps') {
        mainApplicationNavContainer.value.open = false
        extraDocsNavContainer.value.open = true
        docNavContainers.value[currentForm.value].open = true
    }
})

</script>

<template>
    <div class="cols-layout">
        <nav class="side-nav">
            <details open ref="mainApplicationNavContainer">
                <summary><h2>{{ t('mainApplication') }}</h2></summary>
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
            <details ref="extraDocsNavContainer">
                <summary><h2>{{ t('extra_documents') }}</h2></summary>
                <template v-for="(group, title) in groups">
                    <h3>{{ t(title) }}</h3>
                    <details v-for="form of group" :ref="el => docNavContainers[form] = el">
                        <summary><h4>{{ t(form) }}</h4></summary>
                        <StepStatuses
                            :steps="forms[form].data"
                            :formStore="forms[form].store"
                            :currentIndex="form === currentForm ? currentStep : undefined"
                            @changeCurrentIndex="changeStep(form, $event)"
                        />
                    </details>
                </template>
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
            :currentIndex="currentStep"
            @changeCurrentIndex="currentStep = $event"
            @decrementIndex="currentStep--"
            @incrementIndex="currentStep++"
        />
    </div>
</template>
