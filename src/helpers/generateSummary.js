export default ([step_0, step_1, step_2, step_3, step_4], t) => {

    const a = {
        ...step_0,
        ...step_1,
        ...step_2,
        ...step_3,
        ...step_4,
    }

    const summary = []

    summary.push({
        type: 'h',
        content: 'Wnioskujesz o:',
    })
    summary.push({
        type: 'list',
        items: [
            ['Zmianę oznaczenia płci na ', a.new_mark || '…'],
            ...(a.is_new_firstname ? [
                ['Zmianę imienia na ', a.new_firstname || '…'],
            ] : []),
            ...(a.is_new_surname ? [
                ['Zmianę nazwiska na ', a.new_surname || '…'],
            ] : []),
            // ...(a.is_exemption ? ['Zwolnienie z kosztów sądowych'] : []),
        ],
        crossedItems: [
            ...(a.is_new_firstname ? [] : ['Zmianę imienia']),
            ...(a.is_new_surname   ? [] : ['Zmianę nazwiska']),
            // ...(a.is_exemption     ? [] : ['Zwolnienie z kosztów sądowych']),
        ],
        crossedItemsLabel: 'Nie wnioskujesz o:',
    })
    if (a.is_underage) {
        summary.push({
            type: 'paragraphs',
            items: [
                ['Składasz wniosek jako osoba niepełnoletnia, za pośrednictwem rodziców.'],
            ],
        })
    }

    summary.push({
        type: 'h',
        content: 'Do wniosku dołączasz:',
    })

    const attached = ['Skrócony odpis aktu urodzenia', 'Dowód uiszczenia opłaty sądowej']
    const unattached = []

    if (a.psychologist) {
        attached.push([
            'Opinię ', 'psychologa', ' z diagnozą ',
            ...(a.psychologist_f64 && a.psychologist_ha60 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (a.psychologist_f64 ? ['F64.0'] : (a.psychologist_ha60 ? ['HA60'] : ['…']))),
        ])
    }
    if (a.psychologist_sexologist) {
        attached.push([
            'Opinię ', 'psychologa-seksuologa', ' z diagnozą ',
            ...(a.psychologist_sexologist_f64 && a.psychologist_sexologist_ha60 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (a.psychologist_sexologist_f64 ? ['F64.0'] : (a.psychologist_sexologist_ha60 ? ['HA60'] : ['…']))),
        ])
    }
    if (!a.psychologist && !a.psychologist_sexologist) {
        attached.push(['Opinię ', '…', ' z diagnozą ', '…'])
    }

    if (a.psychiatrist) {
        attached.push([
            'Zaświadczenie od ', 'psychiatry', ' z diagnozą ',
            ...(a.psychiatrist_f64 && a.psychiatrist_ha60 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (a.psychiatrist_f64 ? ['F64.0'] : (a.psychiatrist_ha60 ? ['HA60'] : ['…']))),
        ])
    }
    if (a.sexologist) {
        attached.push([
            'Zaświadczenie od ', 'seksuologa', ' z diagnozą ',
            ...(a.sexologist_f64 && a.sexologist_ha60 ? [
                'F64.0', ' oraz ', 'HA60',
            ] : (a.sexologist_f64 ? ['F64.0'] : (a.sexologist_ha60 ? ['HA60'] : ['…']))),
        ])
    }
    if (!a.psychiatrist && !a.sexologist) {
        attached.push(['Zaświadczenie od ', '…', ' z diagnozą ', '…'])
    }
    const push = (array, item) => array.push(item)
    push(a.hrt_certificate ? attached : unattached, 'Zaświadczenie o wdrożeniu terapii hormonalnej')
    push(a.pts_guidelines  ? attached : unattached, 'Zalecenia Polskiego Towarzystwa Seksuologicznego')
    push(a.long_guidelines ? attached : unattached, 'Publikację „Postępowania w sprawach o uzgodnienie płci. Przewodnik”')
    if (!a.is_new_firstname) {
        (a.name_change_confirmation ? attached : unattached).push('Decyzję o zmianie imienia')
    }
    if (a.proving_documents) {
        attached.push(a.proving_documents_type ? { A: 'Wydruk z portali społecznościowych', B: 'Identyfikator z miejsca pracy', C: 'Wydruk z portalu USOS' }[a.proving_documents_type] : 'Dokumenty świadczące o funkcjonowaniu w otoczeniu jako osoba danej płci: …')
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
            'Twój PESEL:': a.pesel || '…',
            'Adres zamieszkania:': [(a.address_1 || '…'), a.address_2, (a.zip_code || '…') + ' ' + (a.city || '…')]
                .filter(x => x)
                .join('\n'),
            ...(a.has_contact_info ? {
                'Dane kontaktowe:': ['', a.email + '\n', 'tel. ', a.phone]
            } : {}),
            ...(a.has_proxy ? {
                'Pełnomocnik do doręczeń:': ['', (a.proxy_name || '…'), '\nPESEL ', (a.proxy_pesel || '…') + '\n' + (a.proxy_address_1 || '…') + (a.proxy_address_2 ? ('\n' + a.proxy_address_2) : '') + '\n' + (a.proxy_zip_code || '…') + ' ' + (a.proxy_city || '…')]
            } : {}),
            'Wybrany sąd:': a.chosen_court || '…',
            'Akt urodzenia:': ['', (a.birth_name || '…') + ' ' + (a.birth_surname || '…'), '\n'+'ur. ', a.birth_date || '…', '\n'+'nr aktu ', a.birth_certificate_id || '…', '\n'+'wydany przez'+' Urząd Stanu Cywilnego w ', a.birth_certificate_issuer || '…'],
        }
    })

    if (a.is_underage) {
        summary.push({
            type: 'h',
            content: 'Dane pierwszego rodzica:',
        })

        summary.push({
            type: 'table',
            rows: {
                'Imię i nazwisko': ['', a.parent_1_name || '…'],
                'PESEL': a.parent_1_pesel || '…',
                'Adres zamieszkania:': [(a.parent_1_address_1 || '…'), a.parent_1_address_2, (a.parent_1_zip_code || '…') + ' ' + (a.parent_1_city || '…')]
                    .filter(x => x)
                    .join('\n'),
                ...(a.parent_1_has_contact_info ? {
                    'Dane kontaktowe:': ['', a.parent_1_email + '\n', 'tel. ', a.parent_1_phone]
                } : {}),
            }
        })

        summary.push({
            type: 'h',
            content: 'Dane drugiego rodzica:',
        })

        summary.push({
            type: 'table',
            rows: {
                'Imię i nazwisko': ['', a.parent_2_name || '…'],
                'PESEL': a.parent_2_pesel || '…',
                'Adres zamieszkania:': [(a.parent_2_address_1 || '…'), a.parent_2_address_2, (a.parent_2_zip_code || '…') + ' ' + (a.parent_2_city || '…')]
                    .filter(x => x)
                    .join('\n'),
                ...(a.parent_2_has_contact_info ? {
                    'Dane kontaktowe:': ['', a.parent_2_email + '\n', 'tel. ', a.parent_2_phone]
                } : {}),
            }
        })
    }

    summary.push({
        type: 'h',
        content: 'Opis doświadczeń:',
    })

    summary.push({
        type: 'paragraphs',
        items: [
            ['', a.experience || '…'],
            ['Początek terapii hormonalnej: ', a.hrt_since ? (a.hrt_since[0] ? t(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][a.hrt_since[0]-1]) : '') + ' ' + (a.hrt_since[1] || '…') : '…'],
            ...(a.has_assessment ? [['Poddano mnie badaniom psychologicznym']] : []),
            ['W sferze społecznej funkcjonuję zgodnie z moją tożsamością płciową ', a.areas ? { some: 'w niektórych obszarach', all: 'w większości obszarów' }[a.areas] : '…'],
            ...(a.has_common_name ? [
                ['Na co dzień używam imienia ', a.common_name || '…']
            ] : []),
        ],
    })

    return summary
}
