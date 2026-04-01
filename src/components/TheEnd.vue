<script setup>
import { jsPDF } from 'jspdf'
import { useI18n } from 'vue-i18n'

import useFormStore from '../stores/form'

const emit = defineEmits(['goToForm'])

const { t } = useI18n()
const { answers } = useFormStore()

const normalize = text => (text || '').replaceAll('ń', 'n').replaceAll('ę', 'e').replaceAll('ą', 'a').replaceAll('ł', 'l').replaceAll('ś', 's').replaceAll('ć', 'c').replaceAll('ź', 'z').replaceAll('ż', 'z')

const doc = new jsPDF
doc.setFontSize(11)

doc.setFont('times')
doc.text([normalize(answers[2][3].answer), 'Wydzial Cywilny'], 140, 10)

doc.setFont('times', 'normal', 'bold')
doc.text({K: 'Wnioskodawczyni:', M: 'Wnioskodawca:'}[answers[0][0].answer] || '', 140, 25)

doc.setFont('times', 'normal', 'normal')
doc.text([
    normalize(answers[2][5].answer+' '+ answers[2][6].answer),
    normalize(answers[2][1].answer),
    normalize(answers[2][0].answer),
    normalize(answers[2][4].answer ? answers[2][4].subanswers[0].answer : ''),
    normalize(answers[2][4].answer ? answers[2][4].subanswers[1].answer : ''),
], 140, 30)

doc.setFont('times', 'normal', 'bold')
doc.text('WNIOSEK O SPROSTOWANIE AKTU URODZENIA', 100, 60, {
    align: 'center',
    maxWidth: 190,
})

