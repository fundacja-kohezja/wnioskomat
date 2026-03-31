<script setup>
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['goToForm'])

const { t } = useI18n()

</script>

<template>
    <div class="introduction">
        <h1>{{ t('title') }}</h1>

        <p>
            {{ t('intro') }}
        </p>

        <div class="intro-btns">
            <button class="btn-primary" @click="emit('goToForm')">
                {{ t('begin') }}&ensp;
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="24" height="24">
                    <path d="M13.5 4.5 21 12 13.5 19.5M21 12H3" />
                </svg>
            </button>
            <!-- <button class="btn-secondary">
                {{ t('start_over') }}
            </button> -->
        </div>

        <div class="box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <title>{{ t('info') }}</title>
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
            <p>
                {{ t('intro_info') }}
                <a :href="t('guide_link')" target="_blank">
                    {{ t('guide_title') }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                        <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                        <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                    </svg>
                </a>
            </p>
        </div>
</div>
</template>
