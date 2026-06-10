// TODO load it anynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3], documentCreatorInitializer) => {

    const { p, li, font, setLineHeight, resetNumbering, noPageBreak, complete, save } = documentCreatorInitializer()

    const nb = 'basic-numbering'
    const letter = 'section-marker'

    // TODO do it differently
    const city = normalize(step_2.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................'
    p(city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
        align: 'right',
        spaceAfter: 6,
    })

    const top = {
        shift: 100,
        spaceAfter: 1.5,
        align: 'left',
    }

    if (step_2.a_3) {
        p(step_2.a_3, top)
        p('Wydział Cywilny', top)
        p(courts[step_2.a_3].address, {
            ...top,
            mayBreak: true,
        })
    } else {
        p('Sąd Rejonowy w ......................', top)
        p('Wydział Cywilny', top)
        p('......................', top)
    }

    font({ style: 'bold' }, () => {
        p({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[step_0.a_0] || '', {
            ...top,
            spaceBefore: 5,
        })
    })
    p([step_2.a_5, step_2.a_6].map(normalize).join(' '), top)
    p(normalize(step_2.a_1), {
        ...top,
        mayBreak: true,
    })
    p('PESEL ' + (step_2.a_0 ? normalize(step_2.a_0) : '......................'), top)
    if (step_2.a_4) {
        p((step_2.a_4_0 ? normalize(step_2.a_4_0) : '') + (step_2.a_4_1 ? ('\ntel. ' + normalize(step_2.a_4_1)) : ''), {
            ...top,
            mayBreak: true,
        })
    }

    if (step_2.a_2) {
        font({ style: 'bold' }, () => {
            p('Pełnomocnik do doręczeń', {
                ...top,
                spaceBefore: 5,
            })
        })
        p(normalize(step_2.a_2_0) || '......................', top)
        p(normalize(step_2.a_2_1), {
            ...top,
            mayBreak: true,
        })
    }

    font({ style: 'bold' }, () => {
        p('WNIOSEK O SPROSTOWANIE AKTU URODZENIA', {
            align: 'center',
            spaceBefore: 16,
            spaceAfter: 0,
        })
        if (step_0.a_3) {
            p('wraz z wnioskiem o zwolnienie od obowiązku ponoszenia kosztów sądowych', {
                align: 'center',
                spaceAfter: 0,
            })
        }
    })

    setLineHeight(1.5)

    p('Na podstawie art. 36 ustawy Prawo o aktach stanu cywilnego wnoszę o:', {
        spaceBefore: 12,
    })
    li(nb, 'sprostowanie aktu urodzenia '+({K: 'Wnioskodawczyni', M: 'Wnioskodawcy'}[step_0.a_0] || '......................')+' zarejestrowanego w Urzędzie Stanu Cywilnego w '+ (normalize(step_2.a_9) || '......................') +' za nr '+ (normalize(step_2.a_8) || '......................') +', w ten sposób, żeby:')

    const firstItem = ({
        K:'błędnie wpisana w akcie płeć oznaczona jako męska (mężczyzna) została zmieniona na prawidłową – żeńską (kobieta);',
        M:'błędnie wpisana w akcie płeć oznaczona jako żeńska (kobieta) została zmieniona na prawidłową – męską (mężczyzna);',
    }[step_0.a_0] || '......................')

    if (step_0.a_1 || step_0.a_2) {
        li(nb, firstItem, {
            level: 2,
        })
    }
    else {
        p(firstItem, {
            shift: 8,
            spaceAfter: 0,
        })
    }

    const name = normalize(step_2.a_5) || '......................'
    if (step_0.a_1) {
        const newName = normalize(step_0.a_1_0) || '......................'
        li(nb, (name.includes(' ') ? ('imiona '+name+' zostały') : ('imię '+name+' zostało')) + ' zmienione na '+(newName.includes(' ')?'imiona ':'imię ')+newName+';', {
            level: 2,
        })
    }
    if (step_0.a_2) {
        li(nb, 'nazwisko '+normalize(step_2.a_6)+' zostało zmienione na '+normalize(step_0.a_2_0)+'; ', {
            level: 2,
        })
    }
    li(nb, 'rozpoznanie sprawy na posiedzeniu niejawnym;')
    li(nb, 'rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych;')
    li(nb, 'dopuszczenie i przeprowadzenie dowodu z dokumentów:')
    li(nb, 'odpisu aktu urodzenia – na fakt oznaczenia mojej płci w akcie urodzenia jako '+({K: 'męskiej;', M: 'żeńskiej;'}[step_0.a_0] || '.......;'), {
        level: 2,
    })
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
        li(nb, 'opinii psychologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_0_0, step_1.a_2_0_1), {
            level: 2,
        })
    }
    if (step_1.a_2_1) {
        li(nb, 'opinii psychologa-seksuologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_1_0, step_1.a_2_1_1), {
            level: 2,
        })
    }
    if (step_1.a_3_0) {
        li(nb, 'zaświadczenia lekarza psychiatry – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_0_0, step_1.a_3_0_1), {
            level: 2,
        })
    }
    if (step_1.a_3_1) {
        li(nb, 'zaświadczenia lekarza seksuologa – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_1_0, step_1.a_3_1_1), {
            level: 2,
        })
    }
    if (step_1.a_4) {
        li(nb, 'zaświadczenia lekarskiego – na fakt wdrożenia u mnie terapii hormonalnej;', {
            level: 2,
        })
    }
    if (step_1.a_5) {
        li(nb, 'dokumentu zatytułowanego |Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów| – na fakt aktualnych polskich standardów opieki nad osobami transpłciowymi, wymogów diagnostycznych niezbędnych do postawienia diagnozy F64.0, spełniania przeze mnie kryteriów diagnostycznych;', {
            level: 2,
            italicSep: '|',
        })
    }
    if (!step_0.a_1 && step_1.a_7) {
        li(nb, 'decyzji o zmianie imienia – na fakt zmiany imienia w związku z trwałym poczuciem przynależności do płci '+({ K: 'żeńskiej;', M: 'męskiej;' }[step_0.a_0] || '.......;'), {
            level: 2,
        })
    }
    if (step_1.a_8) {
        li(nb, ({ A: 'wydruku z portali społecznościowych', B: 'plakietki identyfikacyjnej z miejsca pracy', C: 'wydruku z portalu USOS' }[step_1.a_8_0] || '......................')+' – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', funkcjonowania jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+' w otoczeniu;', {
            level: 2,
        })
    }

    if (step_0.a_3) {
        li(nb, 'wnoszę o zwolnienie mnie od obowiązku ponoszenia kosztów procesu w całości, ponieważ nie jestem w stanie ich ponieść bez uszczerbku utrzymania koniecznego dla siebie i rodziny.', {
            spaceBefore: 3,
        })
    }

    if (step_1.a_6) {
        p('Jednocześnie przedkładam jako załącznik wydaną przez Rzecznika Praw Obywatelskich publikację |Postępowania w sprawach o uzgodnienie płci. Przewodnik|, zawierającą szereg specjalistycznych informacji dotyczących praw osób transpłciowych oraz aktualnych standardów orzeczniczych w sprawach o ustalenie płci.', {
            italicSep: '|',
            spaceBefore: 8,
        })
    }

    let text = 'Na wstępie wyjaśniam, że zdaję sobie sprawę z metrykalnego oznaczenia mojej płci jako '+({ K: 'męskiej', M: 'żeńskiej' }[step_0.a_0] || '.......')+', jednak wskazuję, że w codziennym życiu funkcjonuję jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+'. W związku z tym, że tożsamość płciowa jest jednym z dóbr osobistych człowieka, we wniosku będę używać '+({ K: 'żeńskich', M: 'męskich' }[step_0.a_0] || '.......')+' form gramatycznych.'
    if (step_3.a_3) {
        text += ' Jednocześnie wskazuję, że na co dzień używam imienia '+ (normalize(step_3.a_3_0) || '....... ') +'.'
    }
    p(text, {
        spaceBefore: 6,
        spaceAfter: 8,
    })

    font({ style: 'bold' }, () => {
        p('Uzasadnienie', {
            align: 'center',
            spaceAfter: 6,
        })
        p('TWIERDZENIA FAKTYCZNE')
    })

    text = 'Kierownik Urzędu Stanu Cywilnego w '+(normalize(step_2.a_9) || '........')
    text += ' zarejestrował moje urodzenie w dniu '+(step_2.a_7 ? (new Date(step_2.a_7)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........')
    text += ' w akcie o numerze '+(normalize(step_2.a_8) || '..................... ')+'. '
    text += 'Moja płeć została tam oznaczona jako '+({ K: 'męska', M: 'żeńska' }[step_0.a_0] || '.......')+', w oparciu o ocenę mojej budowy anatomicznej przez personel medyczny. '
    text += 'Nadano mi '+(name.includes(' ') ? 'imiona ' : 'imię ')+name+'.'
    p(text)

    font({ style: 'italic' }, () => {
        p('Dowód: odpis aktu urodzenia')
    })

    p(normalize(step_3.a_0) || '......................', {
        mayBreak: true,
    })
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

    font({ style: 'bold' }, () => {
        p('STAN PRAWNY', {
            spaceBefore: 2,
        })
        li(letter, 'Dopuszczalność wniosku o sprostowanie aktu urodzenia w trybie nieprocesowym i możliwość korzystania z dotychczasowej praktyki sądów okręgowych w sprawach o ustalenie płci w zakresie postępowania dowodowego.', {
            spaceAfter: 3,
        })
    })
    p('Tak zwana. tranzycja prawna dokonuje się w Polsce w oparciu o orzecznictwo Sądu Najwyższego. Kwestia ta, związana również z ewolucją orzecznictwa SN, została szczegółowo wyjaśniona w załączonym do wniosku przewodniku biura RPO.')
    p('Przed 22 czerwca 1989 r., kiedy to Sąd Najwyższy wydał uchwałę w sprawie III CZP 37/89, korekta oznaczenia płci w akcie urodzenia dokonywana była w postępowaniu o sprostowanie aktu urodzenia. We wspomnianej uchwale SN wykluczył taką procedurę, ale dla samej doktryny i orzecznictwa było oczywiste, że sama możliwość korekty oznaczenia płci powinna istnieć. Dyskusyjna była jedynie podstawa prawna. Warto przy tym podkreślić, że uchwała SN z 1989 r. zapadła w innym stanie prawnym, gdy brzmienie przepisu dotyczącego aktu urodzenia wskazywało, że sprostować można tylko dane, które w momencie sporządzenia aktu były wpisane nieprawidłowo.')
    p('W postanowieniu z 22 marca 1991 r. (sygn. akt III CRN 28/91) Sąd Najwyższy uznał, że |poczucie przynależności do danej płci jest dobrem osobistym w rozumieniu art. 23 k.c.| i można dochodzić jego ochrony w trybie procesowym. W orzeczeniu tym SN przesądził też, że właściwym trybem dochodzenia korekty aktu urodzenia jest pozew o ustalenie, oparty o art. 189 k.p.c. w zw. z art. 23 k.c., |którego przesłanką jest stwierdzenie trwałości poczucia przynależności do danej płci|. W kolejnych orzeczeniach SN uzupełniał luki procedury, m.in. wypowiadając się o legitymacji biernej w sytuacji, gdy w sprawie nie ma rodziców czy o posiadaniu (lub nie) interesu prawnego w rozstrzygnięciu. Procedura była jednak co do zasady niekwestionowana.', {
        boldSep: '|',
    })
    p('4 marca 2025 r. skład całej Izby Cywilnej Sądu Najwyższego w sprawie III CZP 6/24 podjął uchwałę o następującej treści:')
    font({ style: 'italic' }, () => {
        [
            '1. Żądanie zmiany oznaczenia płci w akcie urodzenia podlega rozpoznaniu przez sąd w postępowaniu nieprocesowym przy zastosowaniu w drodze analogii art. 36 ustawy z dnia 28 listopada 2014 r. – Prawo o aktach stanu cywilnego.',
            '2. Zmiana oznaczenia płci w akcie urodzenia może nastąpić wyłącznie na wniosek osoby, której dotyczy ten akt.',
            '3. Oprócz wnioskodawcy uczestnikiem postępowania może być tylko jego małżonek (art. 510 k.p.c.).',
            '4. Postanowienie uwzględniające wniosek wywołuje skutki od chwili uprawomocnienia się.',
        ].forEach(text => {
            p(text, {
                shift: 8,
                spaceAfter: 0,
            })
        })
    })

    p('Tym samym SN |de facto| powrócił do koncepcji obowiązującej przed 1989 r. W ustnym uzasadnieniu (do dnia złożenia wniosku nie opublikowano uzasadnienia na piśmie{1}) Sąd Najwyższy zwrócił uwagę, że 28 listopada 2014 r. przyjęta została ustawa Prawo o aktach stanu cywilnego, która zmieniła podstawy i przesłanki sprostowania aktu urodzenia, a ponadto jednoznacznie określiła płeć człowieka jako element stanu cywilnego (art. 2 ust. 1 w zw. z art. 49 ust. 2 pkt. 1 p.a.s.c.). SN podkreślił, że wynik postępowania o zmianę oznaczenia płci dotyczy jedynie praw osobistych wnioskodawcy i podkreślił osobisty charakter tego typu spraw. Odnotował, że konstrukcja i mechanizmy trybu nieprocesowego w większym stopniu uwzględniają okoliczności ze sfery interesu publicznego, a także minimalizują wątpliwości odnoszące się do zagadnienia legitymacji procesowej. W szczególności przejście do trybu nieprocesowego pozwala na ominięcie tworzenia „sztucznego” pozwanego (o którym mówił SN m.in. w wyroku z 2019 r.), a także pozwala na skorzystanie gwarantowanej przez p.a.s.c. skuteczności |erga omnes| wydanego rozstrzygnięcia.', {
        italicSep: '|',
        footnotes: {
            '{1}': 'Skrót ustnego uzasadnienia został opublikowany na stronie SN w części zawierającej komunikaty: https://www.sn.pl/aktualnosci/SitePages/Komunikaty_o_sprawach.aspx?ItemSID=695-b6b3e804-2752-4c7d-bcb4-7586782a1315&ListName=Komunikaty_o_sprawach',
        },
        spaceBefore: 3,
    })
    p('Choć wydanie powyższej uchwały wywołało kontrowersje i niepewność, zwłaszcza wobec faktu, że w składzie wydającym uchwałę zasiadali sędziowie powołani na stanowisko sędziego przez Krajową Radę Sądownictwa ukształtowaną na podstawie przepisów ustawy z dnia 8 grudnia 2017 r. o zmianie ustawy o Krajowej Radzie Sądownictwa{2}, |bez względu na to, czy uchwałę należy uznawać za ważną czy nie, należy co do zasady uznać słuszność rozumowania SN|. W doktrynie i wśród praktyków od lat wskazywano, że uchwała z 1989 r. utrudniła, a nie uprościła postępowanie o zmianę oznaczenia płci i że jej treść wynikała przede wszystkim z ówczesnego brzmienia przepisów dotyczących sprostowania aktu urodzenia. Od lat podnoszono, że bardziej odpowiednim trybem byłby tryb nieprocesowy, który nie stawia konieczności spełniania sztucznego wymogu – istnienia strony pozwanej i pozywania rodziców. Uchwała SN słusznie podkreśla osobisty charakter spraw o zmianę oznaczenia płci i wskazuje na to, że płeć jest już jednoznacznie elementem prawa stanu. Należy więc aprobująco odnieść się do tezy, że zmiana oznaczenia płci powinna nastąpić w drodze wniosku o sprostowanie aktu urodzenia przy zastosowaniu w drodze analogii art. 36 p.a.s.c.', {
        boldSep: '|',
        footnotes: {
            '{2}': 'Wątpliwości te wynikają przede wszystkim z uchwały trzech Izb Sądu Najwyższego z 23.01.2020 r. (BSA-I-4110-1/2020), a także późniejszego orzecznictwa Trybunału Sprawiedliwości Unii Europejskiej czy Europejskiego Trybunału Praw Człowieka, w których wskazuje się na wpływ takiej nominacji na ocenę bezstronności i niezawisłości sędziego i w konsekwencji – wpływ na ważność wydanego orzeczenia. Również wszystkie obecnie projektowane ustawy dotyczące funkcjonowania sądownictwa przewidują, że orzeczenia wydane przez SN w składach, w których zasiadali tak powołani sędziowie, będą nieważne.',
        },
    })
    p('Za stosowaniem w drodze analogii postępowania o sprostowanie aktu urodzenia przemawia również międzynarodowy standard dotyczący procedury zmiany oznaczenia płci. Konieczność istnienia procedury pozwalającej na zmianę oznaczenia płci w akcie urodzenia i dokumentach, potwierdza m.in. orzecznictwo Europejskiego Trybunału Praw Człowieka. Wielka Izba Trybunału w sprawie Goodwin przeciwko Zjednoczonemu Królestwu (wyrok z 11 lipca 2022 r., skarga nr 28957/95) uznała, że państwa – strony EKPC – |mają pozytywny obowiązek zapewnienia procedury prawnego uzgodnienia płci dla osoby transpłciowej|. W kolejnych orzeczeniach Trybunał wskazywał na konieczność zapewnienia, by procedura ta była |efektywna i łatwo dostępna| (X przeciwko Byłej Jugosławiańskiej Republice Macedonii, wyrok z 17 kwietnia 2019 r., skarga nr 29683/16), |szybka| (w sprawie S.V. przeciwko Włochom okres 2 lat prowadzenia postępowania uznano za zbyt długi i naruszający art. 8 EKPC), |bez uzależnienia od wymogu kilkuletniego okresu obserwacji| (Schlumpf przeciwko Szwajcarii, wyrok z 8 stycznia 2009 r., skarga nr 29002/06). |Nie można również wprowadzać wymogu przechodzenia określonych zabiegów medycznych, w tym chirurgicznych| (Y.Y. przeciwko Turcji, A.P. Garçon & Nicot przeciwko Francji). Wyrok S.V. przeciwko Włochom jasno pokazał, że prawo do prywatności (art. 8 EKPC)  należy obecnie wiązać z prawem do wolności, autonomii i prawem do samostanowienia. Z praw tych wynika, że życie prywatne człowieka obejmuje także tożsamość psychiczną i społeczną człowieka, w tym jego identyfikację płciową, którą państwo ma obowiązek uszanować.', {
        boldSep: '|',
    })
    p('Wymóg, by procedura zmiany oznaczenia płci była |szybka, łatwo dostępna i respektowała tożsamość płciową jednostki| można znaleźć również w innych aktach i dokumentach międzynarodowych. Na poziomie europejskim jednym z kluczowych dokumentów poruszających tematykę uzgodnienia płci jest zalecenie CM/Rec(2010)5, przyjęte przez Komitet Ministrów Rady Europy w 2010 r.{3} czy Zalecenie nr 17 dotyczące Ogólnej Polityki Europejskiej Komisji Przeciwko Rasizmowi i Nietolerancji w sprawie zapobiegania i zwalczania nietolerancji i dyskryminacji przeciwko osobom LGBTI{4}. Niezależny Ekspert ONZ ds. ochrony przed przemocą i dyskryminacją opartych na orientacji seksualnej i tożsamości płciowej wskazał, że „procedura prawnego uzgodnienia płci pozwalająca osobom transpłciowym na zmianę imienia i oznaczenia płci w dokumentach |powinna być prostym postępowaniem administracyjnym opartym na samookreśleniu wnioskodawcy, powinna być dostępna i, tak dalece, jak to możliwe, wolna od kosztów|{5}.', {
        boldSep: '|',
        footnotes: {
            '{3}': 'Zalecenie CM/Rec(2010)5 Komitetu Ministrów dla Państw Członkowskich w zakresie środków zwalczania dyskryminacji opartej na orientacji seksualnej lub tożsamości płciowej. Tłumaczenie oficjalne Ministerstwa Sprawiedliwości za: https://arch-bip.ms.gov.pl/pl/prawa-czlowieka/inne-organizacje-miedzynarodowe-i-prawa-czlowieka/prawa-czlowieka-w-radzie-europy-/download,2254,3.html: „Państwa członkowskie powinny przyjąć odpowiednie środki gwarantujące pełne prawne uznanie zmiany płci we wszystkich dziedzinach życia, w szczególności poprzez umożliwienie zmiany imienia, nazwiska i płci w oficjalnych dokumentach w |sposób szybki, przejrzysty i dostępny|; państwa członkowskie powinny także zagwarantować, tam gdzie jest to wskazane, odpowiednie uznanie lub wprowadzenie zmian w kluczowych dokumentach wydawanych przez podmioty niepaństwowe [...]”.',
            '{4}': '|ECRI General Policy Recommendation no. 17 on preventing and combating intolerance and discrimination against LGBTI persons,| zalecenie przyjęte dnia 28.06.2023 r., CRI(2023)30.',
            '{5}': 'Raport IE SOGI z wizytacji w Gruzji, A/HRC/41/45/Add.1, § 68.',
        },
        footnotesFormat: {
            '{3}': ['bold', '|'],
            '{4}': ['italic', '|'],
        }
    })
    p('Mając na uwadze standard międzynarodowy, można jednoznacznie stwierdzić, że postępowaniem, które w większym stopniu chroni prywatność jednostki, uznaje podmiotowość osoby transpłciowej i ma szansę być postępowaniem szybkim, efektywnym i łatwo dostępnym, jest właśnie postępowanie nieprocesowe, o sprostowanie aktu urodzenia.')
    p('Jednocześnie należy zauważyć, że brak jest powodów, by uznać za nieaktualne te tezy płynące z orzecznictwa Sądu Najwyższego i sądów powszechnych wydanych w ostatnich 36 latach, które nie dotyczyły trybu postępowania i osób legitymowanych w procesie o ustalenie płci. |W szczególności aktualna pozostaje teza, że tożsamość płciowa jest dobrem osobistym jednostki w rozumieniu art. 23 k.c. i że w postępowaniu należy wykazać trwałość poczucia przynależności do danej płci.| Zarówno pozew o ustalenie płci, jak i obecnie wniosek o sprostowanie aktu urodzenia wywołują ten sam skutek – w akcie urodzenia nanoszona jest wzmianka dodatkowa o orzeczeniu sądowym. Przemawia to za stosowaniem dotychczasowych standardów do uznania, czy spełnione zostały przesłanki zmiany oznaczenia płci w akcie urodzenia.', {
        boldSep: '|',
    })
    p('Rzecznik Praw Obywatelskich w swoich rekomendacjach wskazywał, że osoba dochodząca ustalenia płci (obecnie zmiany oznaczenia płci w wyniku wniosku o sprostowanie aktu urodzenia) |powinna wykazać trwałość poczucia przynależności do danej płci, co zasadniczo powinno nastąpić poprzez przedstawienie formalnej diagnozy.| Zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego (PTS) diagnoza taka powinna być postawiona przez dwóch ekspertów. Pierwszym z nich powinien być lekarz psychiatra lub seksuolog, a drugim – psycholog ze specjalizacją z zakresu psychologii klinicznej lub psychoseksuologii lub posiadający certyfikat seksuologa klinicznego. Powyższe standardy w sposób kompleksowy omawiają, w jaki sposób i na jakich podstawach dochodzi do postawienia diagnozy transseksualizmu (wg ICD-10) czy niezgodności płciowej (wg ICD-11). |Wykazanie przez osobę transpłciową, że dysponuje diagnozą postawioną przez ekspertów zgodnie z zaleceniami PTS, jest wystarczające do stwierdzenia trwałości jej poczucia przynależności do płci, której ustalenia się domaga, a tym samym jest wystarczające do wydania postanowienia uwzględniającego wniosek.|', {
        boldSep: '|',
    })
    font({ style: 'bold' }, () => {
        li(letter, 'Uzasadnienie wniosku o rozpoznanie sprawy na posiedzeniu niejawnym na podstawie dokumentacji przedstawionej przez '+({ K: 'Wnioskodawczynię', M: 'Wnioskodawcę' }[step_0.a_0] || '.......')+', bez powoływania biegłego.', {
            spaceAfter: 3,
        })
    })
    p('Opisane wyżej okoliczności dowodzą jednoznacznie, że wniosek jest zasadny. |Jednocześnie, jako że wszystkie istotne w sprawie okoliczności wynikają z dokumentów, zasadne jest rozpoznanie sprawy na posiedzeniu niejawnym.| W postępowaniu nieprocesowym rozpoznanie sprawy na posiedzeniu niejawnym jest sposobem domyślnym (art. 514 k.p.c.), a do wyjątków należy rozpoznawanie ich na rozprawie.', {
        boldSep: '|',
    })
    p('W szczególności w niniejszym postępowaniu nie ma konieczności sięgania po dowód z opinii biegłego przed wydaniem orzeczenia. Jak wskazano w przewodniku przygotowanym przez RPO, który w tym zakresie zachowuje swoją aktualność:', {
        spaceAfter: 1.5,
    })

    p('|Kluczową kwestią do oceny czy sąd musi sięgać po biegłego jest wskazanie, że zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego rozpoczęcie tranzycji medycznej uwarunkowane jest uzyskaniem formalnej diagnozy lekarzy o określonych specjalnościach i psychologa. Nie ma żadnych powodów, dla których rozpoczęcie tranzycji prawnej miałoby być obwarowane innymi lub dodatkowymi warunkami. Posiadanie diagnozy jest zaś faktem, który powód lub powódka| [obecnie – wnioskodawca lub wnioskodawczyni] |może wykazać przedstawiając swoją dokumentację medyczną i która może być oceniona przez sąd jako dokument prywatny w rozumieniu art. 245 k.p.c. Będzie to niewątpliwie dowód tego, że odpowiedni specjaliści złożyli oświadczenia dotyczące diagnozy czy stanu zdrowia powoda lub powódki. Przystępując więc do rozstrzygnięcia sprawy o ustalenie płci, w której powód dołączył do pozwu dokumentację medyczną zgodną z zaleceniami Polskiego Towarzystwa Seksuologicznego, sąd – o ile nie występują wyjątkowe okoliczności – powinien uznać, że przedstawiono mu materiał dowodowy wystarczający do stwierdzenia podstawowej przesłanki ustalenia płci, tj. uzyskania przez powoda lub powódkę formalnej diagnozy transpłciowości. Co do zasady nie musi być do tego konieczne uzyskanie opinii biegłych sądowych.|', {
        shift: 24,
        spaceAfter: 1.5,
        italicSep: '|',
    })
    p('|Dla przykładu wskazać należy, że osoba dochodząca np. roszczenia alimentacyjnego, chcąca wykazać swoje zwiększone potrzeby ze względu na chorobę przewlekłą, nie musi zgłaszać w postępowaniu wniosku o opinię biegłego. Sądy, by stwierdzić fakt, że osoba ta w istocie cierpi na daną chorobę, poprzestają w takich przypadkach na przedstawionym zaświadczeniu od odpowiedniego lekarza specjalisty| [s. 67].', {
        shift: 24,
        spaceAfter: 6,
        italicSep: '|',
    })
    p('Podkreślenia wymaga, że wydawanie wyroków w procesach o ustalenie płci na posiedzeniu niejawnym i bez powoływania biegłego stało się jedną z dominujących praktyk w ostatnich latach, przed wydaniem uchwały przez SN. Takie postępowanie jednoznacznie rekomendował też RPO w cytowanej publikacji. Obecnie zmianie ulega jedynie tryb postępowania, ale dotychczasowe przesłanki zmiany oznaczenia płci powinny zostać takie same. Nie ma więc żadnych przeszkód, by w sprawach o zmianę oznaczenia płci przez sprostowanie aktu urodzenia stosować te same standardy dowodowe, które utrwaliły się w sprawach o ustalenie płci. Jak podkreślono w przewodniku RPO, postępowaniach prowadzonych w latach 2020–2022 sądy okręgowe uwzględniły powództwa na posiedzeniach niejawnych aż w 132 sprawach (s. 93). Doświadczenie spraw prowadzonych w ostatnich latach wskazuje, że wyroki na posiedzeniu niejawnym i bez dowodu z opinii biegłego zapadały bardzo często. Rzadziej wyrok poprzedzała rozprawa, choć i wtedy sądy nie sięgały po opinię. Coraz rzadsze były sytuacje dopuszczania dowodu z opinii biegłego.')
    p('W orzecznictwie Sądu Najwyższego podkreślano, że prawo do identyfikowania się z daną płcią to prawo osobiste, z którego charakteru wynika, że interes prawny w uzgodnieniu płci ma wyłącznie podmiot tego prawa. Również w niedawnej uchwale SN podkreślił, że wynik sprawy o zmianę oznaczenia płci dotyczy wyłącznie tej jednostki. Przyjmowane w judykaturze rozwiązania są przy tym próbą znalezienia drogi realizacji ochrony prawnej w zakresie ustalenia zmiany oznaczenia płci |w warunkach luki prawnej|. W ostatnich 36 latach orzecznictwo uznawało, że właściwą ścieżką powinno być wykorzystanie w tym celu założeń powództwa o ustalenie (art. 189 k.p.c.). Obecnie uchwałą z marca 2025 r. SN powrócił do koncepcji stosowania przez analogię przepisów o sprostowaniu aktu urodzenia. Należy jednak zauważyć, że opisany wcześniej standard międzynarodowy podkreśla konieczność zapewnienia procedury, która będzie szybka, przejrzysta i łatwo dostępna, a Ekspert ONZ podnosi wręcz, że procedura powinna być oparta o samookreślenie jednostki. Biorąc pod uwagę ten standard i to, że obecne rozwiązanie jest jedynie wypełnieniem luki prawnej, rygory wynikające z postępowania sądowego i tym samym dowodowego, powinny być możliwie łagodzone.', {
        boldSep: '|',
    })

    font({ style: 'bold' }, () => {
        li(letter, 'Wniosek o rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych.', {
            spaceAfter: 3,
        })
    })
    p('Zgodnie z aktualnym brzmieniem § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych, sprawy o ustalenie płci metrykalnej (art. 189 k.p.c.) są sprawami pilnymi. Przepis ten został wprowadzony Rozporządzeniem Ministra Sprawiedliwości z dnia 26 września 2024 r. zmieniającym rozporządzenie – Regulamin urzędowania sądów powszechnych i wszedł w życie z dniem 16 października 2024 roku. Prawodawca trafnie zatem dostrzegł, że sprawy o uzgodnienie płci metrykalnej, z uwagi na swoją specyfikę, zazwyczaj mają pilny charakter. Nie inaczej jest na gruncie niniejszej spawy. Postępowanie dotyczy bowiem moich najbardziej żywotnych interesów oraz codziennego funkcjonowania. Zaznaczyć należy, że funkcjonuję w ramach odczuwanej tożsamości płciowej, co pozostaje w rozdźwięku z płcią metrykalną uwidocznioną w dokumentach.')
    p('Choć literalnie przepis dotyczy postępowań o ustalenie płci, to wykładnia celowościowa i funkcjonalna w sposób oczywisty nakazują go stosować do postępowań o sprostowanie aktu urodzenia osób transpłciowych. Intencja prawodawcy i cel przepisu są tu bowiem całkowicie jednoznaczne. Przy nowelizacji tego przepisu nie można było zakładać, że zmieni się tryb postępowania. Należy ponadto podkreślić, że uznanie niniejszej sprawy za sprawę pilną pozostaje w zgodzie ze standardami międzynarodowymi nakazującymi szybkie rozpoznanie spraw o zmianę oznaczenia płci.')

    if (step_0.a_1 || step_0.a_2) {
        const texts = []
        if (step_0.a_1) {
            texts.push(name.includes(' ') ? 'imion' : 'imienia')
        }
        if (step_0.a_2) {
            texts.push('nazwiska')
        }
        const text = texts.join(' i ')
        font({ style: 'bold' }, () => {
            li(letter, 'Możliwość wydania rozstrzygnięcia w przedmiocie '+ text +' '+({ K: 'Wnioskodawczyni', M: 'Wnioskodawcy' }[step_0.a_0] || '.......')+'.', {
                spaceAfter: 3,
            })
        })
        p('Z kolei w kwestii żądania zmiany '+(text.startsWith('imion') ? 'moich ' : 'mojego ')+text+' na aktualnie używane, należy wskazać w pierwszej kolejności, że nie jest to żądanie wysuwane ani opierane na przesłankach wynikających z ustawy z dnia 17 października 2008 roku o zmianie imienia i nazwiska, a przesłanki te nie stoją na przeszkodzie rozstrzygnięciu w tym przedmiocie. Potrzeba i konieczność dostosowania imion lub nazwiska do oznaczenia płci koreluje bowiem z żądaniem ustalenia odmiennej płci, niż przypisana przy urodzeniu, i tylko z niego wynika. Uwzględnienie wniosku tylko co do zmiany oznaczenia płci metrykalnej spowodowałoby, że będę z konieczności '+({ K: 'funkcjonowała', M: 'funkcjonował' }[step_0.a_0] || 'funkcjonować')+' przynajmniej przez pewien czas jako osoba o danych męskich, a jedynie żeńskim oznaczeniu płci i żeńskim numerze PESEL, co jest sytuacją bez precedensu i wysoce komplikowałoby codzienne funkcjonowanie.')
        p('W praktyce faktycznie brak zmiany imienia i nazwiska równolegle do zmiany oznaczenia płci i numeru PESEL powoduje, że osoby transpłciowe doświadczają wielu praktycznych trudności w okresie do czasu zmiany wszystkich danych i wydania nowego dowodu osobistego. Osoba nie posiada aktualnego dokumentu tożsamości, przestają działać systemy oparte o usługi cyfrowe obywatel.gov.pl (w tym ePUAP). Występują trudności w wystawieniu recept i ich realizowaniu. Przemawia to za koniecznością uzgodnienia od razu wszystkich danych.')
        p('Imiona i nazwiska są, oprócz oznaczenia płci, istotnymi danymi odróżniającymi osobę, a podstawa ich zmiany jest taka sama, jak w przypadku zmiany oznaczenia płci – czyli niezgodność płciowa. Orzeczenie sądowe żądane w niniejszym wniosku, będące krokiem na drodze do formalnej tranzycji osoby transpłciowej, winno – w braku pozytywnych uregulowań – dążyć do uzgodnienia wszystkich danych osobowych osoby transpłciowej zgodnie z obraną płcią.')
        p('Nie jest argumentem przemawiającym za niedopuszczalnością drogi sądowej w tym zakresie okoliczność, że istnieje uregulowana procedura administracyjna dotycząca zmiany imion i nazwisk, przewidziana w ustawie o zmianie imienia i nazwiska. Orzekający w tych sprawach organ administracji w osobie kierownika urzędu stanu cywilnego należy uznać za właściwy do korygowania danych osób transpłciowych wyłącznie wówczas, gdy wniosek kieruje się w trybie administracyjnym i w oparciu o owe „ważne powody”, wymienione w art. 4 odnośnej ustawy – niezwiązane ze zmianą oznaczenia płci. Nieenumeratywny katalog owych powodów odwołuje się jednak do sytuacji odmiennych rodzajowo, niż transpłciowość i zapadnięcie orzeczenia sądowego stwierdzającego, że wnioskodawca jest kobietą/mężczyzną zamiast płci przypisanej przy urodzeniu.')
        p('Brak zatem podstawy do uznania, że w zakresie żądania zmiany imienia wniosek podlega odrzuceniu na zasadzie art. 199 § 1 pkt 1 k.p.c. w zw. z art. 13 § 2 k.p.c., a wobec obrania przeze mnie konkretnego imienia '+({ K: 'żeńskiego', M: 'męskiego' }[step_0.a_0] || '.......')+' –  jakie chcę nosić po sprostowaniu aktu urodzenia poprzez ujawnienie tam płci '+({ K: 'żeńskiej', M: 'męskiej' }[step_0.a_0] || '.......')+' – i jakich w praktyce używam, istnieje możliwość orzeczenia także i w tym przedmiocie.')
    }
    if (step_0.a_3) {
        font({ style: 'bold' }, () => {
            li(letter, 'Wniosek o zwolnienie od kosztów.', {
                spaceAfter: 3,
            })
        })
        p('Moja sytuacja materialna uniemożliwia mi poniesienie kosztów sądowych bez uszczerbku dla utrzymania koniecznego siebie i rodziny. Szczegółowe informacje dotyczące mojej sytuacji znajdują się w załączonym oświadczeniu o stanie rodzinnym, majątku, dochodach i źródłach utrzymania.')
    }

    noPageBreak(() => {
        p('Z tych względów wnoszę jak na wstępie.', {
            spaceBefore: 8,
            spaceAfter: 15,
        })

        font({ style: 'italic' }, () => {
            p('Podpis', {
                shift: 120,
                spaceAfter: 10,
            })
        })
    })

    p('Załączniki:')
    resetNumbering(nb)
    const attachments = [
        step_0.a_3 ? 'oświadczenie o stanie rodzinnym, majątku, dochodach i źródłach utrzymania' : 'dowód uiszczenia opłaty sądowej od wniosku',
        'odpis aktu urodzenia',
    ]
    if (step_1.a_2_0) attachments.push('opinia psychologiczna')
    if (step_1.a_2_1) attachments.push('opinia psychologiczna')
    if (step_1.a_3_0) attachments.push('zaświadczenie lekarza psychiatry')
    if (step_1.a_3_1) attachments.push('zaświadczenie lekarza seksuologa')
    if (step_1.a_5) attachments.push('dokument zatytułowany |Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów|')
    if (step_1.a_6) attachments.push('dokument zatytułowany |Postępowania w sprawach o uzgodnienie płci. Przewodnik|, wydany przez Rzecznika Praw Obywatelskich')

    const lastAttachment = attachments.pop()
    attachments.forEach(attachment => {
        li(nb, attachment+',', {
            italicSep: '|',
        })
    })
    li(nb, lastAttachment+ '.', {
        italicSep: '|',
    })

    complete()

    return save
}
