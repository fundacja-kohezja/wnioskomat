// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, exemptionFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...exemptionFormAnswers[0],
        ...exemptionFormAnswers[1],
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
        p(a.chosen_court, top)
        p(normalize(a.court_department) || 'Wydział Cywilny', top)
        p(courts[a.chosen_court]?.address || '', { // TODO ability to manually provide court address
            ...top,
            mayBreak: true,
        })
    } else {
        p('Sąd Rejonowy w ......................', top)
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

    font({ style: 'bold' }, () => {
        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('WNIOSEK\no zmianę terminu rozprawy', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('W związku z wyznaczeniem terminu rozprawy na dzień ' + (
        a.trial_date ? (new Date(a.trial_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ', wnoszę o odroczenie terminu z powodu ' + ({
        A: 'choroby',
        B: 'wcześniej zaplanowanego urlopu wypoczynkowego',
        C: normalize(a.absence_other_reason),
    }[a.absence_reason] || '......................') + '.', {
        spaceBefore: 12,
    })

    if (['B', 'C'].includes(a.absence_reason) && a.has_proof) {
        p('Na dowód przedkładam:\n' + (normalize(a.proof) || '......................'), { align: 'left', mayBreak: true })
    }
    if (a.absence_reason === 'A') {
        if (a.illness_proof === 'A') {
            p('Na dowód przedkładam zaświadczenie lekarskie od lekarza sądowego.')
        } else if (a.illness_proof === 'B') {
            p('Na dowód przedkładam zwolnienie lekarskie.')
            p('Oświadczam, że z powodu nagłego zachorowania nie udało mi się uzyskać zaświadczenia od lekarza sądowego, ale dostarczę je niezwłocznie po otrzymaniu.')
        } else {
            p('Na dowód przedkładam ......................')
        }
    }

    font({ style: 'bold' }, () => {
        p('Uzasadnienie', {
            align: 'center',
            spaceBefore: 8,
            spaceAfter: 5,
        })
    })
    p('Sąd wyznaczył termin rozprawy na dzień ' + (a.trial_date ? (new Date(a.trial_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........') + '.')
    p('Niestety nie jestem w stanie stawić się w sądzie w tym terminie. ' + (normalize(a.absence_explanation) || 'Wynika to z ......................'))
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
