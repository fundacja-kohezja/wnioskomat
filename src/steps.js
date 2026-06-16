import { courts } from "./helpers/datasets"

export default [
    { // o co wnioskujemy
        listInSummary: true,
        questions: [
            { // na które oznaczenie zmiana
                type: 'radio_featured',
                options: ['K', 'M'],
            },
            { // zmiana imienia?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // jakie imię
                        type: 'text',
                        showIf: answers => answers[0].a_1,
                    },
                ],
            },
            { // zmiana nazwiska?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // jakie nazwisko
                        type: 'text',
                        showIf: answers => answers[0].a_2,
                    },
                ],
            },
            { type: 'checkbox', hasDescription: true }, // zwolnienie z kosztów?
        ],
    },
    { // stan majątkowy
        hasDescription: true,
        showIf: answers => answers[0].a_3,
        questions: [
            { // działalność gospodarcza?
                type: 'checkbox',
                subquestions: [
                    { // NIP
                        type: 'text',
                        showIf: answers => answers[1].a_0,
                    },
                ],
            },
            { // nieruchomość w której mieszka?
                type: 'checkbox',
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_1,
                    },
                ],
            },
            { // nieruchomość rolna?
                type: 'checkbox',
                subquestions: [
                    { // opis
                        type: 'textarea',
                        hasDescription: true,
                        showIf: answers => answers[1].a_2,
                    },
                ],
            },
            { // inne nieruchomości?
                type: 'checkbox',
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_3,
                    },
                ],
            },
            { // oszczędności?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_4,
                    },
                ],
            },
            { // papiery wartościowe?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_5,
                    },
                ],
            },
            { // wierzytelności
                type: 'checkbox',
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_6,
                    },
                ],
            },
            { // przedmioty wartościowe
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // opis
                        type: 'textarea',
                        showIf: answers => answers[1].a_7,
                    },
                ],
            },
            { // dochody i źródła utrzymania
                type: 'repeater',
                hasHeading: true,
                fields: [
                    { // rodzaj dochodu
                        type: 'text',
                        datalist: ['umowa o pracę', 'umowa zlecenie', 'działalność gospodarcza', 'renta', 'alimenty', 'dochody z najmu'],
                    },
                    { // kwota
                        type: 'text',
                        suffix: 'zł',
                    },
                    { // okres
                        type: 'radio',
                        hasLabel: false,
                        options: ['M', 'R'],
                    }
                ]
            },
            { // czy są inni członkowie gospodarstwa domowego
                type: 'checkbox',
                hasDescription: true,
            },
            { // członkowie gospodarstwa domowego
                type: 'repeater',
                hasNestedRepeater: true,
                showIf: answers => answers[1].a_9,
                fields: [
                    {
                        type: 'text',
                    },
                    {
                        type: 'date',
                    },
                    {
                        type: 'text',
                        placeholder: 'np. matka, brat, partner',
                    },
                    { // dochody
                        type: 'repeater',
                        fields: [
                            { // rodzaj dochodu
                                type: 'text',
                                datalist: ['umowa o pracę', 'umowa zlecenie', 'działalność gospodarcza', 'renta', 'alimenty', 'dochody z najmu'],
                            },
                            { // kwota
                                type: 'text',
                                suffix: 'zł',
                            },
                            { // okres
                                type: 'radio',
                                hasLabel: false,
                                options: ['M', 'R'],
                            }
                        ]
                    },
                ]
            },
        ],
    },
    { // zobowiązania i stałe wydatki
        showIf: answers => answers[0].a_3,
        hasDescription: true,
        questions: [
            { // czynsz najmu
                type: 'checkbox',
                hasHeading: true,
                hasSubheading: true,
                filled: (a, answers) => a || Array.from({ length: 17 }).map((_, i) => i).some(i => answers[2]['a_'+i]),
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_0,
                    }
                ],
            },
            { // opłaty eksploatacyjne
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_1,
                    }
                ],
            },
            { // gaz
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_2,
                    }
                ],
            },
            { // prąd
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_3,
                    }
                ],
            },
            { // ogrzewanie
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_4,
                    }
                ],
            },
            { // Internet
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_5,
                    }
                ],
            },
            { // opłata od nieruchomości
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_6,
                    }
                ],
            },
            { // ubezpieczenie nieruchomości
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_7,
                    }
                ],
            },
            { // wywóz śmieci
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_8,
                    }
                ],
            },
            { // wyżywienie
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_9,
                    }
                ],
            },
            { // środki czystości
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_10,
                    }
                ],
            },
            { // odzież i obuwie
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_11,
                    }
                ],
            },
            { // kosmetyki i środki higieny osobistej
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_12,
                    }
                ],
            },
            { // bilet miesięczny
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_13,
                    }
                ],
            },
            { // paliwo
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_14,
                    }
                ],
            },
            { // wydatki na zwierzęta
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        suffix: 'zł miesięcznie',
                        showIf: answers => answers[2].a_15,
                    }
                ],
            },
            { // inne TODO repeater
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'textarea',
                        hasLabel: false,
                        hasDescription: true,
                        showIf: answers => answers[2].a_16,
                    }
                ],
            },
            { // koszty utrzymania samochodu
                hasHeading: true,
                hasSubheading: true,
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        showIf: answers => answers[2].a_17,
                    }
                ],
            },
            { // dentysta
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        showIf: answers => answers[2].a_18,
                    }
                ],
            },
            { // wizyty lekarskie
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        showIf: answers => answers[2].a_19,
                    }
                ],
            },
            { // stale przyjmowane leki
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        hasLabel: false,
                        showIf: answers => answers[2].a_20,
                    }
                ],
            },
            { // inne TODO repeater
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'textarea',
                        hasLabel: false,
                        hasDescription: true,
                        showIf: answers => answers[2].a_21,
                    }
                ],
            },
            { // wydatki domowników
                type: 'checkbox',
                hasHeading: true,
                hasDescription: true,
                subquestions: [
                    {
                        type: 'textarea',
                        showIf: answers => answers[2].a_22,
                    }
                ],
            },
            { // istotne informacje
                type: 'checkbox',
                hasHeading: true,
                hasDescription: true,
                subquestions: [
                    {
                        type: 'textarea',
                        hasLabel: false,
                        hasDescription: true,
                        showIf: answers => answers[2].a_23,
                    }
                ],
            },
        ]
    },
    { // dokumenty
        hasDescription: true,
        listInSummary: true,
        questions: [
            { // odpis aktu
                type: 'checkbox',
                hasDescription: true,
                initialValue: true,
                isDisabled: true,
            },
            { // dowód opłaty sądowej
                type: 'checkbox',
                hasDescription: true,
                hasLinkInDescription: true,
                initialValue: true,
                isDisabled: true,
                showIf: answers => !answers[0].a_3,
            },
            { // opinia psychologiczna
                type: 'checkbox',
                hasDescription: true,
                initialValue: true,
                isDisabled: true,
                subquestions: [
                    { // psycholog
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[3].a_2_0,
                                filled: (a, answers) =>  a || answers[3].a_2_0_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[3].a_2_0,
                                filled: (a, answers) =>  answers[3].a_2_0_0 || a,
                            },
                        ],
                        filled: (a, answers) =>  a || answers[3].a_2_1,
                    },
                    { // seksuolog
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[3].a_2_1,
                                filled: (a, answers) =>  a || answers[3].a_2_1_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[3].a_2_1,
                                filled: (a, answers) =>  answers[3].a_2_1_0|| a,
                            },
                        ],
                        filled: (a, answers) =>  answers[3].a_2_0 || a,
                    },
                ],
            },
            { // zaświadczenie od lekarza
                type: 'checkbox',
                hasDescription: true,
                initialValue: true,
                isDisabled: true,
                subquestions: [
                    { // psychiatra
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[3].a_3_0,
                                filled: (a, answers) => a || answers[3].a_3_0_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[3].a_3_0,
                                filled: (a, answers) => answers[3].a_3_0_0 || a,
                            },
                        ],
                        filled: (a, answers) => a || answers[3].a_3_1,
                    },
                    { // seksuolog
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[3].a_3_1,
                                filled: (a, answers) => a || answers[3].a_3_1_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf:  answers => answers[3].a_3_1,
                                filled: (a, answers) => answers[3].a_3_1_0 || a,
                            },
                        ],
                        filled: (a, answers) => answers[3].a_3_0 || a,
                    },
                ],
            },
            { type: 'checkbox' }, // zaświadczenie o hormonoterapii
            { type: 'checkbox', hasDescription: true, hasLinkInDescription: true }, // zalecenia pts
            { type: 'checkbox', hasDescription: true }, // obszerna publikacja
            { type: 'checkbox', hasDescription: true, showIf: answers => !answers[0].a_1 }, // decyzja o zmianie imienia
            { // dokumenty świadczące o funkcjonowaniu w danej płci
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    {
                        hasLabel: false,
                        type: 'radio',
                        options: ['A', 'B', 'C'],
                        showIf: answers => answers[3].a_8,
                    },
                ],
            },
        ],
    },
    { // personal data
        questions: [
            { // pesel
                type: 'text',
                valid: [
                    a => a.length === 11, // has 11 chars
                    a => a.split('').every(digit => !isNaN(Number(digit))), // all chars are digits
                    a => 10 - ([a[0]*1, a[1]*3, a[2]*7, a[3]*9, a[4]*1, a[5]*3, a[6]*7, a[7]*9, a[8]*1, a[9]*3].map(x => x % 10).reduce((x, y) => x + y) % 10) == a[10], // checksum is correct
                ],
            },
            { type: 'textarea', hasDescription: true }, // adres
            { // pełnomocnik do doręczeń?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // imie i nazwisko pełnomocnika
                        type: 'text',
                        showIf: answers => answers[4].a_2,
                    },
                    { // imie i nazwisko w celowniku
                        type: 'text',
                        hasDescription: true,
                        placeholder: 'Janowi Kowalskiemu',
                        showIf: answers => answers[4].a_2,
                    },
                    { // PESEL pełnomocnika
                        type: 'text',
                        showIf: answers => answers[4].a_2,
                        valid: [
                            a => a.length === 11, // has 11 chars
                            a => a.split('').every(digit => !isNaN(Number(digit))), // all chars are digits
                            a => 10 - ([a[0]*1, a[1]*3, a[2]*7, a[3]*9, a[4]*1, a[5]*3, a[6]*7, a[7]*9, a[8]*1, a[9]*3].map(x => x % 10).reduce((x, y) => x + y) % 10) == a[10], // checksum is correct
                        ],
                    },
                    { // adres pełnomocnika
                        type: 'textarea',
                        showIf: answers => answers[4].a_2,
                    },
                ],
            },
            { // wybór sądu
                type: 'text',
                hasHeading: true,
                hasSubheading: true,
                datalist: Object.keys(courts)
            },
            { // podać dane kontaktowe?
                type: 'checkbox',
                hasDescription: true,
                hasHeading: true,
                subquestions: [
                    { // email
                        type: 'text',
                        showIf: answers => answers[4].a_4,
                        valid: [a => a.includes('@')],
                    },
                    { // tel
                        type: 'text',
                        showIf: answers => answers[4].a_4,
                    },
                ],
            },
            { type: 'text', hasHeading: true }, // imię z aktu
            { type: 'text' }, // nazwisko z aktu
            { // data urodzenia
                type: 'date',
                valid: [a => new Date(a) < new Date],
            },
            { // jestem osobą niepełnotnią
                type: 'checkbox',
                hasDescription: true,
                showIf: answers => answers[4].a_8 || (answers[4].a_7 && new Date - new Date(answers[4].a_7) < 1000*60*60*24*366*18), // about 18 years, no need to be precise here
            },
            { type: 'text', hasDescription: true, placeholder: 'XXXXXXX/XX/AU/XXXX/XXXXXX' }, // nr aktu
            { type: 'text', prefix: 'Urząd Stanu Cywilnego w…' }, // urząd wystawiający
        ],
    },
    {
        hasDescription: true,
        showIf: answers => answers[4].a_8,
        questions: [
            { // imie i nazwisko rodzica
                type: 'text',
                hasHeading: true,
            },
            { // PESEL rodzica
                type: 'text',
                valid: [
                    a => a.length === 11, // has 11 chars
                    a => a.split('').every(digit => !isNaN(Number(digit))), // all chars are digits
                    a => 10 - ([a[0]*1, a[1]*3, a[2]*7, a[3]*9, a[4]*1, a[5]*3, a[6]*7, a[7]*9, a[8]*1, a[9]*3].map(x => x % 10).reduce((x, y) => x + y) % 10) == a[10], // checksum is correct
                ],
            },
            { // adres rodzica
                type: 'textarea',
            },
            { // podać dane kontaktowe?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // email
                        type: 'text',
                        showIf: answers => answers[5].a_3,
                        valid: [a => a.includes('@')],
                    },
                    { // tel
                        type: 'text',
                        showIf: answers => answers[5].a_3,
                    },
                ],
            },
            { // imie i nazwisko rodzica
                type: 'text',
                hasHeading: true,
            },
            { // PESEL rodzica
                type: 'text',
                valid: [
                    a => a.length === 11, // has 11 chars
                    a => a.split('').every(digit => !isNaN(Number(digit))), // all chars are digits
                    a => 10 - ([a[0]*1, a[1]*3, a[2]*7, a[3]*9, a[4]*1, a[5]*3, a[6]*7, a[7]*9, a[8]*1, a[9]*3].map(x => x % 10).reduce((x, y) => x + y) % 10) == a[10], // checksum is correct
                ],
            },
            { // adres rodzica
                type: 'textarea',
            },
            { // podać dane kontaktowe?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // email
                        type: 'text',
                        showIf: answers => answers[5].a_7,
                        valid: [a => a.includes('@')],
                    },
                    { // tel
                        type: 'text',
                        showIf: answers => answers[5].a_7,
                    },
                ],
            },
        ],
    },
    { // experience description
        hasSummaryHeading: false,
        questions: [
            { type: 'textarea', hasDescription: true, alwaysPl: true }, // opis doświadczeń
            { // od kiedy w hormonoterapii
                type: 'month',
                filled: (([month, year] = []) => month && year),
            },
            { // poddano badaniom psychologicznym?
                type: 'checkbox',
                hasDescription: true,
            },
            { // podać sądowi używane na co dzień imię?
                type: 'checkbox',
                subquestions: [
                    { // używane imię
                        type: 'text',
                        showIf: answers => answers[6].a_3,
                    },
                ],
            },
            { // obszary funkcjonowania w zgodzie ze swoją tożsamością
                type: 'radio',
                options: ['some', 'all'],
            },
        ],
    },
]
