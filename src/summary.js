export default ([step_0, step_1, step_2, step_3], t) => {
    const summary = []

    summary.push({
        type: 'h',
        content: t('s_0'),
    })
    summary.push({
        type: 'list',
        items: [
            [t('s_1'), step_0.a_0 ? t('q_0_0_'+step_0.a_0) : '…'],
            ...(step_0.a_1 ? [
                [t('s_2'), step_0.a_1_0 || '…'],
            ] : []),
            ...(step_0.a_2 ? [
                [t('s_3'), step_0.a_2_0 || '…'],
            ] : []),
            ...(step_0.a_3 ? [t('s_4')] : []),
        ],
        crossedItems: [
            ...(step_0.a_1 ? [] : [t('s_5')]),
            ...(step_0.a_2 ? [] : [t('s_6')]),
            ...(step_0.a_3 ? [] : [t('s_4')]),
        ],
        crossedItemsLabel: t('s_7'),
    })
    summary.push({
        type: 'h',
        content: t('s_8'),
    })

    const attached = []
    const unattached = []

    attached.push(t('s_9'))
    if (!step_0.a_3) attached.push(t('s_10'))

    if (step_1.a_2_0) {
        attached.push([
            t('s_11'), t('s_12'), t('s_17'),
            ...(step_1.a_2_0_0 && step_1.a_2_0_1 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (step_1.a_2_0_0 ? ['F64.0'] : (step_1.a_2_0_1 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (step_1.a_2_1) {
        attached.push([
            t('s_11'), t('s_13'), t('s_17'),
            ...(step_1.a_2_1_0 && step_1.a_2_1_1 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (step_1.a_2_1_0 ? ['F64.0'] : (step_1.a_2_1_1 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (!step_1.a_2_0 && !step_1.a_2_1) {
        attached.push([t('s_11'), '…', t('s_17'), '…'])
    }

    if (step_1.a_3_0) {
        attached.push([
            t('s_14'), t('s_15'), t('s_17'),
            ...(step_1.a_3_0_0 && step_1.a_3_0_1 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (step_1.a_3_0_0 ? ['F64.0'] : (step_1.a_3_0_1 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (step_1.a_3_1) {
        attached.push([
            t('s_14'), t('s_16'), t('s_17'),
            ...(step_1.a_3_1_0 && step_1.a_3_1_1 ? [
                'F64.0', t('s_19'), 'HA60',
            ] : (step_1.a_3_1_0 ? ['F64.0'] : (step_1.a_3_1_1 ? ['HA60'] : ['…']))),
            t('s_18'),
        ])
    }
    if (!step_1.a_3_0 && !step_1.a_3_1) {
        attached.push([t('s_14'), '…', t('s_17'), '…'])
    }
    const push = (array, item) => array.push(item)
    push(step_1.a_4 ? attached : unattached, t('s_20'))
    push(step_1.a_5 ? attached : unattached, t('s_21'))
    push(step_1.a_6 ? attached : unattached, t('s_22'))
    if (!step_0.a_1) {
        (step_1.a_7 ? attached : unattached).push(t('s_23'))
    }
    if (step_1.a_8) {
        attached.push(step_1.a_8_0 ? t('q_1_8_0_'+step_1.a_8_0) : t('s_24'))
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
            [t('s_28')]: step_2.a_0 || '…',
            [t('s_29')]: step_2.a_1 || '…',
            ...(step_2.a_4 ? {
                [t('s_30')]: ['', step_2.a_4_0 + '\n', t('s_31'), step_2.a_4_1]
            } : {}),
            ...(step_2.a_2 ? {
                [t('s_32')]: step_2.a_2_0 + '\n' + step_2.a_2_1
            } : {}),
            [t('s_33')]: step_2.a_3 || '…',
            [t('s_34')]: ['', (step_2.a_5 || '…') + ' ' + (step_2.a_6 || '…'), '\n'+t('s_35'), step_2.a_7 || '…', '\n'+t('s_36'), step_2.a_8 || '…', '\n'+t('s_37')+' Urząd Stanu Cywilnego w ', step_2.a_9 || '…'],
            [t('s_38')]: step_3.a_0 || '…',
        }
    })

    summary.push({
        type: 'paragraphs',
        items: [
            [t('s_39'), step_3.a_1 ? (step_3.a_1[0] ? t(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'][step_3.a_1[0]-1]) : '') + ' ' + (step_3.a_1[1] || '…') : '…'],
            ...(step_3.a_2 ? [[t('q_3_2')]] : []),
            [t('s_40'), step_3.a_4 ? t('q_3_4_'+step_3.a_4) : '…'],
            ...(step_3.a_3 ? [
                [t('s_41'), step_3.a_3_0 || '…']
            ] : []),
        ],
    })

    return summary
}
