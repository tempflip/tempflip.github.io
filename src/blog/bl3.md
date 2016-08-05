---
title: Lakásárak, fitt feketék és lineáris regresszió 2.
template: blog.hbt
collections: blog
date: 2016-08-05
---

A szimpla lineáris regresszió ugyan időként megfelelő model lehet, ám gyakran félre is vezet.

Az legfontosabb, hogy mindig feltegyük a kérdést -- van-e *értelme* a modelünknek, vagy csak csak ráeresztettünk az adatainkra egy one-size-fits-all algoritmust és büszkén tálaljuk az eredményeinket.

Jordan Ellenberg a [Power Of Mathematical Thining](https://www.amazon.com/How-Not-Be-Wrong-Mathematical/dp/0143127535) c.  könyvében egy szórakoztató példát hoz: egy kilencvenes években publikált cikk szerint 2048-ra az összes amerikai túlsúlyos lesz. Miért? Mert a hetvenes évek óta 60 százelékkal nőtt a túlsúlyos emberek száma, tehát ezt az adatsort interpolálva a jövőbe 2048-ra éri el az függvény a 100%-ot.

Hmm, de van itt egy-két gond. Például, mi lesz 2048 után? 2070-re már az amerikaiak 120%-a lesz túlsúlyos..? Ezen kívül, a cikk egyéb érdekeségekkel is szolgál: a túlsúlyosság a fekete lakosság körében kevésbbé gyorsan növekszik. Tehát, mire az amerikaiak 100% túlsúlyos lesz, a feketék közt lesznek még jól kinéző férfiak és nők is. De hát hogy lehet ez? A teljes lakosságba nem tartoznak bele a fitt feketék..? Vagy eddig ők talán valahol elbújtak..?

Ennek így természetesen nincs értelme -- Jordan érvelése pont azt mutatja meg, hogy vakon bízni a lineáris regresszióban és nem nézni utána, mit is mondunk pontosan: rossz ötlet.

A kulcs természetesen az, hogy a vonal, ami bemutatja az idő és az elhízás mértékét, nem egyenes, hanem egy görbe. Valószínűleg ahogy az idő telik, egyre inkább kiegyenesedik, és hosszú távon vízszintessé válik. Ezzel megoldódik a fekete-nem fekete lakosság "paradox" is: a fekete lakosság elhízását leíró görbe egy kicsit később éri el a hasonló egyenest.

### Lakásárak és nem-egyenes vonalak

Az bostoni lakásárakat leíró adatsoron (l. az előző postban) gyakran megfigyelhető, hogy a pontok gyakran valamelyik oldalra rendeződnek, esetleg fent kezdődnek, aztán pedig meredeken zuhannak és hosszan elhúzódnak; egyszóval nem egy egyenes körül helyezkednek el.

Szerencsére ezeket az egyenesekt is le tudjuk írni viszonylag egyszerű függvényekkel, az ún. polinominalis kifejezésekkel. Ezek olyan függvények, amelyek az X paramétert N-fokig tartalmazzák.

Pl.

1st: a + bx

2nd: a + bx + cx^2

3rd: a + bx + cx^2 + dx^3

.

.

![bl2_1](https://tempflip.github.io/img/bl3_1.png)
[forras](https://www.mathsisfun.com/algebra/polynomials-solving.html)

Ha ezeket lerajzoljuk, akkor görbéket kapunk, jellemzően N-darab görbülettel. Ezek a függvények általában jobban rá tudnak illeszkedni egy-egy adatsorra.

Ha kiszámoljuk az bostoni lakások összes adataira, melyik függvény illeszkedik a legjobban (vagyis, melyik produkálja a legkisebb MSE-hibát), a következő táblázatot kapjuk. (6-fogik mentem el).

```
       CRIM        ZN     INDUS      CHAS       NOX        RM       AGE  \
0  0.035483  0.036272  0.031934  0.040408  0.034076  0.021531  0.035765   
1  0.033070  0.035910  0.030486  0.040408  0.033888  0.018826  0.035234   
2  0.032754  0.034813  0.030148  0.040408  0.033607  0.018292  0.035161   
3  0.032698  0.034802  0.030062  0.040408  0.033513  0.017802  0.035061   
4  0.032698  0.034783  0.030050  0.040408  0.033479  0.017077  0.035046   
5  0.032689  0.034684  0.029871  0.040408  0.032827  0.017069  0.035045   

        DIS       RAD       TAX   PTRATIO         B     LSTAT          MEDV  
0  0.039085  0.035617  0.032537  0.030939  0.037053  0.019004  2.390195e-32  
1  0.037706  0.035167  0.032318  0.030782  0.036971  0.014978  4.836685e-32  
2  0.037310  0.034323  0.032263  0.030564  0.036955  0.014264  2.926572e-32  
3  0.037309  0.034058  0.032252  0.029271  0.036706  0.013632  5.659858e-32  
4  0.037277  0.033963  0.032246  0.028867  0.035738  0.013270  2.459148e-32  
5  0.036648  0.033678  0.031566  0.028311  0.035016  0.013229  2.848047e-32  

```

Például egész jól írja le az árakat az RM sor (átlagos szobaszám per lakás), az LSTAT sem rossz (hátrányos helyzető lakosság aránya -- ez valószínűleg egy fordított arányosság, vagyis ahol sok a szegény ember, ott olcsó az ingatlan). Megfigyelhető, hogy a magasabb fokú függvények jobban illeszkednek; de azért jellemzően elég gyorsan véget ér ez a látványos javulás, ahogy megyünk feljebb -- a második vagy harmadik fokú függvény után jellemzőn már csak minimális javulás látható, vagyis ezek szerint jellemzően "szimpla" görbékkel lehet a legjobban leírni ezeket az adatsorokat.

(Érdekessékképpen hagytam meg két adatsort -- a MEDV a lakások ára, vagyis az Y változó. Mint látható is, gyakorlatilag nulla MSE-ket produkált -- aminek így is kell lennie, hiszen itt 1-1 megfelelés van. Az CHAS, ami egy "dummy", vagyis teljesen véletlenszerű érték, még érdekesebb. Ahogy feljebb megyünk a függvények fokaival, semmiféle változás nem látható az hibában, vagyis ez valóban egy TELJESEN véletlenszerű érték. Ezen kívül az is érdekes, hogy a 0.04 MSE nem tűnik túl extrémnek a többi adathoz képest, vagyis akár azzal tudnánk érvelni, hogy ez az érték összefüggésben van a lakások árával. Szerencsére mi elolvastuk az adatsorunk leírását, így tudjuk, hogy NINCS).





