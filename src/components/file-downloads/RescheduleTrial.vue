<script setup>
import { storeToRefs } from 'pinia'

import { useRescheduleTrialFormStore } from '@/stores/subforms'
import generate from '@/doc-generators/rescheduleTrial'
import { initPdf } from '@/doc-generators/pdf'
import { initDocx } from '@/doc-generators/docx'
import FileDownloads from '../FileDownloads.vue'

const { answers } = storeToRefs(useRescheduleTrialFormStore())

const documents = [
    {
        label: 'reschedule_application',
        pdf: generate(answers.value, initPdf),
        docx: generate(answers.value, initDocx),
    },
]

</script>

<template>
    <FileDownloads :documents="documents">
        <template v-if="['B', 'C'].includes(answers[2].absence_reason) && answers[2].has_proof">
            <p class="docs-instruction">
                Dodatkowo przygotuj zadeklarowane dowody:
            </p>
            <ul>
                <li v-for="part of String(answers[2].proof).split('\n')">{{ part }}</li>
            </ul>
            <hr />
        </template>
        <template v-else-if="answers[2].absence_reason === 'A' && answers[2].illness_proof === 'A'">
            <p class="docs-instruction">
                Przygotuj też zaświadczenie lekarskie od lekarza sądowego do wysłania z wnioskiem.
            </p>
            <hr />
        </template>
        <template v-else-if="answers[2].absence_reason === 'A' && answers[2].illness_proof === 'B'">
            <p class="docs-instruction">
                Dodatkowo przygotuj zwolenienie lekarskie do wysłania z wnioskiem.
            </p>
            <p class="docs-instruction">
                Pamiętaj, że musisz też jak najszybciej odwiedzić lekarza sądowego i dosłać wydane przez niego zaświadczenie.
            </p>
            <hr />
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
    </FileDownloads>
</template>
