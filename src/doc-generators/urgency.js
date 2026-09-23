// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, urgencyFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...urgencyFormAnswers[0],
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
        p('WNIOSEK\no przyspieszenie rozpoznania sprawy', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    p('Zwracam się z uprzejmą prośbą |o przyspieszenie rozpoznania sprawy z mojego wniosku o sprostowanie aktu urodzenia.|', {
        boldSep: '|',
        spaceBefore: 12,
    })

    p('Wniosek w przedmiotowej sprawie ' + ({
        mail: 'został wysłany do tut. Sądu',
        personally: 'złożony został w tut. Sądzie',
    }[a.delivery_method] || '......................') + ' w dniu ' + (
        a.application_date ? (new Date(a.application_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + '.')

    p({
        A: 'Z informacji uzyskanych drogą telefoniczną wynika, iż od chwili zarejestrowania sprawy i nadania jej sygnatury nie zostały podjęte żadne czynności mające na celu doprowadzenie do jej merytorycznego rozstrzygnięcia.',
        B: 'Z informacji uzyskanych od Biura Obsługi Interesantów wynika, że biegły przekroczył termin wydania opinii i opóźnia się już wiele miesięcy z jej wydaniem.',
        C: 'Z informacji uzyskanych od Biura Obsługi Interesantów wynika, że od czasu wydania opinii i uwag do jej treści, Sąd nie wydał zarządzenia o wyznaczeniu nowego terminu rozprawy lub nie wyznaczył posiedzenia niejawnego.',
        D: normalize(a.other_circumstances)
    }[a.circumstances] || '......................')

    p('Wskazać należy, że sprawa toczy się w przedmiocie zmiany oznaczenia mojej płci. Uzyskanie rozstrzygnięcia co do istoty sprawy jest dla mnie kwestią ważną i naglącą – umożliwi mi to kontynuowanie zaplanowanego leczenia oraz zwiększy moje bezpieczeństwo osobiste, gdyż moje aktualne dokumenty tożsamości ujawniają fakt mojej transpłciowości.')

    p('Biorąc pod uwagę powyższą argumentację, wnoszę jak w petitum.', {
        spaceBefore: 6,
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
