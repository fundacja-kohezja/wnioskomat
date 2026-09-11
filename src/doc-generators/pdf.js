import { jsPDF } from 'jspdf'

import './fonts/TeXGyreTermes/TeXGyreTermes-normal'
import './fonts/TeXGyreTermes/TeXGyreTermes-bold'
import './fonts/TeXGyreTermes/TeXGyreTermes-italic'
// import './fonts/TeXGyreTermes/TeXGyreTermes-bolditalic' // Unnecessary for now

// TODO load DejaVuSans only if necessary, as it is used only in one type of document
import './fonts/DejaVuSans/DejaVuSans-normal'
import './fonts/DejaVuSans/DejaVuSans-bold'

export function initPdf({ margin = 25, defaultAlign = 'justify' } = {}) {
    const doc = new jsPDF

    const fonts = {
        serif: 'TeXGyreTermes',
        sansSerif: 'DejaVuSans',
    }

    let fontFamily = fonts.serif
    const setFontFamily = (family) => {
        fontFamily = family
        setFont()
    }

    let fontSize
    const setFontSize = (size) => {
        fontSize = size
        doc.setFontSize(size)
    }
    setFontSize(11)

    let lineHeight
    let lineHeightFactor
    const setLineHeight = (lh) => {
        doc.setLineHeightFactor(lh * 1.2)
        lineHeight = lh
        lineHeightFactor = lh * 1.2
    }
    setLineHeight(1.15)

    let fontStyle
    const setFontStyle = style => {
        fontStyle = style
        setFont()
    }

    const setFont = () => {
        switch(fontStyle) {
            case 'bold-italic':
                doc.setFont(fontFamily, 'italic', 'bold')
                break
            case 'bold':
                doc.setFont(fontFamily, 'normal', 'bold')
                break
            case 'italic':
                doc.setFont(fontFamily, 'italic', 'normal')
                break
            default:
                doc.setFont(fontFamily, 'normal', 'normal')
        }
    }

    setFontStyle('normal')

    const font = ({ size, lh, style, family }, content) => {
        const currentSize = fontSize
        const currentLineHeight = lineHeight
        const currentFontStyle = fontStyle
        const currentFamily = fontFamily
        if (size) setFontSize(size)
        if (lh) setLineHeight(lh)
        if (style) setFontStyle(style)
        if (family) setFontFamily(fonts[family])
        content()
        setFontSize(currentSize)
        setLineHeight(currentLineHeight)
        setFontStyle(currentFontStyle)
        setFontFamily(currentFamily)
    }

    const w = 210
    const maxWidth = w - margin*2

    let h = 297 // available height may shrink if footnotes appear

    const unitFactor = () => fontSize / (72/25.4)

    let y = margin
    let pageFootnotes = []

    let dryRun = false

    const numbering = {
        'basic-numbering': [1, 'a'],
        'alt-numbering': [1],
        'section-marker': ['a'],
    }
    const resetNumbering = (r, l = 0) => {
        if (typeof numbering[r][l] === 'number') {
            numbering[r][l] = 1
        } else {
            numbering[r][l] = 'a'
        }
        if (++l < numbering[r].length) {
            resetNumbering(r, l)
        }
    }
    const numberingSuffixes = {
        'basic-numbering': '.',
        'alt-numbering': ')',
        'section-marker': ')',
    }
    const increment = (r, l) => {
        if (typeof numbering[r][l] === 'number') {
            numbering[r][l]++
        } else {
            numbering[r][l] = String.fromCharCode(numbering[r][l].charCodeAt(0) + 1)
        }
        if (++l < numbering[r].length) { // reset deeper when incrementing shallower
            resetNumbering(r, l)
        }
    }

    const attachFootnotes = () => {
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
    }

    const newPage = () => {
        if (dryRun) return
        attachFootnotes()
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
        y = currentY
        if (y > h - margin) {
            newPage()
        }
        content()
    }

    const textToLines = (text, italicSep, boldSep, w = maxWidth, footnotes) => {
        const lines = [{ textWidth: 0, words: [] }]
        let line = 0
        let x = 0
        let isItalic = false
        let isBold = false
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
            word.split(italicSep).forEach((part, i) => {
                if (i > 0) {
                    isItalic = !isItalic
                    setFontStyle(isItalic && isBold ? 'bold-italic' : isItalic ? 'italic' : isBold ? 'bold' : 'normal')
                }
                part.split(boldSep).forEach((part, j) => {
                    if (j > 0) {
                        isBold = !isBold
                        setFontStyle(isItalic && isBold ? 'bold-italic' : isItalic ? 'italic' : isBold ? 'bold' : 'normal')
                    }
                    if (footnotes) {
                        footnotes.forEach(footnote => {
                            part = part.replace(footnote, 'a'.repeat(footnote.length - 2)) // 'a' glyph has roughly the same width as smaller number
                        })
                    }
                    wordWidth += doc.getStringUnitWidth(part) * unitFactor()
                })
            })
            if (x + wordWidth > w) {
                startNewLine()
            }
            x += wordWidth
            x += doc.getStringUnitWidth(' ') * unitFactor()

            lines[line].words.push({ text: word, width: wordWidth })
        })
        return lines
    }

    const renderLines = (lines, { align = 'justify', shift = 0, italicSep, boldSep, w = maxWidth, doExtra = () => {}, footnotes, footnotesFormat = {} }) => {
        let isItalic = false
        let isBold = false

        const renderLine = ({ textWidth, words }) => {
            if (dryRun) {
                y += lineHeightFactor * unitFactor()
                return
            }

            const extraSpace = align === 'justify' ? (w - textWidth) / (words.length - 1) : 0
            let x = margin + shift

            if (footnotes) {
                Object.keys(footnotes).forEach(footnote => {
                    if (words.every(word => !word.text.includes(footnote))) return

                    if (!pageFootnotes.length) h -= 6
                    font({ size: 8, lh: 1.15, style: 'normal' }, () => {
                        const lines = doc.splitTextToSize(' ' + '  '.repeat(footnote.length - 2)+footnotes[footnote], maxWidth)
                        const height = (lines.length + 0.5) * fontSize * lineHeightFactor / (72/25.4)
                        h -= height
                        if (h - y - margin < 0) { // for edge case when reference is in the line at the bottom of the page
                            newPage()
                            h -= height
                        }
                        pageFootnotes.push({ lines, height, number: footnote.slice(1, -1), format: footnotesFormat[footnote] })
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
                                x2 += doc.getStringUnitWidth(before) * unitFactor()
                                font({ size: 8 }, () => {
                                    doc.text(inside, x + x2, y - 1.5)
                                })
                                x2 += doc.getStringUnitWidth('a'.repeat(inside.length)) * unitFactor()
                                doc.text(after, x + x2, y)
                                x2 += doc.getStringUnitWidth(after) * unitFactor()
                            })
                            if (!isFootnote) {
                                doc.text(text, x, y)
                            }
                        }
                    }
                } else {
                    renderWord = (text, x) => doc.text(text, x, y)
                }

                if ((boldSep || italicSep) && (word.text.includes(boldSep) || word.text.includes(italicSep))) {
                    let x2 = 0
                    word.text.split(boldSep).forEach((part, i) => {
                        if (i > 0) {
                            isBold = !isBold
                            setFontStyle(isItalic && isBold ? 'bold-italic' : isItalic ? 'italic' : isBold ? 'bold' : 'normal')
                        }
                        part.split(italicSep).forEach((part, j) => {
                            if (j > 0) {
                                isItalic = !isItalic
                                setFontStyle(isItalic && isBold ? 'bold-italic' : isItalic ? 'italic' : isBold ? 'bold' : 'normal')
                            }
                            renderWord(part, x + x2)
                            x2 += doc.getStringUnitWidth(part) * unitFactor()
                        })
                    })
                } else {
                    renderWord(word.text, x)
                }

                x += word.width
                x += doc.getStringUnitWidth(' ') * unitFactor()
                x += extraSpace
            })
            y += lineHeightFactor * unitFactor()
        }

        lines.forEach((line, i) => {
            const linesLeft = lines.length - i
            const linesLeftOnPage = Math.round((h - y - margin)/(lineHeightFactor * unitFactor()))

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

    let defaultShift = 0
    let defaultMaxWidth
    const p = (text, { shift = defaultShift, spaceAfter = 3, spaceBefore = 0, align = defaultAlign, italicSep, boldSep, footnotes, footnotesFormat, ...options  } = {}, doExtra) => {
        space(spaceBefore)
        const width = options.maxWidth || defaultMaxWidth || maxWidth - shift
        if (align === 'center' || align === 'right') {
            // TODO we should check if there is enough space and possibly move to another page
            const lines = doc.splitTextToSize(text, width)
            if (!dryRun) {
                doc.text(lines, align === 'center' ? width/2 + margin + shift : w - margin - shift, y, { align })
            }
            y += lines.length * fontSize * lineHeightFactor / unitFactor()
        } else {
            const lines = textToLines(text, italicSep, boldSep, width, footnotes && Object.keys(footnotes))
            renderLines(lines, {
                align,
                shift,
                italicSep,
                boldSep,
                w: width,
                doExtra,
                footnotes,
                footnotesFormat
            })
        }
        y += spaceAfter
    }

    const li = (reference, text, options = {}) => {
        const { level = 1, spaceAfter = 0, ...rest } = options
        p(text, {
            ...rest,
            shift: 8*level,
            spaceAfter,
        }, () => {
            doc.text(numbering[reference][level-1] + numberingSuffixes[reference], margin + 8*level - 6, y)
            increment(reference, level - 1)
        })
    }

    const table = (content) => {
        content()
    }

    let rowHeight = 0
    let cellShift = 0
    const row = (content, height) => {
        cellShift = 0
        rowHeight = height
        content()
        y += height
    }

    const cell = (content, { width = maxWidth, pt = 0, px = 2, factor, isFilled } = {}) => {
        if (factor) width *= factor
        doc.setFillColor('0.85')
        doc.rect(margin + cellShift, y, width, rowHeight, isFilled ? 'DF' : 'S')
        const startY = y
        y += fontSize * lineHeightFactor / (72/25.4)
        y += pt
        defaultShift = cellShift + px
        defaultMaxWidth = width - px - px
        content()
        defaultShift = 0
        defaultMaxWidth = undefined
        y = startY
        cellShift += width
    }

    const save = (filename) => {
        doc.save(filename+'.pdf')
    }

    const complete = () => {
        attachFootnotes()
    }

    return { p, li, table, row, cell, font, setLineHeight, resetNumbering, newPage, noPageBreak, complete, save }
}
