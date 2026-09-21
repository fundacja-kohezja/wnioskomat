// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, exemptionFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...exemptionFormAnswers[0],
        ...exemptionFormAnswers[1],
        ...exemptionFormAnswers[2],
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
        p('Wniosek\no zwolnienie z kosztów', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p(({
        A: 'W związku z wezwaniem mnie do uiszczenia zaliczki na poczet opinii biegłych',
        B: 'W związku z wydaniem przez Sąd postanowienia o przyznaniu biegłym wynagrodzenia',
        C: 'W związku z ' + (normalize(a.exemption_other_reason) || '......................')
    }[a.exemption_reason] || 'W związku z ......................') + ' wnoszę o zwolnienie mnie od obowiązku ponoszenia kosztów sądowych' + (['A', 'B'].includes(a.exemption_reason) ? ' – kosztów opinii biegłego w całości' : '') + ', ponieważ nie jestem w stanie ich ponieść bez uszczerbku utrzymania koniecznego dla siebie i rodziny.', {
        spaceBefore: 12,
        spaceAfter: 12,
    })

    font({ style: 'italic' }, () => {
        p('Podpis', {
            shift: 120,
            spaceAfter: 8,
        })
    })


    p('Załącznik:')
    p('- oświadczenie o stanie rodzinnym, majątku, dochodach i źródłach utrzymania')

    complete()

    return save
}
