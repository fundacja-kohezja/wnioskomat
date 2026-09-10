export const isShown = ({ step, answer, value = true }, answers, i, parent) => {
    if (step === undefined) step = i
    if (answer === undefined) answer = parent // if answer is unspecified, assume parent answer
    return answers[step][answer] === value
}
