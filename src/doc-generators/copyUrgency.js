// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, copyUrgencyFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...copyUrgencyFormAnswers[0],
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

    font({ style: 'bold' }, () => {
        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('WNIOSEK', {
            align: 'center',
            spaceBefore: 16,
        })
    })

    setLineHeight(1.15)

    p('W związku z uprawomocnieniem się postanowienia wydanego w niniejszej sprawie, zwracam się z prośbą o wysłanie odpisu postanowienia do właściwego Urzędu Stanu Cywilnego. Wyłącznie odpis wysłany z urzędu przez Sąd będzie podstawą do dokonania przez USC zmian w aktach stanu cywilnego i rejestrze PESEL. Bez tego nie mogę otrzymać nowego numeru PESEL oraz wystąpić o wydanie dokumentów na nowe dane.', {
        spaceBefore: 8,
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
