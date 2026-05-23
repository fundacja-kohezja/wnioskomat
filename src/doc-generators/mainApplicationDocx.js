import {
    Document,
    Paragraph,
    TextRun,
    FootnoteReferenceRun,
    AlignmentType,
    LevelFormat,
    Packer,
    convertMillimetersToTwip as mm,
} from 'docx'

// TODO load it anynchronously?
import { courts } from '../helpers/datasets'

const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3]) => {

    const name = normalize(step_2.a_5) || '......................'
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
    const isAnyF64 = (step_1.a_2_0 && step_1.a_2_0_0) || (step_1.a_2_1 && step_1.a_2_1_0) || (step_1.a_3_0 && step_1.a_3_0_0) || (step_1.a_3_1 && step_1.a_3_1_0)
    const isAnyHA60 = (step_1.a_2_0 && step_1.a_2_0_1) || (step_1.a_2_1 && step_1.a_2_1_1) || (step_1.a_3_0 && step_1.a_3_0_1) || (step_1.a_3_1 && step_1.a_3_1_1)

    const specialists = []
    if (step_1.a_3_0) specialists.push('lekarza psychiatrę')
    if (step_1.a_3_1) specialists.push('lekarza seksuologa')
    if (step_1.a_2_0 || step_1.a_2_1) specialists.push('psychologa')
    if (!specialists.length) specialists.push('......................')

    const nameTextParts = []
    if (step_0.a_1) {
        nameTextParts.push(name.includes(' ') ? 'imion' : 'imienia')
    }
    if (step_0.a_2) {
        nameTextParts.push('nazwiska')
    }
    const nameText = nameTextParts.join(' i ')

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        size: '11pt',
                        language: {
                            value: 'pl-PL'
                        }
                    },
                    paragraph: {
                        spacing: {
                            line: 1.5 * 240,
                            after: mm(3)
                        },
                        alignment: AlignmentType.JUSTIFIED,
                    }
                },
            },
        },
        numbering: {
            config: [
                {
                    reference: 'basic-numbering',
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.DECIMAL,
                            text: '%1.',
                            alignment: AlignmentType.END,
                            style: {
                                paragraph: {
                                    indent: { left: mm(8), hanging: mm(3) },
                                },
                            },
                        },
                        {
                            level: 1,
                            format: LevelFormat.LOWER_LETTER,
                            text: '%2.',
                            alignment: AlignmentType.END,
                            style: {
                                paragraph: {
                                    indent: { left: mm(16), hanging: mm(3) },
                                },
                            },
                        },
                    ],
                },
                {
                    reference: 'section-marker',
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.LOWER_LETTER,
                            text: '%1)',
                            alignment: AlignmentType.END,
                            style: {
                                paragraph: {
                                    indent: { left: mm(8), hanging: mm(3) },
                                },
                                run: { bold: true },
                            },
                        },
                    ],
                },
            ],
        },
        footnotes: {
            1: { children: [
                new Paragraph({
                    spacing: { line: 1 * 240 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: 'Skrót ustnego uzasadnienia został opublikowany na stronie SN w części zawierającej komunikaty: https://www.sn.pl/aktualnosci/SitePages/Komunikaty_o_sprawach.aspx?ItemSID=695-b6b3e804-2752-4c7d-bcb4-7586782a1315&ListName=Komunikaty_o_sprawach',
                            size: '8pt',
                        }),
                    ],
                }),
            ] },
            2: { children: [
                new Paragraph({
                    spacing: { line: 1 * 240 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: 'Wątpliwości te wynikają przede wszystkim z uchwały trzech Izb Sądu Najwyższego z 23.01.2020 r. (BSA-I-4110-1/2020), a także późniejszego orzecznictwa Trybunału Sprawiedliwości Unii Europejskiej czy Europejskiego Trybunału Praw Człowieka, w których wskazuje się na wpływ takiej nominacji na ocenę bezstronności i niezawisłości sędziego i w konsekwencji – wpływ na ważność wydanego orzeczenia. Również wszystkie obecnie projektowane ustawy dotyczące funkcjonowania sądownictwa przewidują, że orzeczenia wydane przez SN w składach, w których zasiadali tak powołani sędziowie, będą nieważne.',
                            size: '8pt',
                        }),
                    ],
                }),
            ] },
            3: { children: [
                new Paragraph({
                    spacing: { line: 1 * 240 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: 'Zalecenie CM/Rec(2010)5 Komitetu Ministrów dla Państw Członkowskich w zakresie środków zwalczania dyskryminacji opartej na orientacji seksualnej lub tożsamości płciowej. Tłumaczenie oficjalne Ministerstwa Sprawiedliwości za: https://arch-bip.ms.gov.pl/pl/prawa-czlowieka/inne-organizacje-miedzynarodowe-i-prawa-czlowieka/prawa-czlowieka-w-radzie-europy-/download,2254,3.html: „Państwa członkowskie powinny przyjąć odpowiednie środki gwarantujące pełne prawne uznanie zmiany płci we wszystkich dziedzinach życia, w szczególności poprzez umożliwienie zmiany imienia, nazwiska i płci w oficjalnych dokumentach w ',
                            size: '8pt',
                        }),
                        new TextRun({
                            text: 'sposób szybki, przejrzysty i dostępny',
                            bold: true,
                            size: '8pt',
                        }),
                        new TextRun({
                            text: '; państwa członkowskie powinny także zagwarantować, tam gdzie jest to wskazane, odpowiednie uznanie lub wprowadzenie zmian w kluczowych dokumentach wydawanych przez podmioty niepaństwowe [...]”.',
                            size: '8pt',
                        }),
                    ],
                }),
            ] },
            4: { children: [
                new Paragraph({
                    spacing: { line: 1 * 240 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: 'ECRI General Policy Recommendation no. 17 on preventing and combating intolerance and discrimination against LGBTI persons,',
                            italics: true,
                            size: '8pt',
                        }),
                        new TextRun({
                            text: ' zalecenie przyjęte dnia 28.06.2023 r., CRI(2023)30.',
                            size: '8pt',
                        }),
                    ],
                }),
            ] },
            5: { children: [
                new Paragraph({
                    spacing: { line: 1 * 240 },
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: 'Raport IE SOGI z wizytacji w Gruzji, A/HRC/41/45/Add.1, § 68.',
                            italics: true,
                            size: '8pt',
                        }),
                    ],
                }),
            ] },
        },
        sections: [
            {
                children: [
                    new Paragraph({
                        text: (normalize(step_2.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................') + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }),
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: mm(4) },
                    }),
                    ...(
                        step_2.a_3 ? [
                            step_2.a_3,
                            'Wydział Cywilny',
                            courts[step_2.a_3].address,
                        ] : [
                            'Sąd Rejonowy w ......................',
                            'Wydział Cywilny',
                            '......................',
                        ]
                    ).map(text => new Paragraph({
                        indent: { left: mm(100) },
                        spacing: { after: mm(1.5), line: 1.15 * 240 },
                        alignment: AlignmentType.LEFT,
                        children: text.split('\n').map(
                            (line, i) => new TextRun({ text: line, break: i === 0 ? 0 : 1 })
                        ),
                    })),
                    new Paragraph({
                        indent: { left: mm(100) },
                        spacing: { before: mm(5), after: mm(1.5), line: 1.15 * 240 },
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: {K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[step_0.a_0] || '',
                                bold: true,
                            })
                        ]
                    }),
                    ...[
                        [step_2.a_5, step_2.a_6].map(normalize).join(' '),
                        normalize(step_2.a_1),
                        'PESEL ' + (step_2.a_0 ? normalize(step_2.a_0) : '......................'),
                        ...(step_2.a_4 ? [
                            (step_2.a_4_0 ? normalize(step_2.a_4_0) : '') + (step_2.a_4_1 ? ('\ntel. ' + normalize(step_2.a_4_1)) : ''),
                        ] : []),
                    ].map(text => new Paragraph({
                        indent: { left: mm(100) },
                        spacing: { after: mm(1.5), line: 1.15 * 240 },
                        alignment: AlignmentType.LEFT,
                        children: text.split('\n').map(
                            (line, i) => new TextRun({ text: line, break: i === 0 ? 0 : 1 })
                        ),
                    })),
                    ...(step_2.a_2 ? [
                        new Paragraph({
                            indent: { left: mm(100) },
                            spacing: { before: mm(5), after: mm(1.5), line: 1.15 * 240 },
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: 'Pełnomocnik do doręczeń',
                                    bold: true,
                                })
                            ]
                        }),
                        new Paragraph({
                            text: normalize(step_2.a_2_0) || '......................',
                            indent: { left: mm(100) },
                            spacing: { after: mm(1.5), line: 1.15 * 240 },
                            alignment: AlignmentType.LEFT,
                        }),
                        new Paragraph({
                            indent: { left: mm(100) },
                            spacing: { after: mm(1.5), line: 1.15 * 240 },
                            alignment: AlignmentType.LEFT,
                            children: normalize(step_2.a_2_1).split('\n').map(
                                (line, i) => new TextRun({ text: line, break: i === 0 ? 0 : 1 })
                            ),
                        })
                    ] : []),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: mm(16), line: 1.15 * 240 },
                        children: [
                            new TextRun({
                                text: 'WNIOSEK O SPROSTOWANIE AKTU URODZENIA',
                                bold: true,
                            }),
                            ...(step_0.a_3 ? [
                                new TextRun({
                                    text: 'wraz z wnioskiem o zwolnienie od obowiązku ponoszenia kosztów sądowych',
                                    bold: true,
                                    break: 1,
                                }),
                            ] : []),
                        ]
                    }),
                    new Paragraph({
                        text:'Na podstawie art. 36 ustawy Prawo o aktach stanu cywilnego wnoszę o:',
                        spacing: { before: mm(12) }
                    }),
                    new Paragraph({
                        text: 'sprostowanie aktu urodzenia '+({K: 'Wnioskodawczyni', M: 'Wnioskodawcy'}[step_0.a_0] || '......................')+' zarejestrowanego w Urzędzie Stanu Cywilnego w '+ (normalize(step_2.a_9) || '......................') +' za nr '+ (normalize(step_2.a_8) || '......................') +', w ten sposób, żeby:',
                        numbering: { reference: 'basic-numbering', level: 0 },
                        spacing: { after: 0 },
                    }),
                    new Paragraph({
                        text: {
                            K:'błędnie wpisana w akcie płeć oznaczona jako męska (mężczyzna) została zmieniona na prawidłową – żeńską (kobieta);',
                            M:'błędnie wpisana w akcie płeć oznaczona jako żeńska (kobieta) została zmieniona na prawidłową – męską (mężczyzna);',
                        }[step_0.a_0] || '......................',
                        numbering: step_0.a_1 || step_0.a_2 ? { reference: 'basic-numbering', level: 1 } : {},
                        indent: step_0.a_1 || step_0.a_2 ? {} : { left: mm(8) },
                        spacing: { after: 0 },
                    }),
                    ...(step_0.a_1 ? [
                        new Paragraph({
                            text: (name.includes(' ') ? ('imiona '+name+' zostały') : ('imię '+name+' zostało')) + ' zmienione na '+(normalize(step_0.a_1_0).includes(' ')?'imiona ':'imię ')+(normalize(step_0.a_1_0) || '......................')+';',
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        }),
                    ] : []),
                    ...(step_0.a_2 ? [
                        new Paragraph({
                            text: 'nazwisko '+normalize(step_2.a_6)+' zostało zmienione na '+normalize(step_0.a_2_0)+'; ',
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...[
                        'rozpoznanie sprawy na posiedzeniu niejawnym;',
                        'rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych;',
                        'dopuszczenie i przeprowadzenie dowodu z dokumentów:',
                    ].map(text => new Paragraph({
                        text,
                        numbering: { reference: 'basic-numbering', level: 0 },
                        spacing: { after: 0 },
                    })),
                    new Paragraph({
                        text: 'odpisu aktu urodzenia – na fakt oznaczenia mojej płci w akcie urodzenia jako '+({K: 'męskiej;', M: 'żeńskiej;'}[step_0.a_0] || '.......;'),
                        numbering: { reference: 'basic-numbering', level: 1 },
                        spacing: { after: 0 },
                    }),
                    ...(step_1.a_2_0 ? [
                        new Paragraph({
                            text: 'opinii psychologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_0_0, step_1.a_2_0_1),
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_1.a_2_1 ? [
                        new Paragraph({
                            text: 'opinii psychologa-seksuologa – na fakt stwierdzenia u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_2_1_0, step_1.a_2_1_1),
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_1.a_3_0 ? [
                        new Paragraph({
                            text: 'zaświadczenia lekarza psychiatry – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_0_0, step_1.a_3_0_1),
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_1.a_3_1 ? [
                        new Paragraph({
                            text: 'zaświadczenia lekarza seksuologa – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', wykluczenia wtórnego pochodzenia niezgodności płciowej, postawienia mi formalnej diagnozy '+diagnosis(step_1.a_3_1_0, step_1.a_3_1_1),
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_1.a_4 ? [
                        new Paragraph({
                            text: 'zaświadczenia lekarskiego – na fakt wdrożenia u mnie terapii hormonalnej;',
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_1.a_5 ? [
                        new Paragraph({
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                            children: [
                                new TextRun('dokumentu zatytułowanego '),
                                new TextRun({
                                    text: 'Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów',
                                    italics: true,
                                }),
                                new TextRun(' – na fakt aktualnych polskich standardów opieki nad osobami transpłciowymi, wymogów diagnostycznych niezbędnych do postawienia diagnozy F64.0, spełniania przeze mnie kryteriów diagnostycznych;'),
                            ]
                        })
                    ] : []),
                    ...(!step_0.a_1 && step_1.a_7 ? [
                        new Paragraph({
                            text: 'decyzji o zmianie imienia – na fakt zmiany imienia w związku z trwałym poczuciem przynależności do płci '+({ K: 'żeńskiej;', M: 'męskiej;' }[step_0.a_0] || '.......;'),
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        }),
                    ] : []),
                    ...(step_1.a_8 ? [
                        new Paragraph({
                            text: ({ A: 'wydruku z portali społecznościowych', B: 'plakietki identyfikacyjnej z miejsca pracy', C: 'wydruku z portalu USOS' }[step_1.a_8_0] || '......................')+' – na fakt występowania u mnie trwałej identyfikacji z płcią '+part1+', funkcjonowania jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+' w otoczeniu;',
                            numbering: { reference: 'basic-numbering', level: 1 },
                            spacing: { after: 0 },
                        })
                    ] : []),
                    ...(step_0.a_3 ? [
                        new Paragraph({
                            text: 'wnoszę o zwolnienie mnie od obowiązku ponoszenia kosztów procesu w całości, ponieważ nie jestem w stanie ich ponieść bez uszczerbku utrzymania koniecznego dla siebie i rodziny.',
                            numbering: { reference: 'basic-numbering', level: 0 },
                            spacing: { before: mm(3) },
                        })
                    ] : []),
                    ...(step_1.a_6 ? [
                        new Paragraph({
                            spacing: { before: mm(8) },
                            children: [
                                new TextRun('Jednocześnie przedkładam jako załącznik wydaną przez Rzecznika Praw Obywatelskich publikację '),
                                new TextRun({
                                    text: 'Postępowania w sprawach o uzgodnienie płci. Przewodnik',
                                    italics: true,
                                }),
                                new TextRun(', zawierającą szereg specjalistycznych informacji dotyczących praw osób transpłciowych oraz aktualnych standardów orzeczniczych w sprawach o ustalenie płci.'),
                            ]
                        })
                    ] : []),
                    new Paragraph({
                       text: ('Na wstępie wyjaśniam, że zdaję sobie sprawę z metrykalnego oznaczenia mojej płci jako '+({ K: 'męskiej', M: 'żeńskiej' }[step_0.a_0] || '.......')+', jednak wskazuję, że w codziennym życiu funkcjonuję jako '+({ K: 'kobieta', M: 'mężczyzna' }[step_0.a_0] || '.......')+'. W związku z tym, że tożsamość płciowa jest jednym z dóbr osobistych człowieka, we wniosku będę używać '+({ K: 'żeńskich', M: 'męskich' }[step_0.a_0] || '.......')+' form gramatycznych.')
                        + (step_3.a_3 ? ' Jednocześnie wskazuję, że na co dzień używam imienia '+ (normalize(step_3.a_3_0) || '....... ') +'.' : ''),
                        spacing: { before: mm(6), after: mm(8) },
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: mm(6) },
                        children: [
                            new TextRun({ text: 'Uzasadnienie', bold: true }),
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'TWIERDZENIA FAKTYCZNE', bold: true }),
                        ]
                    }),
                    new Paragraph(
                        'Kierownik Urzędu Stanu Cywilnego w '+(normalize(step_2.a_9) || '........')
                        + ' zarejestrował moje urodzenie w dniu '+(step_2.a_7 ? (new Date(step_2.a_7)).toLocaleDateString('pl-PL', { dateStyle: 'long' }) : '........')
                        + ' w akcie o numerze '+(normalize(step_2.a_8) || '..................... ')+'. '
                        + 'Moja płeć została tam oznaczona jako '+({ K: 'męska', M: 'żeńska' }[step_0.a_0] || '.......')+', w oparciu o ocenę mojej budowy anatomicznej przez personel medyczny. '
                        + 'Nadano mi '+(name.includes(' ') ? 'imiona ' : 'imię ')+name+'.'
                    ),
                    new Paragraph({
                        children: [
                            new TextRun({ text: 'Dowód: odpis aktu urodzenia', italics: true }),
                        ],
                    }),
                    new Paragraph(normalize(step_3.a_0) || '......................'),
                    new Paragraph('U osób transpłciowych występuje niezgodność pomiędzy płcią przypisaną przy urodzeniu a tożsamością płciową, czyli głębokim wewnętrznym przeżywaniem własnej płci. Ta rozbieżność może prowadzić do dysforii, czyli uczucia dyskomfortu wynikającego z rozdźwięku pomiędzy różnymi aspektami naszej płci (cechami płciowymi naszego ciała, tym jak wyglądamy, tym jak odbierają nas inni). Nasilona dysforia może wiązać się z poważnymi negatywnymi skutkami dla zdrowia psychicznego osoby transpłciowej. Formalnie u osób transpłciowych diagnozuje się „transseksualizm” według nomenklatury ICD-10 (F64.0). Według najnowszej nomenklatury ICD-11, nie wszędzie jeszcze wdrożonej, formalnie diagnozuje się „niezgodność płciową” (HA60), którą zdefiniowano jako utrzymującą się wyraźną niezgodność między doświadczaną przez osobę płcią oraz płcią przypisaną. Stan „niezgodności płciowej” został wyjęty z obszaru dotyczącego zaburzeń psychicznych, a przeniesiony do obszaru dotyczącego zdrowia seksualnego. Sama transpłciowość w tym ujęciu nie jest już stanem „patologicznym”, „chorobą” czy „zaburzeniem”. Po uzgodnieniu płci w toku tranzycji medycznej i/lub społecznej, w tym prawnej, niezgodność ta zanika.'),
                    new Paragraph(
                        'W związku z głęboko przeżywanym poczuciem identyfikacji z płcią '+({ K: 'żeńską', M: 'męską' }[step_0.a_0] || '.......')+' i występującą jednocześnie dysforią, '+({ K: 'rozpoczęłam', M: 'rozpocząłem' }[step_0.a_0] || 'rozpocz_ł_m')+' formalną diagnostykę u lekarzy specjalistów, w wyniku której '+({ K: 'otrzymałam', M: 'otrzymałem' }[step_0.a_0] || 'otrzymał_m')+' diagnozę '
                        + (isAnyF64 && isAnyHA60 ? 'transseksualizmu (F64.0) / niezgodności płciowej (HA60).' : isAnyF64 ? 'transseksualizmu (F64.0).' : isAnyHA60 ? 'niezgodności płciowej (HA60).' : '...................... .')
                        + ' Proces diagnostyczny został przeprowadzony '
                        + specialists.map((specialist, i) => {
                            let text = ''
                            text += 'przez '+specialist
                            if (i === specialists.length - 1) return text
                            if (i === specialists.length - 2) {
                                text += ' oraz '
                            } else {
                                text += ', '
                            }
                            return text
                        }).join('')
                        + ', zgodnie z wytycznymi Polskiego Towarzystwa Seksuologicznego. W toku tego procesu przekazano mi wszystkie informacje niezbędne do wyrażenia przeze mnie świadomej zgody na wdrożenie leczenia hormonalnego, a także wykluczono wtórne (np. wynikające z zaburzeń psychicznych) pochodzenie dysforii płciowej / niezgodności płciowej. Specjaliści przeprowadzili podmiotowe badania psychologiczne'
                        + (step_3.a_2 ? ', wywiad i diagnostykę opartę o specjalistyczne, standaryzowane narzędzia. ' : ' i wywiad. ')
                        + 'Proces ten pozwolił na stwierdzenie, że występująca u mnie niezgodność płci jest trwała. W opinii psychologicznej zwrócono uwagę, że brak tranzycji medycznej i prawnej przyczynia się do trudności w obszarze zdrowia psychicznego i zarekomendowano dalszą prawną zmianę oznaczenia płci celem poprawy mojego funkcjonowania.'
                    ),
                    new Paragraph('Od '+(step_3.a_1 ? ((['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'][+step_3.a_1[0] - 1] || '') + ' ' + (step_3.a_1[1] || '.......')) : '......................')+' wdrożono u mnie leczenie hormonalne. To oznacza, że przyjmuję hormony, których celem jest '+({ K: 'feminizacja', M: 'maskulinizacja' }[step_0.a_0] || '......................')+' mojego ciała. Zmiany, które temu towarzyszą, są przeze mnie odbierane pozytywnie.'),
                    new Paragraph('W sferze społecznej '+({ some: 'w niektórych obszarach', all: 'w większości obszarów' }[step_3.a_4] || '......................')+' funkcjonuję zgodnie z moją '+({ K: 'żeńską ', M: 'męską ' }[step_0.a_0] || '')+'tożsamością płciową. Moja rodzina, osoby bliskie, koledzy i koleżanki, '+(step_3.a_3 ? ('znają mnie jako '+step_3.a_3_0+' i ') : '')+'używają wobec mnie '+({ K: 'żeńskich', M: 'męskich' }[step_0.a_0] || '.......')+' form gramatycznych.'),
                    new Paragraph('Brak zmiany oznaczenia płci oraz imienia powoduje u mnie duże trudności w codziennym funkcjonowaniu. We wszystkich przypadkach w których muszę używać danych zawartych w akcie urodzenia lub okazywać dowód tożsamości, moja tożsamość jest kwestionowana z uwagi na wygląd, odpowiadający typowym wyobrażeniom o '+({ K: 'kobiecym', M: 'męskim' }[step_0.a_0] || '.......')+' wyglądzie. Zmusza mnie to też do ujawniania osobom postronnym, że jestem osobą transpłciową, co głęboko ingeruje w moją prywatność i pozbawia mnie szansy na decydowanie o tym, kto będzie wiedzieć o mojej transpłciowości. Brak zmiany oznaczenia płci pozbawia mnie więc sprawczości i decyzyjności w jednym z kluczowych aspektów mojego życia. Co więcej, brak zmiany danych wpływa też na możliwość podjęcia dalszych kroków w tranzycji medycznej. Utrudnia też znalezienie i utrzymanie pracy. Osoby transpłciowe są grupą najczęściej dyskryminowaną na rynku pracy wśród społeczności LGBT+. Dopóki moje dane metrykalne są inne niż zgodne z moją tożsamością płciową, jestem nieustannie zmuszona do ujawniania pracodawcom swojej tożsamości, co obniża szansę na bycie '+({ K: 'zatrudnioną.', M: 'zatrudnionym.' }[step_0.a_0] || 'zatrudnion_.')),
                    new Paragraph('Powyższe okoliczności wskazują jednoznacznie, że w moim przypadku poczucie przynależności do płci '+({ K: 'żeńskiej', M: 'męskiej' }[step_0.a_0] || '.......')+' jest trwałe i że uwzględnienie niniejszego wniosku jest uzasadnione.'),
                    new Paragraph({
                        spacing: { before: mm(2) },
                        children: [
                            new TextRun({ text: 'STAN PRAWNY', bold: true }),
                        ]
                    }),
                    new Paragraph({
                        numbering: { reference: 'section-marker', level: 0 },
                        spacing: { after: mm(3) },
                        children: [
                            new TextRun({
                                text: 'Dopuszczalność wniosku o sprostowanie aktu urodzenia w trybie nieprocesowym i możliwość korzystania z dotychczasowej praktyki sądów okręgowych w sprawach o ustalenie płci w zakresie postępowania dowodowego.',
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph('Tak zwana. tranzycja prawna dokonuje się w Polsce w oparciu o orzecznictwo Sądu Najwyższego. Kwestia ta, związana również z ewolucją orzecznictwa SN, została szczegółowo wyjaśniona w załączonym do wniosku przewodniku biura RPO.'),
                    new Paragraph('Przed 22 czerwca 1989 r., kiedy to Sąd Najwyższy wydał uchwałę w sprawie III CZP 37/89, korekta oznaczenia płci w akcie urodzenia dokonywana była w postępowaniu o sprostowanie aktu urodzenia. We wspomnianej uchwale SN wykluczył taką procedurę, ale dla samej doktryny i orzecznictwa było oczywiste, że sama możliwość korekty oznaczenia płci powinna istnieć. Dyskusyjna była jedynie podstawa prawna. Warto przy tym podkreślić, że uchwała SN z 1989 r. zapadła w innym stanie prawnym, gdy brzmienie przepisu dotyczącego aktu urodzenia wskazywało, że sprostować można tylko dane, które w momencie sporządzenia aktu były wpisane nieprawidłowo.'),
                    new Paragraph({
                        children: [
                            new TextRun('W postanowieniu z 22 marca 1991 r. (sygn. akt III CRN 28/91) Sąd Najwyższy uznał, że '),
                            new TextRun({
                                text: 'poczucie przynależności do danej płci jest dobrem osobistym w rozumieniu art. 23 k.c.',
                                bold: true,
                            }),
                            new TextRun(' i można dochodzić jego ochrony w trybie procesowym. W orzeczeniu tym SN przesądził też, że właściwym trybem dochodzenia korekty aktu urodzenia jest pozew o ustalenie, oparty o art. 189 k.p.c. w zw. z art. 23 k.c., |którego przesłanką jest stwierdzenie trwałości poczucia przynależności do danej płci|. W kolejnych orzeczeniach SN uzupełniał luki procedury, m.in. wypowiadając się o legitymacji biernej w sytuacji, gdy w sprawie nie ma rodziców czy o posiadaniu (lub nie) interesu prawnego w rozstrzygnięciu. Procedura była jednak co do zasady niekwestionowana.'),
                        ]
                    }),
                    new Paragraph('4 marca 2025 r. skład całej Izby Cywilnej Sądu Najwyższego w sprawie III CZP 6/24 podjął uchwałę o następującej treści:'),
                    ...[
                        '1. Żądanie zmiany oznaczenia płci w akcie urodzenia podlega rozpoznaniu przez sąd w postępowaniu nieprocesowym przy zastosowaniu w drodze analogii art. 36 ustawy z dnia 28 listopada 2014 r. – Prawo o aktach stanu cywilnego.',
                        '2. Zmiana oznaczenia płci w akcie urodzenia może nastąpić wyłącznie na wniosek osoby, której dotyczy ten akt.',
                        '3. Oprócz wnioskodawcy uczestnikiem postępowania może być tylko jego małżonek (art. 510 k.p.c.).',
                        '4. Postanowienie uwzględniające wniosek wywołuje skutki od chwili uprawomocnienia się.',
                    ].map(text => new Paragraph({
                        indent: { left: mm(8) },
                        children: [
                            new TextRun({ text, italics: true }),
                        ]
                    })),
                    new Paragraph({
                        spacing: { before: mm(3) },
                        children: [
                            new TextRun('Tym samym SN '),
                            new TextRun({ text: 'de facto', italics: true }),
                            new TextRun(' powrócił do koncepcji obowiązującej przed 1989 r. W ustnym uzasadnieniu (do dnia złożenia wniosku nie opublikowano uzasadnienia na piśmie'),
                            new FootnoteReferenceRun(1),
                            new TextRun(') Sąd Najwyższy zwrócił uwagę, że 28 listopada 2014 r. przyjęta została ustawa Prawo o aktach stanu cywilnego, która zmieniła podstawy i przesłanki sprostowania aktu urodzenia, a ponadto jednoznacznie określiła płeć człowieka jako element stanu cywilnego (art. 2 ust. 1 w zw. z art. 49 ust. 2 pkt. 1 p.a.s.c.). SN podkreślił, że wynik postępowania o zmianę oznaczenia płci dotyczy jedynie praw osobistych wnioskodawcy i podkreślił osobisty charakter tego typu spraw. Odnotował, że konstrukcja i mechanizmy trybu nieprocesowego w większym stopniu uwzględniają okoliczności ze sfery interesu publicznego, a także minimalizują wątpliwości odnoszące się do zagadnienia legitymacji procesowej. W szczególności przejście do trybu nieprocesowego pozwala na ominięcie tworzenia „sztucznego” pozwanego (o którym mówił SN m.in. w wyroku z 2019 r.), a także pozwala na skorzystanie gwarantowanej przez p.a.s.c. skuteczności '),
                            new TextRun({ text: 'erga omnes', italics: true }),
                            new TextRun(' wydanego rozstrzygnięcia.'),
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun('Choć wydanie powyższej uchwały wywołało kontrowersje i niepewność, zwłaszcza wobec faktu, że w składzie wydającym uchwałę zasiadali sędziowie powołani na stanowisko sędziego przez Krajową Radę Sądownictwa ukształtowaną na podstawie przepisów ustawy z dnia 8 grudnia 2017 r. o zmianie ustawy o Krajowej Radzie Sądownictwa'),
                            new FootnoteReferenceRun(2),
                            new TextRun(', '),
                            new TextRun({
                                text: 'bez względu na to, czy uchwałę należy uznawać za ważną czy nie, należy co do zasady uznać słuszność rozumowania SN',
                                bold: true,
                            }),
                            new TextRun('. W doktrynie i wśród praktyków od lat wskazywano, że uchwała z 1989 r. utrudniła, a nie uprościła postępowanie o zmianę oznaczenia płci i że jej treść wynikała przede wszystkim z ówczesnego brzmienia przepisów dotyczących sprostowania aktu urodzenia. Od lat podnoszono, że bardziej odpowiednim trybem byłby tryb nieprocesowy, który nie stawia konieczności spełniania sztucznego wymogu – istnienia strony pozwanej i pozywania rodziców. Uchwała SN słusznie podkreśla osobisty charakter spraw o zmianę oznaczenia płci i wskazuje na to, że płeć jest już jednoznacznie elementem prawa stanu. Należy więc aprobująco odnieść się do tezy, że zmiana oznaczenia płci powinna nastąpić w drodze wniosku o sprostowanie aktu urodzenia przy zastosowaniu w drodze analogii art. 36 p.a.s.c.'),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun('Za stosowaniem w drodze analogii postępowania o sprostowanie aktu urodzenia przemawia również międzynarodowy standard dotyczący procedury zmiany oznaczenia płci. Konieczność istnienia procedury pozwalającej na zmianę oznaczenia płci w akcie urodzenia i dokumentach, potwierdza m.in. orzecznictwo Europejskiego Trybunału Praw Człowieka. Wielka Izba Trybunału w sprawie Goodwin przeciwko Zjednoczonemu Królestwu (wyrok z 11 lipca 2022 r., skarga nr 28957/95) uznała, że państwa – strony EKPC – '),
                            new TextRun({
                                text: 'mają pozytywny obowiązek zapewnienia procedury prawnego uzgodnienia płci dla osoby transpłciowej',
                                bold: true,
                            }),
                            new TextRun('. W kolejnych orzeczeniach Trybunał wskazywał na konieczność zapewnienia, by procedura ta była '),
                            new TextRun({
                                text: 'efektywna i łatwo dostępna',
                                bold: true,
                            }),
                            new TextRun(' (X przeciwko Byłej Jugosławiańskiej Republice Macedonii, wyrok z 17 kwietnia 2019 r., skarga nr 29683/16), '),
                            new TextRun({
                                text: 'szybka',
                                bold: true,
                            }),
                            new TextRun(' (w sprawie S.V. przeciwko Włochom okres 2 lat prowadzenia postępowania uznano za zbyt długi i naruszający art. 8 EKPC), '),
                            new TextRun({
                                text: 'bez uzależnienia od wymogu kilkuletniego okresu obserwacji',
                                bold: true,
                            }),
                            new TextRun(' (Schlumpf przeciwko Szwajcarii, wyrok z 8 stycznia 2009 r., skarga nr 29002/06). '),
                            new TextRun({
                                text: 'Nie można również wprowadzać wymogu przechodzenia określonych zabiegów medycznych, w tym chirurgicznych',
                                bold: true,
                            }),
                            new TextRun(' (Y.Y. przeciwko Turcji, A.P. Garçon & Nicot przeciwko Francji). Wyrok S.V. przeciwko Włochom jasno pokazał, że prawo do prywatności (art. 8 EKPC)  należy obecnie wiązać z prawem do wolności, autonomii i prawem do samostanowienia. Z praw tych wynika, że życie prywatne człowieka obejmuje także tożsamość psychiczną i społeczną człowieka, w tym jego identyfikację płciową, którą państwo ma obowiązek uszanować.'),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun('Wymóg, by procedura zmiany oznaczenia płci była '),
                            new TextRun({
                                text: 'szybka, łatwo dostępna i respektowała tożsamość płciową jednostki',
                                bold: true,
                            }),
                            new TextRun(' można znaleźć również w innych aktach i dokumentach międzynarodowych. Na poziomie europejskim jednym z kluczowych dokumentów poruszających tematykę uzgodnienia płci jest zalecenie CM/Rec(2010)5, przyjęte przez Komitet Ministrów Rady Europy w 2010 r.'),
                            new FootnoteReferenceRun(3),
                            new TextRun(' czy Zalecenie nr 17 dotyczące Ogólnej Polityki Europejskiej Komisji Przeciwko Rasizmowi i Nietolerancji w sprawie zapobiegania i zwalczania nietolerancji i dyskryminacji przeciwko osobom LGBTI'),
                            new FootnoteReferenceRun(4),
                            new TextRun('. Niezależny Ekspert ONZ ds. ochrony przed przemocą i dyskryminacją opartych na orientacji seksualnej i tożsamości płciowej wskazał, że „procedura prawnego uzgodnienia płci pozwalająca osobom transpłciowym na zmianę imienia i oznaczenia płci w dokumentach '),
                            new TextRun({
                                text: 'powinna być prostym postępowaniem administracyjnym opartym na samookreśleniu wnioskodawcy, powinna być dostępna i, tak dalece, jak to możliwe, wolna od kosztów',
                                bold: true,
                            }),
                            new FootnoteReferenceRun(5),
                            new TextRun('.'),
                        ]
                    }),
                    new Paragraph('Mając na uwadze standard międzynarodowy, można jednoznacznie stwierdzić, że postępowaniem, które w większym stopniu chroni prywatność jednostki, uznaje podmiotowość osoby transpłciowej i ma szansę być postępowaniem szybkim, efektywnym i łatwo dostępnym, jest właśnie postępowanie nieprocesowe, o sprostowanie aktu urodzenia.'),
                    new Paragraph({
                        children: [
                            new TextRun('Jednocześnie należy zauważyć, że brak jest powodów, by uznać za nieaktualne te tezy płynące z orzecznictwa Sądu Najwyższego i sądów powszechnych wydanych w ostatnich 36 latach, które nie dotyczyły trybu postępowania i osób legitymowanych w procesie o ustalenie płci. '),
                            new TextRun({
                                text: 'W szczególności aktualna pozostaje teza, że tożsamość płciowa jest dobrem osobistym jednostki w rozumieniu art. 23 k.c. i że w postępowaniu należy wykazać trwałość poczucia przynależności do danej płci.',
                                bold: true,
                            }),
                            new TextRun(' Zarówno pozew o ustalenie płci, jak i obecnie wniosek o sprostowanie aktu urodzenia wywołują ten sam skutek – w akcie urodzenia nanoszona jest wzmianka dodatkowa o orzeczeniu sądowym. Przemawia to za stosowaniem dotychczasowych standardów do uznania, czy spełnione zostały przesłanki zmiany oznaczenia płci w akcie urodzenia.'),
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun('Rzecznik Praw Obywatelskich w swoich rekomendacjach wskazywał, że osoba dochodząca ustalenia płci (obecnie zmiany oznaczenia płci w wyniku wniosku o sprostowanie aktu urodzenia) '),
                            new TextRun({
                                text: 'powinna wykazać trwałość poczucia przynależności do danej płci, co zasadniczo powinno nastąpić poprzez przedstawienie formalnej diagnozy.',
                                bold: true,
                            }),
                            new TextRun(' Zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego (PTS) diagnoza taka powinna być postawiona przez dwóch ekspertów. Pierwszym z nich powinien być lekarz psychiatra lub seksuolog, a drugim – psycholog ze specjalizacją z zakresu psychologii klinicznej lub psychoseksuologii lub posiadający certyfikat seksuologa klinicznego. Powyższe standardy w sposób kompleksowy omawiają, w jaki sposób i na jakich podstawach dochodzi do postawienia diagnozy transseksualizmu (wg ICD-10) czy niezgodności płciowej (wg ICD-11). '),
                            new TextRun({
                                text: 'Wykazanie przez osobę transpłciową, że dysponuje diagnozą postawioną przez ekspertów zgodnie z zaleceniami PTS, jest wystarczające do stwierdzenia trwałości jej poczucia przynależności do płci, której ustalenia się domaga, a tym samym jest wystarczające do wydania postanowienia uwzględniającego wniosek.',
                                bold: true,
                            }),
                        ]
                    }),
                    new Paragraph({
                        numbering: { reference: 'section-marker', level: 0 },
                        spacing: { after: mm(3) },
                        children: [
                            new TextRun({
                                text: 'Uzasadnienie wniosku o rozpoznanie sprawy na posiedzeniu niejawnym na podstawie dokumentacji przedstawionej przez '+({ K: 'Wnioskodawczynię', M: 'Wnioskodawcę' }[step_0.a_0] || '.......')+', bez powoływania biegłego.',
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun('Opisane wyżej okoliczności dowodzą jednoznacznie, że wniosek jest zasadny. '),
                            new TextRun({
                                text: 'Jednocześnie, jako że wszystkie istotne w sprawie okoliczności wynikają z dokumentów, zasadne jest rozpoznanie sprawy na posiedzeniu niejawnym.',
                                bold: true,
                            }),
                            new TextRun(' W postępowaniu nieprocesowym rozpoznanie sprawy na posiedzeniu niejawnym jest sposobem domyślnym (art. 514 k.p.c.), a do wyjątków należy rozpoznawanie ich na rozprawie.'),
                        ],
                    }),
                    new Paragraph({
                        text: 'W szczególności w niniejszym postępowaniu nie ma konieczności sięgania po dowód z opinii biegłego przed wydaniem orzeczenia. Jak wskazano w przewodniku przygotowanym przez RPO, który w tym zakresie zachowuje swoją aktualność:',
                        spacing: { after: mm(1.5) },
                    }),
                    new Paragraph({
                        indent: { left: mm(24) },
                        spacing: { after: mm(1.5) },
                        children: [
                            new TextRun({
                                text: 'Kluczową kwestią do oceny czy sąd musi sięgać po biegłego jest wskazanie, że zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego rozpoczęcie tranzycji medycznej uwarunkowane jest uzyskaniem formalnej diagnozy lekarzy o określonych specjalnościach i psychologa. Nie ma żadnych powodów, dla których rozpoczęcie tranzycji prawnej miałoby być obwarowane innymi lub dodatkowymi warunkami. Posiadanie diagnozy jest zaś faktem, który powód lub powódka',
                                italics: true,
                            }),
                            new TextRun(' [obecnie – wnioskodawca lub wnioskodawczyni] '),
                            new TextRun({
                                text: 'może wykazać przedstawiając swoją dokumentację medyczną i która może być oceniona przez sąd jako dokument prywatny w rozumieniu art. 245 k.p.c. Będzie to niewątpliwie dowód tego, że odpowiedni specjaliści złożyli oświadczenia dotyczące diagnozy czy stanu zdrowia powoda lub powódki. Przystępując więc do rozstrzygnięcia sprawy o ustalenie płci, w której powód dołączył do pozwu dokumentację medyczną zgodną z zaleceniami Polskiego Towarzystwa Seksuologicznego, sąd – o ile nie występują wyjątkowe okoliczności – powinien uznać, że przedstawiono mu materiał dowodowy wystarczający do stwierdzenia podstawowej przesłanki ustalenia płci, tj. uzyskania przez powoda lub powódkę formalnej diagnozy transpłciowości. Co do zasady nie musi być do tego konieczne uzyskanie opinii biegłych sądowych.',
                                italics: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        indent: { left: mm(24) },
                        spacing: { after: mm(6) },
                        children: [
                            new TextRun({
                                text: 'Dla przykładu wskazać należy, że osoba dochodząca np. roszczenia alimentacyjnego, chcąca wykazać swoje zwiększone potrzeby ze względu na chorobę przewlekłą, nie musi zgłaszać w postępowaniu wniosku o opinię biegłego. Sądy, by stwierdzić fakt, że osoba ta w istocie cierpi na daną chorobę, poprzestają w takich przypadkach na przedstawionym zaświadczeniu od odpowiedniego lekarza specjalisty',
                                italics: true,
                            }),
                            new TextRun(' [s. 67].'),
                        ],
                    }),
                    new Paragraph('Podkreślenia wymaga, że wydawanie wyroków w procesach o ustalenie płci na posiedzeniu niejawnym i bez powoływania biegłego stało się jedną z dominujących praktyk w ostatnich latach, przed wydaniem uchwały przez SN. Takie postępowanie jednoznacznie rekomendował też RPO w cytowanej publikacji. Obecnie zmianie ulega jedynie tryb postępowania, ale dotychczasowe przesłanki zmiany oznaczenia płci powinny zostać takie same. Nie ma więc żadnych przeszkód, by w sprawach o zmianę oznaczenia płci przez sprostowanie aktu urodzenia stosować te same standardy dowodowe, które utrwaliły się w sprawach o ustalenie płci. Jak podkreślono w przewodniku RPO, postępowaniach prowadzonych w latach 2020–2022 sądy okręgowe uwzględniły powództwa na posiedzeniach niejawnych aż w 132 sprawach (s. 93). Doświadczenie spraw prowadzonych w ostatnich latach wskazuje, że wyroki na posiedzeniu niejawnym i bez dowodu z opinii biegłego zapadały bardzo często. Rzadziej wyrok poprzedzała rozprawa, choć i wtedy sądy nie sięgały po opinię. Coraz rzadsze były sytuacje dopuszczania dowodu z opinii biegłego.'),
                    new Paragraph({
                        children: [
                            new TextRun('W orzecznictwie Sądu Najwyższego podkreślano, że prawo do identyfikowania się z daną płcią to prawo osobiste, z którego charakteru wynika, że interes prawny w uzgodnieniu płci ma wyłącznie podmiot tego prawa. Również w niedawnej uchwale SN podkreślił, że wynik sprawy o zmianę oznaczenia płci dotyczy wyłącznie tej jednostki. Przyjmowane w judykaturze rozwiązania są przy tym próbą znalezienia drogi realizacji ochrony prawnej w zakresie ustalenia zmiany oznaczenia płci '),
                            new TextRun({
                                text: 'w warunkach luki prawnej',
                                bold: true,
                            }),
                            new TextRun('. W ostatnich 36 latach orzecznictwo uznawało, że właściwą ścieżką powinno być wykorzystanie w tym celu założeń powództwa o ustalenie (art. 189 k.p.c.). Obecnie uchwałą z marca 2025 r. SN powrócił do koncepcji stosowania przez analogię przepisów o sprostowaniu aktu urodzenia. Należy jednak zauważyć, że opisany wcześniej standard międzynarodowy podkreśla konieczność zapewnienia procedury, która będzie szybka, przejrzysta i łatwo dostępna, a Ekspert ONZ podnosi wręcz, że procedura powinna być oparta o samookreślenie jednostki. Biorąc pod uwagę ten standard i to, że obecne rozwiązanie jest jedynie wypełnieniem luki prawnej, rygory wynikające z postępowania sądowego i tym samym dowodowego, powinny być możliwie łagodzone.'),
                        ],
                    }),
                    new Paragraph({
                        numbering: { reference: 'section-marker', level: 0 },
                        spacing: { after: mm(3) },
                        children: [
                            new TextRun({
                                text: 'Wniosek o rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych.',
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph('Zgodnie z aktualnym brzmieniem § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych, sprawy o ustalenie płci metrykalnej (art. 189 k.p.c.) są sprawami pilnymi. Przepis ten został wprowadzony Rozporządzeniem Ministra Sprawiedliwości z dnia 26 września 2024 r. zmieniającym rozporządzenie – Regulamin urzędowania sądów powszechnych i wszedł w życie z dniem 16 października 2024 roku. Prawodawca trafnie zatem dostrzegł, że sprawy o uzgodnienie płci metrykalnej, z uwagi na swoją specyfikę, zazwyczaj mają pilny charakter. Nie inaczej jest na gruncie niniejszej spawy. Postępowanie dotyczy bowiem moich najbardziej żywotnych interesów oraz codziennego funkcjonowania. Zaznaczyć należy, że funkcjonuję w ramach odczuwanej tożsamości płciowej, co pozostaje w rozdźwięku z płcią metrykalną uwidocznioną w dokumentach.'),
                    new Paragraph('Choć literalnie przepis dotyczy postępowań o ustalenie płci, to wykładnia celowościowa i funkcjonalna w sposób oczywisty nakazują go stosować do postępowań o sprostowanie aktu urodzenia osób transpłciowych. Intencja prawodawcy i cel przepisu są tu bowiem całkowicie jednoznaczne. Przy nowelizacji tego przepisu nie można było zakładać, że zmieni się tryb postępowania. Należy ponadto podkreślić, że uznanie niniejszej sprawy za sprawę pilną pozostaje w zgodzie ze standardami międzynarodowymi nakazującymi szybkie rozpoznanie spraw o zmianę oznaczenia płci.'),
                    ...(step_0.a_1 || step_0.a_2 ? [
                        new Paragraph({
                            numbering: { reference: 'section-marker', level: 0 },
                            spacing: { after: mm(3) },
                            children: [
                                new TextRun({
                                    text: 'Możliwość wydania rozstrzygnięcia w przedmiocie '+ nameText +' '+({ K: 'Wnioskodawczyni', M: 'Wnioskodawcy' }[step_0.a_0] || '.......')+'.',
                                    bold: true,
                                }),
                            ],
                        }),
                        ...[
                            'Z kolei w kwestii żądania zmiany '+(nameText.startsWith('imion') ? 'moich ' : 'mojego ')+nameText+' na aktualnie używane, należy wskazać w pierwszej kolejności, że nie jest to żądanie wysuwane ani opierane na przesłankach wynikających z ustawy z dnia 17 października 2008 roku o zmianie imienia i nazwiska, a przesłanki te nie stoją na przeszkodzie rozstrzygnięciu w tym przedmiocie. Potrzeba i konieczność dostosowania imion lub nazwiska do oznaczenia płci koreluje bowiem z żądaniem ustalenia odmiennej płci, niż przypisana przy urodzeniu, i tylko z niego wynika. Uwzględnienie wniosku tylko co do zmiany oznaczenia płci metrykalnej spowodowałoby, że będę z konieczności '+({ K: 'funkcjonowała', M: 'funkcjonował' }[step_0.a_0] || 'funkcjonować')+' przynajmniej przez pewien czas jako osoba o danych męskich, a jedynie żeńskim oznaczeniu płci i żeńskim numerze PESEL, co jest sytuacją bez precedensu i wysoce komplikowałoby codzienne funkcjonowanie.',
                            'W praktyce faktycznie brak zmiany imienia i nazwiska równolegle do zmiany oznaczenia płci i numeru PESEL powoduje, że osoby transpłciowe doświadczają wielu praktycznych trudności w okresie do czasu zmiany wszystkich danych i wydania nowego dowodu osobistego. Osoba nie posiada aktualnego dokumentu tożsamości, przestają działać systemy oparte o usługi cyfrowe obywatel.gov.pl (w tym ePUAP). Występują trudności w wystawieniu recept i ich realizowaniu. Przemawia to za koniecznością uzgodnienia od razu wszystkich danych.',
                            'Imiona i nazwiska są, oprócz oznaczenia płci, istotnymi danymi odróżniającymi osobę, a podstawa ich zmiany jest taka sama, jak w przypadku zmiany oznaczenia płci – czyli niezgodność płciowa. Orzeczenie sądowe żądane w niniejszym wniosku, będące krokiem na drodze do formalnej tranzycji osoby transpłciowej, winno – w braku pozytywnych uregulowań – dążyć do uzgodnienia wszystkich danych osobowych osoby transpłciowej zgodnie z obraną płcią.',
                            'Nie jest argumentem przemawiającym za niedopuszczalnością drogi sądowej w tym zakresie okoliczność, że istnieje uregulowana procedura administracyjna dotycząca zmiany imion i nazwisk, przewidziana w ustawie o zmianie imienia i nazwiska. Orzekający w tych sprawach organ administracji w osobie kierownika urzędu stanu cywilnego należy uznać za właściwy do korygowania danych osób transpłciowych wyłącznie wówczas, gdy wniosek kieruje się w trybie administracyjnym i w oparciu o owe „ważne powody”, wymienione w art. 4 odnośnej ustawy – niezwiązane ze zmianą oznaczenia płci. Nieenumeratywny katalog owych powodów odwołuje się jednak do sytuacji odmiennych rodzajowo, niż transpłciowość i zapadnięcie orzeczenia sądowego stwierdzającego, że wnioskodawca jest kobietą/mężczyzną zamiast płci przypisanej przy urodzeniu.',
                            'Brak zatem podstawy do uznania, że w zakresie żądania zmiany imienia wniosek podlega odrzuceniu na zasadzie art. 199 § 1 pkt 1 k.p.c. w zw. z art. 13 § 2 k.p.c., a wobec obrania przeze mnie konkretnego imienia '+({ K: 'żeńskiego', M: 'męskiego' }[step_0.a_0] || '.......')+' –  jakie chcę nosić po sprostowaniu aktu urodzenia poprzez ujawnienie tam płci '+({ K: 'żeńskiej', M: 'męskiej' }[step_0.a_0] || '.......')+' – i jakich w praktyce używam, istnieje możliwość orzeczenia także i w tym przedmiocie.',
                        ].map(text => new Paragraph(text)),
                    ] : []),
                    ...(step_0.a_1 || step_0.a_2 ? [
                        new Paragraph({
                            numbering: { reference: 'section-marker', level: 0 },
                            spacing: { after: mm(3) },
                            children: [
                                new TextRun({
                                    text: 'Wniosek o zwolnienie od kosztów.',
                                    bold: true,
                                }),
                            ],
                        }),
                        new Paragraph('Moja sytuacja materialna uniemożliwia mi poniesienie kosztów sądowych bez uszczerbku dla utrzymania koniecznego siebie i rodziny. Szczegółowe informacje dotyczące mojej sytuacji znajdują się w załączonym oświadczeniu o stanie rodzinnym, majątku, dochodach i źródłach utrzymania.'),
                    ] : []),
                    new Paragraph({
                        text: 'Z tych względów wnoszę jak na wstępie.',
                        spacing: { before: mm(8), after: mm(15) },
                        keepNext: true,
                    }),
                    new Paragraph({
                        indent: { left: mm(120) },
                        spacing: { after: mm(10) },
                        children: [
                            new TextRun({
                                text: 'Podpis',
                                italics: true,
                            })
                        ],
                    }),
                    new Paragraph('Załączniki:'),
                    ...[
                        step_0.a_3 ? ['oświadczenie o stanie rodzinnym, majątku, dochodach i źródłach utrzymania'] : ['dowód uiszczenia opłaty sądowej od wniosku'],
                        ['odpis aktu urodzenia'],
                        ...(step_1.a_2_0 ? [['opinia psychologiczna']] : []),
                        ...(step_1.a_2_1 ? [['opinia psychologiczna']] : []),
                        ...(step_1.a_3_0 ? [['zaświadczenie lekarza psychiatry']] : []),
                        ...(step_1.a_3_1 ? [['zaświadczenie lekarza seksuologa']] : []),
                        ...(step_1.a_5 ? [['dokument zatytułowany ', 'Zalecenia Polskiego Towarzystwa Seksuologicznego dotyczące opieki nad zdrowiem dorosłych osób transpłciowych – stanowisko panelu ekspertów']] : []),
                        ...(step_1.a_6 ? [['dokument zatytułowany ', 'Postępowania w sprawach o uzgodnienie płci. Przewodnik',', wydany przez Rzecznika Praw Obywatelskich']] : []),
                    ].map((runs, i, all) => new Paragraph({
                        spacing: { after: 0 },
                        numbering: { reference: 'basic-numbering', level: 0, instance: 1 },
                        children: [
                            ...runs.map((run, j) => new TextRun({
                                text: run,
                                italics: j % 2 === 1,
                            })),
                            new TextRun(i === all.length - 1 ? '.' : ',')
                        ]
                    })),
                ],
            },
        ],
    })

    return (filename) => {
        // TODO loader or move asynchronoucity somewhere else
        Packer.toBlob(doc).then((blob) => {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename + '.docx'
            link.click()
            URL.revokeObjectURL(blob)
        })
    }
}
