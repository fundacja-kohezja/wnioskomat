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
    const fontSize = 11

    doc.setFontSize(fontSize)
    doc.setFont('TeXGyreTermes')

    const bold = (content) => {
        doc.setFont('TeXGyreTermes', 'normal', 'bold')
        content()
        doc.setFont('TeXGyreTermes', 'normal', 'normal')
    }
    const italic = (content) => {
        doc.setFont('TeXGyreTermes', 'italic')
        content()
        doc.setFont('TeXGyreTermes', 'normal')
    }
    let lineHeightFactor = 1.15
    const lineHeight = (lh) => {
        doc.setLineHeightFactor(lh)
        lineHeightFactor = lh
    }
    const margin = 25
    const w = 210
    const maxWidth = w - margin*2

    const unitFactor = fontSize / (72/25.4)

    let y = margin

    const newPage = () => {
        doc.addPage()
        y = margin
    }

    const space = (height) => {
        if (y !== margin) { // don't add space on top, if it's the first text on top of the page
            y += height
        }
    }

    const textToLines = (text, formatSeparator, type, w = maxWidth) => {
        const lines = [{ textWidth: 0, words: [] }]
        let line = 0
        let x = 0
        let isFormatted = false
        text.split(' ').forEach(word => {
            let wordWidth = 0
            word.split(formatSeparator).forEach((part, i) => {
                if (i > 0) {
                    isFormatted = !isFormatted
                    if (isFormatted) {
                        if (type === 'b') {
                            doc.setFont('TeXGyreTermes', 'normal', 'bold')
                        } else {
                            doc.setFont('TeXGyreTermes', 'italic', 'normal')
                        }
                    } else {
                        doc.setFont('TeXGyreTermes', 'normal', 'normal')
                    }
                }
                wordWidth += doc.getStringUnitWidth(part) * unitFactor
            })
            if (x + wordWidth > w) {
                lines[line].textWidth = x
                lines[++line] = { textWidth: 0, words: [] }
                x = 0
            }
            x += wordWidth
            x += doc.getStringUnitWidth(' ') * unitFactor

            lines[line].words.push({ text: word, width: wordWidth })
        })
        return lines
    }

    const renderJustified = (lines, formatSeparator, type, w = maxWidth, doExtra = () => {}) => {
        let linesLeft = Math.round((297 - y - margin)/(11*lineHeightFactor/(72/25.4)))
        let extrasDone = false
        let isFormatted = false

        const renderLine = ({ textWidth, words }) => {
            const extraSpace = (w - textWidth) / (words.length - 1)
            let x = margin // TODO parametrize
            words.forEach(word => {
                if (word.text.includes(formatSeparator)) {
                    let x2 = 0
                    word.text.split(formatSeparator).forEach((part, i) => {
                        if (i > 0) {
                            isFormatted = !isFormatted
                            if (isFormatted) {
                                if (type === 'b') {
                                    doc.setFont('TeXGyreTermes', 'normal', 'bold')
                                } else {
                                    doc.setFont('TeXGyreTermes', 'italic', 'normal')
                                }
                            } else {
                                doc.setFont('TeXGyreTermes', 'normal', 'normal')
                            }
                        }
                        doc.text(part, x + x2, y)
                        x2 += doc.getStringUnitWidth(part) * unitFactor
                    })
                } else {
                    doc.text(word.text, x, y)
                }
                x += word.width
                x += doc.getStringUnitWidth(' ') * unitFactor
                x += extraSpace
            })
            y += lineHeightFactor * unitFactor
        }

        if (linesLeft < lines.length) {
            // if paragraph is long enough, allow spreading it across pages
            if (lines.length > 3 && linesLeft > 2) {
                if (lines.length - linesLeft === 1) { // prevent widows
                    linesLeft--
                }
                doExtra()
                extrasDone = true
                lines.splice(0, linesLeft).forEach(renderLine)
            }
            newPage()
        }

        if (!extrasDone) doExtra()
        const lastLine = lines.pop().words.map(({ text }) => text).join(' ')
        lines.forEach(renderLine)
        inlineFormat([lastLine], formatSeparator, type) // TODO obviously do this better

        y += lineHeightFactor * unitFactor
    }

    const inlineFormat = (lines, formatSeparator, type, shift = 0, justify = true) => {
        let isFormatted = false
        let curY = y
        lines.forEach((line, i) => {
            if (i === lines.length - 1) justify = false // dont justify last line
            let x = 0
            if (justify) {
                let lineWidth
                const calculate = () => {
                    lineWidth = doc.getStringUnitWidth(line.replaceAll(formatSeparator, '')) * 11/(72/25.4)
                }
                const words = line.split(' ')
                const spaces = words.length - 1
                words.forEach(word => {
                    calculate()
                    const spaceLength = Math.max(doc.getStringUnitWidth(' ') * 11/(72/25.4) * 0.6, doc.getStringUnitWidth(' ') * 11/(72/25.4) + (maxWidth - shift - lineWidth)/spaces)
                    if (word.includes(formatSeparator)) {
                        const parts = word.split(formatSeparator)
                        word = parts.pop()
                        parts.forEach(part => {
                            doc.text(part, margin + shift + x, curY)
                            x += doc.getStringUnitWidth(part) * 11/(72/25.4)
                            isFormatted = !isFormatted
                            if (isFormatted) {
                                if (type === 'b') {
                                    doc.setFont('TeXGyreTermes', 'normal', 'bold')
                                } else {
                                    doc.setFont('TeXGyreTermes', 'italic', 'normal')
                                }
                            } else {
                                doc.setFont('TeXGyreTermes', 'normal', 'normal')
                            }
                        })
                    }
                    doc.text(word, margin + shift + x, curY)
                    x += doc.getStringUnitWidth(word) * 11/(72/25.4) + spaceLength
                })
            } else {
                line.split(formatSeparator).forEach((part, i) => {
                    if (i > 0) {
                        isFormatted = !isFormatted
                        if (isFormatted) {
                            if (type === 'b') {
                                doc.setFont('TeXGyreTermes', 'normal', 'bold')
                            } else {
                                doc.setFont('TeXGyreTermes', 'italic', 'normal')
                            }
                        } else {
                            doc.setFont('TeXGyreTermes', 'normal', 'normal')
                        }
                    }
                    doc.text(part, margin + shift + x, curY)
                    x += doc.getStringUnitWidth(part) * 11/(72/25.4)
                })
            }
            curY += 11*lineHeightFactor/(72/25.4)
        })
        doc.setFont('TeXGyreTermes', 'normal', 'normal')
    }

    const p = (text, shift = 0, spaceAfter = 3, options = {}, doExtra) => {
        const lines = doc.splitTextToSize(text, maxWidth - shift)
        let linesLeft = Math.round((297 - y - margin)/(11*lineHeightFactor/(72/25.4)))
        let extrasDone = false

        if (!options.align) {
            options.align = 'justify'
            if (!options.maxWidth) options.maxWidth = maxWidth - shift
        }
        if (options.align === 'justify' && !doExtra) {
            const args = [options.italicSep || options.boldSep, options.boldSep ? 'b' : 'i', options.maxWidth]
            const lines = textToLines(text, ...args)
            console.log(lines)
            renderJustified(lines, ...args)
            y += spaceAfter
            return
        }
        if (!doExtra) {
            doExtra = () => {}
        }

        if (linesLeft < lines.length) {
            // if paragraph is long enough, allow spreading it across pages
            if (lines.length > 3 && linesLeft > 2) {
                if (lines.length - linesLeft === 1) { // prevent widows
                    linesLeft--
                }
                // add empty line at the end, so the actual last line also gets justified
                const onPrevPage = [...lines.slice(0, linesLeft), '']
                doExtra()
                extrasDone = true
                if (options.italicSep) {
                    inlineFormat(onPrevPage, options.italicSep, 'i', shift)
                } else if (options.boldSep) {
                    inlineFormat(onPrevPage, options.boldSep, 'b', shift)
                } else {
                    doc.text(onPrevPage, options.align === 'center' ? (w/2) : (margin + shift), y, options)
                }
                newPage()
                lines.splice(0, linesLeft)
            } else {
                newPage()
            }
        }

        if (!extrasDone) doExtra()
        if (options.italicSep) {
            inlineFormat(lines, options.italicSep, 'i', shift)
        } else if (options.boldSep) {
            inlineFormat(lines, options.boldSep, 'b', shift)
        } else {
            doc.text(lines, options.align === 'center' ? (w/2) : (margin + shift), y, options)
        }
        y += 11*lineHeightFactor/(72/25.4)*lines.length
        y += spaceAfter
    }

    const li = (nb, text, level = 1, italicSep) => {
        p(text, 8*level, 0, { italicSep }, () => {
            doc.text(nb, margin + 8*level - 6, y)
        })
    }

    // TODO do it differently
    const city = normalize(step_2.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................'
    doc.text(city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), w - margin, y, { align: 'right' })
    y += 10

    const top = [100, 1.5, { align: 'left' }]
    if (step_2.a_3) {
        p(step_2.a_3, ...top)
        p('Wydział Cywilny', ...top)
        p(courts[step_2.a_3].address, ...top)
    } else {
        p('Sąd Rejonowy w ......................', ...top)
        p('Wydział Cywilny', ...top)
        p('......................', ...top)
    }
    y += 5

    bold(() => {
        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[step_0.a_0] || '', ...top)
    })

    p([step_2.a_5, step_2.a_6].map(normalize).join(' '), ...top)
    p(normalize(step_2.a_1), ...top)
    p('PESEL ' + (step_2.a_0 ? normalize(step_2.a_0) : '......................'), ...top)
    if (step_2.a_4) {
        p((step_2.a_4_0 ? normalize(step_2.a_4_0) : '') + (step_2.a_4_1 ? ('\ntel. ' + normalize(step_2.a_4_1)) : ''), ...top)
    }
    y += 5

    if (step_2.a_2) {
        bold(() => {
            p('Pełnomocnik do doręczeń', ...top)
        })
        p(normalize(step_2.a_2_0) || '......................', ...top)
        p(normalize(step_2.a_2_1), ...top)
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
    li(step_0.a_1 || step_0.a_2 ? 'a.' : '', {
        K:'błędnie wpisana w akcie płeć oznaczona jako męska (mężczyzna) została zmieniona na prawidłową – żeńską (kobieta);',
        M:'błędnie wpisana w akcie płeć oznaczona jako żeńska (kobieta) została zmieniona na prawidłową – męską (mężczyzna);',
    }[step_0.a_0] || '......................', step_0.a_1 || step_0.a_2 ? 2 : 1)
    let next = 'b.'
    const name = normalize(step_2.a_5) || '......................'
    if (step_0.a_1) {
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
    if (!step_0.a_1 && step_1.a_7) {
        li(next, 'decyzji o zmianie imienia – na fakt zmiany imienia w związku z trwałym poczuciem przynależności do płci '+({ K: 'żeńskiej;', M: 'męskiej;' }[step_0.a_0] || '.......;'), 2)
        increment()
    }
    if (step_1.a_8) {
        li(next, ({ A: 'wydruku z portali społecznościowych', B: 'plakietki identyfikacyjnej z miejsca pracy', C: 'wydruku z portalu USOS' }[step_1.a_8_0] || '......................')+' – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', funkcjonowania jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+' w otoczeniu;', 2)
    }

    if (step_0.a_3) {
        space(3)
        li('5.', 'wnoszę o zwolnienie mnie od obowiązku ponoszenia kosztów procesu w całości, ponieważ nie jestem w stanie ich ponieść bez uszczerbku utrzymania koniecznego dla siebie i rodziny.')
    }

    if (step_1.a_5) {
        space(8)
        p('Jednocześnie przedkładam jako załącznik wydaną przez Rzecznika Praw Obywatelskich publikację |Postępowania w sprawach o uzgodnienie płci. Przewodnik|, zawierającą szereg specjalistycznych informacji dotyczących praw osób transpłciowych oraz aktualnych standardów orzeczniczych w sprawach o ustalenie płci.', undefined, undefined, { italicSep: '|' })
    }

    space(6)
    let text = 'Na wstępie wyjaśniam, że zdaję sobie sprawę z metrykalnego oznaczenia mojej płci jako '+({ K: 'męskiej', M: 'żeńskiej' }[step_0.a_0] || '.......')+', jednak wskazuję, że w codziennym życiu funkcjonuję jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+'. W związku z tym, że tożsamość płciowa jest jednym z dóbr osobistych człowieka, we wniosku będę używać '+({ K: 'żeńskich', M: 'męskich' }[step_0.a_0] || '.......')+' form gramatycznych.'
    if (step_3.a_3) {
        text += ' Jednocześnie wskazuję, że na co dzień używam imienia '+ (normalize(step_3.a_3_0) || '....... ') +'.'
    }
    p(text, 0, 8)

    bold(() => {
        p('Uzasadnienie', 0, 3, { align: 'center' })
        p('TWIERDZENIA FAKTYCZNE')
    })

    text = 'Kierownik Urzędu Stanu Cywilnego w '+(normalize(step_2.a_9) || '........')
    text += ' zarejestrował moje urodzenie w dniu '+(step_2.a_7 ? (new Date(step_2.a_7)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........')
    text += ' w akcie o numerze '+(normalize(step_2.a_8) || '..................... ')+'. '
    text += 'Moja płeć została tam oznaczona jako '+({ K: 'męska', M: 'żeńska' }[step_0.a_0] || '.......')+', w oparciu o ocenę mojej budowy anatomicznej przez personel medyczny. '
    text += 'Nadano mi '+(name.includes(' ') ? 'imiona ' : 'imię ')+name+'.'
    p(text)

    italic(() => {
        p('Dowód: odpis aktu urodzenia')
    })

    p(normalize(step_3.a_0) || '......................')

    p('U osób transpłciowych występuje niezgodność pomiędzy płcią przypisaną przy urodzeniu a tożsamością płciową, czyli głębokim wewnętrznym przeżywaniem własnej płci. Ta rozbieżność może prowadzić do dysforii, czyli uczucia dyskomfortu wynikającego z rozdźwięku pomiędzy różnymi aspektami naszej płci (cechami płciowymi naszego ciała, tym jak wyglądamy, tym jak odbierają nas inni). Nasilona dysforia może wiązać się z poważnymi negatywnymi skutkami dla zdrowia psychicznego osoby transpłciowej. Formalnie u osób transpłciowych diagnozuje się „transseksualizm” według nomenklatury ICD-10 (F64.0). Według najnowszej nomenklatury ICD-11, nie wszędzie jeszcze wdrożonej, formalnie diagnozuje się „niezgodność płciową” (HA60), którą zdefiniowano jako utrzymującą się wyraźną niezgodność między doświadczaną przez osobę płcią oraz płcią przypisaną. Stan „niezgodności płciowej” został wyjęty z obszaru dotyczącego zaburzeń psychicznych, a przeniesiony do obszaru dotyczącego zdrowia seksualnego. Sama transpłciowość w tym ujęciu nie jest już stanem „patologicznym”, „chorobą” czy „zaburzeniem”. Po uzgodnieniu płci w toku tranzycji medycznej i/lub społecznej, w tym prawnej, niezgodność ta zanika.')

    text = 'W związku z głęboko przeżywanym poczuciem identyfikacji z płcią '+({ K: 'żeńską', M: 'męską' }[step_0.a_0] || '.......')+' i występującą jednocześnie dysforią, '+({ K: 'rozpoczęłam', M: 'rozpocząłem' }[step_0.a_0] || 'rozpocz_ł_m')+' formalną diagnostykę u lekarzy specjalistów, w wyniku której '+({ K: 'otrzymałam', M: 'otrzymałem' }[step_0.a_0] || 'otrzymał_m')+' diagnozę '
    const isAnyF64 = (step_1.a_2_0 && step_1.a_2_0_0) || (step_1.a_2_1 && step_1.a_2_1_0) || (step_1.a_3_0 && step_1.a_3_0_0) || (step_1.a_3_1 && step_1.a_3_1_0)
    const isAnyHA60 = (step_1.a_2_0 && step_1.a_2_0_1) || (step_1.a_2_1 && step_1.a_2_1_1) || (step_1.a_3_0 && step_1.a_3_0_1) || (step_1.a_3_1 && step_1.a_3_1_1)
    if (isAnyF64 && isAnyHA60) {
        text += 'transseksualizmu (F64.0) / niezgodności płciowej (HA60).'
    } else if (isAnyF64) {
        text += 'transseksualizmu (F64.0).'
    } else if (isAnyHA60) {
        text += 'niezgodności płciowej (HA60).'
    } else {
        text += '...................... .'
    }
    // TODO "psychiatrę-seksuologa" case
    text += ' Proces diagnostyczny został przeprowadzony '
    const specialists = []
    if (step_1.a_3_0) specialists.push('lekarza psychiatrę')
    if (step_1.a_3_1) specialists.push('lekarza seksuologa')
    if (step_1.a_2_0 || step_1.a_2_1) specialists.push('psychologa')
    if (!specialists.length) specialists.push('......................')
    specialists.forEach((specialist, i) => {
        text += 'przez '+specialist
        if (i === specialists.length - 1) return
        if (i === specialists.length - 2) {
            text += ' oraz '
        } else {
            text += ', '
        }
    })
    text += ', zgodnie z wytycznymi Polskiego Towarzystwa Seksuologicznego. W toku tego procesu przekazano mi wszystkie informacje niezbędne do wyrażenia przeze mnie świadomej zgody na wdrożenie leczenia hormonalnego, a także wykluczono wtórne (np. wynikające z zaburzeń psychicznych) pochodzenie dysforii płciowej / niezgodności płciowej. Specjaliści przeprowadzili podmiotowe badania psychologiczne'
    text += step_3.a_2 ? ', wywiad i diagnostykę opartę o specjalistyczne, standaryzowane narzędzia. ' : ' i wywiad. '
    text += 'Proces ten pozwolił na stwierdzenie, że występująca u mnie niezgodność płci jest trwała. W opinii psychologicznej zwrócono uwagę, że brak tranzycji medycznej i prawnej przyczynia się do trudności w obszarze zdrowia psychicznego i zarekomendowano dalszą prawną zmianę oznaczenia płci celem poprawy mojego funkcjonowania.'

    p(text)

    p('Od '+(step_3.a_1 ? ((['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'][+step_3.a_1[0] - 1] || '') + ' ' + (step_3.a_1[1] || '.......')) : '......................')+' wdrożono u mnie leczenie hormonalne. To oznacza, że przyjmuję hormony, których celem jest '+({ K: 'feminizacja', M: 'maskulinizacja' }[step_0.a_0] || '......................')+' mojego ciała. Zmiany, które temu towarzyszą, są przeze mnie odbierane pozytywnie.')

    p('W sferze społecznej '+({ some: 'w niektórych obszarach', all: 'w większości obszarów' }[step_3.a_4] || '......................')+' funkcjonuję zgodnie z moją '+({ K: 'żeńską ', M: 'męską ' }[step_0.a_0] || '')+'tożsamością płciową. Moja rodzina, osoby bliskie, koledzy i koleżanki, '+(step_3.a_3 ? ('znają mnie jako '+step_3.a_3_0+' i ') : '')+'używają wobec mnie '+({ K: 'żeńskich', M: 'męskich' }[step_0.a_0] || '.......')+' form gramatycznych.')

    p('Brak zmiany oznaczenia płci oraz imienia powoduje u mnie duże trudności w codziennym funkcjonowaniu. We wszystkich przypadkach w których muszę używać danych zawartych w akcie urodzenia lub okazywać dowód tożsamości, moja tożsamość jest kwestionowana z uwagi na wygląd, odpowiadający typowym wyobrażeniom o '+({ K: 'kobiecym', M: 'męskim' }[step_0.a_0] || '.......')+' wyglądzie. Zmusza mnie to też do ujawniania osobom postronnym, że jestem osobą transpłciową, co głęboko ingeruje w moją prywatność i pozbawia mnie szansy na decydowanie o tym, kto będzie wiedzieć o mojej transpłciowości. Brak zmiany oznaczenia płci pozbawia mnie więc sprawczości i decyzyjności w jednym z kluczowych aspektów mojego życia. Co więcej, brak zmiany danych wpływa też na możliwość podjęcia dalszych kroków w tranzycji medycznej. Utrudnia też znalezienie i utrzymanie pracy. Osoby transpłciowe są grupą najczęściej dyskryminowaną na rynku pracy wśród społeczności LGBT+. Dopóki moje dane metrykalne są inne niż zgodne z moją tożsamością płciową, jestem nieustannie zmuszona do ujawniania pracodawcom swojej tożsamości, co obniża szansę na bycie '+({ K: 'zatrudnioną.', M: 'zatrudnionym.' }[step_0.a_0] || 'zatrudnion_.'))

    p('Powyższe okoliczności wskazują jednoznacznie, że w moim przypadku poczucie przynależności do płci '+({ K: 'żeńskiej', M: 'męskiej' }[step_0.a_0] || '.......')+' jest trwałe i że uwzględnienie niniejszego wniosku jest uzasadnione.')

    space(2)

    bold(() => {
        p('STAN PRAWNY')
        // TODO this is not bold for some reason
        li('a)', 'Dopuszczalność wniosku o sprostowanie aktu urodzenia w trybie nieprocesowym i możliwość korzystania z dotychczasowej praktyki sądów okręgowych w sprawach o ustalenie płci w zakresie postępowania dowodowego.')
    })
    space(3)
    p('Tak zwana. tranzycja prawna dokonuje się w Polsce w oparciu o orzecznictwo Sądu Najwyższego. Kwestia ta, związana również z ewolucją orzecznictwa SN, została szczegółowo wyjaśniona w załączonym do wniosku przewodniku biura RPO.')
    p('Przed 22 czerwca 1989 r., kiedy to Sąd Najwyższy wydał uchwałę w sprawie III CZP 37/89, korekta oznaczenia płci w akcie urodzenia dokonywana była w postępowaniu o sprostowanie aktu urodzenia. We wspomnianej uchwale SN wykluczył taką procedurę, ale dla samej doktryny i orzecznictwa było oczywiste, że sama możliwość korekty oznaczenia płci powinna istnieć. Dyskusyjna była jedynie podstawa prawna. Warto przy tym podkreślić, że uchwała SN z 1989 r. zapadła w innym stanie prawnym, gdy brzmienie przepisu dotyczącego aktu urodzenia wskazywało, że sprostować można tylko dane, które w momencie sporządzenia aktu były wpisane nieprawidłowo.')
    p('W postanowieniu z 22 marca 1991 r. (sygn. akt III CRN 28/91) Sąd Najwyższy uznał, że |poczucie przynależności do danej płci jest dobrem osobistym w rozumieniu art. 23 k.c.| i można dochodzić jego ochrony w trybie procesowym. W orzeczeniu tym SN przesądził też, że właściwym trybem dochodzenia korekty aktu urodzenia jest pozew o ustalenie, oparty o art. 189 k.p.c. w zw. z art. 23 k.c., |którego przesłanką jest stwierdzenie trwałości poczucia przynależności do danej płci|. W kolejnych orzeczeniach SN uzupełniał luki procedury, m.in. wypowiadając się o legitymacji biernej w sytuacji, gdy w sprawie nie ma rodziców czy o posiadaniu (lub nie) interesu prawnego w rozstrzygnięciu. Procedura była jednak co do zasady niekwestionowana.', undefined, undefined, {boldSep: '|'})
    p('4 marca 2025 r. skład całej Izby Cywilnej Sądu Najwyższego w sprawie III CZP 6/24 podjął uchwałę o następującej treści:')
    italic(() => {
        li('','1. Żądanie zmiany oznaczenia płci w akcie urodzenia podlega rozpoznaniu przez sąd w postępowaniu nieprocesowym przy zastosowaniu w drodze analogii art. 36 ustawy z dnia 28 listopada 2014 r. – Prawo o aktach stanu cywilnego.')
        li('','2. Zmiana oznaczenia płci w akcie urodzenia może nastąpić wyłącznie na wniosek osoby, której dotyczy ten akt.')
        li('','3. Oprócz wnioskodawcy uczestnikiem postępowania może być tylko jego małżonek (art. 510 k.p.c.).')
        li('','4. Postanowienie uwzględniające wniosek wywołuje skutki od chwili uprawomocnienia się.')
    })
    space(3)

    p('Tym samym SN |de facto| powrócił do koncepcji obowiązującej przed 1989 r. W ustnym uzasadnieniu (do dnia złożenia wniosku nie opublikowano uzasadnienia na piśmie¹) Sąd Najwyższy zwrócił uwagę, że 28 listopada 2014 r. przyjęta została ustawa Prawo o aktach stanu cywilnego, która zmieniła podstawy i przesłanki sprostowania aktu urodzenia, a ponadto jednoznacznie określiła płeć człowieka jako element stanu cywilnego (art. 2 ust. 1 w zw. z art. 49 ust. 2 pkt. 1 p.a.s.c.). SN podkreślił, że wynik postępowania o zmianę oznaczenia płci dotyczy jedynie praw osobistych wnioskodawcy i podkreślił osobisty charakter tego typu spraw. Odnotował, że konstrukcja i mechanizmy trybu nieprocesowego w większym stopniu uwzględniają okoliczności ze sfery interesu publicznego, a także minimalizują wątpliwości odnoszące się do zagadnienia legitymacji procesowej. W szczególności przejście do trybu nieprocesowego pozwala na ominięcie tworzenia „sztucznego” pozwanego (o którym mówił SN m.in. w wyroku z 2019 r.), a także pozwala na skorzystanie gwarantowanej przez p.a.s.c. skuteczności |erga omnes| wydanego rozstrzygnięcia.', undefined, undefined, { italicSep: '|' })
    p('Choć wydanie powyższej uchwały wywołało kontrowersje i niepewność, zwłaszcza wobec faktu, że w składzie wydającym uchwałę zasiadali sędziowie powołani na stanowisko sędziego przez Krajową Radę Sądownictwa ukształtowaną na podstawie przepisów ustawy z dnia 8 grudnia 2017 r. o zmianie ustawy o Krajowej Radzie Sądownictwa², |bez względu na to, czy uchwałę należy uznawać za ważną czy nie, należy co do zasady uznać słuszność rozumowania SN|. W doktrynie i wśród praktyków od lat wskazywano, że uchwała z 1989 r. utrudniła, a nie uprościła postępowanie o zmianę oznaczenia płci i że jej treść wynikała przede wszystkim z ówczesnego brzmienia przepisów dotyczących sprostowania aktu urodzenia. Od lat podnoszono, że bardziej odpowiednim trybem byłby tryb nieprocesowy, który nie stawia konieczności spełniania sztucznego wymogu – istnienia strony pozwanej i pozywania rodziców. Uchwała SN słusznie podkreśla osobisty charakter spraw o zmianę oznaczenia płci i wskazuje na to, że płeć jest już jednoznacznie elementem prawa stanu. Należy więc aprobująco odnieść się do tezy, że zmiana oznaczenia płci powinna nastąpić w drodze wniosku o sprostowanie aktu urodzenia przy zastosowaniu w drodze analogii art. 36 p.a.s.c.', undefined, undefined, { boldSep: '|' })
    p('Za stosowaniem w drodze analogii postępowania o sprostowanie aktu urodzenia przemawia również międzynarodowy standard dotyczący procedury zmiany oznaczenia płci. Konieczność istnienia procedury pozwalającej na zmianę oznaczenia płci w akcie urodzenia i dokumentach, potwierdza m.in. orzecznictwo Europejskiego Trybunału Praw Człowieka. Wielka Izba Trybunału w sprawie Goodwin przeciwko Zjednoczonemu Królestwu (wyrok z 11 lipca 2022 r., skarga nr 28957/95) uznała, że państwa – strony EKPC – |mają pozytywny obowiązek zapewnienia procedury prawnego uzgodnienia płci dla osoby transpłciowej|. W kolejnych orzeczeniach Trybunał wskazywał na konieczność zapewnienia, by procedura ta była |efektywna i łatwo dostępna| (X przeciwko Byłej Jugosławiańskiej Republice Macedonii, wyrok z 17 kwietnia 2019 r., skarga nr 29683/16), |szybka| (w sprawie S.V. przeciwko Włochom okres 2 lat prowadzenia postępowania uznano za zbyt długi i naruszający art. 8 EKPC), |bez uzależnienia od wymogu kilkuletniego okresu obserwacji| (Schlumpf przeciwko Szwajcarii, wyrok z 8 stycznia 2009 r., skarga nr 29002/06). |Nie można również wprowadzać wymogu przechodzenia określonych zabiegów medycznych, w tym chirurgicznych| (Y.Y. przeciwko Turcji, A.P. Garçon & Nicot przeciwko Francji). Wyrok S.V. przeciwko Włochom jasno pokazał, że prawo do prywatności (art. 8 EKPC)  należy obecnie wiązać z prawem do wolności, autonomii i prawem do samostanowienia. Z praw tych wynika, że życie prywatne człowieka obejmuje także tożsamość psychiczną i społeczną człowieka, w tym jego identyfikację płciową, którą państwo ma obowiązek uszanować.', undefined, undefined, { boldSep: '|' })
    p('Wymóg, by procedura zmiany oznaczenia płci była |szybka, łatwo dostępna i respektowała tożsamość płciową jednostki| można znaleźć również w innych aktach i dokumentach międzynarodowych. Na poziomie europejskim jednym z kluczowych dokumentów poruszających tematykę uzgodnienia płci jest zalecenie CM/Rec(2010)5, przyjęte przez Komitet Ministrów Rady Europy w 2010 r. czy Zalecenie nr 17 dotyczące Ogólnej Polityki Europejskiej Komisji Przeciwko Rasizmowi i Nietolerancji w sprawie zapobiegania i zwalczania nietolerancji i dyskryminacji przeciwko osobom LGBTI. Niezależny Ekspert ONZ ds. ochrony przed przemocą i dyskryminacją opartych na orientacji seksualnej i tożsamości płciowej wskazał, że „procedura prawnego uzgodnienia płci pozwalająca osobom transpłciowym na zmianę imienia i oznaczenia płci w dokumentach |powinna być prostym postępowaniem administracyjnym opartym na samookreśleniu wnioskodawcy, powinna być dostępna i, tak dalece, jak to możliwe, wolna od kosztów|.', undefined, undefined, { boldSep: '|' })
    p('Mając na uwadze standard międzynarodowy, można jednoznacznie stwierdzić, że postępowaniem, które w większym stopniu chroni prywatność jednostki, uznaje podmiotowość osoby transpłciowej i ma szansę być postępowaniem szybkim, efektywnym i łatwo dostępnym, jest właśnie postępowanie nieprocesowe, o sprostowanie aktu urodzenia.')
    p('Jednocześnie należy zauważyć, że brak jest powodów, by uznać za nieaktualne te tezy płynące z orzecznictwa Sądu Najwyższego i sądów powszechnych wydanych w ostatnich 36 latach, które nie dotyczyły trybu postępowania i osób legitymowanych w procesie o ustalenie płci. |W szczególności aktualna pozostaje teza, że tożsamość płciowa jest dobrem osobistym jednostki w rozumieniu art. 23 k.c. i że w postępowaniu należy wykazać trwałość poczucia przynależności do danej płci.| Zarówno pozew o ustalenie płci, jak i obecnie wniosek o sprostowanie aktu urodzenia wywołują ten sam skutek – w akcie urodzenia nanoszona jest wzmianka dodatkowa o orzeczeniu sądowym. Przemawia to za stosowaniem dotychczasowych standardów do uznania, czy spełnione zostały przesłanki zmiany oznaczenia płci w akcie urodzenia.', undefined, undefined, { boldSep: '|' })
    p('Rzecznik Praw Obywatelskich w swoich rekomendacjach wskazywał, że osoba dochodząca ustalenia płci (obecnie zmiany oznaczenia płci w wyniku wniosku o sprostowanie aktu urodzenia) |powinna wykazać trwałość poczucia przynależności do danej płci, co zasadniczo powinno nastąpić poprzez przedstawienie formalnej diagnozy.| Zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego (PTS) diagnoza taka powinna być postawiona przez dwóch ekspertów. Pierwszym z nich powinien być lekarz psychiatra lub seksuolog, a drugim – psycholog ze specjalizacją z zakresu psychologii klinicznej lub psychoseksuologii lub posiadający certyfikat seksuologa klinicznego. Powyższe standardy w sposób kompleksowy omawiają, w jaki sposób i na jakich podstawach dochodzi do postawienia diagnozy transseksualizmu (wg ICD-10) czy niezgodności płciowej (wg ICD-11). |Wykazanie przez osobę transpłciową, że dysponuje diagnozą postawioną przez ekspertów zgodnie z zaleceniami PTS, jest wystarczające do stwierdzenia trwałości jej poczucia przynależności do płci, której ustalenia się domaga, a tym samym jest wystarczające do wydania postanowienia uwzględniającego wniosek.|', undefined, undefined, { boldSep: '|' })
    bold(() => {
        li('b)', 'Uzasadnienie wniosku o rozpoznanie sprawy na posiedzeniu niejawnym na podstawie dokumentacji przedstawionej przez '+({ K: 'Wnioskodawczynię', M: 'Wnioskodawcę' }[step_0.a_0] || '.......')+', bez powoływania biegłego.')
    })
    space(3)
    p('Opisane wyżej okoliczności dowodzą jednoznacznie, że wniosek jest zasadny. |Jednocześnie, jako że wszystkie istotne w sprawie okoliczności wynikają z dokumentów, zasadne jest rozpoznanie sprawy na posiedzeniu niejawnym.| W postępowaniu nieprocesowym rozpoznanie sprawy na posiedzeniu niejawnym jest sposobem domyślnym (art. 514 k.p.c.), a do wyjątków należy rozpoznawanie ich na rozprawie.', undefined, undefined, { boldSep: '|' })
    p('W szczególności w niniejszym postępowaniu nie ma konieczności sięgania po dowód z opinii biegłego przed wydaniem orzeczenia. Jak wskazano w przewodniku przygotowanym przez RPO, który w tym zakresie zachowuje swoją aktualność:', undefined, 1.5)

    li('','|Kluczową kwestią do oceny czy sąd musi sięgać po biegłego jest wskazanie, że zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego rozpoczęcie tranzycji medycznej uwarunkowane jest uzyskaniem formalnej diagnozy lekarzy o określonych specjalnościach i psychologa. Nie ma żadnych powodów, dla których rozpoczęcie tranzycji prawnej miałoby być obwarowane innymi lub dodatkowymi warunkami. Posiadanie diagnozy jest zaś faktem, który powód lub powódka| [obecnie – wnioskodawca lub wnioskodawczyni] |może wykazać przedstawiając swoją dokumentację medyczną i która może być oceniona przez sąd jako dokument prywatny w rozumieniu art. 245 k.p.c. Będzie to niewątpliwie dowód tego, że odpowiedni specjaliści złożyli oświadczenia dotyczące diagnozy czy stanu zdrowia powoda lub powódki. Przystępując więc do rozstrzygnięcia sprawy o ustalenie płci, w której powód dołączył do pozwu dokumentację medyczną zgodną z zaleceniami Polskiego Towarzystwa Seksuologicznego, sąd – o ile nie występują wyjątkowe okoliczności – powinien uznać, że przedstawiono mu materiał dowodowy wystarczający do stwierdzenia podstawowej przesłanki ustalenia płci, tj. uzyskania przez powoda lub powódkę formalnej diagnozy transpłciowości. Co do zasady nie musi być do tego konieczne uzyskanie opinii biegłych sądowych.|', 3, '|')
    space(1.5)
    li('','|Dla przykładu wskazać należy, że osoba dochodząca np. roszczenia alimentacyjnego, chcąca wykazać swoje zwiększone potrzeby ze względu na chorobę przewlekłą, nie musi zgłaszać w postępowaniu wniosku o opinię biegłego. Sądy, by stwierdzić fakt, że osoba ta w istocie cierpi na daną chorobę, poprzestają w takich przypadkach na przedstawionym zaświadczeniu od odpowiedniego lekarza specjalisty| [s. 67].', 3, '|')
    space(6)
    p('Podkreślenia wymaga, że wydawanie wyroków w procesach o ustalenie płci na posiedzeniu niejawnym i bez powoływania biegłego stało się jedną z dominujących praktyk w ostatnich latach, przed wydaniem uchwały przez SN. Takie postępowanie jednoznacznie rekomendował też RPO w cytowanej publikacji. Obecnie zmianie ulega jedynie tryb postępowania, ale dotychczasowe przesłanki zmiany oznaczenia płci powinny zostać takie same. Nie ma więc żadnych przeszkód, by w sprawach o zmianę oznaczenia płci przez sprostowanie aktu urodzenia stosować te same standardy dowodowe, które utrwaliły się w sprawach o ustalenie płci. Jak podkreślono w przewodniku RPO, postępowaniach prowadzonych w latach 2020–2022 sądy okręgowe uwzględniły powództwa na posiedzeniach niejawnych aż w 132 sprawach (s. 93). Doświadczenie spraw prowadzonych w ostatnich latach wskazuje, że wyroki na posiedzeniu niejawnym i bez dowodu z opinii biegłego zapadały bardzo często. Rzadziej wyrok poprzedzała rozprawa, choć i wtedy sądy nie sięgały po opinię. Coraz rzadsze były sytuacje dopuszczania dowodu z opinii biegłego.')
    p('W orzecznictwie Sądu Najwyższego podkreślano, że prawo do identyfikowania się z daną płcią to prawo osobiste, z którego charakteru wynika, że interes prawny w uzgodnieniu płci ma wyłącznie podmiot tego prawa. Również w niedawnej uchwale SN podkreślił, że wynik sprawy o zmianę oznaczenia płci dotyczy wyłącznie tej jednostki. Przyjmowane w judykaturze rozwiązania są przy tym próbą znalezienia drogi realizacji ochrony prawnej w zakresie ustalenia zmiany oznaczenia płci |w warunkach luki prawnej|. W ostatnich 36 latach orzecznictwo uznawało, że właściwą ścieżką powinno być wykorzystanie w tym celu założeń powództwa o ustalenie (art. 189 k.p.c.). Obecnie uchwałą z marca 2025 r. SN powrócił do koncepcji stosowania przez analogię przepisów o sprostowaniu aktu urodzenia. Należy jednak zauważyć, że opisany wcześniej standard międzynarodowy podkreśla konieczność zapewnienia procedury, która będzie szybka, przejrzysta i łatwo dostępna, a Ekspert ONZ podnosi wręcz, że procedura powinna być oparta o samookreślenie jednostki. Biorąc pod uwagę ten standard i to, że obecne rozwiązanie jest jedynie wypełnieniem luki prawnej, rygory wynikające z postępowania sądowego i tym samym dowodowego, powinny być możliwie łagodzone.', undefined, undefined, { boldSep: '|' })

    bold(() => {
        li('c)', 'Wniosek o rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych.')
    })
    space(3)
    p('Zgodnie z aktualnym brzmieniem § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych, sprawy o ustalenie płci metrykalnej (art. 189 k.p.c.) są sprawami pilnymi. Przepis ten został wprowadzony Rozporządzeniem Ministra Sprawiedliwości z dnia 26 września 2024 r. zmieniającym rozporządzenie – Regulamin urzędowania sądów powszechnych i wszedł w życie z dniem 16 października 2024 roku. Prawodawca trafnie zatem dostrzegł, że sprawy o uzgodnienie płci metrykalnej, z uwagi na swoją specyfikę, zazwyczaj mają pilny charakter. Nie inaczej jest na gruncie niniejszej spawy. Postępowanie dotyczy bowiem moich najbardziej żywotnych interesów oraz codziennego funkcjonowania. Zaznaczyć należy, że funkcjonuję w ramach odczuwanej tożsamości płciowej, co pozostaje w rozdźwięku z płcią metrykalną uwidocznioną w dokumentach.')
    p('Choć literalnie przepis dotyczy postępowań o ustalenie płci, to wykładnia celowościowa i funkcjonalna w sposób oczywisty nakazują go stosować do postępowań o sprostowanie aktu urodzenia osób transpłciowych. Intencja prawodawcy i cel przepisu są tu bowiem całkowicie jednoznaczne. Przy nowelizacji tego przepisu nie można było zakładać, że zmieni się tryb postępowania. Należy ponadto podkreślić, że uznanie niniejszej sprawy za sprawę pilną pozostaje w zgodzie ze standardami międzynarodowymi nakazującymi szybkie rozpoznanie spraw o zmianę oznaczenia płci.')

    next = 'd)'
    if (step_0.a_1 || step_0.a_2) {

        const texts = []
        if (step_0.a_1) {
            texts.push(name.includes(' ') ? 'imion' : 'imienia')
        }
        if (step_0.a_2) {
            texts.push('nazwiska')
        }
        const text = texts.join(' ')
        bold(() => {
            li(next, 'Możliwość wydania rozstrzygnięcia w przedmiocie '+ text +' '+({ K: 'Wnioskodawczyni', M: 'Wnioskodawcy' }[step_0.a_0] || '.......')+'.')
        })
        space(3)
        p('Z kolei w kwestii żądania zmiany '+(text.startsWith('imion') ? 'moich ' : 'mojego ')+text+' na aktualnie używane, należy wskazać w pierwszej kolejności, że nie jest to żądanie wysuwane ani opierane na przesłankach wynikających z ustawy z dnia 17 października 2008 roku o zmianie imienia i nazwiska, a przesłanki te nie stoją na przeszkodzie rozstrzygnięciu w tym przedmiocie. Potrzeba i konieczność dostosowania imion lub nazwiska do oznaczenia płci koreluje bowiem z żądaniem ustalenia odmiennej płci, niż przypisana przy urodzeniu, i tylko z niego wynika. Uwzględnienie wniosku tylko co do zmiany oznaczenia płci metrykalnej spowodowałoby, że będę z konieczności '+({ K: 'funkcjonowała', M: 'funkcjonował' }[step_0.a_0] || 'funkcjonować')+' przynajmniej przez pewien czas jako osoba o danych męskich, a jedynie żeńskim oznaczeniu płci i żeńskim numerze PESEL, co jest sytuacją bez precedensu i wysoce komplikowałoby codzienne funkcjonowanie.')
        p('W praktyce faktycznie brak zmiany imienia i nazwiska równolegle do zmiany oznaczenia płci i numeru PESEL powoduje, że osoby transpłciowe doświadczają wielu praktycznych trudności w okresie do czasu zmiany wszystkich danych i wydania nowego dowodu osobistego. Osoba nie posiada aktualnego dokumentu tożsamości, przestają działać systemy oparte o usługi cyfrowe obywatel.gov.pl (w tym ePUAP). Występują trudności w wystawieniu recept i ich realizowaniu. Przemawia to za koniecznością uzgodnienia od razu wszystkich danych.')
        p('Imiona i nazwiska są, oprócz oznaczenia płci, istotnymi danymi odróżniającymi osobę, a podstawa ich zmiany jest taka sama, jak w przypadku zmiany oznaczenia płci – czyli niezgodność płciowa. Orzeczenie sądowe żądane w niniejszym wniosku, będące krokiem na drodze do formalnej tranzycji osoby transpłciowej, winno – w braku pozytywnych uregulowań – dążyć do uzgodnienia wszystkich danych osobowych osoby transpłciowej zgodnie z obraną płcią.')
        p('Nie jest argumentem przemawiającym za niedopuszczalnością drogi sądowej w tym zakresie okoliczność, że istnieje uregulowana procedura administracyjna dotycząca zmiany imion i nazwisk, przewidziana w ustawie o zmianie imienia i nazwiska. Orzekający w tych sprawach organ administracji w osobie kierownika urzędu stanu cywilnego należy uznać za właściwy do korygowania danych osób transpłciowych wyłącznie wówczas, gdy wniosek kieruje się w trybie administracyjnym i w oparciu o owe „ważne powody”, wymienione w art. 4 odnośnej ustawy – niezwiązane ze zmianą oznaczenia płci. Nieenumeratywny katalog owych powodów odwołuje się jednak do sytuacji odmiennych rodzajowo, niż transpłciowość i zapadnięcie orzeczenia sądowego stwierdzającego, że wnioskodawca jest kobietą/mężczyzną zamiast płci przypisanej przy urodzeniu.')
        p('Brak zatem podstawy do uznania, że w zakresie żądania zmiany imienia i wniosek podlega odrzuceniu na zasadzie art. 199 § 1 pkt 1 k.p.c. w zw. z art. 13 § 2 k.p.c., a wobec obrania przeze mnie konkretnego imienia żeńskiego –  jakie chce nosić po sprostowaniu aktu urodzenia poprzez ujawnienie tam płci żeńskiej – i jakich w praktyce używam, istnieje możliwość orzeczenia także i w tym przedmiocie.')

        next = 'e)'
    }
    if (step_0.a_3) {
        bold(() => {
            li(next, 'Wniosek o zwolnienie od kosztów.')
        })
        space(3)
        p('Moja sytuacja materialna uniemożliwia mi poniesienie kosztów sądowych bez uszczerbku dla utrzymania koniecznego siebie i rodziny. Szczegółowe informacje dotyczące mojej sytuacji znajdują się w załączonym oświadczeniu o stanie rodzinnym, majątku, dochodach i źródłach utrzymania.')
    }

    space(8)

    p('Z tych względów wnoszę jak na wstępie.', 0, 6, { align: 'left' })

    italic(() => {
        p('Podpis', 100, 6, { align: 'left' })
    })
    p('Załączniki:') // TODO dot always on the last one
    li('1.', (step_0.a_3 ? 'oświadczenie o stanie rodzinnym, majątku, dochodach i źródłach utrzymania' : 'dowód uiszczenia opłaty sądowej od wniosku')+',')
    li('2.', 'odpis aktu urodzenia,')
    next = '3.'
    if (step_1.a_2_0) {
        li(next, 'opinia psychologiczna,')
        increment()
    }
    if (step_1.a_2_1) {
        li(next, 'opinia psychologiczna,')
        increment()
    }
    if (step_1.a_3_0) {
        li(next, 'zaświadczenie lekarza psychiatry,')
        increment()
    }
    if (step_1.a_3_1) {
        li(next, 'zaświadczenie lekarza seksuologa,')
        increment()
    }
    if (step_1.a_5) {
        li(next, 'dokument zatytułowany |Postępowania w sprawach o uzgodnienie płci. Przewodnik|, wydany przez Rzecznika Praw Obywatelskich,', 1, '|')
        increment()
    }
    if (step_1.a_4) {
        li(next, 'dokument zatytułowany |Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów|.', 1, '|')
    }


    return doc
}
