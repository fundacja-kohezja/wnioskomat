const normalize = text => (text || '').trim()

export default (mainFormAnswers, requestCopyFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...requestCopyFormAnswers[0],
    }

    const { p, font, setLineHeight, complete, save } = documentCreatorInitializer()


    const city = normalize(a.city) || '......................'
    p(city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
        align: 'right',
        spaceAfter: 6,
    })

    const top = {
        shift: 100,
        spaceAfter: 1.5,
        align: 'left',
    }

    font({ style: 'bold' }, () => {

        p(a.chosen_court || 'Sąd Rejonowy w ......................', top)

        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[a.new_mark] || '', {
            ...top,
            spaceBefore: 5,
        })
        p([a.birth_name, a.birth_surname].map(normalize).join(' '), top)

        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('WNIOSEK\no doręczenie odpisu prawomocnego postanowienia', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('Wnoszę o wydanie i doręczenie odpisu postanowienia '+ (
        a.chosen_court ? a.chosen_court.replace('Sąd', 'Sądu').replace('Rejonowy', 'Rejonowego') : 'Sądu Rejonowego w ......................'
    ) + ' Wydziału Cywilnego wydanego w sprawie o sygnaturze akt ' + (normalize(a.case_id) || '......................') + ' w dniu ' + (
        a.decision_date ? (new Date(a.decision_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ' – ze stwierdzeniem prawomocności.', {
        spaceBefore: 12,
        spaceAfter: 6,
    })

    if (a.is_new_address) {
        p('Od czasu wniesienia wniosku, zmianie uległ mój adres do doręczeń. Proszę o doręczenie odpisu na adres:\n' + (
            [a.new_address_1, a.new_address_2, (a.new_zip_code || '........') + ' ' + (a.new_city || '...................')]
                .map(normalize)
                .filter(x => x)
                .join('\n')
        ), {
            spaceAfter: 6,
            mayBreak: true,
            align: 'left',
        })
    }

    font({ style: 'italic' }, () => {
        p('Podpis', {
            shift: 120,
            spaceBefore: 4,
            spaceAfter: 8,
        })
    })

    p('Załącznik:')
    p(' - dowód wniesienia opłaty kancelaryjnej')

    complete()

    return save
}
