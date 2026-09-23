// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, returnFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...returnFormAnswers[0],
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
        p('WNIOSEK\no zwrot dokumentów przedłożonych w oryginale', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    const docsToReturn = normalize(a.documents_to_return)
    p('W związku z uprawomocnieniem się postanowienia wydanego w niniejszej sprawie, wnoszę o zwrot przedłożonych w oryginale dokumentów w postaci: ' + (
        (docsToReturn.includes('\n') ? ('\n' + docsToReturn) : docsToReturn) || '......................'
    ), {
        spaceBefore: 12,
        mayBreak: true,
        align: 'left',
    })

    if (a.is_new_address) {
        p('Proszę o ich doręczenie pocztą na adres:\n' + (
            [a.new_address_1, a.new_address_2, (a.new_zip_code || '........') + ' ' + (a.new_city || '...................')]
                .map(normalize)
                .filter(x => x)
                .join('\n')
        ), {
            spaceAfter: 6,
            mayBreak: true,
            align: 'left',
        })
    } else {
        p('Proszę o ich doręczenie pocztą na adres wskazany we wniosku inicjującym postępowanie.', {
            spaceAfter: 12,
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
