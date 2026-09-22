const normalize = text => (text || '').trim()

export default (mainFormAnswers, documentCreatorInitializer, proxyFormAnswers) => {

    const a = proxyFormAnswers ? { ...mainFormAnswers[2], ...proxyFormAnswers[0] } : { ...mainFormAnswers[2] }

    const { p, font, setLineHeight, complete, save } = documentCreatorInitializer()

    const city = normalize(a.city) || '......................'
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

    setLineHeight(1.15)

    let text = 'Udzielam pełnomocnictwa osobie o danych '
    text += (normalize(a.proxy_name) || '......................')
    text += ', PESEL '
    text += (a.proxy_pesel || '......................')
    text += ' do dokonywania w moim imieniu niektórych czynności procesowych w postaci odbioru kierowanych do mnie pism sądowych '
    if (proxyFormAnswers) {
        text += 'w postępowaniu zawisłym przed ' + (normalize(a.chosen_court).replace('Sąd Rejonowy', 'Sądem Rejonowym') || 'Sądem Rejonowym w ...................') + ' pod sygnaturą akt ' + (normalize(a.case_id) || '......................')
    } else {
        text += 'w postępowaniu z mojego wniosku u sprostowanie aktu urodzenia'
    }
    text += ' – w toku całego postępowania, do uprawomocnienia się orzeczenia.'
    p(text)

    p('Adres pełnomocnika to:\n' + (
        [a.proxy_address_1, a.proxy_address_2, (a.proxy_zip_code || '........') + ' ' + (a.proxy_city || '...................')]
            .map(normalize)
            .filter(x => x)
            .join('\n')
    ), {
        mayBreak: true,
        align: 'left',
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
