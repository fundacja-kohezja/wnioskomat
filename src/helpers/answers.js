import validators from './validation'

export const isShown = ({ step, answer, value = true }, answers, i, parent) => {
    if (step === undefined) step = i
    if (answer === undefined) answer = parent // if answer is unspecified, assume parent answer
    return answers[step][answer] === value
}

export const validateAnswer = (q, i, answers, parent) => {
    const parentForSubanswers = q.name
    const subanswers = q.subquestions ? q.subquestions.flatMap(q => validateAnswer(q, i, answers, parentForSubanswers)) : []

    if (q.showIf && !isShown(q.showIf, answers, i, parent)) {
        return subanswers
    }
    const answer = answers[i][q.name]
    if (!q.filledIfAny && q.type === 'checkbox' && answer === undefined) {
        return subanswers
    }
    const isFilled = q.filledIfAny
        ? (_, answers) => q.filledIfAny.some(answerName => answers[i][answerName])
        : (q.type === 'checkbox' ? () => true : q.type === 'month' ? (([month, year] = []) => month && year) : a => a)
    if (!isFilled(answer, answers)) {
        return ['unfilled', ...subanswers]
    }
    if (!q.validation || validators[q.validation].every(validator => validator(answer, answers))) {
        return ['valid', ...subanswers]
    }
    return ['invalid', ...subanswers]
}

export const getAnswerStatuses = (stepsData, answers) => stepsData.map(
    ({ questions }, i) => questions.flatMap(
        q => validateAnswer(q, i, answers)
    )
)

export const checkForAnyFilled = stepAnswers => stepAnswers.some(
    answers => answers.some(status => status !== 'unfilled')
)
export const checkForAnyWithStatus = (stepAnswers, answers, stepsData, status) => stepAnswers
    .filter((_, i) => !stepsData[i].showIf || isShown(stepsData[i].showIf, answers))
    .some(statuses => statuses.some(answerStatus => answerStatus === status))
