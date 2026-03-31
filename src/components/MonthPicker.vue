<script setup>
import { useI18n } from 'vue-i18n'

const value = defineModel({ default: [] })

const { t } = useI18n()

const currentY = (new Date).getFullYear()

</script>

<template>
    <div class="selects">
        <label class="text-input">
            <span>{{ t('month') }}</span>
            <select v-model="value[0]">
                <option></option>
                <option>{{ t('jan') }}</option>
                <option>{{ t('feb') }}</option>
                <option>{{ t('mar') }}</option>
                <option>{{ t('apr') }}</option>
                <option>{{ t('may') }}</option>
                <option>{{ t('jun') }}</option>
                <option>{{ t('jul') }}</option>
                <option>{{ t('aug') }}</option>
                <option>{{ t('sep') }}</option>
                <option>{{ t('oct') }}</option>
                <option>{{ t('nov') }}</option>
                <option>{{ t('dec') }}</option>
            </select>
        </label>
        <label class="text-input">
            <span>{{ t('year') }}</span>
            <select v-model="value[1]">
                <option></option>
                <option>{{ currentY }}</option>
                <option v-for="n in 60">{{ currentY - n }}</option>
            </select>
        </label>
    </div>
</template>
