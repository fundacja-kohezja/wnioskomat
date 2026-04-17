export default ([step_0, step_1, step_2, step_3], t) => {
    const summary = []

    summary.push({
        type: 'h',
        content: 'Wnioskujesz o:',
    })
    summary.push({
        type: 'list',
        items: [
            ['Zmianę oznaczenia płci na ', step_0.a_0 ? t('q_0_0_'+step_0.a_0) : '…'],
            ...(step_0.a_1 ? [
                ['Zmianę imienia na ', step_0.a_1_0 || '…'],
            ] : []),
            ...(step_0.a_2 ? [
                ['Zmianę nazwiska na ', step_0.a_2_0 || '…'],
            ] : []),
            ...(step_0.a_3 ? [
                'Zwolnienie z kosztów sądowych',
            ] : []),
        ],
        crossedItems: [
            ...(step_0.a_1 ? [] : ['Zmianę imienia']),
            ...(step_0.a_2 ? [] : ['Zmianę nazwiska']),
            ...(step_0.a_3 ? [] : ['Zwolnienie z kosztów sądowych']),
        ],
        crossedItemsLabel: 'Nie wnioskujesz o:',
    })
    summary.push({
        type: 'h',
        content: 'Do wniosku dołączasz:',
    })

    const attached = []
    const unattached = []

    attached.push('Skrócony odpis aktu urodzenia')
    if (!step_0.a_3) attached.push('Dowód uiszczenia opłaty sądowej')

    if (step_1.a_2_0) {
        attached.push([
            'Opinię ', 'psychologa', ' z diagnozą ',
            ...(step_1.a_2_0_0 && step_1.a_2_0_1 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (step_1.a_2_0_0 ? ['F64.0'] : (step_1.a_2_0_1 ? ['HA60'] : ['…']))),
        ])
    }
    if (step_1.a_2_1) {
        attached.push([
            'Opinię ', 'psychologa-seksuologa', ' z diagnozą ',
            ...(step_1.a_2_1_0 && step_1.a_2_1_1 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (step_1.a_2_1_0 ? ['F64.0'] : (step_1.a_2_1_1 ? ['HA60'] : ['…']))),
        ])
    }
    if (!step_1.a_2_0 && !step_1.a_2_1) attached.push(['Opinię ', '…', ' z diagnozą ','…'])

    if (step_1.a_3_0) {
        attached.push([
            'Zaświadczenie od ', 'psychiatry', ' z diagnozą ',
            ...(step_1.a_3_0_0 && step_1.a_3_0_1 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (step_1.a_3_0_0 ? ['F64.0'] : (step_1.a_3_0_1 ? ['HA60'] : ['…']))),
        ])
    }
    if (step_1.a_3_1) {
        attached.push([
            'Zaświadczenie od ', 'seksuologa', ' z diagnozą ',
            ...(step_1.a_3_1_0 && step_1.a_3_1_1 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (step_1.a_3_1_0 ? ['F64.0'] : (step_1.a_3_1_1 ? ['HA60'] : ['…']))),
        ])
    }
    if (!step_1.a_3_0 && !step_1.a_3_1) {
        attached.push(['Zaświadczenie od ', '…', ' z diagnozą ','…'])
    }
    const push = (array, item) => array.push(item)
    push(step_1.a_4 ? attached : unattached, 'Zaświadczenie o wdrożeniu terapii hormonalnej')
    push(step_1.a_5 ? attached : unattached, 'Zalecenia Polskiego Towarzystwa Seksuologicznego')
    push(step_1.a_6 ? attached : unattached, 'Publikację „Postępowania w sprawach o uzgodnienie płci. Przewodnik”')
    if (!step_0.a_1) {
        (step_1.a_7 ? attached : unattached).push('Decyzję o zmianie imienia')
    }
    if (step_1.a_8) {
        attached.push(step_1.a_8_0 ? t('q_1_8_0_'+step_1.a_8_0) : 'Dokumenty świadczące o funkcjonowaniu w otoczeniu jako osoba danej płci: …')
    } else {
        unattached.push('Dokumenty świadczące o funkcjonowaniu w otoczeniu jako osoba danej płci')
    }

    summary.push({
        type: 'list',
        items: attached,
        crossedItems: unattached,
        crossedItemsLabel: 'Nie dołączasz:',
    })

    summary.push({
        type: 'h',
        content: 'Informacje we wniosku:',
    })

    summary.push({
        type: 'table',
        rows: {
            'Twój PESEL:': step_2.a_0 || '…',
            'Adres zamieszkania:': step_2.a_1 || '…',
            ...(step_2.a_4 ? {
                'Dane kontaktowe:': ['', step_2.a_4_0 + '\n', 'tel. ', step_2.a_4_1]
            } : {}),
            ...(step_2.a_2 ? {
                'Pełnomocnik do doręczeń:': step_2.a_2_0 + '\n' + step_2.a_2_1
            } : {}),
            'Wybrany sąd:': step_2.a_3 || '…',
            'Akt urodzenia:': ['', (step_2.a_5 || '…') + ' ' + (step_2.a_6 || '…'), '\nur. ', step_2.a_7 || '…', '\nnr aktu ', step_2.a_8 || '…', '\nwydany przez USC w ', step_2.a_9 || '…'],
            'Opis początków': step_3.a_0 || '…',
        }
    })

    summary.push({
        type: 'paragraphs',
        items: [
            ['Początek terapii hormonalnej: ', step_3.a_1 ? (step_3.a_1[0] ? t(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][step_3.a_1[0]-1]) : '') + ' ' + (step_3.a_1[1] || '…') : '…'],
            ...(step_3.a_2 ? [[t('q_3_2')]] : []),
            ['W sferze społecznej funkcjonuję zgodnie z moją tożsamością płciową ', step_3.a_4 ? t('q_3_4_'+step_3.a_4) : '…'],
            ...(step_3.a_3 ? [
                ['Na co dzień używam imienia ', step_3.a_3_0 || '…']
            ] : []),
        ],
    })

    return summary
}
