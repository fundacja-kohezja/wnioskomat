<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import SummaryField from './SummaryField.vue'
import useFormStore from '../stores/form'
import generateSummary from '../summary'

const { t } = useI18n()

const { answers } = storeToRefs(useFormStore())

const summary = computed(() => generateSummary(answers.value, t))

</script>

<template>
    <template v-for="({ type, content, items, crossedItems, crossedItemsLabel, rows }) of summary">
        <h3 v-if="type === 'h'" class="summary-heading">{{ content }}</h3>
        <div v-else-if="type === 'list'" :class="{ 'summary-lists': crossedItems && crossedItems.length }">
            <ul class="summary-list">
                <li v-for="item of items">
                    <SummaryField :content="item" />
                </li>
            </ul>
            <ul v-if="crossedItems && crossedItems.length" :aria-label="crossedItemsLabel" class="summary-crossed-list">
                <li v-for="item of crossedItems">
                    <SummaryField :content="item" />
                </li>
            </ul>
        </div>
        <dl v-else-if="type === 'table'" class="summary-table">
            <template v-for="(val, label) in rows">
                <dt>{{ label }}</dt>
                <dd><SummaryField :content="val" /></dd>
            </template>
        </dl>
        <template v-else-if="type === 'paragraphs'">
            <p v-for="item of items" class="summary-paragraph">
                <SummaryField :content="item" />
            </p>
        </template>
    </template>
</template>
