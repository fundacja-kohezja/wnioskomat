const normalize = text => (text || '').trim()

export default ([step_0, step_1, step_2, step_3, step_4, step_5, step_6], documentCreatorInitializer) => {

    const { p, font, setLineHeight, complete, save } = documentCreatorInitializer()

    // TODO do it differently
    const city = normalize(step_4.a_1).split('\n').at(-1).split(' ').slice(1).join(' ') || '......................'
    p(city + ', ' + (new Date).toLocaleDateString('pl-PL', { dateStyle: 'long' }), {
        align: 'right',
        spaceAfter: 6,
    })

    font({ style: 'bold' }, () => {
        p('PEŁNOMOCNICTWO DO DORĘCZEŃ', {
            align: 'center',
            spaceBefore: 16,
            spaceAfter: 12,
        })
    })

    setLineHeight(1.5)

    let text = 'Udzielam pełnomocnictwa '
    text += (normalize(step_4.a_2_1) || '......................')
    text += ', PESEL '
    text += (step_4.a_2_2 || '......................')
    text += ' do dokonywania w moim imieniu niektórych czynności procesowych w postaci odbioru kierowanych do mnie pism sądowych w postępowaniu z mojego wniosku u sprostowanie aktu urodzenia – w toku całego postępowania, do uprawomocnienia się orzeczenia.'
    p(text)

    p('Adres pełnomocnika to:\n' + normalize(step_4.a_2_3), {
        align: 'left',
        mayBreak: true,
    })

    font({ style: 'italic' }, () => {
        p('Podpis', {
            shift: 120,
            spaceAfter: 10,
        })
    })

    complete()

    return save
}
