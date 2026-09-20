import steps from '../forms/glownyWniosek.yml'

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
        content: t('s_0'),
    })
    summary.push({
        type: 'list',
        items: [
            [t('s_1'), a.new_mark || '…'],
            ...(a.is_new_firstname ? [
                [t('s_2'), a.new_firstname || '…'],
            ] : []),
            ...(a.is_new_surname ? [
                [t('s_3'), a.new_surname || '…'],
            ] : []),
            ...(a.is_exemption ? [t('s_4')] : []),
        ],
        crossedItems: [
            ...(a.is_new_firstname ? [] : [t('s_5')]),
            ...(a.is_new_surname   ? [] : [t('s_6')]),
            ...(a.is_exemption     ? [] : [t('s_4')]),
        ],
        crossedItemsLabel: t('s_7'),
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
        content: t('s_8'),
    })

    const attached = []
    const unattached = []

    attached.push(t('s_9'))
    if (!a.is_exemption) attached.push(t('s_10'))

    if (a.psychologist) {
        attached.push([
            t('s_11'), t('s_12'), t('s_17'),
            ...(a.psychologist_f64 && a.psychologist_ha60 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (a.psychologist_f64 ? ['F64.0'] : (a.psychologist_ha60 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (a.psychologist_sexologist) {
        attached.push([
            t('s_11'), t('s_13'), t('s_17'),
            ...(a.psychologist_sexologist_f64 && a.psychologist_sexologist_ha60 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (a.psychologist_sexologist_f64 ? ['F64.0'] : (a.psychologist_sexologist_ha60 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (!a.psychologist && !a.psychologist_sexologist) {
        attached.push([t('s_11'), '…', t('s_17'), '…'])
    }

    if (a.psychiatrist) {
        attached.push([
            t('s_14'), t('s_15'), t('s_17'),
            ...(a.psychiatrist_f64 && a.psychiatrist_ha60 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (a.psychiatrist_f64 ? ['F64.0'] : (a.psychiatrist_ha60 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (a.sexologist) {
        attached.push([
            t('s_14'), t('s_16'), t('s_17'),
            ...(a.sexologist_f64 && a.sexologist_ha60 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (a.sexologist_f64 ? ['F64.0'] : (a.sexologist_ha60 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (!a.psychiatrist && !a.sexologist) {
        attached.push([t('s_14'), '…', t('s_17'), '…'])
    }
    const push = (array, item) => array.push(item)
    push(a.hrt_certificate ? attached : unattached, t('s_20'))
    push(a.pts_guidelines  ? attached : unattached, t('s_21'))
    push(a.long_guidelines ? attached : unattached, t('s_22'))
    if (!a.is_new_firstname) {
        (a.name_change_confirmation ? attached : unattached).push(t('s_23'))
    }
    if (a.proving_documents) {
        attached.push(a.proving_documents_type ? { A: 'Wydruk z portali społecznościowych', B: 'Identyfikator z miejsca pracy', C: 'Wydruk z portalu USOS' }[a.proving_documents_type] : t('s_24'))
    } else {
        unattached.push(t('s_25'))
    }

    summary.push({
        type: 'list',
        items: attached,
        crossedItems: unattached,
        crossedItemsLabel: t('s_26'),
    })

    summary.push({
        type: 'h',
        content: t('s_27'),
    })

    summary.push({
        type: 'table',
        rows: {
            [t('s_28')]: a.pesel || '…',
            [t('s_29')]: [(a.address_1 || '…'), a.address_2, (a.zip_code || '…') + ' ' + (a.city || '…')]
                .filter(x => x)
                .join('\n'),
            ...(a.has_contact_info ? {
                [t('s_30')]: ['', a.email + '\n', t('s_31'), a.phone]
            } : {}),
            ...(a.has_proxy ? {
                [t('s_32')]: ['', (a.proxy_name || '…'), '\nPESEL ', (a.proxy_pesel || '…') + '\n' + (a.proxy_address_1 || '…') + (a.proxy_address_2 ? ('\n' + a.proxy_address_2) : '') + '\n' + (a.proxy_zip_code || '…') + ' ' + (a.proxy_city || '…')]
            } : {}),
            [t('s_33')]: a.chosen_court || '…',
            [t('s_34')]: ['', (a.birth_name || '…') + ' ' + (a.birth_surname || '…'), '\n'+t('s_35'), a.birth_date || '…', '\n'+t('s_36'), a.birth_certificate_id || '…', '\n'+t('s_37')+' Urząd Stanu Cywilnego w ', a.birth_certificate_issuer || '…'],
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
                [t('s_29')]: [(a.parent_1_address_1 || '…'), a.parent_1_address_2, (a.parent_1_zip_code || '…') + ' ' + (a.parent_1_city || '…')]
                    .filter(x => x)
                    .join('\n'),
                ...(a.parent_1_has_contact_info ? {
                    [t('s_30')]: ['', a.parent_1_email + '\n', t('s_31'), a.parent_1_phone]
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
                [t('s_29')]: [(a.parent_2_address_1 || '…'), a.parent_2_address_2, (a.parent_2_zip_code || '…') + ' ' + (a.parent_2_city || '…')]
                    .filter(x => x)
                    .join('\n'),
                ...(a.parent_2_has_contact_info ? {
                    [t('s_30')]: ['', a.parent_2_email + '\n', t('s_31'), a.parent_2_phone]
                } : {}),
            }
        })
    }

    summary.push({
        type: 'h',
        content: t('s_38'),
    })

    summary.push({
        type: 'paragraphs',
        items: [
            ['', a.experience || '…'],
            [t('s_39'), a.hrt_since ? (a.hrt_since[0] ? t(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][a.hrt_since[0]-1]) : '') + ' ' + (a.hrt_since[1] || '…') : '…'],
            ...(a.has_assessment ? [[t('s_40')]] : []),
            [t('s_41'), a.areas ? { some: 'w niektórych obszarach', all: 'w większości obszarów' }[a.areas] : '…'],
            ...(a.has_common_name ? [
                [t('s_42'), a.common_name || '…']
            ] : []),
        ],
    })

    return summary
}
