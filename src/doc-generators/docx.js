import {
    Document,
    Paragraph,
    TextRun,
    FootnoteReferenceRun,
    AlignmentType,
    LevelFormat,
    Packer,
    convertMillimetersToTwip as mm,
    Table,
    TableRow,
    TableCell,
    WidthType,
    PageBreak,
} from 'docx'

export function initDocx({ margin = 25, defaultAlign = AlignmentType.JUSTIFIED } = {}) {

    const fonts = {
        serif: 'Times New Roman',
        sansSerif: 'Verdana',
    }

    let doc
    let content = []
    const docFootnotes = {}
    let leading = 1.15 * 240
    let fontSize
    let bold = false
    let italics = false
    let keepTogether = false
    let fontFamily = fonts.serif
    const numberingInstances = {
         'basic-numbering': 0,
         'alt-numbering': 0,
         'section-marker': 0,
    }

    const setLineHeight = (lh) => {
        leading = lh * 240
    }

    const setFontSize = (size) => {
        fontSize = size + 'pt'
    }

    const setFontFamily = (family) => {
        fontFamily = fonts[family]
    }

    const setFontStyle = style => {
        switch(style) {
            case 'bold-italic':
                bold = true
                italics = true
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

    const font = ({ size, lh, style, family }, content) => {
        const currentBold = bold
        const currentItalics = italics
        const currentSize = fontSize
        const currentLineHeight = leading
        const currentFamily = fontFamily
        if (size) setFontSize(size)
        if (lh) setLineHeight(lh)
        if (style) setFontStyle(style)
        if (family) setFontFamily(family)
        content()
        bold = currentBold
        italics = currentItalics
        fontSize = currentSize
        leading = currentLineHeight
        fontFamily = currentFamily
    }

    const p = (text, {
        shift,
        spaceAfter = 3,
        spaceBefore,
        align = defaultAlign,
        italicSep,
        boldSep,
        footnotes,
        footnotesFormat = {},
        mayBreak,
        numbering,
    } = {}) => {
        content.push(new Paragraph({
            indent: shift ? { left: mm(shift) } : {},
            spacing: spaceBefore ? { before: mm(spaceBefore), after: mm(spaceAfter), line: leading } : { after: mm(spaceAfter), line: leading },
            alignment: align,
            numbering,
            keepLines: keepTogether,
            keepNext: keepTogether,
            run: {
                size: fontSize,
                font: fontFamily,
            },
            children: mayBreak ? text.split('\n').map(
                (line, i) => new TextRun({
                    text: line,
                    break: i === 0 ? 0 : 1,
                    bold,
                    italics,
                    size: fontSize,
                    font: fontFamily,
                })
            ) : boldSep && italicSep ? text.split(italicSep).flatMap(
                (text, i) => footnotes ? text.split(boldSep).flatMap(
                    (text, j) => text.split(/[{}]/).map(
                        (text, k) => k % 2 === 1 ? new FootnoteReferenceRun(text, { size: fontSize, font: fontFamily }) : new TextRun({
                            text,
                            italics: i % 2 === 1,
                            bold: j % 2 === 1,
                            size: fontSize,
                            font: fontFamily,
                        })
                    )
                ) : text.split(boldSep).map(
                    (text, j) => new TextRun({
                        text,
                        italics: i % 2 === 1,
                        bold: j % 2 === 1,
                        size: fontSize,
                        font: fontFamily,
                    })
                )
            ) : italicSep ? text.split(italicSep).flatMap(
                (text, i) => footnotes ? text.split(/[{}]/).map(
                    (text, j) => j % 2 === 1 ? new FootnoteReferenceRun(text, { size: fontSize, font: fontFamily }) : new TextRun({
                        text,
                        italics: i % 2 === 1,
                        size: fontSize,
                        font: fontFamily,
                    })
                ) : [
                    new TextRun({
                        text,
                        italics: i % 2 === 1,
                        size: fontSize,
                        font: fontFamily,
                    }),
                ]
            ) : boldSep ? text.split(boldSep).flatMap(
                (text, i) => footnotes ? text.split(/[{}]/).map(
                    (text, j) => j % 2 === 1 ? new FootnoteReferenceRun(text, { size: fontSize, font: fontFamily }) : new TextRun({
                        text,
                        bold: i % 2 === 1,
                        size: fontSize,
                        font: fontFamily,
                    })
                ) : [
                    new TextRun({
                        text,
                        bold: i % 2 === 1,
                        size: fontSize,
                        font: fontFamily,
                    }),
                ]
            ) : footnotes ? text.split(/[{}]/).map(
                (text, i) => i % 2 === 1 ? new FootnoteReferenceRun(text, { size: fontSize, font: fontFamily }) : new TextRun(text, { size: fontSize, font: fontFamily })
            ) : [
                new TextRun({ text, bold, italics, size: fontSize, font: fontFamily })
            ]
        }))
        if (footnotes) {
            for (const footnote in footnotes) {
                const format = footnotesFormat[footnote]
                docFootnotes[footnote.slice(1, -1)] = { children: [
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

    let rows = []
    const table = (inside) => {
        inside()
        content.push(new Table({ rows }))
        rows = []
    }

    let cells = []
    const row = (inside, height) => {
        inside()
        rows.push(new TableRow({
            children: cells,
            height: {
                value: mm(height)
            },
        }))
        cells = []
    }

    const cell = (inside, { width, pt = 0, px = 2, factor, isFilled, columnSpan = 1 } = {}) => {
        const outerContent = content
        content = []
        inside()
        cells.push(new TableCell({
            children: content,
            margins: {
                top: mm(Math.max(pt + 1, 0)),
                bottom: 0,
                left: mm(px),
                right: mm(px),
            },
            width: width || factor ? {
                size: factor ? factor * 100 : mm(width),
                type: factor ? WidthType.PERCENTAGE : WidthType.DXA,
            } : undefined,
            shading: isFilled ? {
                fill: "d9d9d9",
            } : {},
            columnSpan,
        }))
        content = outerContent
    }

    const resetNumbering = (numbering) => {
        numberingInstances[numbering]++
    }

    const newPage = () => {
        content.push(new Paragraph({
            children: [new PageBreak()],
            run: { size: 1 }
        }))
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
                        reference: 'alt-numbering',
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: '%1)',
                                alignment: AlignmentType.END,
                                style: {
                                    paragraph: {
                                        indent: { left: mm(8), hanging: mm(3) },
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
                    properties: margin ? {
                        page: {
                            margin: {
                                top: mm(margin),
                                right: mm(margin),
                                bottom: mm(margin),
                                left: mm(margin),
                            },
                        },
                    } : {},
                    children: content,
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

    return { p, li, table, row, cell, font, setLineHeight, resetNumbering, newPage, noPageBreak, complete, save }
}
