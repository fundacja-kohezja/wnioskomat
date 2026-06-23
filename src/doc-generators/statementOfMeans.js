import { jsPDF } from 'jspdf'

// TODO load it anynchronously?
import { courts } from '../helpers/datasets'
import './fonts/DejaVuSans/DejaVuSans-normal'
import './fonts/DejaVuSans/DejaVuSans-bold'

const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3, step_4, step_5, step_6]) => {

    const doc = new jsPDF

    doc.setFontSize(9)
    doc.setLineHeightFactor(1.15)
    doc.setFont('DejaVuSans', 'normal', 'bold')

    doc.setFillColor('0.85')

    let y = 46
    const addRect = (h, isFilled = false) => {
        doc.rect(20, y, 170, h, isFilled ? 'DF' : 'S')
        y += h
    }
    addRect(12, true)
    addRect(100, true)
    addRect(15, true)
    addRect(9)
    addRect(15, true)
    addRect(9)
    addRect(9, true)
    addRect(18, true)
    addRect(18)
    doc.text(105, 50, 'OŚWIADCZENIE O STANIE RODZINNYM, MAJĄTKU, DOCHODACH\nI ŹRÓDŁACH UTRZYMANIA', { align: 'center' })
    doc.text(105, 62, 'POUCZENIE', { align: 'center' })
    doc.setFontSize(8)
    doc.setFont('DejaVuSans', 'normal', 'normal')
    doc.text(22, 70, '1)')
    doc.text(32, 70, 'Druk należy wypełnić czytelnie, dokonując wpisów bez skreśleń i poprawek.')
    doc.text(22, 77, '2)')
    doc.text(32, 77, 'Każdą rubrykę niezacieniowaną należy wypełnić przez wpisanie odpowiedniej treści.')
    doc.text(22, 84, '3)')
    doc.text(32, 84, [
        'Jeżeli oświadczenie nie będzie zawierało wszystkich wymaganych danych, wnioskodawca zostanie',
        'zobowiązany do poprawienia lub uzupełnienia oświadczenia w terminie tygodniowym od dnia otrzymania',
        'wezwania. Po bezskutecznym upływie terminu przewodniczący zwraca wniosek o zwolnienie od kosztów',
        'sądowych.',
    ])
    doc.text(22, 101, '4)')
    doc.text(32, 101, [
        'Jeżeli nie jest możliwe wpisanie wszystkich danych w druku, należy umieścić te dane na dodatkowej karcie',
        'formatu A4, ze wskazaniem uzupełnianej rubryki. Pod dodaną treścią należy złożyć podpis.',
    ])
    doc.text(22, 111, '5)')
    doc.text(32, 111, 'Dane w oświadczeniu należy wpisać według stanu istniejącego w dniu jego sporządzenia.')
    doc.text(22, 118, '6)')
    doc.text(32, 118, [
        'Sąd może zarządzić stosowne dochodzenie, jeżeli na podstawie okoliczności sprawy lub oświadczeń strony',
        'przeciwnej powziął wątpliwości co do rzeczywistego stanu majątkowego strony domagającej się',
        'zwolnienia od kosztów sądowych lub z niego korzystającej (art. 109 ust. 1 ustawy z dnia 28 lipca 2005 r.',
        'o kosztach sądowych w sprawach cywilnych (Dz. U. z 2014 r. poz. 1025, z późn. zm.)).',
    ])
    doc.text(22, 135, '7)')
    doc.text(32, 135, [
        'Stronę, która uzyskała zwolnienie od kosztów sądowych na skutek świadomego podania nieprawdziwych',
        'okoliczności, sąd skaże na grzywnę w wysokości do 1000 złotych; niezależnie od jej obowiązku uiszczenia',
        'grzywny strona powinna uiścić wszystkie przepisane opłaty i pokryć obciążające ją wydatki. Osobę, która',
        'ponownie zgłosiła wniosek o zwolnienie od kosztów sądowych, świadomie podając nieprawdziwe',
        'okoliczności o stanie rodzinnym, majątku, dochodach i źródłach utrzymania, sąd, odrzucając wniosek,',
        'skazuje na grzywnę w wysokości do 2000 złotych (art. 111 ustawy z dnia 28 lipca 2005 r. o kosztach',
        'sądowych w sprawach cywilnych (Dz. U. z 2014 r. poz. 1025, z późn. zm.)).',
    ])
    doc.setFontSize(9)
    doc.setFont('DejaVuSans', 'normal', 'bold')
    doc.text(22, 162, '1.  Sąd, do którego jest składane oświadczenie')
    doc.text(22, 186, '2.  Sygnatura sprawy')
    doc.text(22, 210, '3.  Dane osoby składającej wniosek')
    doc.text(22, 219, 'Imię i nazwisko, numer PESEL, a w wypadku przedsiębiorców dodatkowo NIP')
    doc.setFont('DejaVuSans', 'normal', 'normal')
    // doc.setFontSize(10)
    // doc.text(105, 33, 'WZÓR', { align: 'center' })
    doc.setFontSize(8)
    doc.text(22, 169, '(nazwa i siedziba sądu, ewentualnie również właściwy wydział)')
    doc.text(22, 193, '(wpisuje się, gdy oświadczenie jest składane po złożeniu pozwu lub wniosku)')
    doc.text(22, 226, [
        '(w razie nieposiadania numeru PESEL należy podać imię ojca i imię matki; w razie nieposiadania NIP-u',
        'należy podać informację o jego braku)',
    ])
    doc.setFont('TeXGyreTermes', 'normal', 'normal')
    doc.setFontSize(10)
    doc.text(21, 176.5, normalize(step_4.a_3) + ', Wydział Cywilny, ' + normalize(courts[step_4.a_3]?.address || '').replace('\n', ', '), {
        maxWidth: 168,
    })
    doc.setFontSize(11)
    doc.text(21, 237, [step_4.a_5, step_4.a_6].map(normalize).join(' ') + ', ' + normalize(step_4.a_0) + (step_1.a_0 ? (', NIP ' + step_1.a_0_0) : ''),  {
        maxWidth: 168,
    })

    doc.addPage()
    doc.setFillColor('0.85')
    y = 25
    addRect(22, true)
    addRect(16, true)
    for (let i = 0; i < 5; i++) addRect(9)
    addRect(25, true)
    addRect(8, true)
    addRect(19, true)
    addRect(15)
    addRect(22, true)
    addRect(15)
    addRect(15, true)
    addRect(36)
    doc.line(70, 47, 70, 108)
    doc.line(120, 47, 120, 108)
    doc.setFontSize(9)
    doc.setFont('DejaVuSans', 'normal', 'bold')
    doc.text(22, 30, '4. Stan rodzinny')
    doc.text(45, 56, 'Imię i nazwisko', { align: 'center' })
    doc.text(95, 56, 'Data urodzenia', { align: 'center' })
    doc.text(155, 51, [
        'Rodzaj stosunku łączącego',
        'wskazaną osobę',
        'z wnioskodawcą',
    ], { align: 'center' })
    doc.text(22, 112, '5. Majątek')
    doc.text(22, 137, 'Nieruchomości')
    doc.setFont('DejaVuSans', 'normal', 'normal')
    doc.text(22, 145, [
        'nieruchomość przeznaczona do stałego zamieszkiwania przez wnioskodawcę (nieruchomość',
        'zabudowana domem mieszkalnym lub mieszkanie)',
    ])
    doc.text(22, 179, 'nieruchomość rolna')
    doc.text(22, 216, 'inne nieruchomości')
    doc.setFontSize(8)
    doc.text(22, 36, [
        '(należy wpisać dane osób pozostających we wspólnym gospodarstwie domowym z wnioskodawcą: małżonka',
        'lub osoby pozostającej we wspólnym pożyciu z wnioskodawcą, wstępnych, zstępnych i osób pozostających',
        'w stosunku przysposobienia lub pod opieką wnioskodawcy, powinowatych)',
    ])
    doc.text(22, 118, [
        '(należy wpisać stan majątkowy wnioskodawcy, wskazując jednocześnie tytuł prawny (np. własność,',
        'użytkowanie wieczyste); jeżeli przedmioty wchodzące w skład majątku są przedmiotem współwłasności lub',
        'współużytkowania wieczystego, należy w stosunku do każdego z nich podać udział lub zaznaczyć, że wchodzą',
        'w skład majątku objętego małżeńską wspólnością majątkową)',
    ])
    doc.text(22, 156, '(należy podać adres, powierzchnię działki, domu, mieszkania w m² i szacunkową wartość)')
    doc.text(22, 186, [
        '(należy podać adres, powierzchnię w hektarach, szacunkową wartość i sposób rolniczego wykorzystania; jeżeli',
        'nieruchomość stanowi gospodarstwo rolne, należy wskazać osobno powierzchnię gruntów rolnych i leśnych,',
        'liczbę budynków, liczbę i rodzaj urządzeń służących do produkcji, liczbę i rodzaj inwentarza żywego)',
    ])
    doc.text(22, 224, '(należy podać adres, powierzchnię w hektarach lub w m2, szacunkową wartość i sposób wykorzystania)')
    doc.setFont('TeXGyreTermes', 'normal', 'normal')
    doc.setFontSize(10)
    if (step_1.a_9) {
        let y = 67;
        (step_1.a_10 || []).forEach(([name, born, who], i) => {
            if (i > 4) {
                // TODO handle extra pages
                return
            }
            doc.text(21, y, normalize(name), {
                maxWidth: 48,
            })
            if (born) {
                doc.text(71, y, (new Date(born)).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
                    maxWidth: 48,
                })
            }
            doc.text(121, y, normalize(who), {
                maxWidth: 68,
            })
            y += 9
        })
    }
    if (step_1.a_1) {
        const text = doc.splitTextToSize(normalize(step_1.a_1_0).replace('\n', ' '), 168)
        if (text.length > 3) {
            doc.setFontSize(9)
            doc.text(21, 163, normalize(step_1.a_1_0).replace('\n', ' '), {
                maxWidth: 168
            })
            doc.setFontSize(10)
        } else {
            doc.text(21, 164, text)
        }
    } else {
        doc.text(21, 164, 'brak')
    }
    if (step_1.a_2) {
        const text = doc.splitTextToSize(normalize(step_1.a_2_0).replace('\n', ' '), 168)
        if (text.length > 3) {
            doc.setFontSize(9)
            doc.text(21, 200, normalize(step_1.a_2_0).replace('\n', ' '), {
                maxWidth: 168
            })
            doc.setFontSize(10)
        } else {
            doc.text(21, 201, text)
        }
    } else {
        doc.text(21, 201, 'brak')
    }
    doc.text(21, 231, step_1.a_3 ? normalize(step_1.a_3_0) : 'brak', {
        maxWidth: 168
    })

    doc.addPage()
    doc.setFillColor('0.85')
    y = 25
    addRect(8, true)
    addRect(19, true)
    addRect(30)
    addRect(19, true)
    addRect(30)
    addRect(29, true)
    addRect(30)
    addRect(23, true)
    addRect(40)
    doc.setFontSize(9)
    doc.setFont('DejaVuSans', 'normal', 'bold')
    doc.text(22, 29, 'Pozostały majątek')
    doc.setFont('DejaVuSans', 'normal', 'normal')
    doc.text(22, 38, 'oszczędności')
    doc.text(22, 86, [
        'papiery wartościowe i inne prawa majątkowe, np. udziały, polisy inwestycyjne, jednostki',
        'uczestnictwa w funduszach inwestycyjnych, polisolokaty',
    ])
    doc.text(22, 135, 'wierzytelności')
    doc.text(22, 195, [
        'inne przedmioty wartościowe (ruchomości) o wartości wyższej niż 5000 zł, np. samochody',
        'i inne pojazdy mechaniczne, maszyny, urządzenia elektroniczne, biżuteria, sprzęt RTV',
        'i AGD',
    ])
    doc.setFontSize(8)
    doc.text(22, 45, [
        '(należy wpisać wartość nominalną i walutę kwot znajdujących się na rachunkach bankowych oraz posiadanych',
        'zasobów pieniężnych w gotówce)',
    ])
    doc.text(22, 98, '(należy wpisać rodzaj i wartość nominalną lub szacunkową)')
    doc.text(22, 142, [
        '(w przypadku wierzytelności pieniężnych należy wpisać należność (kwotę pieniężną) przypadającą od innej',
        'osoby lub osób oraz termin, w jakim powinna być zapłacona; w przypadku wierzytelności niepieniężnych',
        'należy podać obowiązek niepieniężny, który ma spełnić inna osoba lub osoby, jego wartość szacunkową',
        'i termin jego spełnienia; należy także wskazać sposób zabezpieczenia wierzytelności, np. weksel, hipoteka,',
        'przewłaszczenie na zabezpieczenie)',
    ])
    doc.text(22, 210, '(należy wpisać nazwę, rodzaj/typ, rok produkcji oraz szacunkową wartość każdego przedmiotu odrębnie)')
    doc.setFont('TeXGyreTermes', 'normal', 'normal')
    doc.setFontSize(10)
    doc.text(21, 56, step_1.a_4 ? normalize(step_1.a_4_0) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 105, step_1.a_5 ? normalize(step_1.a_5_0) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 164, step_1.a_6 ? normalize(step_1.a_6_0) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 217, step_1.a_7 ? normalize(step_1.a_7_0) : 'brak', {
        maxWidth: 168
    })

    doc.addPage()
    doc.setFillColor('0.85')
    y = 25
    addRect(36, true)
    addRect(24, true)
    for (let i = 0; i < 5; i++) addRect(18)
    addRect(15, true)
    addRect(60)
    doc.line(66, 61, 66, 175)
    doc.line(120, 61, 120, 175)
    doc.setFontSize(9)
    doc.setFont('DejaVuSans', 'normal', 'bold')
    doc.text(22, 29, [
        '6. Dochody i źródła utrzymania wnioskodawcy i osób pozostających we wspólnym',
        'gospodarstwie domowym',
    ])
    doc.text(42, 70, 'Imię i nazwisko', { align: 'center' })
    doc.text(91, 70, 'Z jakiego tytułu', { align: 'center' })
    doc.text(156, 66, [
        'Dochód miesięczny/roczny',
        'netto',
    ], { align: 'center' })
    doc.text(22, 179, '7. Zobowiązania i stałe wydatki')
    doc.setFont('DejaVuSans', 'normal', 'normal')
    doc.setFontSize(8)
    doc.text(22, 40, [
        '(należy wpisać odrębnie dla każdej osoby wszystkie dochody i źródła utrzymania np. z tytułu wynagrodzenia',
        'za pracę, emerytury, renty, działalności wykonywanej osobiście - w tym z wykonania umów',
        'cywilnoprawnych, pełnienia obowiązków społecznych lub obywatelskich, zasiadania w zarządach, radach',
        'nadzorczych i komisjach osób prawnych, z praw autorskich, pokrewnych, praw własności przemysłowej oraz',
        'innych praw twórcy, z najmu, dzierżawy, dywidend, dopłat do produkcji rolniczej i działów specjalnych',
        'produkcji rolnej, alimentów)',
    ])
    doc.text(156, 77, [
        '(należy podać wysokość dochodu',
        'i właściwy okres rozliczeniowy)',
    ], { align: 'center' })
    doc.text(22, 185, [
        '(należy wpisać np. kredyty, pożyczki, raty leasingowe, alimenty, czynsze najmu, dzierżawy, koszty ponoszone',
        'na mieszkanie, opłaty za media, koszty leczenia, rehabilitacji, ubezpieczenia majątku)',
    ])
    doc.setFont('TeXGyreTermes', 'normal', 'normal')
    doc.setFontSize(10)
    const incomes = [];
    (step_1.a_8 || []).forEach(([what, amount, period]) => {
        incomes.push([
            [step_4.a_5, step_4.a_6].map(normalize).join(' '),
            normalize(what),
            normalize(amount) + ({ M: ' zł miesięcznie', R: ' zł rocznie' }[period] || ' zł')
        ])
    });
    (step_1.a_10 || []).forEach(([name,,,personIncomes]) => {
        personIncomes.forEach(([what, amount, period]) => {
            incomes.push([
                normalize(name),
                normalize(what),
                normalize(amount) + ({ M: ' zł miesięcznie', R: ' zł rocznie' }[period] || ' zł')
            ])
        })
    })
    y = 89
    incomes.forEach(([name, income, amount], i) => {
        if (i > 4) {
            // TODO handle extra pages
            return
        }
        doc.text(21, y, name, {
            maxWidth: 44,
        })
        doc.text(67, y, income, {
            maxWidth: 53,
        })
        doc.text(121, y, amount, {
            maxWidth: 68,
        })
        y += 18
    })
    let text = ''
    const houseExpenses = []
    if (step_2.a_0) houseExpenses.push('kwotę czyszu najmu ' + step_2.a_0_0 + ' zł miesięcznie')
    if (step_2.a_1) houseExpenses.push('kwotę ' + step_2.a_1_0 + ' zł opłat eksploatacyjnych')
    if (step_2.a_2) houseExpenses.push('koszt ' + step_2.a_2_0 + ' zł miesięcznie związany z dostawą gazu')
    if (step_2.a_3) houseExpenses.push('kwotę ' + step_2.a_3_0 + ' zł miesięcznie za prąd')
    if (step_2.a_4) houseExpenses.push('kwotę ' + step_2.a_4_0 + ' zł miesięcznie za ogrzewanie')
    if (step_2.a_5) houseExpenses.push('kwotę ' + step_2.a_5_0 + ' zł miesięcznie za Internet')
    if (step_2.a_6) houseExpenses.push('kwotę ' + (isNaN(Number(step_2.a_6_0)) ? '' : step_2.a_6_0 * 12) + ' zł rocznie tytułem opłaty od nieruchomości')
    if (step_2.a_7) houseExpenses.push('kwotę ' + step_2.a_7_0 + ' zł miesięcznie tytułem ubezpieczenia nieruchomości')
    if (step_2.a_8) houseExpenses.push('kwotę ' + step_2.a_8_0 + ' zł miesięcznie w związku z wywozem śmieci')
    if (houseExpenses.length) {
        text += 'Ponoszę stałe koszty utrzymania mieszkania, do których wliczam'
        if (houseExpenses.length === 1) {
            text += ' '
            text += houseExpenses[0]
            text += '.'
            text += '\n'
        } else {
            text += ':\n'
            houseExpenses.forEach((item, i) => {
                text += ' – '
                text += item
                text += (i === houseExpenses.length - 1 ? '.' : ',')
                text += '\n'
            })
        }
        text += '\n'
    }
    if (step_2.a_9) text += 'Ponoszę' + (houseExpenses.length ? ' również' : '')  + ' koszty wyżywienia w wysokości około ' + step_2.a_9_0 + ' zł miesięcznie. '
    if (step_2.a_11) text += 'Na odzież i obuwie wydaję ok. ' + (isNaN(Number(step_2.a_11_0)) ? '' : step_2.a_11_0 * 12) + ' zł rocznie. '
    if (step_2.a_10) text += 'Na środki czystości wydaję ok. ' + step_2.a_10_0 + ' zł miesięcznie. '
    if (step_2.a_12) text += 'Na kosmetyki i inne środki higieny wydaję ok. ' + step_2.a_12_0 + ' zł miesięcznie. '
    if (step_2.a_9 || step_2.a_10 || step_2.a_11 || step_2.a_12) text += '\n\n'
    const furtherExpenses = []
    if (step_2.a_17) furtherExpenses.push('koszty utrzymania samochodu, w tym obowiązkowe przeglądy, ubezpieczenie OC i AC – ' + step_2.a_17_0)
    if (step_2.a_14) furtherExpenses.push('koszty paliwa – ok. ' + step_2.a_14_0 + ' zł miesięcznie')
    if (step_2.a_13) furtherExpenses.push('koszt biletu miesięcznego – ' + step_2.a_13_0 + ' zł miesięcznie')
    if (step_2.a_18) furtherExpenses.push('koszty związane z opieką dentystyczną – ' + step_2.a_18_0)
    if (step_2.a_19) furtherExpenses.push('koszty wizyt lekarskich – ' + step_2.a_19_0)
    if (step_2.a_20) furtherExpenses.push('koszty przyjmowanych na stałe lekarstw – ' + step_2.a_20_0)
    if (step_2.a_16 && Array.isArray(step_2.a_16_0)) {
        step_2.a_16_0.forEach(([amount = '', forWhat = ''] = []) => {
            furtherExpenses.push('kwotę ' + amount + ' zł miesięcznie na ' + forWhat)
        })
    }
    if (step_2.a_21 && Array.isArray(step_2.a_21_0)) {
        step_2.a_21_0.forEach(([what, amount] = []) => {
            furtherExpenses.push(normalize(what) + ' – ' + normalize(amount))
        })
    }
    if (furtherExpenses.length) {
        text += 'Do stałych zobowiązań należy doliczyć również'
        if (furtherExpenses.length === 1) {
            text += ' '
            text += furtherExpenses[0]
            text += '\n'
        } else {
            text += ':\n'
            furtherExpenses.forEach((item, i) => {
                text += ' – '
                text += item
                text += (i === furtherExpenses.length - 1 ? '.' : ',')
                text += '\n'
            })
        }
        text += '\n'
    }
    if (step_2.a_15) text += ('Opiekuję się zwierzęciem, na którego utrzymanie wydaję ok. ' + step_2.a_15_0 + ' zł miesięcznie.\n\n')
    if (step_2.a_22) text += normalize(step_2.a_22_0)
    if (text) {
        const lines = doc.splitTextToSize(text, 168)
        if (lines.length > 13) {
            doc.setFontSize(lines.length > 16 ? 8 : 9)
            doc.text(21, 193, text, {
                maxWidth: 168,
            })
        } else {
            doc.text(21, 193, lines)
        }
        // TODO continue on extra page if text too long
    }

    doc.addPage()
    doc.setFillColor('0.85')
    y = 25
    addRect(8, true)
    addRect(78)
    addRect(8, true)
    addRect(10)
    addRect(8, true)
    addRect(11)
    doc.setFontSize(9)
    doc.setFont('DejaVuSans', 'normal', 'bold')
    doc.text(22, 29, '8. Inne dane, które wnioskodawca uważa za istotne')
    doc.text(22, 115, '9. Miejscowość i data')
    doc.text(22, 133, '10. Podpis wnioskodawcy')
    doc.setFont('TeXGyreTermes', 'normal', 'normal')
    doc.setFontSize(10)
    if (step_2.a_23) {
        const lines = doc.splitTextToSize(normalize(step_2.a_23_0), 168)
        if (lines.length > 13) {
            doc.setFontSize(lines.length > 16 ? 8 : 9)
            doc.text(21, 37, normalize(step_2.a_23_0), {
                maxWidth: 168,
            })
            doc.setFontSize(10)
        } else {
            doc.text(21, 37, lines)
        }
        // TODO continue on extra page if text too long
    }
    const city = normalize(step_4.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................'
    doc.text(21, 124, city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }) + 'r.')

    return (filename) => {
        doc.save(filename+'.pdf')
    }
}
