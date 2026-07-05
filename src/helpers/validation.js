export default {
    number: [
        a => !isNaN(Number(a)),
    ],

    pesel: [
        // has 11 chars
        a => a.length === 11,

        // all chars are digits
        a => a.split('').every(digit => !isNaN(Number(digit))),

        // checksum is correct
        a => 10 - ([a[0]*1, a[1]*3, a[2]*7, a[3]*9, a[4]*1, a[5]*3, a[6]*7, a[7]*9, a[8]*1, a[9]*3].map(x => x % 10).reduce((x, y) => x + y) % 10) == a[10],
    ],

    email: [
        a => a.includes('@'),
    ],

    underage: [
        a => new Date > new Date(a),
        // about 18 years, no need to be precise here
        (a, answers) => (!answers[0].a_3 && new Date - new Date(a) > 1000*60*60*24*366*18) || answers[0].a_3,
    ],
}
