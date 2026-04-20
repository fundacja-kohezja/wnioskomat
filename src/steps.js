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
                                showIf: answers => answers[1].a_2_0,
                                filled: (a, answers) =>  a || answers[1].a_2_0_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[1].a_2_0,
                                filled: (a, answers) =>  answers[1].a_2_0_0 || a,
                            },
                        ],
                        filled: (a, answers) =>  a || answers[1].a_2_1,
                    },
                    { // seksuolog
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[1].a_2_1,
                                filled: (a, answers) =>  a || answers[1].a_2_1_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[1].a_2_1,
                                filled: (a, answers) =>  answers[1].a_2_1_0|| a,
                            },
                        ],
                        filled: (a, answers) =>  answers[1].a_2_0 || a,
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
                                showIf: answers => answers[1].a_3_0,
                                filled: (a, answers) => a || answers[1].a_3_0_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: answers => answers[1].a_3_0,
                                filled: (a, answers) => answers[1].a_3_0_0 || a,
                            },
                        ],
                        filled: (a, answers) => a || answers[1].a_3_1,
                    },
                    { // seksuolog
                        type: 'checkbox',
                        subquestions: [
                            { // F64.0
                                type: 'checkbox',
                                showIf: answers => answers[1].a_3_1,
                                filled: (a, answers) => a || answers[1].a_3_1_1,
                            },
                            { // HA60
                                type: 'checkbox',
                                showIf: a => a[1].a_3_1,
                                filled: (a, answers) => answers[1].a_3_1_0 || a,
                            },
                        ],
                        filled: (a, answers) => answers[1].a_3_0 || a,
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
                        showIf: answers => answers[1].a_8,
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
                ]
            },
            { type: 'textarea', hasDescription: true }, // adres
            { // pełnomocnik do doręczeń?
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    { // imie i nazwisko pełnomocnika
                        type: 'text',
                        showIf: answers => answers[2].a_2,
                    },
                    { // adres pełnomocnika
                        type: 'textarea',
                        showIf: answers => answers[2].a_2,
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
                        showIf: answers => answers[2].a_4,
                        valid: [a => a.includes('@')],
                    },
                    { // tel
                        type: 'text',
                        showIf: answers => answers[2].a_4,
                    },
                ],
            },
            { type: 'text', hasHeading: true }, // imię z aktu
            { type: 'text' }, // nazwisko z aktu
            { // data urodzenia
                type: 'date',
                valid: [
                    a => new Date(a) < new Date,
                    a => new Date - new Date(a) > 1000*60*60*24*365*18, // almost 18 years, no need to be precise here
                ]
            },
            { type: 'text', hasDescription: true, placeholder: 'XXXXXXX/XX/AU/XXXX/XXXXXX' }, // nr aktu
            { type: 'text', prefix: 'Urząd Stanu Cywilnego w…' }, // urząd wystawiający
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
                        showIf: answers => answers[3].a_3,
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
