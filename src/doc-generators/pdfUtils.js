import { jsPDF } from 'jspdf'

export function pdf() {
    const doc = new jsPDF

    let fontSize
    const setFontSize = (size) => {
        fontSize = size
        doc.setFontSize(size)
    }
    setFontSize(11)

    let lineHeightFactor
    const setLineHeight = (lh) => {
        doc.setLineHeightFactor(lh)
        lineHeightFactor = lh
    }
    setLineHeight(1.15)

    let fontStyle
    const setFontStyle = style => {
        fontStyle = style
        switch(style) {
            case 'bold':
                doc.setFont('TeXGyreTermes', 'normal', 'bold')
                break
            case 'italic':
                doc.setFont('TeXGyreTermes', 'italic', 'normal')
                break
            default:
                doc.setFont('TeXGyreTermes', 'normal', 'normal')
        }
    }
    setFontStyle('normal')

    const font = ({ size, lh, style }, content) => {
        const currentSize = fontSize
        const currentLineHeight = lineHeightFactor
        const currentFontStyle = fontStyle
        if (size) setFontSize(size)
        if (lh) setLineHeight(lh)
        if (style) setFontStyle(style)
        content()
        setFontSize(currentSize)
        setLineHeight(currentLineHeight)
        setFontStyle(currentFontStyle)
    }

    const margin = 25
    const w = 210
    const maxWidth = w - margin*2

    let h = 297 // available height may shrink if footnotes appear

    const unitFactor = fontSize / (72/25.4)

    let y = margin
    let pageFootnotes = []

    let dryRun = false

    const newPage = () => {
        if (dryRun) return

        if (pageFootnotes.length) {
            doc.line(margin, y, margin + 50, y, 'S')
            y += 6
            font({ size: 8, lh: 1.15, style: 'normal' }, () => {
                let isFormatted = false
                pageFootnotes.forEach(({ lines, height, number, format }) => {
                    doc.text(number, margin, y - 1)
                    if (format) {
                        let y2 = 0
                        lines.forEach(line => {
                            let x = 0
                            line.split(format[1]).forEach((part, i) => {
                                if (i > 0) {
                                    isFormatted = !isFormatted
                                    setFontStyle(isFormatted ? format[0] : 'normal')
                                }
                                doc.text(part, margin + x, y + y2)
                                x += doc.getStringUnitWidth(part) * (72/25.4)
                                x -= doc.getStringUnitWidth(' ') * (72/25.4)
                            })
                            y2 += fontSize * lineHeightFactor / (72/25.4)
                        })
                    } else {
                        doc.text(lines, margin, y)
                    }
                    y += height
                })
            })
        }
        pageFootnotes = []
        doc.addPage()
        y = margin
        h = 297
    }

    const space = (height) => {
        if (y !== margin) { // don't add space on top, if it's the first text on top of the page
            y += height
        }
    }

    const noPageBreak = (content) => {
        const currentY = y
        dryRun = true
        content()
        dryRun = false
        if (y > h - margin) {
            newPage()
        } else {
            y = currentY
        }
        content()
    }

    const textToLines = (text, formatSeparator, type, w = maxWidth, footnotes) => {
        const lines = [{ textWidth: 0, words: [] }]
        let line = 0
        let x = 0
        let isFormatted = false
        const startNewLine = (dontJustify = false) => {
            lines[line].textWidth = x
            lines[line].dontJustify = dontJustify
            lines[++line] = { textWidth: 0, words: [] }
            x = 0
        }
        text.replaceAll('\n', ' \n').split(' ').forEach(word => {
            if (word[0] === '\n') {
                startNewLine(true)
                word = word.slice(1)
            }
            let wordWidth = 0
            word.split(formatSeparator).forEach((part, i) => {
                if (i > 0) {
                    isFormatted = !isFormatted
                    setFontStyle(isFormatted ? type : 'normal')
                }
                if (footnotes) {
                    footnotes.forEach(footnote => {
                        part = part.replace(footnote, 'a') // 'a' glyph has roughly the same width as smaller number
                    })
                }
                wordWidth += doc.getStringUnitWidth(part) * unitFactor
            })
            if (x + wordWidth > w) {
                startNewLine()
            }
            x += wordWidth
            x += doc.getStringUnitWidth(' ') * unitFactor

            lines[line].words.push({ text: word, width: wordWidth })
        })
        return lines
    }

    const renderLines = (lines, { align = 'justify', shift = 0, formatSeparator, inlineFormat, w = maxWidth, doExtra = () => {}, footnotes, footnotesFormat = {} }) => {
        let isFormatted = false

        const renderLine = ({ textWidth, words }) => {
            if (dryRun) {
                y += lineHeightFactor * unitFactor
                return
            }

            const extraSpace = align === 'justify' ? (w - textWidth) / (words.length - 1) : 0
            let x = margin + shift

            if (footnotes) {
                Object.keys(footnotes).forEach(footnote => {
                    if (words.every(word => !word.text.includes(footnote))) return

                    if (!pageFootnotes.length) h -= 6
                    font({ size: 8, lh: 1.15, style: 'normal' }, () => {
                        const lines = doc.splitTextToSize('   '+footnotes[footnote], maxWidth)
                        const height = (lines.length + 0.5) * fontSize * lineHeightFactor / (72/25.4)
                        h -= height
                        if (h - y - margin < 0) { // for edge case when reference is in the line at the bottom of the page
                            newPage()
                            h -= height
                        }
                        pageFootnotes.push({ lines, height, number: footnote[1], format: footnotesFormat[footnote] })
                    })
                })
            }

            words.forEach(word => {
                let renderWord
                if (footnotes) {
                    if (Object.keys(footnotes).every(footnote => !word.text.includes(footnote))) {
                        renderWord = (text, x) => doc.text(text, x, y)
                    } else {
                        renderWord = (text, x) => {
                            let isFootnote = false
                            Object.keys(footnotes).forEach(footnote => {
                                if (!text.includes(footnote)) return

                                isFootnote = true
                                let x2 = 0
                                const [before = '', rest = ''] = text.split(footnote[0])
                                const [inside = '', after = ''] = rest.split(footnote.at(-1))
                                doc.text(before, x + x2, y)
                                x2 += doc.getStringUnitWidth(before) * unitFactor
                                font({ size: 8 }, () => {
                                    doc.text(inside, x + x2, y - 1.5)
                                })
                                x2 += doc.getStringUnitWidth('a') * unitFactor
                                doc.text(after, x + x2, y)
                                x2 += doc.getStringUnitWidth(after) * unitFactor
                            })
                            if (!isFootnote) {
                                doc.text(text, x, y)
                            }
                        }
                    }
                } else {
                    renderWord = (text, x) => doc.text(text, x, y)
                }

                if (formatSeparator && word.text.includes(formatSeparator)) {
                    let x2 = 0
                    word.text.split(formatSeparator).forEach((part, i) => {
                        if (i > 0) {
                            isFormatted = !isFormatted
                            setFontStyle(isFormatted ? inlineFormat : 'normal')
                        }
                        renderWord(part, x + x2)
                        x2 += doc.getStringUnitWidth(part) * unitFactor
                    })
                } else {
                    renderWord(word.text, x)
                }

                x += word.width
                x += doc.getStringUnitWidth(' ') * unitFactor
                x += extraSpace
            })
            y += lineHeightFactor * unitFactor
        }

        lines.forEach((line, i) => {
            const linesLeft = lines.length - i
            const linesLeftOnPage = Math.round((h - y - margin)/(lineHeightFactor * unitFactor))

            if (
                linesLeftOnPage < 1 ||
                (linesLeft === 2 && linesLeftOnPage === 1) || // prevent widows on last page
                (i === 0 && linesLeftOnPage === 1 && linesLeft > 1) // prevent widows on first page
            ) {
                newPage()
            }
            if (i === 0) doExtra()
            let curAlign = align
            if (lines.length - 1 === i || line.dontJustify) align = 'left' // last line should not be justified
            renderLine(line)
            align = curAlign
        })
    }

    const p = (text, shift = 0, spaceAfter = 3, { align = 'justify', italicSep, boldSep, footnotes, footnotesFormat, ...options  } = {}, doExtra) => {
        const width = options.maxWidth || maxWidth - shift
        if (align === 'center' || align === 'right') {
            // TODO we should check if there is enough space and possibly move to another page
            const lines = doc.splitTextToSize(text, width)
            if (!dryRun) {
                doc.text(lines, align === 'center' ? w/2 : w - margin - shift, y, { align })
            }
            y += lines.length * fontSize * lineHeightFactor / unitFactor
        } else {
            const lines = textToLines(text, italicSep || boldSep, boldSep ? 'bold' : 'italic', width, footnotes && Object.keys(footnotes))
            renderLines(lines, {
                align,
                shift,
                formatSeparator: italicSep || boldSep,
                inlineFormat: boldSep ? 'bold' : 'italic',
                w: width,
                doExtra,
                footnotes,
                footnotesFormat
            })
        }
        y += spaceAfter
    }

    const li = (nb, text, level = 1, italicSep) => {
        p(text, 8*level, 0, { italicSep }, () => {
            doc.text(nb, margin + 8*level - 6, y)
        })
    }

    const save = (filename) => {
        doc.save(filename+'.pdf')
    }

    return { p, li, space, font, setFontSize, setLineHeight, noPageBreak, save }
}
