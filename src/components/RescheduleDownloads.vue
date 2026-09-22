<script setup>
import { useMainApplicationFormStore, useRescheduleTrialFormStore } from '../stores/subforms'
import generate from '../doc-generators/rescheduleTrial'
import { initPdf } from '../doc-generators/pdf'
import { initDocx } from '../doc-generators/docx'
import GeneratedDoc from './GeneratedDoc.vue'
import { storeToRefs } from 'pinia'

const mainApplicationFormStore = useMainApplicationFormStore()
const { answers } = storeToRefs(useRescheduleTrialFormStore())

const document = {
    label: 'reschedule_application',
    pdf: generate(mainApplicationFormStore.answers, answers.value, initPdf),
    docx: generate(mainApplicationFormStore.answers, answers.value, initDocx),
}

</script>

<template>
    <p class="downloads-info">Wydrukuj poniższy dokument i podpisz go – własnoręcznie i czytelnie</p>
    <div class="generated-docs">
        <GeneratedDoc v-bind="document" />
    </div>
    <template v-if="['B', 'C'].includes(answers[1].absence_reason) && answers[1].has_proof">
        <p class="downloads-info">
            Dodatkowo przygotuj zadeklarowane dowody:
        </p>
        <ul>
            <li v-for="part of String(answers[1].proof).split('\n')">{{ part }}</li>
        </ul>
    </template>
    <p class="downloads-info" v-else-if="answers[1].absence_reason === 'A' && answers[1].illness_proof === 'A'">
        Dodatkowo przygotuj zaświadczenie lekarskie od lekarza sądowego.
    </p>
    <template v-else-if="answers[1].absence_reason === 'A' && answers[1].illness_proof === 'B'">
        <p class="downloads-info">
            Dodatkowo przygotuj zwolenienie lekarskie do wysłania z wnioskiem.
        </p>
        <p class="downloads-info">
            Pamiętaj, że musisz też jak najszybciej odwiedzić lekarza sądowego i dosłać zaświadczenie.
        </p>
    </template>

    <div class="docs-instruction">
        <details>
            <summary>Jeśli do rozprawy zostało tylko kilka dni</summary>
            <p>
                Doręcznie wniosku może potrwać kilka dni, więc jeśli z powodu nagłych okoliczności wysyłasz wniosek tuż przed terminem rozprawy, warto upewnić się, że sędzia otrzyma informację na czas.
            </p>
            <p>
                W tym celu, oprócz wysłania wniosku pocztą, prześlij też mailem do sekretariatu wydziału lub na Biuro Obsługi Interesantów skan podpisanego wniosku, z prośbą o pilne przekazanie sędziemu przewodniczącemu.
            </p>
        </details>
    </div>
</template>