doc.setFont('times', 'normal', 'normal')
doc.text([
    'Na podstawie art. 36 ustawy Prawo o aktach stanu cywilnego wnoszę o:',
    '',
    '1.	sprostowanie aktu urodzenia Wnioskodawcy zarejestrowanego w Urzędzie Stanu Cywilnego w '+ normalize(answers[2][9].answer) +' za nr  '+ normalize(answers[2][8].answer) +', w ten sposób, żeby: ',
    {
        K:'a.	błędnie wpisana w akcie płeć oznaczona jako męska (mężczyzna) została zmieniona na prawidłową – żeńską (kobieta);',
        M:'a.	błędnie wpisana w akcie płeć oznaczona jako żeńska (kobieta) została zmieniona na prawidłową – męską (mężczyzna);',
    }[answers[0][0].answer] || '',
    ...(answers[0][1].answer ? ['b.	        imię '+normalize(answers[2][5].answer)+' zostało zmienione na '+normalize(answers[0][1].subanswers[0].answer)+';'] : []),
    ...(answers[0][2].answer ? ['c.	    nazwisko '+normalize(answers[2][6].answer)+' zostało zmienione na '+normalize(answers[0][2].subanswers[0].answer)+'; '] : []),
    '2.	rozpoznanie sprawy na     posiedzeniu niejawnym;',
    '3.	rozpoznanie niniejszej sprawy w trybie pilnym, zgodnie z § 2 pkt 5 lit. x Rozporządzenia Ministra Sprawiedliwości z dnia 18 czerwca 2019 r. Regulamin urzędowania sądów powszechnych;',
    'Tak zwana. tranzycja prawna dokonuje się w Polsce w oparciu o orzecznictwo Sądu Najwyższego. Kwestia ta, związana również z ewolucją orzecznictwa SN, została szczegółowo wyjaśniona w załączonym do wniosku przewodniku biura RPO.',
    'Przed 22 czerwca 1989 r., kiedy to Sąd Najwyższy wydał uchwałę w sprawie III CZP 37/89, korekta oznaczenia płci w akcie urodzenia dokonywana była w postępowaniu o sprostowanie aktu urodzenia. We wspomnianej uchwale SN wykluczył taką procedurę, ale dla samej doktryny i orzecznictwa było oczywiste, że sama możliwość korekty oznaczenia płci powinna istnieć. Dyskusyjna była jedynie podstawa prawna. Warto przy tym podkreślić, że uchwała SN z 1989 r. zapadła w innym stanie prawnym, gdy brzmienie przepisu dotyczącego aktu urodzenia wskazywało, że sprostować można tylko dane, które w momencie sporządzenia aktu były wpisane nieprawidłowo.',
    'W postanowieniu z 22 marca 1991 r. (sygn. akt III CRN 28/91) Sąd Najwyższy uznał, że poczucie przynależności do danej płci jest dobrem osobistym w rozumieniu art. 23 k.c. i można dochodzić jego ochrony w trybie procesowym. W orzeczeniu tym SN przesądził też, że właściwym trybem dochodzenia korekty aktu urodzenia jest pozew o ustalenie, oparty o art. 189 k.p.c. w zw. z art. 23 k.c., którego przesłanką jest stwierdzenie trwałości poczucia przynależności do danej płci. W kolejnych orzeczeniach SN uzupełniał luki procedury, m.in. wypowiadając się o legitymacji biernej w sytuacji, gdy w sprawie nie ma rodziców czy o posiadaniu (lub nie) interesu prawnego w rozstrzygnięciu. Procedura była jednak co do zasady niekwestionowana.',
    '4 marca 2025 r. skład całej Izby Cywilnej Sądu Najwyższego w sprawie III CZP 6/24 podjął uchwałę o następującej treści:',
    '1. Żądanie zmiany oznaczenia płci w akcie urodzenia podlega rozpoznaniu przez sąd w postępowaniu nieprocesowym przy zastosowaniu w drodze analogii art. 36 ustawy z dnia 28 listopada 2014 r. – Prawo o aktach stanu cywilnego. ',
    '2. Zmiana oznaczenia płci w akcie urodzenia może nastąpić wyłącznie na wniosek osoby, której dotyczy ten akt. ',
    '3. Oprócz wnioskodawcy uczestnikiem postępowania może być tylko jego małżonek (art. 510 k.p.c.).',
    '4. Postanowienie uwzględniające wniosek wywołuje skutki od chwili uprawomocnienia się.',
    'Tym samym SN de facto powrócił do koncepcji obowiązującej przed 1989 r. W ustnym uzasadnieniu (do dnia złożenia wniosku nie opublikowano uzasadnienia na piśmie) Sąd Najwyższy zwrócił uwagę, że 28 listopada 2014 r. przyjęta została ustawa Prawo o aktach stanu cywilnego, która zmieniła podstawy i przesłanki sprostowania aktu urodzenia, a ponadto jednoznacznie określiła płeć człowieka jako element stanu cywilnego (art. 2 ust. 1 w zw. z art. 49 ust. 2 pkt. 1 p.a.s.c.). SN podkreślił, że wynik postępowania o zmianę oznaczenia płci dotyczy jedynie praw osobistych wnioskodawcy i podkreślił osobisty charakter tego typu spraw. Odnotował, że konstrukcja i mechanizmy trybu nieprocesowego w większym stopniu uwzględniają okoliczności ze sfery interesu publicznego, a także minimalizują wątpliwości odnoszące się do zagadnienia legitymacji procesowej. W szczególności przejście do trybu nieprocesowego pozwala na ominięcie tworzenia „sztucznego” pozwanego (o którym mówił SN m.in. w wyroku z 2019 r.), a także pozwala na skorzystanie gwarantowanej przez p.a.s.c. skuteczności erga omnes wydanego rozstrzygnięcia.',
    'Choć wydanie powyższej uchwały wywołało kontrowersje i niepewność, zwłaszcza wobec faktu, że w składzie wydającym uchwałę zasiadali sędziowie powołani na stanowisko sędziego przez Krajową Radę Sądownictwa ukształtowaną na podstawie przepisów ustawy z dnia 8 grudnia 2017 r. o zmianie ustawy o Krajowej Radzie Sądownictwa, bez względu na to, czy uchwałę należy uznawać za ważną czy nie, należy co do zasady uznać słuszność rozumowania SN. W doktrynie i wśród praktyków od lat wskazywano, że uchwała z 1989 r. utrudniła, a nie uprościła postępowanie o zmianę oznaczenia płci i że jej treść wynikała przede wszystkim z ówczesnego brzmienia przepisów dotyczących sprostowania aktu urodzenia. Od lat podnoszono, że bardziej odpowiednim trybem byłby tryb nieprocesowy, który nie stawia konieczności spełniania sztucznego wymogu – istnienia strony pozwanej i pozywania rodziców. Uchwała SN słusznie podkreśla osobisty charakter spraw o zmianę oznaczenia płci i wskazuje na to, że płeć jest już jednoznacznie elementem prawa stanu. Należy więc aprobująco odnieść się do tezy, że zmiana oznaczenia płci powinna nastąpić w drodze wniosku o sprostowanie aktu urodzenia przy zastosowaniu w drodze analogii art. 36 p.a.s.c.',
    'Za stosowaniem w drodze analogii postępowania o sprostowanie aktu urodzenia przemawia również międzynarodowy standard dotyczący procedury zmiany oznaczenia płci. Konieczność istnienia procedury pozwalającej na zmianę oznaczenia płci w akcie urodzenia i dokumentach, potwierdza m.in. orzecznictwo Europejskiego Trybunału Praw Człowieka. Wielka Izba Trybunału w sprawie Goodwin przeciwko Zjednoczonemu Królestwu (wyrok z 11 lipca 2022 r., skarga nr 28957/95) uznała, że państwa – strony EKPC – mają pozytywny obowiązek zapewnienia procedury prawnego uzgodnienia płci dla osoby transpłciowej. W kolejnych orzeczeniach Trybunał wskazywał na konieczność zapewnienia, by procedura ta była efektywna i łatwo dostępna (X przeciwko Byłej Jugosławiańskiej Republice Macedonii, wyrok z 17 kwietnia 2019 r., skarga nr 29683/16), szybka (w sprawie S.V. przeciwko Włochom okres 2 lat prowadzenia postępowania uznano za zbyt długi i naruszający art. 8 EKPC), bez uzależnienia od wymogu kilkuletniego okresu obserwacji (Schlumpf przeciwko Szwajcarii, wyrok z 8 stycznia 2009 r., skarga nr 29002/06). Nie można również wprowadzać wymogu przechodzenia określonych zabiegów medycznych, w tym chirurgicznych (Y.Y. przeciwko Turcji, A.P. Garçon & Nicot przeciwko Francji). Wyrok S.V. przeciwko Włochom jasno pokazał, że prawo do prywatności (art. 8 EKPC)  należy obecnie wiązać z prawem do wolności, autonomii i prawem do samostanowienia. Z praw tych wynika, że życie prywatne człowieka obejmuje także tożsamość psychiczną i społeczną człowieka, w tym jego identyfikację płciową, którą państwo ma obowiązek uszanować.',
    'Wymóg, by procedura zmiany oznaczenia płci była szybka, łatwo dostępna i respektowała tożsamość płciową jednostki można znaleźć również w innych aktach i dokumentach międzynarodowych. Na poziomie europejskim jednym z kluczowych dokumentów poruszających tematykę uzgodnienia płci jest zalecenie CM/Rec(2010)5, przyjęte przez Komitet Ministrów Rady Europy w 2010 r. czy Zalecenie nr 17 dotyczące Ogólnej Polityki Europejskiej Komisji Przeciwko Rasizmowi i Nietolerancji w sprawie zapobiegania i zwalczania nietolerancji i dyskryminacji przeciwko osobom LGBTI. Niezależny Ekspert ONZ ds. ochrony przed przemocą i dyskryminacją opartych na orientacji seksualnej i tożsamości płciowej wskazał, że „procedura prawnego uzgodnienia płci pozwalająca osobom transpłciowym na zmianę imienia i oznaczenia płci w dokumentach powinna być prostym postępowaniem administracyjnym opartym na samookreśleniu wnioskodawcy, powinna być dostępna i, tak dalece, jak to możliwe, wolna od kosztów.',
    'Mając na uwadze standard międzynarodowy, można jednoznacznie stwierdzić, że postępowaniem, które w większym stopniu chroni prywatność jednostki, uznaje podmiotowość osoby transpłciowej i ma szansę być postępowaniem szybkim, efektywnym i łatwo dostępnym, jest właśnie postępowanie nieprocesowe, o sprostowanie aktu urodzenia.',
    'Jednocześnie należy zauważyć, że brak jest powodów, by uznać za nieaktualne te tezy płynące z orzecznictwa Sądu Najwyższego i sądów powszechnych wydanych w ostatnich 36 latach, które nie dotyczyły trybu postępowania i osób legitymowanych w procesie o ustalenie płci. W szczególności aktualna pozostaje teza, że tożsamość płciowa jest dobrem osobistym jednostki w rozumieniu art. 23 k.c. i że w postępowaniu należy wykazać trwałość poczucia przynależności do danej płci.  Zarówno pozew o ustalenie płci, jak i obecnie wniosek o sprostowanie aktu urodzenia wywołują ten sam skutek – w akcie urodzenia nanoszona jest wzmianka dodatkowa o orzeczeniu sądowym. Przemawia to za stosowaniem dotychczasowych standardów do uznania, czy spełnione zostały przesłanki zmiany oznaczenia płci w akcie urodzenia.',
    'Rzecznik Praw Obywatelskich w swoich rekomendacjach wskazywał, że osoba dochodząca ustalenia płci (obecnie zmiany oznaczenia płci w wyniku wniosku o sprostowanie aktu urodzenia) powinna wykazać trwałość poczucia przynależności do danej płci, co zasadniczo powinno nastąpić poprzez przedstawienie formalnej diagnozy. Zgodnie z zaleceniami Polskiego Towarzystwa Seksuologicznego (PTS) diagnoza taka powinna być postawiona przez dwóch ekspertów. Pierwszym z nich powinien być lekarz psychiatra lub seksuolog, a drugim – psycholog ze specjalizacją z zakresu psychologii klinicznej lub psychoseksuologii lub posiadający certyfikat seksuologa klinicznego. Powyższe standardy w sposób kompleksowy omawiają, w jaki sposób i na jakich podstawach dochodzi do postawienia diagnozy transseksualizmu (wg ICD-10) czy niezgodności płciowej (wg ICD-11). Wykazanie przez osobę transpłciową, że dysponuje diagnozą postawioną przez ekspertów zgodnie z zaleceniami PTS, jest wystarczające do stwierdzenia trwałości jej poczucia przynależności do płci, której ustalenia się domaga, a tym samym jest wystarczające do wydania postanowienia uwzględniającego wniosek.',
    'b)	Uzasadnienie wniosku o rozpoznanie sprawy na posiedzeniu niejawnym na podstawie dokumentacji przedstawionej przez Wnioskodawcę, bez powoływania biegłego.',
    'Opisane wyżej okoliczności dowodzą jednoznacznie, że wniosek  jest zasadny. Jednocześnie, jako że wszystkie istotne w sprawie okoliczności wynikają z dokumentów, zasadne jest rozpoznanie sprawy na posiedzeniu niejawnym. W postępowaniu nieprocesowym rozpoznanie sprawy na posiedzeniu niejawnym jest sposobem domyślnym (art. 514 k.p.c.), a do wyjątków należy rozpoznawanie ich na rozprawie. ',
].map(normalize), 10, 70, {
    maxWidth: 190,
})

</script>

<template>
    <div class="cols-layout">
        <div class="side-pane">
            <h2>Gotowe! Oto Twój wniosek</h2>
            <div class="generated-doc">
                <div class="doc-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Wniosek o sprostowanie aktu urodzenia
                </div>
                <!-- <button>Podgląd</button> -->
                <button @click="doc.save('wniosek.pdf')" class="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    Pobierz PDF
                </button>
            </div>
            <nav class="prev-next">
                <button @click="emit('goToForm')" class="btn-link prev">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" width="18" height="18">
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Wróć do edycji
                </button>
            </nav>
        </div>
        <div class="questions">
            <!-- <h3>Co dalej?</h3>
            <p>Sekcja w przygotowaniu</p> -->
        </div>
    </div>
</template>
