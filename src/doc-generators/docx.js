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

export function initDocx() {

    let doc
    const content = []
    const docFootnotes = {}
    let leading = 1.15 * 240
    let bold = false
    let italics = false
    let keepTogether = false
    const numberingInstances = {
         'basic-numbering': 0,
         'section-marker': 0,
    }

    const setLineHeight = (lh) => {
        leading = lh * 240
    }

    const setFontStyle = style => {
        switch(style) {
            case 'bold':
                bold = true
                italics = false
                break
            case 'italic':
                bold = false
                italics = true
                break
            default:
                bold = false
                italics = false
        }
    }

    const font = ({ style }, content) => {
        const currentBold = bold
        const currentItalics = italics
        if (style) setFontStyle(style)
        content()
        bold = currentBold
        italics = currentItalics
    }

    const p = (text, {
        shift,
        spaceAfter = 3,
        spaceBefore,
        align = AlignmentType.JUSTIFIED,
        italicSep,
        boldSep,
        footnotes,
        footnotesFormat = {},
        mayBreak,
        numbering,
    } = {}) => {
        content.push({
            indent: shift ? { left: mm(shift) } : {},
            spacing: spaceBefore ? { before: mm(spaceBefore), after: mm(spaceAfter), line: leading } : { after: mm(spaceAfter), line: leading },
            alignment: align,
            numbering,
            keepLines: keepTogether,
            keepNext: keepTogether,
            children: mayBreak ? text.split('\n').map(
                (line, i) => new TextRun({
                    text: line,
                    break: i === 0 ? 0 : 1,
                    bold,
                    italics,
                })
            ) : italicSep ? text.split(italicSep).flatMap(
                (text, i) => footnotes ? text.split(/[{}]/).map(
                    (text, j) => j % 2 === 1 ? new FootnoteReferenceRun(text) : new TextRun({
                        text,
                        italics: i % 2 === 1,
                    })
                ) : [
                    new TextRun({
                        text,
                        italics: i % 2 === 1,
                    }),
                ]
            ) : boldSep ? text.split(boldSep).flatMap(
                (text, i) => footnotes ? text.split(/[{}]/).map(
                    (text, j) => j % 2 === 1 ? new FootnoteReferenceRun(text) : new TextRun({
                        text,
                        bold: i % 2 === 1,
                    })
                ) : [
                    new TextRun({
                        text,
                        bold: i % 2 === 1,
                    }),
                ]
            ) : footnotes ? text.split(/[{}]/).map(
                (text, i) => i % 2 === 1 ? new FootnoteReferenceRun(text) : new TextRun(text)
            ) : [
                new TextRun({ text, bold, italics })
            ]
        })
        if (footnotes) {
            for (const footnote in footnotes) {
                const format = footnotesFormat[footnote]
                docFootnotes[footnote[1]] = { children: [
                    new Paragraph({
                        spacing: { line: 1 * 240 },
                        alignment: AlignmentType.LEFT,
                        children: format ? footnotes[footnote].split(format[1]).map(
                            (text, i) => new TextRun({
                                text,
                                size: '8pt',
                                [format[0] === 'bold' ? 'bold' : 'italics']: i % 2 === 1,
                            })
                        ) : [
                            new TextRun({
                                text: footnotes[footnote],
                                size: '8pt',
                            }),
                        ],
                    }),
                ] }
            }
        }
    }

    const li = (reference, text, options = {}) => {
        const { level = 1, spaceAfter = 0, ...rest } = options
        p(text, {
            ...rest,
            spaceAfter,
            numbering: { reference, level: level - 1, instance: numberingInstances[reference] },
        })
    }

    const resetNumbering = (numbering) => {
        numberingInstances[numbering]++
    }

    const noPageBreak = (text) => {
        keepTogether = true
        text()
        keepTogether = false
        content.at(-1).keepNext = false
    }

    const complete = () => {

        doc = new Document({
            styles: {
                default: {
                    document: {
                        run: {
                            size: '11pt',
                            language: {
                                value: 'pl-PL'
                            }
                        },
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
            footnotes: docFootnotes,
            sections: [
                {
                    children: content.map(props => new Paragraph(props)),
                },
            ],
        })
    }

    const save = (filename) => {
        // TODO loader or move asynchronoucity somewhere else
        Packer.toBlob(doc).then((blob) => {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename + '.docx'
            link.click()
            URL.revokeObjectURL(blob)
        })
    }

    return { p, li, font, setLineHeight, resetNumbering, noPageBreak, complete, save }
}
