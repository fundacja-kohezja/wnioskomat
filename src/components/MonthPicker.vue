<script setup>
import { useI18n } from 'vue-i18n'

const value = defineModel()

const { t } = useI18n()

const currentY = (new Date).getFullYear()

const setMonth = ({ target }) => {
    if (value.value) {
        value.value[0] = target.value
    } else {
        value.value = [target.value, '']
    }
}

const setYear = ({ target }) => {
    if (value.value) {
        value.value[1] = target.value
    } else {
        value.value = ['', target.value]
    }
}

</script>

<template>
    <div class="selects">
        <label class="text-input">
            <span>{{ t('month') }}</span>
            <select :value="value ? value[0] : ''" @change="setMonth">
                <option></option>
                <option value="01">{{ t('jan') }}</option>
                <option value="02">{{ t('feb') }}</option>
                <option value="03">{{ t('mar') }}</option>
                <option value="04">{{ t('apr') }}</option>
                <option value="05">{{ t('may') }}</option>
                <option value="06">{{ t('jun') }}</option>
                <option value="07">{{ t('jul') }}</option>
                <option value="08">{{ t('aug') }}</option>
                <option value="09">{{ t('sep') }}</option>
                <option value="10">{{ t('oct') }}</option>
                <option value="11">{{ t('nov') }}</option>
                <option value="12">{{ t('dec') }}</option>
            </select>
        </label>
        <label class="text-input">
            <span>{{ t('year') }}</span>
            <select :value="value ? value[1] : ''" @change="setYear">
                <option></option>
                <option>{{ currentY }}</option>
                <option v-for="n in 60">{{ currentY - n }}</option>
            </select>
        </label>
    </div>
</template>
