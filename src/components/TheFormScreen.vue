<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useExemptionFormStore, useMainApplicationFormStore, useServiceProxyFormStore, useWniosekOWydaniePismaFormStore } from '../stores/subforms'
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

/** @type import('vue').Ref< 'mainApplication' | 'exemption' | 'serviceProxy' | 'furtherSteps' > */
const currentForm = ref('mainApplication')

const currentIndex = ref(0)

const changeStep = (form, step) => {
    currentForm.value = form
    currentIndex.value = step
}

</script>

<template>
    <div class="cols-layout">
        <nav class="side-nav">
            <details open>
                <summary><h2>{{ t('mainApplication') }}</h2></summary>
                <StepStatuses
                    :steps="forms.mainApplication.data"
                    :formStore="forms.mainApplication.store"
                    :currentIndex="'mainApplication' === currentForm ? currentIndex : undefined"
                    hasSummary
                    @changeCurrentIndex="changeStep('mainApplication', $event)"
                />
            </details>
            <button class="nav-link" @click="changeStep('furtherSteps', 0)" :aria-current="currentForm === 'furtherSteps' ? true : undefined" :class="{ current: currentForm === 'furtherSteps' }">
                {{ t('further_steps') }}
            </button>
            <details>
                <summary><h2>{{ t('extra_documents') }}</h2></summary>
                <template v-for="(group, title) in groups">
                    <h3>{{ t(title) }}</h3>
                    <details v-for="form of group">
                        <summary><h4>{{ t(form) }}</h4></summary>
                        <StepStatuses
                            :steps="forms[form].data"
                            :formStore="forms[form].store"
                            :currentIndex="form === currentForm ? currentIndex : undefined"
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
            :currentIndex="currentIndex"
            @changeCurrentIndex="currentIndex = $event"
            @decrementIndex="currentIndex--"
            @incrementIndex="currentIndex++"
        />
    </div>
</template>
