const normalize = text => (text || '').trim()

export default (mainFormAnswers, justificationFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...justificationFormAnswers[0],
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
        p('WNIOSEK\nO sporządzenie uzasadnienia i doręczenie postanowienia wraz z uzasadnieniem', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('Wnoszę o sporządzenie uzasadnienia postanowienia '+ ({
        A: a.chosen_court ? a.chosen_court.replace('Sąd', 'Sądu').replace('Rejonowy', 'Rejonowego') : 'Sądu Rejonowego w ......................',
        B: 'Referendarza Sądowego przy ' + (a.chosen_court ? a.chosen_court.replace('Sąd', 'Sądzie').replace('Rejonowy', 'Rejonowym') : 'Sądzie Rejonowym w ......................'),
    }[a.issuer] || '............................................') + ' Wydziału Cywilnego wydanego w sprawie o sygnaturze akt ' + (normalize(a.case_id) || '......................') + ' w dniu ' + (
        a.issue_date ? (new Date(a.issue_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ' i w przedmiocie wniosku o zwolnienie od kosztów i doręczenie tego postanowienia wraz z uzasadnieniem.', {
        spaceBefore: 12,
        spaceAfter: 6,
    })

    if (a.is_new_address) {
        p('Wnoszę o doręczenie postanowienia z uzasadnieniem na adres:\n' + (
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
            spaceAfter: 8,
        })
    })

    complete()

    return save
}
