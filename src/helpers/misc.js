export const estimateLines = (text, charsPerLine) => text.split('\n')
    .reduce((carry, line) => carry + Math.ceil(line.length / charsPerLine), 0)
