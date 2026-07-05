export const isShown = ({ step, answer, value = true }, answers, i, id) => {
    if (step === undefined) step = i
    if (answer === undefined) answer = id.slice(0, -2) // if answer is unspecified, assume parent answer
    return answers[step][answer] === value
}
