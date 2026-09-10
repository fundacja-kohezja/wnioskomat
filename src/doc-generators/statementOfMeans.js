import { jsPDF } from 'jspdf'

// TODO load it anynchronously?
import { courts } from '../helpers/datasets'
import './fonts/DejaVuSans/DejaVuSans-normal'
import './fonts/DejaVuSans/DejaVuSans-bold'

const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3, step_4, step_5, step_6]) => {

    const a = {
        ...step_1,
        ...step_2,
        ...step_4,
    }

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
    doc.text(21, 176.5, normalize(a.chosen_court) + ', Wydział Cywilny, ' + normalize(courts[a.chosen_court]?.address || '').replace('\n', ', '), {
        maxWidth: 168,
    })
    doc.setFontSize(11)
    doc.text(21, 237, [a.birth_name, a.birth_surname].map(normalize).join(' ') + ', ' + normalize(a.pesel) + (a.is_business ? (', NIP ' + a.tax_id) : ''),  {
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
    if (a.has_peers) {
        let y = 67;
        (a.peers || []).forEach(({ peer_name, peer_birth, peer_relation }, i) => {
            if (i > 4) {
                // TODO handle extra pages
                return
            }
            doc.text(21, y, normalize(peer_name), {
                maxWidth: 48,
            })
            if (peer_birth) {
                doc.text(71, y, (new Date(peer_birth)).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
                    maxWidth: 48,
                })
            }
            doc.text(121, y, normalize(peer_relation), {
                maxWidth: 68,
            })
            y += 9
        })
    }
    if (a.has_residential_property) {
        const text = doc.splitTextToSize(normalize(a.residential_property_info).replace('\n', ' '), 168)
        if (text.length > 3) {
            doc.setFontSize(9)
            doc.text(21, 163, normalize(a.residential_property_info).replace('\n', ' '), {
                maxWidth: 168
            })
            doc.setFontSize(10)
        } else {
            doc.text(21, 164, text)
        }
    } else {
        doc.text(21, 164, 'brak')
    }
    if (a.has_farm_property) {
        const text = doc.splitTextToSize(normalize(a.farm_property_info).replace('\n', ' '), 168)
        if (text.length > 3) {
            doc.setFontSize(9)
            doc.text(21, 200, normalize(a.farm_property_info).replace('\n', ' '), {
                maxWidth: 168
            })
            doc.setFontSize(10)
        } else {
            doc.text(21, 201, text)
        }
    } else {
        doc.text(21, 201, 'brak')
    }
    doc.text(21, 231, a.has_different_property ? normalize(a.different_property_info) : 'brak', {
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
    doc.text(21, 56, a.has_savings ? normalize(a.savings_info) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 105, a.has_security ? normalize(a.security_info) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 164, a.has_liabilites ? normalize(a.liabilities_info) : 'brak', {
        maxWidth: 168
    })
    doc.text(21, 217, a.has_valuable_items ? normalize(a.valuable_items_info) : 'brak', {
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
    (a.income || []).forEach(({ income_type, income_amount, income_period }) => {
        incomes.push([
            [a.birth_name, a.birth_surname].map(normalize).join(' '),
            normalize(income_type),
            normalize(income_amount) + ({ M: ' zł miesięcznie', R: ' zł rocznie' }[income_period] || ' zł')
        ])
    });
    (a.peers || []).forEach(({ peer_name, peer_income }) => {
        peer_income.forEach(({ peer_income_type, peer_income_amount, peer_income_period }) => {
            incomes.push([
                normalize(peer_name),
                normalize(peer_income_type),
                normalize(peer_income_amount) + ({ M: ' zł miesięcznie', R: ' zł rocznie' }[peer_income_period] || ' zł')
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
    if (a.has_expenses_intro) text += (normalize(a.expenses_intro) + '\n\n')
    const monthlyExpenses = []
    if (a.is_rent_cost) monthlyExpenses.push('czysz najmu w wysokości ' + a.rent_cost + ' zł')
    if (a.is_media_cost) monthlyExpenses.push(a.media_cost + ' zł opłat eksploatacyjnych')
    if (a.is_internet_cost) monthlyExpenses.push(a.internet_cost + ' zł za Internet')
    if (a.is_power_cost) monthlyExpenses.push(a.power_cost + ' zł za prąd')
    if (a.is_gas_cost) monthlyExpenses.push(a.gas_cost + ' zł za dostawę gazu')
    if (a.is_heating_cost) monthlyExpenses.push(a.heating_cost + ' zł za ogrzewanie')
    if (a.is_disposal_cost) monthlyExpenses.push(a.disposal_cost + ' zł za wywóz śmieci')
    if (a.is_property_tax_cost) monthlyExpenses.push(a.property_tax_cost + ' zł tytułem opłaty od nieruchomości')
    if (a.is_property_insurance_cost) monthlyExpenses.push(a.property_insurance_cost + ' zł tytułem ubezpieczenia nieruchomości')
    if (a.is_food_cost) monthlyExpenses.push('ok. ' + a.food_cost + ' zł kosztów wyżywienia')
    if (a.is_cleaning_cost) monthlyExpenses.push('ok. ' + a.cleaning_cost + ' zł na środki czystości')
    if (a.is_care_cost) monthlyExpenses.push('ok. ' + a.care_cost + ' zł na kosmetyki i inne środki higieny')
    if (a.is_clothes_cost) monthlyExpenses.push('ok. ' + a.clothes_cost + ' zł na odzież i obuwie')
    if (a.is_transport_cost) monthlyExpenses.push(a.transport_cost + ' zł za bilet miesięczny')
    if (a.is_fuel_cost) monthlyExpenses.push(a.fuel_cost + ' zł za paliwo')
    if (a.is_pet_cost) monthlyExpenses.push('ok. ' + a.pet_cost + ' zł kosztów utrzymania zwierzęcia')
    if (a.is_different_monthly_cost && Array.isArray(a.monthly_cost)) {
        a.monthly_cost.forEach(({ monthly_cost_amount, monthly_cost_type } = {}) => {
            monthlyExpenses.push(normalize(monthly_cost_amount) + ' zł na ' + normalize(monthly_cost_type))
        })
    }
    if (monthlyExpenses.length) {
        text += 'Do moich stałych miesięcznych wydatków należy'
        if (monthlyExpenses.length === 1) {
            text += ' '
            text += monthlyExpenses[0]
            text += '.'
            text += '\n'
        } else {
            text += ':\n'
            monthlyExpenses.forEach((item, i) => {
                text += ' – '
                text += item
                text += (i === monthlyExpenses.length - 1 ? '.' : ',')
                text += '\n'
            })
        }
        text += '\n'
    }
    const yearlyExpenses = []
    if (a.is_car_maintenance_cost) yearlyExpenses.push('koszty utrzymania samochodu, w tym obowiązkowe przeglądy, ubezpieczenie OC i AC – ' + a.car_maintenance_cost + ' zł rocznie')
    if (a.is_dental_care_cost) yearlyExpenses.push('koszty związane z opieką dentystyczną – ' + a.dental_care_cost + ' zł rocznie')
    if (a.is_doctor_cost) yearlyExpenses.push('koszty wizyt lekarskich – ' + a.doctor_cost + ' zł rocznie')
    if (a.is_drugs_cost) yearlyExpenses.push('koszty przyjmowanych na stałe lekarstw – ' + a.drugs_cost + 'zł rocznie')
    if (a.is_different_yearly_cost && Array.isArray(a.yearly_cost)) {
        a.yearly_cost.forEach(({ yearly_cost_amount, yearly_cost_type } = {}) => {
            yearlyExpenses.push(normalize(yearly_cost_amount) + ' zł rocznie na ' + normalize(yearly_cost_type))
        })
    }
    if (yearlyExpenses.length) {
        text += 'Do stałych zobowiązań należy doliczyć również'
        if (yearlyExpenses.length === 1) {
            text += ' '
            text += yearlyExpenses[0]
            text += '\n'
        } else {
            text += ':\n'
            yearlyExpenses.forEach((item, i) => {
                text += ' – '
                text += item
                text += (i === yearlyExpenses.length - 1 ? '.' : ',')
                text += '\n'
            })
        }
        text += '\n'
    }
    if (a.has_peer_expenses) text += normalize(a.peer_expenses)
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
    if (a.has_expenses_extra_info) {
        const lines = doc.splitTextToSize(normalize(a.expenses_extra_info), 168)
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
    const city = normalize(a.city) || '......................'
    doc.text(21, 124, city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }) + 'r.')

    return (filename) => {
        doc.save(filename+'.pdf')
    }
}
