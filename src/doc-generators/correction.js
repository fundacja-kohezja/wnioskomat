// TODO load it asynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default (mainFormAnswers, correctionFormAnswers, documentCreatorInitializer) => {

    const a = {
        ...mainFormAnswers[0],
        ...mainFormAnswers[2],
        ...correctionFormAnswers[0],
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

    p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[a.new_mark] || '', {
        ...top,
        spaceBefore: 5,
    })
    p([a.birth_name, a.birth_surname].map(normalize).join(' '), top)

    font({ style: 'bold' }, () => {
        p('Sygn. akt: '+ (normalize(a.case_id) || '......................'))
        p('Wniosek\no sprostowanie postanowienia', {
            align: 'center',
            spaceBefore: 16,
            mayBreak: true,
        })
    })

    setLineHeight(1.15)

    const incorrectValue = normalize(a.corrected_field === 'something_else' ? a.correction_1 : a.incorrect_value) || '......................'
    const correctValue = normalize(a.corrected_field === 'something_else' ? a.correction_2 : a.correct_value) || '......................'

    p('Na podstawie art. 350 § 1 k.p.c. w zw. z art. 13 § 2 k.p.c., wnoszę o sprostowanie oczywistej omyłki pisarskiej w postanowieniu ' + (
        a.chosen_court ? a.chosen_court.replace('Sąd', 'Sądu').replace('Rejonowy', 'Rejonowego') : 'Sądu Rejonowego w ......................'
    ) + ' Wydziału Cywilnego wydanym w dniu ' + (
        a.issue_date ? (new Date(a.issue_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ' sygn. akt. ' + (normalize(a.case_id) || '......................') + ' w ten sposób, że w miejsce ' + ({
        firstname: 'imienia „' + incorrectValue + '”',
        surname: 'nazwiska „' + incorrectValue + '”',
        birth_certificate_id: 'numeru aktu urodzenia „' + incorrectValue + '”',
        new_firstname: 'imienia „' + incorrectValue + '”',
        new_surname: 'nazwiska „' + incorrectValue + '”',
        something_else: incorrectValue,
    }[a.corrected_field] || '......................')  + ' należy wpisać ' + ({
        firstname: '„' + correctValue + '”',
        surname: '„' + correctValue + '”',
        birth_certificate_id: 'numer „' + correctValue + '”',
        new_firstname: '„' + correctValue + '”',
        new_surname: '„' + correctValue + '”',
        something_else: correctValue,
    }[a.corrected_field] || '......................') + '.', {
        spaceBefore: 12,
        spaceAfter: 12,
    })

    font({ style: 'bold' }, () => {
        p('Uzasadnienie', {
            align: 'center',
            spaceBefore: 8,
            spaceAfter: 5,
        })
    })

    p('Wnioskiem z dnia ' + (
        a.issue_date ? (new Date(a.issue_date)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........'
    ) + ' ' + ({ K: 'wniosłam', M: 'wniosłem' }[a.new_mark] || 'wniosł_m') + ' o sprostowanie mojego aktu urodzenia. Wniosek ten został przez Sąd uwzględniony, jednak w treści rozstrzygnięcia ' + ({
        firstname: 'Sąd błędnie oznaczył imię wskazując „' + incorrectValue + '” zamiast „' + correctValue + '”',
        surname: 'Sąd błędnie oznaczył nazwisko wskazując „' + incorrectValue + '” zamiast „' + correctValue + '”',
        birth_certificate_id: 'Sąd błędnie oznaczył numer aktu urodzenia wskazując „' + incorrectValue + '” zamiast „' + correctValue + '”',
        new_firstname: 'Sąd błędnie wpisał jako właściwe, sprostowane imię „' + incorrectValue + '”, zamiast żądanego przez ' + ({ K: 'wnioskodawczynię', M: 'wnioskodawcę' }[a.new_mark] || '........') + ' „' + correctValue + '”',
        new_surname: 'Sąd błędnie wpisał jako właściwe, sprostowane nazwisko „' + incorrectValue + '”, zamiast żądanego przez ' + ({ K: 'wnioskodawczynię', M: 'wnioskodawcę' }[a.new_mark] || '........') + ' „' + correctValue + '”',
        something_else: normalize(a.correction_3) || '......................',
    }[a.corrected_field] || '......................') + '.')

    p('Tymczasem ze znajdujących się w aktach dokumentów wynika, że ' + ({
        firstname: 'imię ' + ({ K: 'wnioskodawczyni', M: 'wnioskodawcy' }[a.new_mark] || '........') + ' to ' + correctValue,
        surname: 'nazwisko ' + ({ K: 'wnioskodawczyni', M: 'wnioskodawcy' }[a.new_mark] || '........') + ' to ' + correctValue,
        birth_certificate_id: 'numer aktu urodzenia to ' + correctValue,
        new_firstname: ({ K: 'wnioskodawczyni wnosiła', M: 'wnioskodawca wnosił' }[a.new_mark] || '........ wnosił_') + ' już w piśmie inicjującym postępowanie o sprostowanie ' + ({ K: 'jej', M: 'jego' }[a.new_mark] || '....') + ' imienia na ' + correctValue,
        new_surname: ({ K: 'wnioskodawczyni wnosiła', M: 'wnioskodawca wnosił' }[a.new_mark] || '........ wnosił_') + ' już w piśmie inicjującym postępowanie o sprostowanie ' + ({ K: 'jej', M: 'jego' }[a.new_mark] || '....') + ' nazwiska na ' + correctValue,
        something_else: normalize(a.correction_4) || '......................',
    }[a.corrected_field] || '......................') + '. Jako że błąd jest oczywistą niedokładnością w postanowieniu, niniejszy wniosek jest w pełni uzasadniony.', {
        spaceAfter: 8,
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
