// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, dealineFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...dealineFormAnswers[0],
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

    if (a.chosen_court) {
        font({ style: 'bold' }, () => {
            p(a.chosen_court, top)
        })
        p(normalize(a.court_department) || 'Wydział Cywilny', top)
        p(courts[a.chosen_court]?.address || '', { // TODO ability to manually provide court address
            ...top,
            mayBreak: true,
        })
    } else {
        font({ style: 'bold' }, () => {
            p('Sąd Rejonowy w ......................', top)
        })
        p(normalize(a.court_department) || 'Wydział Cywilny', top)
        p('......................', top)
    }

    font({ style: 'bold' }, () => {
        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[a.new_mark] || '', {
            ...top,
            spaceBefore: 5,
        })
    })
    p([a.birth_name, a.birth_surname].map(normalize).join(' '), top)
    p([a.address_1, a.address_2, (a.zip_code || '........') + ' ' + (a.city || '...................')]
        .map(normalize)
        .filter(x => x)
        .join('\n'),
    {
        ...top,
        mayBreak: true,
    })

    font({ style: 'bold' }, () => {
        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('WNIOSEK\no przedłużeniu terminu', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('W związku ze zobowiązaniem Sądu do ' + (normalize(a.obligation) || '......................') + ' z dnia ' + (
        a.obligation_date ? (new Date(a.obligation_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ' na podstawie art. 166 k.p.c. w zw. z art. 13 § 2 k.p.c. wnoszę o przedłużenie terminu na wykonanie tej czynności ' + ({
        days: 'o kolejne ' + (a.extension_days ? a.extension_days : '......') + ' dni',
        date: 'do ' + (a.extension_date ? (new Date(a.extension_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'),
    }[a.extension_type]) + '.', {
        spaceBefore: 12,
    })

    if (a.extension_reason_has_proof) {
        p('Wnoszę o dopuszczenie dowodu z:\n' + (
            normalize(a.extension_reason_proof) || '......................'
        ) + '\n- ' + (normalize(a.extension_reason_proof).split('\n').length > 1 ? 'wszystkie ' : '') + 'na fakt istnienia ważnych przyczyn do przedłużenia terminu', { align: 'left', mayBreak: true })
    }

    font({ style: 'bold' }, () => {
        p('Uzasadnienie', {
            align: 'center',
            spaceBefore: 8,
            spaceAfter: 5,
        })
    })
    p('Sąd zobowiązał mnie do ' + (normalize(a.obligation) || '......................') + '.')
    p('Niestety nie jestem w stanie wywiązać się z tego zobowiązania w zakreślonym terminie. ' + (normalize(a.extension_reason) || 'Wynika to z ......................'))
    p('Z tego względu wnoszę o uwzględnienie wniosku.', { spaceAfter: 6 })

    font({ style: 'italic' }, () => {
        p('Podpis', {
            shift: 120,
            spaceAfter: 8,
        })
    })

    complete()

    return save
}
