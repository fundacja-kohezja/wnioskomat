// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, remoteTrialFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...remoteTrialFormAnswers[0],
    }

    const { p, font, setLineHeight, complete, save } = documentCreatorInitializer()


    const city = normalize(a.city) || '......................'
    p(city + ', dnia ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
        align: 'right',
        spaceAfter: 6,
    })

    const top = {
        shift: 100,
        spaceAfter: 1.5,
        align: 'left',
    }

    font({ style: 'bold' }, () => {
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

        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[a.new_mark] || '', {
            ...top,
            spaceBefore: 5,
        })
        p([a.birth_name, a.birth_surname].map(normalize).join(' '), top)

        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('WNIOSEK\no przeprowadzenie posiedzenia zdalnego', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('W związku z wyznaczeniem terminu rozprawy na dzień ' + (
        a.trial_date ? (new Date(a.trial_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ', wnoszę o wydanie zarządzenia o przeprowadzeniu posiedzenia zdalnego. Proszę o wysłanie linku umożliwiającego udział w posiedzeniu zdalnym na adres ' + normalize(a.email_for_remote_trial_link) + '.', {
        spaceBefore: 12,
        spaceAfter: 12,
    })

    font({ style: 'italic' }, () => {
        p('Podpis', {
            shift: 120,
            spaceAfter: 8,
        })
    })

    complete()

    return save
}
