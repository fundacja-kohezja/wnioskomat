export const isShown = ({ step, answer, value = true }, answers, i, parent) => {
    if (step === undefined) step = i
    if (answer === undefined) answer = parent // if answer is unspecified, assume parent answer
    return answers[step][answer] === value
}

export const estimateLines = (text, charsPerLine) => text.split('\n')
    .reduce((carry, line) => carry + Math.ceil(line.length / charsPerLine), 0)
