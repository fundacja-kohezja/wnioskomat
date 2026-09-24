<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import MainDownloads from './MainDownloads.vue'
import ExemptionDownloads from './ExemptionDownloads.vue'
import ProxyDownloads from './ProxyDownloads.vue'
import AddressDownloads from './AddressDownloads.vue'
import RemoteDownloads from './RemoteDownloads.vue'
import RescheduleDownloads from './RescheduleDownloads.vue'
import DeadlineDownloads from './DeadlineDownloads.vue'
import UrgencyDownloads from './UrgencyDownloads.vue'
import JustificationDownloads from './JustificationDownloads.vue'
import CopyDownloads from './CopyDownloads.vue'
import ReturnDownloads from './ReturnDownloads.vue'
import CopyUrgencyDownloads from './CopyUrgencyDownloads.vue'
import RejectionDownloads from './RejectionDownloads.vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    store: {
        type: Object,
        required: true,
    },
})

const { t } = useI18n()

const { ignoreWarning, anyInvalid, anyIncomplete } = storeToRefs(props.store)

const components = {
    mainApplication: MainDownloads,
    exemption: ExemptionDownloads,
    serviceProxy: ProxyDownloads,
    addressChange: AddressDownloads,
    remoteTrial: RemoteDownloads,
    rescheduleTrial: RescheduleDownloads,
    extendDeadline: DeadlineDownloads,
    urgency: UrgencyDownloads,
    exemptionRejectionJustification: JustificationDownloads,
    requestCopy: CopyDownloads,
    returnDocuments: ReturnDownloads,
    copyUrgency: CopyUrgencyDownloads,
    rejectionJustification: RejectionDownloads,
}

</script>

<template>
    <div class="confirm-message" v-if="!ignoreWarning && (anyInvalid || anyIncomplete)">
        <template v-if="anyInvalid">
            <div class="validation-message message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                    <title>{{ t('warning') }}</title>
                    <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
                <p>{{ t('some_invalid') }}</p>
            </div>
            <p>{{ t('some_invalid_0') }}<strong>{{ t('some_invalid_1') }}</strong>{{ t('some_invalid_2') }}</p>
        </template>
        <template v-else>
            <div class="message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                    <title>{{ t('warning') }}</title>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                </svg>
                <p>{{ t('some_incomplete') }}</p>
            </div>
            <p>{{ t('some_incomplete_0') }}<strong>{{ t('some_incomplete_1') }}</strong>{{ t('some_incomplete_2') }}</p>
        </template>
        <div class="confirm-buttons">
            <button class="btn" @click="ignoreWarning = true">
                {{ t('generate_anyway') }}
            </button>
        </div>
    </div>
    <template v-else>
        <h2>{{ t('documents_ready') }}</h2>
        <div v-if="anyInvalid || anyIncomplete" class="box invalid-warning warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="32" height="32">
                <title>{{ t('warning') }}</title>
                <path fill-rule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
            </svg>
            <span>
                {{ t('warning_generated_0') }}{{ anyInvalid && anyIncomplete ? t('warning_generated_1') : anyInvalid ? t('warning_generated_2') : t('warning_generated_3') }}{{ t('warning_generated_4') }}
            </span>
        </div>
        <component :is="components[name]" />
    </template>
</template>
