import { jsPDF } from 'jspdf'

// TODO load it anynchronously
import { courts } from './datasets'
import './fonts/TeXGyreTermes-normal'
import './fonts/TeXGyreTermes-bold'
import './fonts/TeXGyreTermes-italic'
// import './fonts/TeXGyreTermes-bolditalic' // Unnecessary for now

const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3]) => {

    const doc = new jsPDF

    doc.setFontSize(11)
    doc.setFont('TeXGyreTermes')

    const bold = (content) => {
        doc.setFont('TeXGyreTermes', 'normal', 'bold')
        content()
        doc.setFont('TeXGyreTermes', 'normal', 'normal')
    }
    let lineHeightFactor = 1.15
    const lineHeight = (lh) => {
        doc.setLineHeightFactor(lh)
        lineHeightFactor = lh
    }
    const margin = 25
    const w = 210
    const maxWidth = w - margin*2

    let y = margin

    const p = (text, shift = 0, spaceAfter = 1.5, options) => {
        const lines = doc.splitTextToSize(text, maxWidth - shift)
        doc.text(lines, options?.align === 'center' ? (w/2) : (margin + shift), y, options)
        y += 11*lineHeightFactor/(72/25.4)*lines.length
        y += spaceAfter
    }

    const li = (nb, text, level = 1, italicSep) => {
        const lines = doc.splitTextToSize(text, maxWidth - 10)
        doc.text(nb, margin + 8*level - 6, y)
        if (italicSep) {
            let isItalic = false
            lines.forEach(line => {
                let x = 0
                line.split(italicSep).forEach((part, i) => {
                    if (i > 0) {
                        isItalic = !isItalic
                        if (isItalic) {
                            doc.setFont('TeXGyreTermes', 'italic')
                        } else {
                            doc.setFont('TeXGyreTermes', 'normal')
                        }
                    }
                    doc.text(part, margin + 8*level + x, y)
                    x += doc.getStringUnitWidth(part) * 11/(72/25.4)
                })
                y += 11*lineHeightFactor/(72/25.4)
            })
            doc.setFont('TeXGyreTermes', 'normal')
        } else {
            doc.text(lines, margin + 8*level, y)
            y += 11*lineHeightFactor/(72/25.4)*lines.length
        }
    }

    // TODO do it differently
    const city = normalize(step_2.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................'
    doc.text(city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), w - margin, y, { align: 'right' })
    y += 10

    if (step_2.a_3) {
        p(step_2.a_3, 100)
        p('Wydział Cywilny', 100)
        p(courts[step_2.a_3].address, 100)
    } else {
        p('Sąd Rejonowy w ......................', 100)
        p('Wydział Cywilny', 100)
        p('......................', 100)
    }
    y += 5

    bold(() => {
        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[step_0.a_0] || '', 100)
    })

    p([step_2.a_5, step_2.a_6].map(normalize).join(' '), 100)
    p(normalize(step_2.a_1), 100)
    p('PESEL ' + (step_2.a_0 ? normalize(step_2.a_0) : '......................'), 100)
    if (step_2.a_4) {
        p((step_2.a_4_0 ? normalize(step_2.a_4_0) : '') + (step_2.a_4_1 ? ('\ntel. ' + normalize(step_2.a_4_1)) : ''), 100)
    }

    y += 12

    lineHeight(1.5)

    bold(() => {
        p('WNIOSEK O SPROSTOWANIE AKTU URODZENIA', 0, 0, { align: 'center' })
        if (step_0.a_3) {
            p('wraz z wnioskiem o zwolnienie od obowiązku ponoszenia kosztów sądowych', 0, 0, { align: 'center' })
        }
    })

    y += 10

    // TODO remember tab characters are problematic
    p('Na podstawie art. 36 ustawy Prawo o aktach stanu cywilnego wnoszę o:')
    li('1.', 'sprostowanie aktu urodzenia '+({K: 'Wnioskodawczyni', M: 'Wnioskodawcy'}[step_0.a_0] || '......................')+' zarejestrowanego w Urzędzie Stanu Cywilnego w '+ (normalize(step_2.a_9) || '......................') +' za nr '+ (normalize(step_2.a_8) || '......................') +', w ten sposób, żeby:')
    li('a.', {
        K:'błędnie wpisana w akcie płeć oznaczona jako męska (mężczyzna) została zmieniona na prawidłową – żeńską (kobieta);',
        M:'błędnie wpisana w akcie płeć oznaczona jako żeńska (kobieta) została zmieniona na prawidłową – męską (mężczyzna);',
    }[step_0.a_0] || '......................', 2)
    let next = 'b.'
    if (step_0.a_1) {
        // TODO different text when there are more names
        const name = normalize(step_2.a_5) || '......................'
        const newName = normalize(step_0.a_1_0) || '......................'
        li(next, (name.includes(' ') ? ('imiona '+name+' zostały') : ('imię '+name+' zostało')) + ' zmienione na '+(newName.includes(' ')?'imiona ':'imię ')+newName+';', 2)
        next = 'c.'
    }
    if (step_0.a_2) {
        li(next, 'nazwisko '+normalize(step_2.a_6)+' zostało zmienione na '+normalize(step_0.a_2_0)+'; ', 2)
    }
    li('2.', 'rozpoznanie sprawy na posiedzeniu niejawnym;')
    li('3.', 'rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych;')
    li('4.', 'dopuszczenie i przeprowadzenie dowodu z dokumentów:')
    li('a.', 'odpisu aktu urodzenia – na fakt oznaczenia mojej płci w akcie urodzenia jako '+({K: 'męskiej;', M: 'żeńskiej;'}[step_0.a_0] || '.......;'), 2)
    const increment = () => {
        next = String.fromCharCode(next.charCodeAt(0) + 1) + '.'
    }
    next = 'b.'
    const part1 = { K: 'żeńską', M: 'męską' }[step_0.a_0] || '.......'
    const diagnosis = (F64, HA60) => {
        if (F64 && HA60) {
            return 'transseksualizmu – F64.0 według nomenklatury ICD-10, a według nomenklatury ICD-11 niezgodności płciowej – HA60;'
        }
        if (F64) {
            return 'transseksualizmu – F64.0 według nomenklatury ICD-10;'
        }
        if (HA60) {
            return 'niezgodności płciowej – HA60 według nomenklatury ICD-11;'
        }
        return '......................;'
    }
    if (step_1.a_2_0) {
        li(next, 'opinii psychologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_0_0, step_1.a_2_0_1), 2)
        increment()
    }
    if (step_1.a_2_1) {
        li(next, 'opinii psychologa-seksuologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_1_0, step_1.a_2_1_1), 2)
        increment()
    }
    if (step_1.a_3_0) {
        li(next, 'zaświadczenia lekarza psychiatry – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_0_0, step_1.a_3_0_1), 2)
        increment()
    }
    if (step_1.a_3_1) {
        li(next, 'zaświadczenia lekarza seksuologa – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_1_0, step_1.a_3_1_1), 2)
        increment()
    }
    if (step_1.a_4) {
        li(next, 'zaświadczenia lekarskiego – na fakt wdrożenia u mnie terapii hormonalnej;', 2)
        increment()
    }
    if (step_1.a_5) {
        li(next, 'dokumentu zatytułowanego |Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów| – na fakt aktualnych polskich standardów opieki nad osobami transpłciowymi, wymogów diagnostycznych niezbędnych do postawienia diagnozy F64.0, spełniania przeze mnie kryteriów diagnostycznych;', 2, '|')
        increment()
    }
    if (step_1.a_7) {
        li(next, 'decyzji o zmianie imienia – na fakt zmiany imienia w związku z trwałym poczuciem przynależności do płci '+({ K: 'żeńskiej;', M: 'męskiej;' }[step_0.a_0] || '.......;'), 2)
        increment()
    }
    if (step_1.a_8) {
        li(next, ({ A: 'wydruku z portali społecznościowych', B: 'plakietki identyfikacyjnej z miejsca pracy', C: 'wydruku z portalu USOS' }[step_1.a_8_0] || '......................')+' – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', funkcjonowania jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+' w otoczeniu;', 2)
    }

    return doc
}
