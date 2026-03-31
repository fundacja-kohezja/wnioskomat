export default [
    {
        questions: [
            {
                type: 'radio_featured',
                options: ['K', 'M'],
            },
            {
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    {
                        type: 'text',
                        showIf: a => a[0][1].answer,
                    },
                ],
            },
            {
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    {
                        type: 'text',
                        showIf: a => a[0][2].answer,
                    },
                ],
            },
            { type: 'checkbox', hasDescription: true },
        ],
    },
    {
        hasDescription: true,
        questions: [
            { type: 'checkbox', hasDescription: true, initialValue: true, isDisabled: true },
            { type: 'checkbox', hasDescription: true, hasLinkInDescription: true, initialValue: true, isDisabled: true },
            {
                type: 'checkbox',
                hasDescription: true,
                initialValue: true,
                isDisabled: true,
                subquestions: [
                    {
                        type: 'checkbox',
                        subquestions: [
                            { type: 'checkbox', showIf: a => a[1][2].subanswers[0].answer },
                            { type: 'checkbox', showIf: a => a[1][2].subanswers[0].answer },
                        ],
                    },
                    {
                        type: 'checkbox',
                        subquestions: [
                            { type: 'checkbox', showIf: a => a[1][2].subanswers[1].answer },
                            { type: 'checkbox', showIf: a => a[1][2].subanswers[1].answer },
                        ],
                    },
                ],
            },
            {
                type: 'checkbox',
                hasDescription: true,
                initialValue: true,
                isDisabled: true,
                subquestions: [
                    {
                        type: 'checkbox',
                        subquestions: [
                            { type: 'checkbox', showIf: a => a[1][3].subanswers[0].answer },
                            { type: 'checkbox', showIf: a => a[1][3].subanswers[0].answer },
                        ],
                    },
                    {
                        type: 'checkbox',
                        subquestions: [
                            { type: 'checkbox', showIf: a => a[1][3].subanswers[1].answer },
                            { type: 'checkbox', showIf: a => a[1][3].subanswers[1].answer },
                        ],
                    },
                ],
            },
            { type: 'checkbox' },
            { type: 'checkbox', hasDescription: true, hasLinkInDescription: true },
            { type: 'checkbox', hasDescription: true },
            { type: 'checkbox', hasDescription: true, showIf: a => !a[0][1].answer },
            {
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    {
                        hasLabel: false,
                        type: 'radio',
                        options: ['A', 'B', 'C'],
                        showIf: a => a[1][8].answer,
                    },
                ],
            },
        ],
    },
    {
        questions: [
            { type: 'text' },
            { type: 'textarea', hasDescription: true },
            {
                type: 'checkbox',
                hasDescription: true,
                subquestions: [
                    {
                        type: 'text',
                        showIf: a => a[2][2].answer,
                    },
                    {
                        type: 'textarea',
                        showIf: a => a[2][2].answer,
                    },
                ],
            },
            { type: 'text', hasHeading: true, hasSubheading: true, datalist: ['Sąd Rejonowy w Aleksandrowie Kujawskim','Sąd Rejonowy w Augustowie','Sąd Rejonowy w Bartoszycach','Sąd Rejonowy w Bełchatowie','Sąd Rejonowy w Będzinie','Sąd Rejonowy w Białej Podlaskiej','Sąd Rejonowy w Białogardzie','Sąd Rejonowy w Białymstoku','Sąd Rejonowy w Bielsku-Białej','Sąd Rejonowy w Bielsku Podlaskim','Sąd Rejonowy w Biłgoraju','Sąd Rejonowy w Biskupcu','Sąd Rejonowy w Bochni','Sąd Rejonowy w Bolesławcu','Sąd Rejonowy w Braniewie','Sąd Rejonowy w Brodnicy','Sąd Rejonowy w Brzegu','Sąd Rejonowy w Brzesku','Sąd Rejonowy w Brzezinach','Sąd Rejonowy w Brzozowie','Sąd Rejonowy w Busku-Zdroju','Sąd Rejonowy w Bydgoszczy','Sąd Rejonowy w Bytomiu','Sąd Rejonowy w Bytowie','Sąd Rejonowy w Chełmie','Sąd Rejonowy w Chełmnie','Sąd Rejonowy w Chodzieży','Sąd Rejonowy w Chojnicach','Sąd Rejonowy w Chorzowie','Sąd Rejonowy w Choszcznie','Sąd Rejonowy w Chrzanowie','Sąd Rejonowy w Ciechanowie','Sąd Rejonowy w Cieszynie','Sąd Rejonowy w Częstochowie','Sąd Rejonowy w Człuchowie','Sąd Rejonowy w Czeladzi','Sąd Rejonowy w Dąbrowie Górniczej','Sąd Rejonowy w Dąbrowie Tarnowskiej','Sąd Rejonowy w Dębicy','Sąd Rejonowy w Drawsku Pomorskim','Sąd Rejonowy w Działdowie','Sąd Rejonowy w Dzierżoniowie','Sąd Rejonowy w Elblągu','Sąd Rejonowy w Ełku','Sąd Rejonowy w Garwolinie','Sąd Rejonowy Gdańsk-Południe w Gdańsku','Sąd Rejonowy Gdańsk-Północ w Gdańsku','Sąd Rejonowy w Gdyni','Sąd Rejonowy w Giżycku','Sąd Rejonowy w Gliwicach','Sąd Rejonowy w Głogowie','Sąd Rejonowy w Głubczycach','Sąd Rejonowy w Gnieźnie','Sąd Rejonowy w Goleniowie','Sąd Rejonowy w Golubiu-Dobrzyniu','Sąd Rejonowy w Gorlicach','Sąd Rejonowy w Gorzowie Wielkopolskim','Sąd Rejonowy w Gostyninie','Sąd Rejonowy w Gostyniu','Sąd Rejonowy w Grajewie','Sąd Rejonowy w Grodzisku Mazowieckim','Sąd Rejonowy w Grodzisku Wielkopolskim','Sąd Rejonowy w Grójcu','Sąd Rejonowy w Grudziądzu','Sąd Rejonowy w Gryficach','Sąd Rejonowy w Gryfinie','Sąd Rejonowy w Hrubieszowie','Sąd Rejonowy w Iławie','Sąd Rejonowy w Inowrocławiu','Sąd Rejonowy w Janowie Lubelskim','Sąd Rejonowy w Jarocinie','Sąd Rejonowy w Jarosławiu','Sąd Rejonowy w Jastrzębiu-Zdroju','Sąd Rejonowy w Jaśle','Sąd Rejonowy w Jaworze','Sąd Rejonowy w Jaworznie','Sąd Rejonowy w Jeleniej Górze','Sąd Rejonowy w Jędrzejowie','Sąd Rejonowy w Kaliszu','Sąd Rejonowy w Kamieniu Pomorskim','Sąd Rejonowy w Kamiennej Górze','Sąd Rejonowy w Kartuzach','Sąd Rejonowy Katowice-Wschód w Katowicach','Sąd Rejonowy Katowice-Zachód w Katowicach','Sąd Rejonowy w Kędzierzynie-Koźlu','Sąd Rejonowy w Kępnie','Sąd Rejonowy w Kętrzynie','Sąd Rejonowy w Kielcach','Sąd Rejonowy w Kluczborku','Sąd Rejonowy w Kłodzku','Sąd Rejonowy w Kolbuszowej','Sąd Rejonowy w Kole','Sąd Rejonowy w Kołobrzegu','Sąd Rejonowy w Koninie','Sąd Rejonowy w Końskich ','Sąd Rejonowy w Koszalinie','Sąd Rejonowy w Kościanie','Sąd Rejonowy w Kościerzynie','Sąd Rejonowy w Kozienicach','Sąd Rejonowy dla Krakowa-Krowodrzy w Krakowie','Sąd Rejonowy dla Krakowa-Nowej Huty w Krakowie','Sąd Rejonowy dla Krakowa-Podgórza w Krakowie ','Sąd Rejonowy dla Krakowa-Śródmieścia w Krakowie','Sąd Rejonowy w Krasnymstawie','Sąd Rejonowy w Kraśniku','Sąd Rejonowy w Krośnie','Sąd Rejonowy w Krośnie Odrzańskim','Sąd Rejonowy w Krotoszynie','Sąd Rejonowy w Kutnie','Sąd Rejonowy w Kwidzynie','Sąd Rejonowy w Legionowie','Sąd Rejonowy w Legnicy','Sąd Rejonowy w Lesku','Sąd Rejonowy w Lesznie','Sąd Rejonowy w Leżajsku','Sąd Rejonowy w Lęborku','Sąd Rejonowy w Lidzbarku Warmińskim','Sąd Rejonowy w Limanowej','Sąd Rejonowy w Lipnie','Sąd Rejonowy w Lipsku','Sąd Rejonowy w Lubaczowie','Sąd Rejonowy w Lubaniu','Sąd Rejonowy w Lubartowie','Sąd Rejonowy w Lubinie','Sąd Rejonowy Lublin-Wschód w Lublinie z siedzibą w Świdniku','Sąd Rejonowy Lublin-Zachód w Lublinie','Sąd Rejonowy w Lublińcu','Sąd Rejonowy w Lwówku Śląskim','Sąd Rejonowy w Łańcucie','Sąd Rejonowy w Łasku','Sąd Rejonowy w Łęczycy','Sąd Rejonowy w Łobzie','Sąd Rejonowy dla Łodzi-Śródmieścia w Łodzi','Sąd Rejonowy dla Łodzi-Widzewa w Łodzi ','Sąd Rejonowy w Łomży','Sąd Rejonowy w Łowiczu','Sąd Rejonowy w Łukowie ','Sąd Rejonowy w Malborku','Sąd Rejonowy w Miastku','Sąd Rejonowy w Miechowie','Sąd Rejonowy w Mielcu','Sąd Rejonowy w Międzyrzeczu','Sąd Rejonowy w Mikołowie','Sąd Rejonowy w Miliczu','Sąd Rejonowy w Mińsku Mazowieckim','Sąd Rejonowy w Mławie','Sąd Rejonowy w Mogilnie','Sąd Rejonowy w Mrągowie','Sąd Rejonowy w Mysłowicach','Sąd Rejonowy w Myszkowie','Sąd Rejonowy w Myślenicach','Sąd Rejonowy w Myśliborzu','Sąd Rejonowy w Nakle nad Notecią','Sąd Rejonowy w Nidzicy','Sąd Rejonowy w Nisku','Sąd Rejonowy w Nowej Soli','Sąd Rejonowy w Nowym Dworze Mazowieckim','Sąd Rejonowy w Nowym Mieście Lubawskim','Sąd Rejonowy w Nowym Sączu','Sąd Rejonowy w Nowym Targu','Sąd Rejonowy w Nowym Tomyślu','Sąd Rejonowy w Nysie','Sąd Rejonowy w Obornikach','Sąd Rejonowy w Olecku','Sąd Rejonowy w Oleśnicy','Sąd Rejonowy w Oleśnie','Sąd Rejonowy w Olkuszu','Sąd Rejonowy w Olsztynie','Sąd Rejonowy w Oławie','Sąd Rejonowy w Opatowie','Sąd Rejonowy w Opocznie','Sąd Rejonowy w Opolu','Sąd Rejonowy w Opolu Lubelskim','Sąd Rejonowy w Ostrołęce','Sąd Rejonowy w Ostrowcu Świętokrzyskim','Sąd Rejonowy w Ostrowi Mazowieckiej','Sąd Rejonowy w Ostrowie Wielkopolskim','Sąd Rejonowy w Ostródzie ','Sąd Rejonowy w Ostrzeszowie','Sąd Rejonowy w Oświęcimiu','Sąd Rejonowy w Otwocku','Sąd Rejonowy w Pabianicach','Sąd Rejonowy w Piasecznie','Sąd Rejonowy w Pile','Sąd Rejonowy w Pińczowie','Sąd Rejonowy w Piotrkowie Trybunalskim','Sąd Rejonowy w Piszu','Sąd Rejonowy w Pleszewie','Sąd Rejonowy w Płocku','Sąd Rejonowy w Płońsku','Sąd Rejonowy Poznań-Grunwald i Jeżyce w Poznaniu','Sąd Rejonowy Poznań-Nowe Miasto i Wilda w Poznaniu','Sąd Rejonowy Poznań-Stare Miasto w Poznaniu','Sąd Rejonowy w Prudniku','Sąd Rejonowy w Pruszkowie','Sąd Rejonowy w Przasnyszu','Sąd Rejonowy w Przemyślu','Sąd Rejonowy w Przeworsku','Sąd Rejonowy w Przysusze','Sąd Rejonowy w Pszczynie','Sąd Rejonowy w Puławach','Sąd Rejonowy w Pułtusku','Sąd Rejonowy w Raciborzu','Sąd Rejonowy w Radomiu','Sąd Rejonowy w Radomsku','Sąd Rejonowy w Radziejowie','Sąd Rejonowy w Radzyniu Podlaskim','Sąd Rejonowy w Rawiczu','Sąd Rejonowy w Rawie Mazowieckiej','Sąd Rejonowy w Ropczycach','Sąd Rejonowy w Rudzie Śląskiej','Sąd Rejonowy w Rybniku','Sąd Rejonowy w Rykach','Sąd Rejonowy w Rypinie','Sąd Rejonowy w Rzeszowie','Sąd Rejonowy w Sandomierzu','Sąd Rejonowy w Sanoku','Sąd Rejonowy w Siedlcach','Sąd Rejonowy w Siemianowicach Śląskich','Sąd Rejonowy w Sieradzu','Sąd Rejonowy w Sierpcu','Sąd Rejonowy w Skarżysku-Kamiennej','Sąd Rejonowy w Skierniewicach','Sąd Rejonowy w Sławnie','Sąd Rejonowy w Słubicach','Sąd Rejonowy w Słupcy','Sąd Rejonowy w Słupsku','Sąd Rejonowy w Sochaczewie','Sąd Rejonowy w Sokołowie Podlaskim','Sąd Rejonowy w Sokółce','Sąd Rejonowy w Sopocie','Sąd Rejonowy w Sosnowcu','Sąd Rejonowy w Stalowej Woli','Sąd Rejonowy w Starachowicach','Sąd Rejonowy w Stargardzie','Sąd Rejonowy w Starogardzie Gdańskim','Sąd Rejonowy w Staszowie','Sąd Rejonowy w Strzelcach Krajeńskich','Sąd Rejonowy w Strzelcach Opolskich','Sąd Rejonowy w Strzelinie','Sąd Rejonowy w Strzyżowie','Sąd Rejonowy w Suchej Beskidzkiej','Sąd Rejonowy w Sulęcinie','Sąd Rejonowy w Suwałkach','Sąd Rejonowy w Szamotułach','Sąd Rejonowy Szczecin-Centrum w Szczecinie','Sąd Rejonowy Szczecin-Prawobrzeże i Zachód w Szczecinie','Sąd Rejonowy w Szczecinku','Sąd Rejonowy w Szczytnie','Sąd Rejonowy w Szubinie','Sąd Rejonowy w Szydłowcu','Sąd Rejonowy w Śremie','Sąd Rejonowy w Środzie Śląskiej','Sąd Rejonowy w Środzie Wielkopolskiej','Sąd Rejonowy w Świdnicy','Sąd Rejonowy w Świebodzinie','Sąd Rejonowy w Świeciu','Sąd Rejonowy w Świnoujściu ','Sąd Rejonowy w Tarnobrzegu','Sąd Rejonowy w Tarnowie','Sąd Rejonowy w Tarnowskich Górach','Sąd Rejonowy w Tczewie','Sąd Rejonowy w Tomaszowie Lubelskim','Sąd Rejonowy w Tomaszowie Mazowieckim','Sąd Rejonowy w Toruniu','Sąd Rejonowy w Trzciance','Sąd Rejonowy w Trzebnicy','Sąd Rejonowy w Tucholi','Sąd Rejonowy w Turku','Sąd Rejonowy w Tychach','Sąd Rejonowy w Wadowicach','Sąd Rejonowy w Wałbrzychu','Sąd Rejonowy w Wałczu','Sąd Rejonowy dla miasta stołecznego Warszawy w Warszawie ','Sąd Rejonowy dla Warszawy-Mokotowa w Warszawie','Sąd Rejonowy dla Warszawy Pragi-Północ w Warszawie','Sąd Rejonowy dla Warszawy Pragi-Południe w Warszawie','Sąd Rejonowy dla Warszawy-Śródmieścia w Warszawie','Sąd Rejonowy dla Warszawy-Woli w Warszawie','Sąd Rejonowy dla Warszawy-Żoliborza w Warszawie','Sąd Rejonowy w Wąbrzeźnie','Sąd Rejonowy w Wągrowcu','Sąd Rejonowy w Wejherowie','Sąd Rejonowy w Węgrowie','Sąd Rejonowy w Wieliczce','Sąd Rejonowy w Wieluniu','Sąd Rejonowy we Włocławku','Sąd Rejonowy we Włodawie','Sąd Rejonowy we Włoszczowie','Sąd Rejonowy w Wodzisławiu Śląskim','Sąd Rejonowy w Wolsztynie','Sąd Rejonowy w Wołominie','Sąd Rejonowy w Wołowie','Sąd Rejonowy dla Wrocławia-Fabrycznej we Wrocławiu','Sąd Rejonowy dla Wrocławia-Krzyków we Wrocławiu ','Sąd Rejonowy dla Wrocławia-Śródmieścia we Wrocławiu','Sąd Rejonowy we Wrześni','Sąd Rejonowy we Wschowie','Sąd Rejonowy w Wysokiem Mazowieckiem','Sąd Rejonowy w Wyszkowie','Sąd Rejonowy w Zabrzu','Sąd Rejonowy w Zakopanem','Sąd Rejonowy w Zambrowie','Sąd Rejonowy w Zamościu','Sąd Rejonowy w Zawierciu','Sąd Rejonowy w Ząbkowicach Śląskich','Sąd Rejonowy w Zduńskiej Woli','Sąd Rejonowy w Zgierzu','Sąd Rejonowy w Zgorzelcu','Sąd Rejonowy w Zielonej Górze','Sąd Rejonowy w Złotoryi','Sąd Rejonowy w Złotowie','Sąd Rejonowy w Zwoleniu','Sąd Rejonowy w Żaganiu','Sąd Rejonowy w Żarach','Sąd Rejonowy w Żninie','Sąd Rejonowy w Żorach','Sąd Rejonowy w Żyrardowie','Sąd Rejonowy w Żywcu'] },
            {
                type: 'checkbox',
                hasDescription: true,
                hasHeading: true,
                subquestions: [
                    {
                        type: 'text',
                        showIf: a => a[2][4].answer,
                    },
                    {
                        type: 'text',
                        showIf: a => a[2][4].answer,
                    },
                ],
            },
            { type: 'text', hasHeading: true },
            { type: 'text' },
            { type: 'date' },
            { type: 'text', hasDescription: true, placeholder: 'XXXXXXX/XX/AU/XXXX/XXXXXX' },
            { type: 'text', prefix: 'Urząd Stanu Cywilnego w…' },
        ],
    },
    {
        questions: [
            { type: 'textarea', hasDescription: true },
            { type: 'month' },
            {
                type: 'checkbox',
                hasDescription: true,
            },
            {
                type: 'checkbox',
                subquestions: [
                    {
                        type: 'text',
                        showIf: a => a[3][3].answer,
                    },
                ],
            },
            {
                type: 'radio',
                options: ['some', 'all'],
            },
        ],
    },
]
