import { computed, toRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

import useFormStore from '../stores/form'

export default (screen) => {
    const { t } = useI18n()

    const currentScreen = toRef(screen)
    const { currentForm, currentStep, isFinalStep } = storeToRefs(useFormStore())

    const title = computed(() => ({
        start: t('intro'),
        form: t(currentForm.value) + (isFinalStep.value || currentForm.value === 'furtherSteps' ? '' : ' (' + t('step') + ' ' + (currentStep.value + 1) + ')'),
    }[currentScreen.value]) + ' – ' + t('title'))

    useTitle(title)
}
